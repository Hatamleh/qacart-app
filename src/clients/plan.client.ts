/**
 * Plan Client - Plan operations
 * Handles client-side requests to plan API routes
 */

import { Plan } from '@/types'

export class PlanClient {
  /**
   * Get available plan information (public)
   */
  static async getPlan(): Promise<{ plan: Plan }> {
    const response = await fetch('/api/plans', {
      method: 'GET',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch plan')
    }

    return response.json()
  }
}
