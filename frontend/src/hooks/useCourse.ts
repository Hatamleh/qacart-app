/**
 * Custom Hook for Single Course
 * Manages individual course data fetching and state
 */

import { useState, useEffect, useCallback } from 'react'
import { Course } from '@/types'
import { CourseClient } from '@/clients'

interface UseCourseResult {
  course: Course | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  clearError: () => void
}

export function useCourse(courseId: string): UseCourseResult {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const fetchCourse = useCallback(async () => {
    if (!courseId) return

    try {
      setLoading(true)
      setError(null)
      const { course } = await CourseClient.getCourseById(courseId)
      setCourse(course)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch course')
      setCourse(null)
    } finally {
      setLoading(false)
    }
  }, [courseId])

  const refetch = useCallback(async () => {
    await fetchCourse()
  }, [fetchCourse])

  useEffect(() => {
    fetchCourse()
  }, [fetchCourse])

  return {
    course,
    loading,
    error,
    refetch,
    clearError,
  }
}
