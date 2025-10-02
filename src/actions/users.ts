'use server'

import { revalidatePath } from 'next/cache'
import { admin } from '@/firebase/admin'
import { requireAdmin } from '@/lib/auth'
import { User, GetUsersParams, GetUsersResponse, GiftDetails } from '@/types'
import { firestore } from 'firebase-admin'

/**
 * Apply status filter to user array
 */
function applyStatusFilter(users: User[], filter: string): User[] {
  switch (filter) {
    case 'premium':
      return users.filter(user => user.subscription.status === 'premium')
    case 'free':
      return users.filter(user => user.subscription.status === 'free')
    case 'gifted':
      return users.filter(user =>
        user.subscription.status === 'premium' &&
        user.subscription.giftDetails != null
      )
    case 'all':
    default:
      return users
  }
}

/**
 * Get all users with filtering and pagination (Admin only)
 */
export async function getUsers(params: GetUsersParams = {}): Promise<GetUsersResponse> {
  await requireAdmin()

  const {
    filter = 'all',
    limit = 20,
    offset = 0,
    search = ''
  } = params

  // Get all users from Firestore
  const query = admin.firestore().collection('users')
  const allUsersSnapshot = await query.get()

  const allUsers = allUsersSnapshot.docs.map(doc => {
    const userData = doc.data() as User
    return {
      ...userData,
      id: userData.id || doc.id
    }
  })

  // Apply search filter if provided
  let users = allUsers
  if (search.trim()) {
    const searchTerm = search.trim().toLowerCase()
    users = allUsers.filter(user => {
      const emailMatch = user.email.toLowerCase().includes(searchTerm)
      const idMatch = user.id.toLowerCase().includes(searchTerm)
      return emailMatch || idMatch
    })
  }

  // Apply status filter
  users = applyStatusFilter(users, filter)

  // Apply pagination
  const total = users.length
  const paginatedUsers = users.slice(offset, offset + limit)
  const hasMore = offset + limit < total

  return {
    users: paginatedUsers,
    total,
    hasMore,
    currentFilter: filter,
    currentSearch: search
  }
}

/**
 * Delete user (Admin only)
 */
export async function deleteUser(userId: string): Promise<void> {
  await requireAdmin()

  // Check if the target user is an admin before deletion
  const userDoc = await admin.firestore()
    .collection('users')
    .doc(userId)
    .get()

  if (!userDoc.exists) {
    throw new Error('User not found')
  }

  const userData = userDoc.data()

  // Prevent deletion of admin users
  if (userData?.role === 'sudo') {
    throw new Error('Cannot delete admin users')
  }

  // Delete from Firebase Auth
  await admin.auth().deleteUser(userId)

  // Delete from Firestore
  await admin.firestore()
    .collection('users')
    .doc(userId)
    .delete()

  // Also delete user progress data
  const progressSnapshot = await admin.firestore()
    .collection('progress')
    .where('userId', '==', userId)
    .get()

  const batch = admin.firestore().batch()
  progressSnapshot.docs.forEach(doc => {
    batch.delete(doc.ref)
  })
  await batch.commit()

  // Revalidate users page
  revalidatePath('/sudo/users')
}

/**
 * Toggle premium gift for user (Admin only)
 */
export async function togglePremiumGift(userId: string): Promise<{
  action: 'granted' | 'revoked'
  user: User
}> {
  await requireAdmin()

  // Get current user to check status
  const userDoc = await admin.firestore()
    .collection('users')
    .doc(userId)
    .get()

  if (!userDoc.exists) {
    throw new Error('User not found')
  }

  const currentUser = userDoc.data() as User
  let action: 'granted' | 'revoked'

  // Check if user currently has a gift
  const hasGift = currentUser.subscription.giftDetails != null

  if (hasGift) {
    // User has gift -> Revoke it (make free)
    await admin.firestore()
      .collection('users')
      .doc(userId)
      .update({
        'subscription.status': 'free',
        'subscription.plan': firestore.FieldValue.delete(),
        'subscription.isActive': false,
        'subscription.nextBillingDate': firestore.FieldValue.delete(),
        'subscription.giftDetails': firestore.FieldValue.delete()
      })
    action = 'revoked'
  } else {
    // User doesn't have gift -> Grant 10-day gift
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000) // +10 days

    const giftDetails: GiftDetails = {
      grantedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      type: 'admin_gift'
    }

    const updatedSubscription = {
      status: 'premium',
      plan: 'monthly',
      isActive: true,
      nextBillingDate: expiresAt.toISOString(),
      giftDetails
    }

    await admin.firestore()
      .collection('users')
      .doc(userId)
      .update({ subscription: updatedSubscription })

    action = 'granted'
  }

  // Get updated user
  const updatedUserDoc = await admin.firestore()
    .collection('users')
    .doc(userId)
    .get()

  if (!updatedUserDoc.exists) {
    throw new Error('Failed to retrieve updated user')
  }

  const updatedUser = updatedUserDoc.data() as User

  // Revalidate users page
  revalidatePath('/sudo/users')

  return { action, user: updatedUser }
}
