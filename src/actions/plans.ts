'use server'

import { cache } from 'react'
import { admin } from '@/firebase/admin'
import { Plan } from '@/types'

/**
 * Get premium plan (public)
 * Can be called from Server Components or Client Components
 */
export const getPlan = cache(async (): Promise<Plan> => {
  try {
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
  } catch (error) {
    console.error('Error fetching plan:', error)
    throw new Error('Failed to fetch plan')
  }
})
