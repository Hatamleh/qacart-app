'use server'

import { revalidatePath } from 'next/cache'
import { UserRepository } from '@/repositories'
import { requireAdmin } from '@/lib/auth'
import { User, GetUsersParams, GetUsersResponse } from '@/types'

/**
 * Get all users with filtering and pagination (Admin only)
 */
export async function getUsers(params: GetUsersParams = {}): Promise<GetUsersResponse> {
  await requireAdmin()

  try {
    return await UserRepository.getAllUsers(params)
  } catch (error) {
    console.error('Error fetching users:', error)
    throw new Error('Failed to fetch users')
  }
}

/**
 * Delete user (Admin only)
 */
export async function deleteUser(userId: string): Promise<void> {
  await requireAdmin()

  try {
    await UserRepository.deleteUserByAdmin(userId)

    // Revalidate users page
    revalidatePath('/sudo/users')

  } catch (error) {
    console.error('Error deleting user:', error)
    throw new Error('Failed to delete user')
  }
}

/**
 * Toggle premium gift for user (Admin only)
 */
export async function togglePremiumGift(userId: string): Promise<{
  action: 'granted' | 'revoked'
  user: User
}> {
  await requireAdmin()

  try {
    const result = await UserRepository.togglePremiumGift(userId)

    // Revalidate users page
    revalidatePath('/sudo/users')

    return result

  } catch (error) {
    console.error('Error toggling premium gift:', error)
    throw new Error('Failed to toggle premium gift')
  }
}
