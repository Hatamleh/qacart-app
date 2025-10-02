import { cookies } from 'next/headers'
import { admin } from '@/firebase/admin'
import { User } from '@/types'

/**
 * Auth helper functions for Server Actions and Server Components
 * Simplified wrappers around AuthRepository methods
 */

/**
 * Get current authenticated user ID
 * Returns null if not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')?.value

    if (!sessionCookie) {
      return null
    }

    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true)
    return decodedClaims.uid
  } catch (error) {
    console.error('Error getting current user ID:', error)
    return null
  }
}

/**
 * Get current authenticated user with data
 * Returns null if not authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return null
    }

    const userDoc = await admin.firestore().collection('users').doc(userId).get()
    if (!userDoc.exists) {
      return null
    }

    return { id: userDoc.id, ...userDoc.data() } as User
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Require authentication - throws if not authenticated
 * Use this at the start of protected Server Actions
 */
export async function requireAuth(): Promise<string> {
  const userId = await getCurrentUserId()
  if (!userId) {
    throw new Error('Authentication required')
  }
  return userId
}

/**
 * Require admin access - throws if not admin
 * Use this at the start of admin-only Server Actions
 */
export async function requireAdmin(): Promise<string> {
  const userId = await requireAuth()

  const userDoc = await admin.firestore().collection('users').doc(userId).get()
  if (!userDoc.exists) {
    throw new Error('User not found')
  }

  const user = userDoc.data()
  if (user?.role !== 'sudo') {
    throw new Error('Admin access required')
  }

  return userId
}
