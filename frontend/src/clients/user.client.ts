/**
 * User Client - User management operations
 * Handles client-side requests to user API routes (admin only)
 */

import { User } from '@/types'

export class UserClient {
  // ===== ADMIN USER METHODS =====
  
  /**
   * Get all users (Admin only)
   */
  static async getAllUsers(): Promise<{ users: User[] }> {
    const response = await fetch('/api/sudo/users', {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch users')
    }

    return response.json()
  }
}
