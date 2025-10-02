'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { admin } from '@/firebase/admin'
import { firestore } from 'firebase-admin'
import { User } from '@/types'
import { isDateExpired } from '@/lib'

/**
 * Check and clean up expired gift subscriptions
 */
async function checkAndCleanExpiredGift(user: User): Promise<User> {
  // Check if user has a gift
  if (!user.subscription.giftDetails?.expiresAt) {
    return user
  }

  // Check if gift is expired
  if (isDateExpired(user.subscription.giftDetails.expiresAt)) {
    console.log(`🧹 Cleaning expired gift for user ${user.id}`)

    try {
      // Update user in database to remove expired gift
      await admin.firestore()
        .collection('users')
        .doc(user.id)
        .update({
          'subscription.status': 'free',
          'subscription.plan': firestore.FieldValue.delete(),
          'subscription.isActive': false,
          'subscription.nextBillingDate': firestore.FieldValue.delete(),
          'subscription.giftDetails': firestore.FieldValue.delete()
        })

      // Return updated user object
      return {
        ...user,
        subscription: {
          status: 'free',
          isActive: false
        }
      }
    } catch {
      return user
    }
  }

  return user
}

/**
 * Get user by ID
 */
async function getUserById(userId: string): Promise<User | null> {
  try {
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(userId)
      .get()

    if (!userDoc.exists) {
      // If user is authenticated but no profile exists, create one
      const decodedClaims = await admin.auth().getUser(userId)

      const newUser: User = {
        id: userId,
        email: decodedClaims.email || '',
        role: 'user',
        subscription: {
          status: 'free',
          isActive: false
        },
        createdAt: new Date().toISOString()
      }

      // Save to Firestore
      await admin.firestore()
        .collection('users')
        .doc(userId)
        .set(newUser)

      return newUser
    }

    return userDoc.data() as User
  } catch {
    return null
  }
}

/**
 * Create session from Firebase ID token
 * Called after client-side Firebase authentication
 */
export async function createSession(idToken: string): Promise<User> {
  if (!idToken) {
    throw new Error('ID token is required')
  }

  // Verify token and get user ID
  const decodedToken = await admin.auth().verifyIdToken(idToken)
  const userId = decodedToken.uid

  // Create session cookie (5 days)
  const expiresIn = 60 * 60 * 24 * 5 * 1000
  const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn })

  // Get user data
  let user = await getUserById(userId)

  if (!user) {
    throw new Error('User not found')
  }

  // Check and clean expired gifts
  user = await checkAndCleanExpiredGift(user)

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
}

/**
 * Logout user and clear session
 */
export async function logoutUser(): Promise<void> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')?.value

  // Revoke session from Firebase
  if (sessionCookie) {
    try {
      const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie)
      await admin.auth().revokeRefreshTokens(decodedClaims.uid)
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
}

/**
 * Delete current user account
 * Requires authentication
 */
export async function deleteAccount(): Promise<void> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')?.value

  if (!sessionCookie) {
    throw new Error('Authentication required')
  }

  // Verify session and get user ID
  const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true)
  const userId = decodedClaims.uid

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
}
