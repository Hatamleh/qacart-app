/**
 * Auth Client - Authentication operations
 * Handles client-side requests to auth API routes
 */

import { User } from '@/types'

export class AuthClient {
  /**
   * Create session from Firebase ID token and return user data
   */
  static async createSession(idToken: string): Promise<{ user: User; message: string }> {
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create session')
    }

    return response.json()
  }

  /**
   * Logout user and clear session
   */
  static async logout(): Promise<{ message: string }> {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to logout')
    }

    return response.json()
  }

  /**
   * Delete current user account
   */
  static async deleteAccount(): Promise<{ message: string }> {
    const response = await fetch('/api/auth/delete-account', {
      method: 'DELETE',
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete account')
    }

    return response.json()
  }
}
