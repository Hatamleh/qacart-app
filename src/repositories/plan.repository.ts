import {Plan} from '@/types'
import {cache} from 'react'
import {admin} from '@/firebase/admin'

/**
 * PlanRepository - Data access layer for plan and subscription operations
 * Used by API routes to interact with plan data
 * Fetches from Firebase Firestore
 */
export class PlanRepository {
  /**
   * Fetch plan data from Firestore
   * Cached automatically by React - no duplicate calls within same request
   */
    static getPlan = cache(async (): Promise<Plan> => {
    const plansSnapshot = await admin.firestore().collection('plans').get()

    if (plansSnapshot.empty) {
      throw new Error('No plan documents found in Firestore')
    }

    // Find premium-plan or use first document as fallback
    const planDoc = plansSnapshot.docs.find(doc => doc.id === 'premium-plan') || plansSnapshot.docs[0]

    return {
      id: planDoc.id,
      ...planDoc.data() as Omit<Plan, 'id'>
    }
  })

  // ===== FUTURE SUBSCRIPTION OPERATIONS =====
  // These will be implemented when we add Firebase

  /**
   * Create subscription (Future implementation)
   */
  static async createSubscription(pricingOptionId: string, userEmail: string) {
    await new Promise(resolve => setTimeout(resolve, 100))
    console.log('Creating subscription:', { pricingOptionId, userEmail })
    throw new Error('Subscription creation not implemented yet')
  }

}
