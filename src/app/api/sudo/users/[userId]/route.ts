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
    // Verify admin access
    const sessionCookie = request.cookies.get('session')?.value
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const adminUserId = await AuthRepository.verifyAdminAccess(sessionCookie)

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

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Authentication required') {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }
      if (error.message === 'Admin access required') {
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        )
      }
      if (error.message === 'Cannot delete admin users') {
        return NextResponse.json(
          { error: 'Cannot delete admin users' },
          { status: 403 }
        )
      }
      if (error.message === 'User not found') {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
