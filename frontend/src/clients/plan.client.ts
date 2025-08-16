import { Plan } from '@/types'
import { planData } from '@/data'
import { cache } from 'react'

/**
 * PlanClient - Handles all plan and subscription-related data access
 * Currently reads from mock data, will connect to Firebase later
 */
export class PlanClient {
  /**
   * Fetch plan data (currently from mock data, will be Firebase later)
   * Cached automatically by React - no duplicate calls within same request
   */
  static getPlan = cache(async (): Promise<Plan> => {
    // Simulate async operation for future Firebase integration
    await new Promise(resolve => setTimeout(resolve, 50))
    return planData
  })

  // ===== FUTURE SUBSCRIPTION OPERATIONS =====
  // These will be implemented when we add Firebase

  /**
   * Create subscription (Future implementation)
   */
  static async createSubscription(pricingOptionId: string, userEmail: string) {
    // TODO: Implement with Firebase/Stripe integration
    await new Promise(resolve => setTimeout(resolve, 100))
    console.log('Creating subscription:', { pricingOptionId, userEmail })
    throw new Error('Subscription creation not implemented yet')
  }

  /**
   * Check user subscription status (Future implementation)
   */
  static async getUserSubscription(userId: string) {
    // TODO: Implement with Firebase integration
    await new Promise(resolve => setTimeout(resolve, 100))
    console.log('Getting user subscription:', userId)
    return null // No active subscription for now
  }
}
