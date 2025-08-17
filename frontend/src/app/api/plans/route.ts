import { NextResponse } from 'next/server'
import { PlanRepository } from '@/repositories'

/**
 * GET /api/plans
 * Get all available plans
 */
export async function GET() {
  try {
    const plan = await PlanRepository.getPlan()
    
    return NextResponse.json({ plan })

  } catch (error) {
    console.error('Error fetching plans:', error)
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    )
  }
}
