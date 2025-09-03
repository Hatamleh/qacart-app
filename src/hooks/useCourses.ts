/**
 * Custom Hook for Courses
 * Manages course data fetching and state
 */

import { useState, useEffect, useCallback } from 'react'
import { Course } from '@/types'
import { CourseClient } from '@/clients'

interface UseCoursesResult {
  // Multiple courses (when courseId is not provided)
  courses: Course[]
  
  // Single course (when courseId is provided)
  course: Course | null
  
  // Common state
  loading: boolean
  error: string | null
  
  // Methods
  getAllCourses: () => Promise<void>
  getCourseById: (courseId: string) => Promise<Course>
  refetch: () => Promise<void> // Refetch current data (courses or single course)
  createCourse: (courseData: Partial<Course>) => Promise<Course>
  updateCourse: (courseId: string, updateData: Partial<Course>) => Promise<Course>
  deleteCourse: (courseId: string) => Promise<void>
  clearError: () => void
}

interface UseCoursesOptions {
  admin?: boolean // Use admin endpoints for secured operations
  courseId?: string // If provided, fetches single course instead of all courses
}

export function useCourses(options: UseCoursesOptions = {}): UseCoursesResult {
  const { admin = false, courseId } = options
  const [courses, setCourses] = useState<Course[]>([])
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Determine if we're fetching single course or multiple courses
  const isSingleCourse = !!courseId

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const getAllCourses = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { courses } = admin 
        ? await CourseClient.getAllCoursesAdmin()
        : await CourseClient.getAllCourses()
      setCourses(courses)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses')
    } finally {
      setLoading(false)
    }
  }, [admin])

  const fetchSingleCourse = useCallback(async () => {
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

  // Unified refetch method
  const refetch = useCallback(async () => {
    if (isSingleCourse) {
      await fetchSingleCourse()
    } else {
      await getAllCourses()
    }
  }, [isSingleCourse, fetchSingleCourse, getAllCourses])

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
    if (isSingleCourse) {
      fetchSingleCourse()
    } else {
      getAllCourses()
    }
  }, [isSingleCourse, fetchSingleCourse, getAllCourses])

  return {
    courses,
    course,
    loading,
    error,
    getAllCourses,
    getCourseById,
    refetch,
    createCourse,
    updateCourse,
    deleteCourse,
    clearError,
  }
}
