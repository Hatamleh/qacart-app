'use server'

import { PlanRepository } from '@/repositories'
import { Plan } from '@/types'

/**
 * Get premium plan (public)
 * Can be called from Server Components or Client Components
 */
export async function getPlan(): Promise<Plan> {
  try {
    return await PlanRepository.getPlan()
  } catch (error) {
    console.error('Error fetching plan:', error)
    throw new Error('Failed to fetch plan')
  }
}
