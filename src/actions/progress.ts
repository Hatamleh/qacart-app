'use server'

import { requireAuth } from '@/lib/auth'
import { ProgressRepository } from '@/repositories'
import { UserProgress } from '@/types'

/**
 * Get user progress for a course
 */
export async function getProgress(courseId: string): Promise<UserProgress> {
  const userId = await requireAuth()

  try {
    const progress = await ProgressRepository.getUserProgress(userId, courseId)
    if (!progress) {
      // Return empty progress if none exists
      return {
        userId,
        courseId,
        completedLessons: [],
        progressPercentage: 0,
        totalLessons: 0,
        lessonProgress: {},
        isCompleted: false,
        lastAccessed: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }
    return progress
  } catch (error) {
    console.error('Error fetching progress:', error)
    throw new Error('Failed to fetch progress')
  }
}

/**
 * Mark lesson as complete
 */
export async function markLessonComplete(
  courseId: string,
  lessonId: string,
  totalLessons: number,
  timeSpent?: number
): Promise<{ progress: UserProgress }> {
  const userId = await requireAuth()

  try {
    const progress = await ProgressRepository.markLessonComplete(
      userId,
      courseId,
      lessonId,
      totalLessons,
      timeSpent
    )

    return { progress }
  } catch (error) {
    console.error('Error marking lesson complete:', error)
    throw new Error('Failed to mark lesson complete')
  }
}
