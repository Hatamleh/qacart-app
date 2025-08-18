import { User, FirebaseUser, GiftDetails } from '@/types'
import { admin } from '@/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { AuthRepository } from './auth.repository'
import { cache } from 'react'

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
   * Get all users (Admin only)
   */
  static async getAllUsers(): Promise<User[]> {
    try {
      const usersSnapshot = await admin.firestore()
        .collection('users')
        .orderBy('createdAt', 'desc')
        .get()

      return usersSnapshot.docs.map(doc => doc.data() as User)
    } catch (error) {
      console.error('Error getting all users:', error)
      return []
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
