import { NextRequest, NextResponse } from 'next/server'
import { UserRepository, AuthRepository } from '@/repositories'

interface RouteParams {
  params: Promise<{
    userId: string
  }>
}

/**
 * POST /api/sudo/users/[userId]/toggle-premium
 * Toggle premium gift for a user (Admin only)
 * Grants 10-day premium if user is free/regular premium
 * Revokes premium gift if user has gift
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const sessionCookie = request.cookies.get('session')?.value
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const adminUserId = await AuthRepository.verifySession(sessionCookie)
    if (!adminUserId) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    // TODO: Check if user is admin
    // For now, allow any authenticated user

    const { userId } = await params
    
    // Prevent admin from modifying their own subscription
    if (adminUserId === userId) {
      return NextResponse.json(
        { error: 'Cannot modify your own subscription' },
        { status: 400 }
      )
    }

    // Toggle premium gift
    const result = await UserRepository.togglePremiumGift(userId)
    
    return NextResponse.json({ 
      message: `Premium ${result.action} successfully`,
      action: result.action,
      user: result.user
    })

  } catch (error) {
    console.error('Error toggling premium gift:', error)
    
    if (error instanceof Error && error.message === 'User not found') {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to toggle premium gift' },
      { status: 500 }
    )
  }
}
