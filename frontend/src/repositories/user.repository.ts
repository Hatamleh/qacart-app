import { User, FirebaseUser, GiftDetails, GetUsersParams, GetUsersResponse } from '@/types'
import { admin } from '@/firebase/admin'
import { AuthRepository } from './auth.repository'
import { cache } from 'react'
import {firestore} from "firebase-admin";
import FieldValue = firestore.FieldValue;


/**
 * UserRepository - Data access layer for user data management
 * Used by API routes to interact with user data
 * For authentication operations, use AuthRepository
 */
export class UserRepository {

  // ===== USER DATA RETRIEVAL =====

  /**
   * Get the current authenticated user with full profile data
   * Cached automatically by React - no duplicate calls within same request
   */
  static getCurrentUser = cache(async (): Promise<User | null> => {
    try {
      const userId = await AuthRepository.getAuthenticatedUserId()
      if (!userId) {
        return null
      }

      return await this.getUserById(userId)

    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  })

  /**
   * Get user by ID (can be used internally or by session route)
   */
  static async getUserById(userId: string): Promise<User | null> {
    try {
      const userDoc = await admin.firestore()
        .collection('users')
        .doc(userId)
        .get()

      if (!userDoc.exists) {
        // If user is authenticated but no profile exists, create one
        const decodedClaims = await admin.auth().getUser(userId)
        return await this.createUserProfile({
          uid: userId,
          email: decodedClaims.email || ''
        }, 'magic-link')
      }

      return userDoc.data() as User
    } catch (error) {
      console.error('Error getting user by ID:', error)
      return null
    }
  }

  /**
   * Get all users with enhanced filtering, pagination, and search (Admin function)
   * Used for admin "إدارة المستخدمين" page with server-side processing
   */
  static async getAllUsers(params: GetUsersParams = {}): Promise<GetUsersResponse> {
    try {
      const {
        filter = 'all',
        limit = 20,
        offset = 0,
        search = ''
      } = params

      // Start building the query
      const query = admin.firestore().collection('users')

      // Apply search filter first (most restrictive)
      if (search.trim()) {
        const searchTerm = search.trim().toLowerCase()
        console.log('🔍 Search term:', searchTerm)

        // For search, we need to get all users and filter client-side
        // because Firestore doesn't support OR queries efficiently and
        // document ID search requires different handling
        const allUsersSnapshot = await query.get()
        console.log('📊 Total users in DB:', allUsersSnapshot.docs.length)

        const allUsers = allUsersSnapshot.docs.map(doc => {
          const userData = doc.data() as User
          // Ensure the document ID is available for search
          return {
            ...userData,
            id: userData.id || doc.id // Use field id or document id as fallback
          }
        })

        console.log('👤 Sample user for search debug:', allUsers[0] ? {
          id: allUsers[0].id,
          email: allUsers[0].email
        } : 'No users found')

        // Client-side search by email or ID
        let users = allUsers.filter(user => {
          const emailMatch = user.email.toLowerCase().includes(searchTerm)
          const idMatch = user.id.toLowerCase().includes(searchTerm)
          const matches = emailMatch || idMatch
          if (matches) {
            console.log('✅ Search match found:', { email: user.email, id: user.id })
          }
          return matches
        })

        console.log('🎯 Search results count:', users.length)

        // Apply status filter to search results
        users = this.applyStatusFilter(users, filter)

        // Apply pagination
        const total = users.length
        const paginatedUsers = users.slice(offset, offset + limit)
        const hasMore = offset + limit < total

        return {
          users: paginatedUsers,
          total,
          hasMore,
          currentFilter: filter,
          currentSearch: search
        }
      }

      // No search - use client-side filtering to avoid index requirements
      console.log('🔽 Applying filter:', filter)

      // Get all users first (simpler than managing Firestore indexes)
      const allUsersSnapshot = await query.get()
      console.log('📊 Total users for filtering:', allUsersSnapshot.docs.length)

      const allUsers = allUsersSnapshot.docs.map(doc => {
        const userData = doc.data() as User
        return {
          ...userData,
          id: userData.id || doc.id // Ensure ID is available
        }
      })

      // Apply status filter client-side
      const users = this.applyStatusFilter(allUsers, filter)
      console.log('📊 After filter applied:', users.length)

      if (users.length > 0) {
        console.log('👤 Sample filtered user:', {
          id: users[0].id,
          email: users[0].email,
          subscriptionStatus: users[0].subscription?.status,
          hasGiftDetails: !!users[0].subscription?.giftDetails
        })
      }

      // Apply pagination client-side
      const total = users.length
      const paginatedUsers = users.slice(offset, offset + limit)
      const hasMore = offset + limit < total

      return {
        users: paginatedUsers,
        total,
        hasMore,
        currentFilter: filter,
        currentSearch: search
      }

    } catch (error) {
      console.error('Error getting users with params:', error)
      return {
        users: [],
        total: 0,
        hasMore: false,
        currentFilter: params.filter || 'all',
        currentSearch: params.search || ''
      }
    }
  }


  /**
   * Apply status filter to user array (used after search)
   */
  private static applyStatusFilter(users: User[], filter: string): User[] {
    switch (filter) {
      case 'premium':
        return users.filter(user => user.subscription.status === 'premium')
      case 'free':
        return users.filter(user => user.subscription.status === 'free')
      case 'gifted':
        return users.filter(user =>
          user.subscription.status === 'premium' &&
          user.subscription.giftDetails != null
        )
      case 'all':
      default:
        return users
    }
  }

  // ===== USER PROFILE MANAGEMENT =====

  /**
   * Create user profile in Firestore after authentication
   */
  static async createUserProfile(firebaseUser: FirebaseUser, authProvider: 'magic-link' | 'google'): Promise<User> {
    try {
      // Check if user already exists (race condition protection)
      const existingUser = await admin.firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .get()

      if (existingUser.exists) {
        console.log(`✅ User profile already exists:`, firebaseUser.email)
        return existingUser.data() as User
      }

      const newUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        role: 'user', // Default role
        subscription: {
          status: 'free',
          isActive: false
        },
        createdAt: new Date().toISOString()
      }

      // Save to Firestore
      await admin.firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .set(newUser)

      console.log(`✅ User profile created via ${authProvider}:`, newUser.email)
      return newUser

    } catch (error) {
      console.error('Error creating user profile:', error)
      throw new Error('Failed to create user profile')
    }
  }



  // ===== SUBSCRIPTION MANAGEMENT =====



  /**
   * Grant premium subscription (Admin function) - used by "منح بريميوم" button
   */
  static async grantPremiumSubscription(userId: string, plan: 'monthly' | 'quarterly' | 'yearly'): Promise<void> {
    try {
      const subscription: User['subscription'] = {
        status: 'premium',
        plan: plan,
        isActive: true,
        nextBillingDate: this.calculateNextBillingDate(plan)
      }

      await admin.firestore()
        .collection('users')
        .doc(userId)
        .update({ subscription })

      console.log(`✅ Granted ${plan} premium to user: ${userId}`)
    } catch (error) {
      console.error('Error granting premium subscription:', error)
      throw new Error('Failed to grant premium subscription')
    }
  }

  /**
   * Toggle premium gift for user (Admin function)
   * If user is free or regular premium -> Grant 30-day gift
   * If user has gift -> Revoke and make free
   */
  static async togglePremiumGift(userId: string): Promise<{ action: 'granted' | 'revoked'; user: User }> {
    try {
      // First get current user to check status
      const currentUser = await this.getUserById(userId)
      if (!currentUser) {
        throw new Error('User not found')
      }

      let updatedSubscription: User['subscription']
      let action: 'granted' | 'revoked'

      // Check if user currently has a gift
      const hasGift = currentUser.subscription.giftDetails != null

      if (hasGift) {
        // User has gift -> Revoke it (make free)
        // Use direct field updates to delete optional fields
        await admin.firestore()
          .collection('users')
          .doc(userId)
          .update({
            'subscription.status': 'free',
            'subscription.plan': FieldValue.delete(),
            'subscription.isActive': false,
            'subscription.nextBillingDate': FieldValue.delete(),
            'subscription.giftDetails': FieldValue.delete()
          })
        action = 'revoked'
      } else {
        // User doesn't have gift -> Grant 10-day gift
        const now = new Date()
        const expiresAt = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000) // +10 days

        const giftDetails: GiftDetails = {
          grantedAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
          type: 'admin_gift'
        }

        updatedSubscription = {
          status: 'premium',
          plan: 'monthly',
          isActive: true,
          nextBillingDate: expiresAt.toISOString(),
          giftDetails
        }
        action = 'granted'

        // Update user in Firestore
        await admin.firestore()
          .collection('users')
          .doc(userId)
          .update({ subscription: updatedSubscription })
      }

      // Get updated user
      const updatedUser = await this.getUserById(userId)
      if (!updatedUser) {
        throw new Error('Failed to retrieve updated user')
      }

      console.log(`✅ ${action === 'granted' ? 'Granted' : 'Revoked'} premium gift for user: ${userId}`)

      return { action, user: updatedUser }

    } catch (error) {
      console.error('Error toggling premium gift:', error)
      throw new Error('Failed to toggle premium gift')
    }
  }



  // ===== USER MANAGEMENT (ADMIN) =====

  /**
   * Delete user by admin (Admin function) - used by admin "حذف" button
   */
  static async deleteUserByAdmin(userId: string): Promise<void> {
    try {
      // Delete from Firebase Auth
      await admin.auth().deleteUser(userId)

      // Delete from Firestore
      await admin.firestore()
        .collection('users')
        .doc(userId)
        .delete()

      // Also delete user progress data
      const progressSnapshot = await admin.firestore()
        .collection('progress')
        .where('userId', '==', userId)
        .get()

      const batch = admin.firestore().batch()
      progressSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })
      await batch.commit()

      console.log(`✅ Admin deleted user and related data: ${userId}`)
    } catch (error) {
      console.error('Error deleting user:', error)
      throw new Error('Failed to delete user')
    }
  }

  /**
   * Delete own account (User function) - used by profile page "حذف الحساب" button
   */
  static async deleteOwnAccount(): Promise<void> {
    const userId = await AuthRepository.getAuthenticatedUserId()
    if (!userId) {
      throw new Error('User not authenticated')
    }

    try {
      // Same deletion process but for own account
      await this.deleteUserByAdmin(userId)

      console.log(`✅ User deleted own account: ${userId}`)
    } catch (error) {
      console.error('Error deleting own account:', error)
      throw new Error('Failed to delete account')
    }
  }



  // ===== UTILITY FUNCTIONS =====

  /**
   * Calculate next billing date based on plan
   */
  private static calculateNextBillingDate(plan: 'monthly' | 'quarterly' | 'yearly'): string {
    const now = new Date()

    switch (plan) {
      case 'monthly':
        now.setMonth(now.getMonth() + 1)
        break
      case 'quarterly':
        now.setMonth(now.getMonth() + 3)
        break
      case 'yearly':
        now.setFullYear(now.getFullYear() + 1)
        break
    }

    return now.toISOString().split('T')[0] // Return YYYY-MM-DD format
  }
}
