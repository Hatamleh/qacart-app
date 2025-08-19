import {admin} from '@/firebase/admin'
import {cookies} from 'next/headers'

/**
 * AuthRepository - Data access layer for authentication operations
 * Used by API routes to handle auth with Firebase
 * Supports Magic Link and Google authentication
 * For user data operations, use UserRepository
 */
export class AuthRepository {

  // ===== SESSION MANAGEMENT =====

  /**
   * Create session cookie from Firebase ID token
   * Called by API route after client authentication
   */
  static async createSessionCookie(idToken: string): Promise<string> {
    try {
      // Create session cookie with 5 day expiry
      const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
        return await admin.auth().createSessionCookie(idToken, {expiresIn})
    } catch (error) {
      console.error('Error creating session cookie:', error)
      throw new Error('Failed to create session')
    }
  }

  /**
   * Verify session cookie and return user ID
   */
  static async verifySession(sessionCookie: string): Promise<string | null> {
    try {
      const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true)
      return decodedClaims.uid
    } catch (error) {
      console.error('Error verifying session:', error)
      return null
    }
  }

  /**
   * Revoke user session (server-side)
   */
  static async revokeSession(sessionCookie: string): Promise<void> {
    try {
      const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie)
      await admin.auth().revokeRefreshTokens(decodedClaims.uid)
    } catch (error) {
      console.error('Error revoking session:', error)
    }
  }

  // ===== AUTHENTICATION HELPERS =====

  /**
   * Get authenticated user ID from session cookie
   */
  static async getAuthenticatedUserId(): Promise<string | null> {
    try {
      const cookieStore = await cookies()
      const sessionCookie = cookieStore.get('session')?.value

      if (!sessionCookie) {
        return null
      }

      const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true)
      return decodedClaims.uid
    } catch (error) {
      console.error('Error getting authenticated user ID:', error)
      return null
    }
  }

  /**
   * Verify admin access from session cookie
   * Returns admin user ID if valid admin, throws error otherwise
   */
  static async getAuthenticatedAdminUserId(): Promise<string> {
    try {
      const cookieStore = await cookies()
      const sessionCookie = cookieStore.get('session')?.value

      if (!sessionCookie) {
        throw new Error('Authentication required')
      }

      // Verify session first
      const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true)
      const userId = decodedClaims.uid

      // Get user from Firestore to check role
      const userDoc = await admin.firestore()
        .collection('users')
        .doc(userId)
        .get()

      if (!userDoc.exists) {
        throw new Error('User not found')
      }

      const user = userDoc.data()
      if (user?.role !== 'sudo') {
        throw new Error('Admin access required')
      }

      return userId
    } catch (error) {
      console.error('Error verifying admin access:', error)
      throw error
    }
  }

  /**
   * Verify admin access from request session cookie
   * Helper method for API routes
   */
  static async verifyAdminAccess(sessionCookie: string): Promise<string> {
    try {
      if (!sessionCookie) {
        throw new Error('Authentication required')
      }

      // Verify session first
      const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true)
      const userId = decodedClaims.uid

      // Get user from Firestore to check role
      const userDoc = await admin.firestore()
        .collection('users')
        .doc(userId)
        .get()

      if (!userDoc.exists) {
        throw new Error('User not found')
      }

      const user = userDoc.data()
      if (user?.role !== 'sudo') {
        throw new Error('Admin access required')
      }

      return userId
    } catch (error) {
      console.error('Error verifying admin access:', error)
      throw error
    }
  }


}
