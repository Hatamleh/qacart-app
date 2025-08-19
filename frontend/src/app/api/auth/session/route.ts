import { NextRequest, NextResponse } from 'next/server'
import { AuthRepository, UserRepository } from '@/repositories'
import { admin } from '@/firebase/admin'

/**
 * POST /api/auth/session
 * Create session from Firebase ID token
 */
export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()

    if (!idToken) {
      return NextResponse.json(
        { error: 'ID token is required' },
        { status: 400 }
      )
    }

    // Verify token and get user ID
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const userId = decodedToken.uid

    // Create session cookie
    const sessionCookie = await AuthRepository.createSessionCookie(idToken)

    // Get user data
    let user = await UserRepository.getUserById(userId)

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check and clean expired gifts
    user = await UserRepository.checkAndCleanExpiredGift(user)

    // Create response with session cookie
    const response = NextResponse.json({ 
      user,
      message: 'Session created successfully' 
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

