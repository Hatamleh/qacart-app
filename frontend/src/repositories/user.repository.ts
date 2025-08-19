import { User, FirebaseUser, GiftDetails, GetUsersParams, GetUsersResponse } from '@/types'
import { admin } from '@/firebase/admin'
import { AuthRepository } from './auth.repository'
import {firestore} from "firebase-admin";
import FieldValue = firestore.FieldValue;
import { isDateExpired } from '@/lib'


/**
 * UserRepository - Data access layer for user data management
 * Used by API routes to interact with user data
 * For authentication operations, use AuthRepository
 */
export class UserRepository {

  // ===== USER DATA RETRIEVAL =====
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
        })
      }

      return userDoc.data() as User
    } catch {
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

        // For search, we need to get all users and filter client-side
        // because Firestore doesn't support OR queries efficiently and
        // document ID search requires different handling
        const allUsersSnapshot = await query.get()

        const allUsers = allUsersSnapshot.docs.map(doc => {
          const userData = doc.data() as User
          // Ensure the document ID is available for search
          return {
            ...userData,
            id: userData.id || doc.id // Use field id or document id as fallback
          }
        })

                // Client-side search by email or ID
        let users = allUsers.filter(user => {
          const emailMatch = user.email.toLowerCase().includes(searchTerm)
          const idMatch = user.id.toLowerCase().includes(searchTerm)
          return emailMatch || idMatch
        })

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
      // Get all users first (simpler than managing Firestore indexes)
      const allUsersSnapshot = await query.get()

      const allUsers = allUsersSnapshot.docs.map(doc => {
        const userData = doc.data() as User
        return {
          ...userData,
          id: userData.id || doc.id // Ensure ID is available
        }
      })

            // Apply status filter client-side
      const users = this.applyStatusFilter(allUsers, filter)

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

    } catch {
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
  static async createUserProfile(firebaseUser: FirebaseUser): Promise<User> {
    try {
      // Check if user already exists (race condition protection)
      const existingUser = await admin.firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .get()

      if (existingUser.exists) {
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

      return newUser

    } catch {
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

    } catch {
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

            return { action, user: updatedUser }

    } catch {
      throw new Error('Failed to toggle premium gift')
    }
  }



  // ===== USER MANAGEMENT (ADMIN) =====

  /**
   * Delete user by admin (Admin function) - used by admin "حذف" button
   */
  static async deleteUserByAdmin(userId: string): Promise<void> {
    try {
      // Check if the target user is an admin before deletion
      const userDoc = await admin.firestore()
        .collection('users')
        .doc(userId)
        .get()

      if (!userDoc.exists) {
        throw new Error('User not found')
      }

      const userData = userDoc.data()
      
      // Prevent deletion of admin users
      if (userData?.role === 'sudo') {
        throw new Error('Cannot delete admin users')
      }

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

    } catch (error) {
      // Re-throw specific admin protection errors
      if (error instanceof Error && (
        error.message.includes('Cannot delete admin users') ||
        error.message.includes('User not found')
      )) {
        throw error
      }
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
      // Get user data to check role before deletion
      const userDoc = await admin.firestore()
        .collection('users')
        .doc(userId)
        .get()

      if (!userDoc.exists) {
        throw new Error('User not found')
      }

      const userData = userDoc.data()
      
      // Prevent admin users from deleting their own accounts
      if (userData?.role === 'sudo') {
        throw new Error('Admin users cannot delete their own accounts')
      }

      // Proceed with deletion for non-admin users
      await this.deleteUserByAdmin(userId)

    } catch (error) {
      // Re-throw specific admin protection error
      if (error instanceof Error && error.message.includes('Admin users cannot delete')) {
        throw error
      }
      throw new Error('Failed to delete account')
    }
  }



  // ===== UTILITY FUNCTIONS =====

  /**
   * Check and clean up expired gift subscriptions
   * @param user - User object to check
   * @returns Updated user object with expired gifts removed
   */
  static async checkAndCleanExpiredGift(user: User): Promise<User> {
    // Check if user has a gift
    if (!user.subscription.giftDetails?.expiresAt) {
      return user
    }

    // Check if gift is expired
    if (isDateExpired(user.subscription.giftDetails.expiresAt)) {
      console.log(`🧹 Cleaning expired gift for user ${user.id}`)
      
      try {
        // Update user in database to remove expired gift
        await admin.firestore()
          .collection('users')
          .doc(user.id)
          .update({
            'subscription.status': 'free',
            'subscription.plan': FieldValue.delete(),
            'subscription.isActive': false,
            'subscription.nextBillingDate': FieldValue.delete(),
            'subscription.giftDetails': FieldValue.delete()
          })

        // Return updated user object
        return {
          ...user,
          subscription: {
            status: 'free',
            isActive: false
          }
        }
      } catch {
        return user
      }
    }

    return user
  }

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
