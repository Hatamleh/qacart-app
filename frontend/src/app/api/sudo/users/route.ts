import { NextRequest, NextResponse } from 'next/server'
import { UserRepository, AuthRepository } from '@/repositories'

/**
 * GET /api/sudo/users
 * Get all users (Admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const sessionCookie = request.cookies.get('session')?.value
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = await AuthRepository.verifySession(sessionCookie)
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    // TODO: Check if user is admin
    // For now, allow any authenticated user

    const users = await UserRepository.getAllUsers()
    
    return NextResponse.json({ 
      users,
      count: users.length 
    })

  } catch (error) {
    console.error('Error fetching users for admin:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
