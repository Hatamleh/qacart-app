/**
 * Custom Hook for Plans
 * Manages plan data fetching and state
 */

import { useState, useEffect, useCallback } from 'react'
import { Plan } from '@/types'
import { PlanClient } from '@/clients'

interface UsePlansResult {
  plan: Plan | null
  loading: boolean
  error: string | null
  getPlan: () => Promise<void>
  clearError: () => void
}

export function usePlans(): UsePlansResult {
  const [plan, setPlan] = useState<Plan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const getPlan = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { plan } = await PlanClient.getPlan()
      setPlan(plan)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch plan')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getPlan()
  }, [getPlan])

  return {
    plan,
    loading,
    error,
    getPlan,
    clearError,
  }
}
