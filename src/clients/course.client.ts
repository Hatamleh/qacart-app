/**
 * Course Client - Course operations
 * Handles client-side requests to course API routes (both public and admin)
 */

import { Course } from '@/types'

export class CourseClient {
  /**
   * Get all courses
   * Uses public endpoint - works for both users and admins
   */
  static async getAllCourses(): Promise<{ courses: Course[] }> {
    const response = await fetch('/api/courses', {
      method: 'GET',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch courses')
    }

    return response.json()
  }

  /**
   * Get all courses (Admin only)
   * Uses admin endpoint with proper authentication
   */
  static async getAllCoursesAdmin(): Promise<{ courses: Course[] }> {
    const response = await fetch('/api/sudo/courses', {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch courses')
    }

    return response.json()
  }

  /**
   * Get course by ID
   * Uses public endpoint - works for both users and admins
   */
  static async getCourseById(courseId: string): Promise<{ course: Course }> {
    const response = await fetch(`/api/courses/${courseId}`, {
      method: 'GET',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Course not found')
    }

    return response.json()
  }

  // ===== ADMIN-ONLY COURSE MANAGEMENT =====

  /**
   * Create new course (Admin only)
   */
  static async createCourse(courseData: Partial<Course>): Promise<{ course: Course; message: string }> {
    const response = await fetch('/api/sudo/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(courseData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create course')
    }

    return response.json()
  }

  /**
   * Update course (Admin only)
   */
  static async updateCourse(courseId: string, updateData: Partial<Course>): Promise<{ course: Course; message: string }> {
    const response = await fetch(`/api/sudo/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update course')
    }

    return response.json()
  }

  /**
   * Delete course (Admin only)
   */
  static async deleteCourse(courseId: string): Promise<{ message: string }> {
    const response = await fetch(`/api/sudo/courses/${courseId}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete course')
    }

    return response.json()
  }
}
