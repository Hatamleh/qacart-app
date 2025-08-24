'use client'

import { useState, useEffect, useCallback } from 'react'
import { UserProgress } from '@/types'
import { ProgressClient } from '@/clients'
import { useAuth } from '@/contexts/AuthContext'

/**
 * useProgress Hook - Centralized progress state management
 * Provides progress data and actions for course player components
 * 
 * @param courseId - Course document ID
 * @returns Progress state and actions
 */
export function useProgress(courseId: string) {
  const { user } = useAuth()
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch user's progress for the course
  const fetchProgress = useCallback(async () => {
    if (!user || !courseId) {
      setProgress(null)
      setLoading(false)
      setError(null)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const userProgress = await ProgressClient.getProgress(courseId)
      setProgress(userProgress)
    } catch (err) {
      console.error('Error fetching progress:', err)
      const errorMessage = err instanceof Error ? err.message : 'فشل في جلب بيانات التقدم'
      setError(errorMessage)
      setProgress(null)
    } finally {
      setLoading(false)
    }
  }, [courseId, user])

  // Initial fetch and refetch when dependencies change
  useEffect(() => {
    fetchProgress()
  }, [fetchProgress])

  // Mark a lesson as complete
  const markLessonComplete = useCallback(async (
    lessonId: string, 
    totalLessons: number,
    timeSpent?: number
  ): Promise<void> => {
    if (!user || !courseId) {
      throw new Error('يجب تسجيل الدخول أولاً')
    }

    try {
      setError(null)
      
      // Optimistic update - immediately add lesson to completed list
      if (progress && !progress.completedLessons.includes(lessonId)) {
        const optimisticProgress: UserProgress = {
          ...progress,
          completedLessons: [...progress.completedLessons, lessonId],
          progressPercentage: Math.round(((progress.completedLessons.length + 1) / totalLessons) * 100),
          isCompleted: (progress.completedLessons.length + 1) === totalLessons,
          lastAccessed: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        setProgress(optimisticProgress)
      }

      // Make API call to persist the change
      const response = await ProgressClient.markLessonComplete(
        courseId,
        lessonId,
        totalLessons,
        timeSpent
      )

      // Update with server response
      setProgress(response.progress)

    } catch (err) {
      console.error('Error marking lesson complete:', err)
      const errorMessage = err instanceof Error ? err.message : 'فشل في تسجيل إكمال الدرس'
      setError(errorMessage)
      
      // Rollback optimistic update on error
      await fetchProgress()
      throw err
    }
  }, [user, courseId, progress, fetchProgress])

  // Check if a specific lesson is completed
  const isLessonCompleted = useCallback((lessonId: string): boolean => {
    return progress ? progress.completedLessons.includes(lessonId) : false
  }, [progress])

  // Get progress percentage
  const progressPercentage = progress ? progress.progressPercentage : 0

  // Get completed lessons count
  const completedLessonsCount = progress ? progress.completedLessons.length : 0

  // Check if course is completed
  const isCourseCompleted = progress ? progress.isCompleted : false

  // Refresh progress data
  const refreshProgress = useCallback(async (): Promise<void> => {
    await fetchProgress()
  }, [fetchProgress])

  return {
    // Core state
    progress,
    loading,
    error,

    // Computed values
    progressPercentage,
    completedLessonsCount,
    isCourseCompleted,

    // Actions
    markLessonComplete,
    refreshProgress,
    isLessonCompleted,

    // User state
    isAuthenticated: !!user
  }
}
