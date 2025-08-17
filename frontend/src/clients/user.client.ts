import { User, FirebaseUser } from '@/types'
import { admin } from '@/firebase/admin'
import { AuthClient } from './auth.client'
import { cache } from 'react'

/**
 * UserClient - Handles user data management operations
 * For authentication operations, use AuthClient
 */
export class UserClient {

  // ===== USER DATA RETRIEVAL =====

  /**
   * Get the current authenticated user with full profile data
   * Cached automatically by React - no duplicate calls within same request
   */
  static getCurrentUser = cache(async (): Promise<User | null> => {
    try {
      const userId = await AuthClient.getAuthenticatedUserId()
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
    const userId = await AuthClient.getAuthenticatedUserId()
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
