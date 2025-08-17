/**
 * Lesson Client - Lesson operations
 * Handles client-side requests to lesson API routes (both public and admin)
 */

import { Lesson } from '@/types'

export class LessonClient {
  /**
   * Get all lessons for a course
   * Uses public course endpoint - works for both users and admins
   */
  static async getLessons(courseId: string): Promise<{ lessons: Lesson[] }> {
    const response = await fetch(`/api/courses/${courseId}`, {
      method: 'GET',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch course lessons')
    }

    const { course } = await response.json()
    return { lessons: course.lessons }
  }

  /**
   * Get a specific lesson by ID
   * Uses public course endpoint - works for both users and admins
   */
  static async getLessonById(courseId: string, lessonId: string): Promise<{ lesson: Lesson }> {
    const response = await fetch(`/api/courses/${courseId}`, {
      method: 'GET',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch course')
    }

    const { course } = await response.json()
    const lesson = course.lessons.find((l: Lesson) => l.id === lessonId)
    
    if (!lesson) {
      throw new Error('Lesson not found')
    }

    return { lesson }
  }

  // ===== ADMIN-ONLY LESSON MANAGEMENT =====

  /**
   * Create new lesson (Admin only)
   */
  static async createLesson(courseId: string, lessonData: Partial<Lesson>): Promise<{ lesson: Lesson; message: string }> {
    const response = await fetch(`/api/sudo/courses/${courseId}/lessons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(lessonData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create lesson')
    }

    return response.json()
  }

  /**
   * Update lesson (Admin only)
   */
  static async updateLesson(courseId: string, lessonId: string, updateData: Partial<Lesson>): Promise<{ lesson: Lesson; message: string }> {
    const response = await fetch(`/api/sudo/courses/${courseId}/lessons/${lessonId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update lesson')
    }

    return response.json()
  }

  /**
   * Delete lesson (Admin only)
   */
  static async deleteLesson(courseId: string, lessonId: string): Promise<{ message: string }> {
    const response = await fetch(`/api/sudo/courses/${courseId}/lessons/${lessonId}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete lesson')
    }

    return response.json()
  }

  /**
   * Reorder lessons in a course (Admin only)
   */
  static async reorderLessons(courseId: string, lessonIds: string[]): Promise<{ message: string }> {
    const response = await fetch(`/api/sudo/courses/${courseId}/lessons/reorder`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ lessonIds }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to reorder lessons')
    }

    return response.json()
  }
}
