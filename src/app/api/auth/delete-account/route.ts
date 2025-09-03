import { NextResponse } from 'next/server'
import { UserRepository } from '@/repositories'

/**
 * DELETE /api/auth/delete-account
 * Delete current user account and clear session
 */
export async function DELETE() {
  try {
    // Delete the user account (handles auth verification internally)
    await UserRepository.deleteOwnAccount()

    // Clear session cookie
    const response = NextResponse.json({ 
      message: 'Account deleted successfully' 
    })
    
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0), // Expire immediately
    })

    return response
  } catch (error) {
    console.error('Error deleting account:', error)
    
    // Handle specific admin protection error
    if (error instanceof Error && error.message.includes('Admin users cannot delete')) {
      return NextResponse.json(
        { error: 'Admin users cannot delete their own accounts' },
        { status: 403 }
      )
    }

    // Handle authentication errors
    if (error instanceof Error && error.message.includes('not authenticated')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Generic error
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    )
  }
}