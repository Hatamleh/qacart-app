import {
    CompleteLessonRequest,
    CompleteLessonResponse,
    CreateProgressRequest,
    ProgressResponse,
    UserProgress
} from '@/types'

/**
 * ProgressClient - Frontend client for progress tracking API calls
 * Used by course player components to interact with progress data
 */

// ===== PROGRESS CLIENT =====

export class ProgressClient {

  // ===== PROGRESS RETRIEVAL =====

  /**
   * Get user's progress for a specific course
   * @param courseId - Course document ID
   * @returns UserProgress object or null if course not started
   */
  static async getProgress(courseId: string): Promise<UserProgress | null> {
    try {
      const response = await fetch(`/api/progress/${courseId}`, {
        method: 'GET',
        credentials: 'include', // Include session cookie
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('يجب تسجيل الدخول أولاً')
        }

        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'فشل في جلب بيانات التقدم')
      }

      const data: ProgressResponse = await response.json()
      return data.progress

    } catch (error) {
      console.error('Error fetching progress:', error)

      if (error instanceof Error) {
        throw error
      }

      throw new Error('فشل في الاتصال بالخادم')
    }
  }

  /**
   * Create initial progress for a course
   * @param courseId - Course document ID
   * @param totalLessons - Total number of lessons in the course
   * @returns Created UserProgress object
   */
  static async createInitialProgress(courseId: string, totalLessons: number): Promise<UserProgress> {
    try {
      const requestBody: CreateProgressRequest = { totalLessons }

      const response = await fetch(`/api/progress/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include session cookie
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('يجب تسجيل الدخول أولاً')
        }

        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'فشل في إنشاء بيانات التقدم')
      }

      const data: ProgressResponse = await response.json()

      if (!data.progress) {
        throw new Error('فشل في إنشاء بيانات التقدم')
      }

      return data.progress

    } catch (error) {
      console.error('Error creating initial progress:', error)

      if (error instanceof Error) {
        throw error
      }

      throw new Error('فشل في الاتصال بالخادم')
    }
  }

  // ===== LESSON COMPLETION =====

  /**
   * Mark a lesson as completed
   * @param courseId - Course document ID
   * @param lessonId - Lesson ID to mark complete
   * @param totalLessons - Total lessons in course
   * @param timeSpent - Optional: time spent on lesson in minutes
   * @returns Updated progress and completion status
   */
  static async markLessonComplete(
    courseId: string,
    lessonId: string,
    totalLessons: number,
    timeSpent?: number
  ): Promise<CompleteLessonResponse> {
    try {
      const requestBody: CompleteLessonRequest = {
        courseId,
        lessonId,
        totalLessons,
        timeSpent
      }

      const response = await fetch('/api/progress/complete-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include session cookie
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('يجب تسجيل الدخول أولاً')
        }

        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'فشل في تسجيل إكمال الدرس')
      }

      return await response.json()

    } catch (error) {
      console.error('Error marking lesson complete:', error)

      if (error instanceof Error) {
        throw error
      }

      throw new Error('فشل في الاتصال بالخادم')
    }
  }

  // ===== CONVENIENCE METHODS =====

  /**
   * Get or create progress for a course
   * If progress doesn't exist, creates initial progress
   * @param courseId - Course document ID
   * @param totalLessons - Total lessons in course (used if creating new progress)
   * @returns UserProgress object
   */
  static async getOrCreateProgress(courseId: string, totalLessons: number): Promise<UserProgress> {
    try {
      // Try to get existing progress
      const existingProgress = await this.getProgress(courseId)

      if (existingProgress) {
        return existingProgress
      }

      // If no progress exists, create initial progress
        return await this.createInitialProgress(courseId, totalLessons)

    } catch (error) {
      console.error('Error getting or creating progress:', error)
      throw error
    }
  }

  /**
   * Check if a specific lesson is completed
   * @param courseId - Course document ID
   * @param lessonId - Lesson ID to check
   * @returns Boolean indicating if lesson is completed
   */
  static async isLessonCompleted(courseId: string, lessonId: string): Promise<boolean> {
    try {
      const progress = await this.getProgress(courseId)

      if (!progress) {
        return false
      }

      return progress.completedLessons.includes(lessonId)

    } catch (error) {
      console.error('Error checking lesson completion:', error)
      return false // Default to not completed on error
    }
  }

  /**
   * Get progress percentage for a course
   * @param courseId - Course document ID
   * @returns Progress percentage (0-100) or 0 if no progress
   */
  static async getProgressPercentage(courseId: string): Promise<number> {
    try {
      const progress = await this.getProgress(courseId)

      if (!progress) {
        return 0
      }

      return progress.progressPercentage

    } catch (error) {
      console.error('Error getting progress percentage:', error)
      return 0 // Default to 0% on error
    }
  }

  // ===== UTILITY METHODS =====

  /**
   * Calculate expected progress percentage
   * Helper method for optimistic UI updates
   * @param completedLessons - Array of completed lesson IDs
   * @param totalLessons - Total lessons in course
   * @returns Calculated percentage
   */
  static calculateProgressPercentage(completedLessons: string[], totalLessons: number): number {
    if (totalLessons <= 0) {
      return 0
    }

    return Math.round((completedLessons.length / totalLessons) * 100)
  }

  /**
   * Check if course is completed
   * Helper method for UI state management
   * @param completedLessons - Array of completed lesson IDs
   * @param totalLessons - Total lessons in course
   * @returns Boolean indicating if course is completed
   */
  static isCourseCompleted(completedLessons: string[], totalLessons: number): boolean {
    return completedLessons.length === totalLessons && totalLessons > 0
  }
}
