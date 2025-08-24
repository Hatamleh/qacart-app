'use client'

import { createContext, useContext, useCallback, ReactNode } from 'react'
import { useProgress as useProgressHook } from '@/hooks/useProgress'
import { UserProgress } from '@/types'

/**
 * ProgressContext - Shared progress state for course player
 * Provides centralized progress management across all course player components
 */

interface ProgressContextType {
  // Core state
  progress: UserProgress | null
  loading: boolean
  error: string | null

  // Computed values
  progressPercentage: number
  completedLessonsCount: number
  isCourseCompleted: boolean

  // Actions
  markLessonComplete: (lessonId: string, totalLessons: number, timeSpent?: number) => Promise<void>
  refreshProgress: () => Promise<void>
  isLessonCompleted: (lessonId: string) => boolean

  // User state
  isAuthenticated: boolean
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

interface ProgressProviderProps {
  children: ReactNode
  courseId: string
}

/**
 * ProgressProvider - Wraps course player with shared progress state
 * @param courseId - Course document ID
 * @param children - Course player components
 */
export function ProgressProvider({ children, courseId }: ProgressProviderProps) {
  // Use the existing useProgress hook internally
  const progressState = useProgressHook(courseId)

  // Wrap markLessonComplete to ensure all components get updated
  const markLessonComplete = useCallback(async (
    lessonId: string,
    totalLessons: number,
    timeSpent?: number
  ) => {
    await progressState.markLessonComplete(lessonId, totalLessons, timeSpent)
    // The hook already handles optimistic updates and server sync
    // All components using this context will automatically re-render
  }, [progressState])

  // Wrap refreshProgress
  const refreshProgress = useCallback(async () => {
    await progressState.refreshProgress()
  }, [progressState])

  // Wrap isLessonCompleted
  const isLessonCompleted = useCallback((lessonId: string) => {
    return progressState.isLessonCompleted(lessonId)
  }, [progressState])

  const contextValue: ProgressContextType = {
    // Core state
    progress: progressState.progress,
    loading: progressState.loading,
    error: progressState.error,

    // Computed values
    progressPercentage: progressState.progressPercentage,
    completedLessonsCount: progressState.completedLessonsCount,
    isCourseCompleted: progressState.isCourseCompleted,

    // Actions
    markLessonComplete,
    refreshProgress,
    isLessonCompleted,

    // User state
    isAuthenticated: progressState.isAuthenticated
  }

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  )
}

/**
 * useProgressContext - Hook to access shared progress state
 * Must be used within a ProgressProvider
 */
export function useProgressContext(): ProgressContextType {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgressContext must be used within a ProgressProvider')
  }
  return context
}
