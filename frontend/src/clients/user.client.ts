/**
 * User Client - User management operations
 * Handles client-side requests to user API routes (admin only)
 */

import { User, GetUsersParams, GetUsersResponse } from '@/types'

export class UserClient {
  // ===== ADMIN USER METHODS =====
  
  /**
   * Get users with enhanced filtering, pagination, and search (Admin only)
   * 
   * @param params - Query parameters for filtering, pagination, and search
   * @returns Promise with users array and pagination metadata
   * 
   * Examples:
   * - getAllUsers() // Get first 20 users
   * - getAllUsers({ filter: 'gifted' }) // Get gifted users only
   * - getAllUsers({ search: 'user@email.com' }) // Search by email
   * - getAllUsers({ offset: 20 }) // Load more (next 20)
   * - getAllUsers({ filter: 'premium', search: 'john', limit: 10 }) // Combined
   */
  static async getAllUsers(params: GetUsersParams = {}): Promise<GetUsersResponse> {
    // Build query string from parameters
    const searchParams = new URLSearchParams()
    
    if (params.filter && params.filter !== 'all') {
      searchParams.append('filter', params.filter)
    }
    
    if (params.limit && params.limit !== 20) {
      searchParams.append('limit', params.limit.toString())
    }
    
    if (params.offset && params.offset > 0) {
      searchParams.append('offset', params.offset.toString())
    }
    
    if (params.search && params.search.trim()) {
      searchParams.append('search', params.search.trim())
    }

    // Build URL with query parameters
    const url = `/api/sudo/users${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch users')
    }

    return response.json()
  }

  /**
   * Delete a user (Admin only)
   */
  static async deleteUser(userId: string): Promise<{ message: string }> {
    const response = await fetch(`/api/sudo/users/${userId}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete user')
    }

    return response.json()
  }

  /**
   * Toggle premium gift for a user (Admin only)
   * Grants 10-day premium if user is free/regular premium
   * Revokes premium gift if user has gift
   */
  static async togglePremiumGift(userId: string): Promise<{ 
    message: string
    action: 'granted' | 'revoked'
    user: User 
  }> {
    const response = await fetch(`/api/sudo/users/${userId}/toggle-premium`, {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to toggle premium gift')
    }

    return response.json()
  }
}
