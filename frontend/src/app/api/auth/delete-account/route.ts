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
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    )
  }
}