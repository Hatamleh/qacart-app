import { NextRequest, NextResponse } from 'next/server'
import { AuthRepository } from '@/repositories'

/**
 * POST /api/auth/logout
 * Clear session and revoke Firebase tokens
 */
export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session')?.value

    // If there's a session cookie, revoke it from Firebase
    if (sessionCookie) {
      try {
        await AuthRepository.revokeSession(sessionCookie)
        console.log('✅ Session revoked from Firebase')
      } catch (error) {
        // Log but don't fail - cookie might be invalid
        console.error('Error revoking session:', error)
      }
    }

    // Create response to clear cookie
    const response = NextResponse.json({ 
      message: 'Logged out successfully' 
    })

    // Clear session cookie
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    )
  }
}