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

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  return {
    users,
    loading,
    error,
    getAllUsers,
    clearError,
  }
}
