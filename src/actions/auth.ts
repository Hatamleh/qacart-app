'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { admin } from '@/firebase/admin'
import { AuthRepository, UserRepository } from '@/repositories'
import { User } from '@/types'

/**
 * Create session from Firebase ID token
 * Called after client-side Firebase authentication
 */
export async function createSession(idToken: string): Promise<User> {
  try {
    if (!idToken) {
      throw new Error('ID token is required')
    }

    // Verify token and get user ID
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const userId = decodedToken.uid

    // Create session cookie
    const sessionCookie = await AuthRepository.createSessionCookie(idToken)

    // Get user data
    let user = await UserRepository.getUserById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    // Check and clean expired gifts
    user = await UserRepository.checkAndCleanExpiredGift(user)

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 5, // 5 days
      path: '/'
    })

    return user

  } catch (error) {
    console.error('Session creation error:', error)
    throw new Error('Failed to create session')
  }
}

/**
 * Logout user and clear session
 */
export async function logoutUser(): Promise<void> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')?.value

    // Revoke session from Firebase
    if (sessionCookie) {
      try {
        await AuthRepository.revokeSession(sessionCookie)
      } catch (error) {
        console.error('Error revoking session:', error)
      }
    }

    // Clear session cookie
    cookieStore.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/'
    })

  } catch (error) {
    console.error('Logout error:', error)
    throw new Error('Failed to logout')
  }
}

/**
 * Delete current user account
 * Requires authentication
 */
export async function deleteAccount(): Promise<void> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')?.value

    if (!sessionCookie) {
      throw new Error('Authentication required')
    }

    // Verify session and get user ID
    const userId = await AuthRepository.verifySession(sessionCookie)
    if (!userId) {
      throw new Error('Invalid session')
    }

    // Delete user from Firestore
    await admin.firestore().collection('users').doc(userId).delete()

    // Delete user from Firebase Auth
    await admin.auth().deleteUser(userId)

    // Clear session cookie
    cookieStore.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    })

    // Redirect to home
    redirect('/')

  } catch (error) {
    console.error('Delete account error:', error)
    throw new Error('Failed to delete account')
  }
}
