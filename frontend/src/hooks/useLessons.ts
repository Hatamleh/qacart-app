/**
 * Custom Hook for Lessons
 * Manages lesson data fetching and state for a specific course
 */

import { useState, useEffect, useCallback } from 'react'
import { Lesson } from '@/types'
import { LessonClient } from '@/clients'

interface UseLessonsResult {
  lessons: Lesson[]
  loading: boolean
  error: string | null
  getLessons: (courseId: string) => Promise<void>
  getLessonById: (courseId: string, lessonId: string) => Promise<Lesson>
  createLesson: (courseId: string, lessonData: Partial<Lesson>) => Promise<Lesson>
  updateLesson: (courseId: string, lessonId: string, updateData: Partial<Lesson>) => Promise<Lesson>
  deleteLesson: (courseId: string, lessonId: string) => Promise<void>
  reorderLessons: (courseId: string, lessonIds: string[]) => Promise<void>
  clearError: () => void
}

export function useLessons(courseId: string): UseLessonsResult {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const getLessons = useCallback(async (targetCourseId: string) => {
    try {
      setLoading(true)
      setError(null)
      const { lessons } = await LessonClient.getLessons(targetCourseId)
      setLessons(lessons)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lessons')
    } finally {
      setLoading(false)
    }
  }, [])

  const getLessonById = useCallback(async (courseId: string, lessonId: string): Promise<Lesson> => {
    try {
      setLoading(true)
      setError(null)
      const { lesson } = await LessonClient.getLessonById(courseId, lessonId)
      return lesson
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lesson')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const createLesson = useCallback(async (courseId: string, lessonData: Partial<Lesson>): Promise<Lesson> => {
    try {
      setLoading(true)
      setError(null)
      const { lesson } = await LessonClient.createLesson(courseId, lessonData)
      // Refresh lessons list
      await getLessons(courseId)
      return lesson
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lesson')
      throw err
    } finally {
      setLoading(false)
    }
  }, [getLessons])

  const updateLesson = useCallback(async (courseId: string, lessonId: string, updateData: Partial<Lesson>): Promise<Lesson> => {
    try {
      setLoading(true)
      setError(null)
      const { lesson } = await LessonClient.updateLesson(courseId, lessonId, updateData)
      // Refresh lessons list
      await getLessons(courseId)
      return lesson
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lesson')
      throw err
    } finally {
      setLoading(false)
    }
  }, [getLessons])

  const deleteLesson = useCallback(async (courseId: string, lessonId: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      await LessonClient.deleteLesson(courseId, lessonId)
      // Refresh lessons list
      await getLessons(courseId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete lesson')
      throw err
    } finally {
      setLoading(false)
    }
  }, [getLessons])

  const reorderLessons = useCallback(async (courseId: string, lessonIds: string[]): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      await LessonClient.reorderLessons(courseId, lessonIds)
      // Refresh lessons list
      await getLessons(courseId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder lessons')
      throw err
    } finally {
      setLoading(false)
    }
  }, [getLessons])

  useEffect(() => {
    if (courseId) {
      getLessons(courseId)
    }
  }, [courseId, getLessons])

  return {
    lessons,
    loading,
    error,
    getLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
    reorderLessons,
    clearError,
  }
}
