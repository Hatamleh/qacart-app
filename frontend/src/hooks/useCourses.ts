/**
 * Custom Hook for Courses
 * Manages course data fetching and state
 */

import { useState, useEffect, useCallback } from 'react'
import { Course } from '@/types'
import { CourseClient } from '@/clients'

interface UseCoursesResult {
  courses: Course[]
  loading: boolean
  error: string | null
  getAllCourses: () => Promise<void>
  getCourseById: (courseId: string) => Promise<Course>
  createCourse: (courseData: Partial<Course>) => Promise<Course>
  updateCourse: (courseId: string, updateData: Partial<Course>) => Promise<Course>
  deleteCourse: (courseId: string) => Promise<void>
  clearError: () => void
}

export function useCourses(): UseCoursesResult {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const getAllCourses = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { courses } = await CourseClient.getAllCourses()
      setCourses(courses)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses')
    } finally {
      setLoading(false)
    }
  }, [])

  const getCourseById = useCallback(async (courseId: string): Promise<Course> => {
    try {
      setLoading(true)
      setError(null)
      const { course } = await CourseClient.getCourseById(courseId)
      return course
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch course')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const createCourse = useCallback(async (courseData: Partial<Course>): Promise<Course> => {
    try {
      setLoading(true)
      setError(null)
      const { course } = await CourseClient.createCourse(courseData)
      // Refresh courses list
      await getAllCourses()
      return course
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course')
      throw err
    } finally {
      setLoading(false)
    }
  }, [getAllCourses])

  const updateCourse = useCallback(async (courseId: string, updateData: Partial<Course>): Promise<Course> => {
    try {
      setLoading(true)
      setError(null)
      const { course } = await CourseClient.updateCourse(courseId, updateData)
      // Refresh courses list
      await getAllCourses()
      return course
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update course')
      throw err
    } finally {
      setLoading(false)
    }
  }, [getAllCourses])

  const deleteCourse = useCallback(async (courseId: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      await CourseClient.deleteCourse(courseId)
      // Refresh courses list
      await getAllCourses()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete course')
      throw err
    } finally {
      setLoading(false)
    }
  }, [getAllCourses])

  useEffect(() => {
    getAllCourses()
  }, [getAllCourses])

  return {
    courses,
    loading,
    error,
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    clearError,
  }
}
