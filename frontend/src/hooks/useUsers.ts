/**
 * Custom Hook for Users (Admin only)
 * Manages user data fetching and state for admin operations
 */

import { useState, useEffect, useCallback } from 'react'
import { User } from '@/types'
import { UserClient } from '@/clients'

interface UseUsersResult {
  users: User[]
  loading: boolean
  error: string | null
  getAllUsers: () => Promise<void>
  deleteUser: (userId: string) => Promise<void>
  togglePremiumGift: (userId: string) => Promise<{ action: 'granted' | 'revoked'; user: User }>
  clearError: () => void
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const getAllUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { users } = await UserClient.getAllUsers()
      setUsers(users)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteUser = useCallback(async (userId: string) => {
    try {
      setError(null)
      await UserClient.deleteUser(userId)
      // Refresh users list after deletion
      await getAllUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user')
      throw err
    }
  }, [getAllUsers])

  const togglePremiumGift = useCallback(async (userId: string): Promise<{ action: 'granted' | 'revoked'; user: User }> => {
    try {
      setError(null)
      const result = await UserClient.togglePremiumGift(userId)
      
      // Update the specific user in the local state (optimistic update)
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? result.user : user
        )
      )
      
      return { action: result.action, user: result.user }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle premium gift')
      throw err
    }
  }, [])

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  return {
    users,
    loading,
    error,
    getAllUsers,
    deleteUser,
    togglePremiumGift,
    clearError,
  }
}
