/**
 * Custom Hook for Users (Admin only)
 * Manages user data fetching with enhanced filtering, search, and pagination
 */

import { useState, useEffect, useCallback } from 'react'
import { User, GetUsersParams } from '@/types'
import { getUsers, deleteUser as deleteUserAction, togglePremiumGift as togglePremiumGiftAction } from '@/actions'

interface UseUsersResult {
  // Data
  users: User[]
  total: number
  hasMore: boolean

  // State
  loading: boolean
  loadingMore: boolean
  error: string | null
  currentFilter: string
  currentSearch: string

  // Actions
  fetchUsers: (params?: GetUsersParams) => Promise<void>
  loadMore: () => Promise<void>
  setFilter: (filter: 'all' | 'premium' | 'free' | 'gifted') => void
  setSearch: (search: string) => void
  deleteUser: (userId: string) => Promise<void>
  togglePremiumGift: (userId: string) => Promise<{ action: 'granted' | 'revoked'; user: User }>
  clearError: () => void
  refresh: () => Promise<void>
}

export function useUsers(): UseUsersResult {
  // Data state
  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  // UI state
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Filter and search state
  const [currentFilter, setCurrentFilter] = useState<'all' | 'premium' | 'free' | 'gifted'>('all')
  const [currentSearch, setCurrentSearch] = useState('')

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Fetch users with parameters
  const fetchUsers = useCallback(async (params: GetUsersParams = {}) => {
    try {
      const isLoadMore = (params.offset || 0) > 0

      if (isLoadMore) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      setError(null)

      // Use current state values as defaults
      const finalParams: GetUsersParams = {
        filter: currentFilter,
        search: currentSearch,
        limit: 20,
        offset: 0,
        ...params // Override with provided params
      }

      const result = await getUsers(finalParams)

      if (isLoadMore) {
        // Append to existing users
        setUsers(prevUsers => [...prevUsers, ...result.users])
      } else {
        // Replace users
        setUsers(result.users)
      }

      setTotal(result.total)
      setHasMore(result.hasMore)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [currentFilter, currentSearch])

  // Load more users (pagination)
  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore) return

    await fetchUsers({
      offset: users.length
    })
  }, [fetchUsers, hasMore, loadingMore, users.length])

  // Set filter and refresh
  const setFilter = useCallback((filter: 'all' | 'premium' | 'free' | 'gifted') => {
    setCurrentFilter(filter)
    // Reset to first page when filter changes
    fetchUsers({ filter, offset: 0 })
  }, [fetchUsers])

  // Set search and refresh
  const setSearch = useCallback((search: string) => {
    setCurrentSearch(search)
    // Reset to first page when search changes
    fetchUsers({ search, offset: 0 })
  }, [fetchUsers])

  // Refresh current view
  const refresh = useCallback(async () => {
    await fetchUsers({ offset: 0 })
  }, [fetchUsers])

  // Delete user
  const deleteUser = useCallback(async (userId: string) => {
    try {
      setError(null)
      await deleteUserAction(userId)

      // Remove user from local state and refresh if needed
      setUsers(prevUsers => {
        const newUsers = prevUsers.filter(user => user.id !== userId)
        // If we have less than 10 users and more are available, load more
        if (newUsers.length < 10 && hasMore) {
          loadMore()
        }
        return newUsers
      })

      // Update total count
      setTotal(prev => prev - 1)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user')
      throw err
    }
  }, [hasMore, loadMore])

  // Toggle premium gift
  const togglePremiumGift = useCallback(async (userId: string): Promise<{ action: 'granted' | 'revoked'; user: User }> => {
    try {
      setError(null)
      const result = await togglePremiumGiftAction(userId)

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

  // Initial load
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers]) // Include fetchUsers dependency

  return {
    // Data
    users,
    total,
    hasMore,

    // State
    loading,
    loadingMore,
    error,
    currentFilter,
    currentSearch,

    // Actions
    fetchUsers,
    loadMore,
    setFilter,
    setSearch,
    deleteUser,
    togglePremiumGift,
    clearError,
    refresh,
  }
}
