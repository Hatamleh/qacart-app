import { NextRequest, NextResponse } from 'next/server'
import { UserRepository, AuthRepository } from '@/repositories'

interface RouteParams {
  params: Promise<{
    userId: string
  }>
}

/**
 * DELETE /api/sudo/users/[userId]
 * Delete a user (Admin only)
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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
    
    // Prevent admin from deleting themselves
    if (adminUserId === userId) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    // Delete the user
    await UserRepository.deleteUserByAdmin(userId)
    
    return NextResponse.json({ 
      message: 'User deleted successfully' 
    })

  } catch {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
