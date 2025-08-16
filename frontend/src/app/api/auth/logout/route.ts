import { NextResponse } from 'next/server'
import { AuthClient } from '@/clients'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')?.value

    // If there's a session cookie, revoke it from Firebase
    if (sessionCookie) {
      try {
        await AuthClient.revokeSession(sessionCookie)
      } catch (error) {
        // Log but don't fail - cookie might be invalid
        console.error('Error revoking session:', error)
      }
    }

    // Create response
    const response = NextResponse.json({
      success: true,
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
