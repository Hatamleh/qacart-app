import { NextRequest, NextResponse } from 'next/server'
import { AuthClient, UserClient } from '@/clients'
import { admin } from '@/firebase/admin'

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()

    if (!idToken) {
      return NextResponse.json(
        { error: 'ID token is required' },
        { status: 400 }
      )
    }

    // Verify the ID token first to get user ID
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const userId = decodedToken.uid
      console.log(userId)

    // Create session cookie using AuthClient
    const sessionCookie = await AuthClient.createSessionCookie(idToken)

    // Get user data directly by ID (avoiding circular dependency)
    const user = await UserClient.getUserById(userId)

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create response with user data
    const response = NextResponse.json({
      success: true,
      user: user
    })

    // Set session cookie
    response.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 5, // 5 days
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}
