import { UserProgress, LessonProgressDetail } from '@/types'
import { admin } from '@/firebase/admin'
import { AuthRepository } from './auth.repository'

/**
 * ProgressRepository - Data access layer for user progress tracking
 * Manages Firebase progress collection operations
 * Document ID format: {userId}_{courseId}
 */
export class ProgressRepository {

  // ===== PROGRESS RETRIEVAL =====

  /**
   * Get user's progress for a specific course
   * @param userId - Firebase Auth UID
   * @param courseId - Course document ID
   * @returns UserProgress object or null if not found
   */
  static async getUserProgress(userId: string, courseId: string): Promise<UserProgress | null> {
    try {
      const docId = `${userId}_${courseId}`
      const progressDoc = await admin.firestore()
        .collection('progress')
        .doc(docId)
        .get()

      if (!progressDoc.exists) {
        return null
      }

      return progressDoc.data() as UserProgress
    } catch (error) {
      console.error('Error fetching user progress:', error)
      return null
    }
  }

  /**
   * Get all progress for a specific user (across all courses)
   * Used for profile page and analytics
   * @param userId - Firebase Auth UID
   * @returns Array of UserProgress objects
   */
  static async getAllUserProgress(userId: string): Promise<UserProgress[]> {
    try {
      const progressSnapshot = await admin.firestore()
        .collection('progress')
        .where('userId', '==', userId)
        .orderBy('lastAccessed', 'desc')
        .get()

      return progressSnapshot.docs.map(doc => doc.data() as UserProgress)
    } catch (error) {
      console.error('Error fetching all user progress:', error)
      return []
    }
  }

  /**
   * Get progress stats for a specific course (Admin analytics)
   * @param courseId - Course document ID
   * @returns Array of UserProgress objects for the course
   */
  static async getCourseProgressStats(courseId: string): Promise<UserProgress[]> {
    try {
      const progressSnapshot = await admin.firestore()
        .collection('progress')
        .where('courseId', '==', courseId)
        .get()

      return progressSnapshot.docs.map(doc => doc.data() as UserProgress)
    } catch (error) {
      console.error('Error fetching course progress stats:', error)
      return []
    }
  }

  // ===== PROGRESS CREATION =====

  /**
   * Create initial progress document when user first accesses a course
   * @param userId - Firebase Auth UID
   * @param courseId - Course document ID
   * @param totalLessons - Total number of lessons in the course
   * @returns Created UserProgress object
   */
  static async createInitialProgress(
    userId: string, 
    courseId: string, 
    totalLessons: number
  ): Promise<UserProgress> {
    try {
      const docId = `${userId}_${courseId}`
      const now = new Date().toISOString()

      const initialProgress: UserProgress = {
        userId,
        courseId,
        completedLessons: [],
        progressPercentage: 0,
        totalLessons,
        lessonProgress: {},
        isCompleted: false,
        createdAt: now,
        updatedAt: now,
        lastAccessed: now,
        sessionCount: 1,
        totalTimeSpent: 0
      }

      await admin.firestore()
        .collection('progress')
        .doc(docId)
        .set(initialProgress)

      return initialProgress
    } catch (error) {
      console.error('Error creating initial progress:', error)
      throw new Error('Failed to create initial progress')
    }
  }

  // ===== LESSON COMPLETION =====

  /**
   * Mark a lesson as completed
   * @param userId - Firebase Auth UID
   * @param courseId - Course document ID
   * @param lessonId - Lesson ID to mark complete
   * @param totalLessons - Total lessons in course (for progress calculation)
   * @param timeSpent - Optional: time spent on lesson in minutes
   * @returns Updated UserProgress object
   */
  static async markLessonComplete(
    userId: string,
    courseId: string,
    lessonId: string,
    totalLessons: number,
    timeSpent?: number
  ): Promise<UserProgress> {
    try {
      const docId = `${userId}_${courseId}`
      const now = new Date().toISOString()

      // Get current progress or create initial if doesn't exist
      let currentProgress = await this.getUserProgress(userId, courseId)
      
      if (!currentProgress) {
        currentProgress = await this.createInitialProgress(userId, courseId, totalLessons)
      }

      // Check if lesson is already completed
      if (currentProgress.completedLessons.includes(lessonId)) {
        // Update last accessed time and return current progress
        await admin.firestore()
          .collection('progress')
          .doc(docId)
          .update({
            lastAccessed: now,
            updatedAt: now
          })
        
        return { ...currentProgress, lastAccessed: now, updatedAt: now }
      }

      // Add lesson to completed lessons
      const updatedCompletedLessons = [...currentProgress.completedLessons, lessonId]
      const newProgressPercentage = Math.round((updatedCompletedLessons.length / totalLessons) * 100)
      const isCourseCompleted = updatedCompletedLessons.length === totalLessons

      // Create lesson progress detail
      const lessonProgressDetail: LessonProgressDetail = {
        completedAt: now,
        timeSpent,
        attempts: 1
      }

      // Update lesson progress object
      const updatedLessonProgress = {
        ...currentProgress.lessonProgress,
        [lessonId]: lessonProgressDetail
      }

      // Prepare update data
      const updateData: Partial<UserProgress> = {
        completedLessons: updatedCompletedLessons,
        progressPercentage: newProgressPercentage,
        lessonProgress: updatedLessonProgress,
        isCompleted: isCourseCompleted,
        lastAccessed: now,
        updatedAt: now,
        sessionCount: (currentProgress.sessionCount || 0) + 1,
        totalTimeSpent: (currentProgress.totalTimeSpent || 0) + (timeSpent || 0)
      }

      // Add completion timestamp if course is completed
      if (isCourseCompleted && !currentProgress.isCompleted) {
        updateData.completedAt = now
      }

      // Update in Firebase
      await admin.firestore()
        .collection('progress')
        .doc(docId)
        .update(updateData)

      // Return updated progress
      return {
        ...currentProgress,
        ...updateData
      } as UserProgress

    } catch (error) {
      console.error('Error marking lesson complete:', error)
      throw new Error('Failed to mark lesson complete')
    }
  }

  // ===== PROGRESS UPDATES =====

  /**
   * Update last accessed time for a course
   * Called when user visits course player
   * @param userId - Firebase Auth UID
   * @param courseId - Course document ID
   */
  static async updateLastAccessed(userId: string, courseId: string): Promise<void> {
    try {
      const docId = `${userId}_${courseId}`
      const now = new Date().toISOString()

      await admin.firestore()
        .collection('progress')
        .doc(docId)
        .update({
          lastAccessed: now,
          updatedAt: now
        })
    } catch (error) {
      console.error('Error updating last accessed:', error)
      // Don't throw error for this non-critical operation
    }
  }

  // ===== AUTHENTICATED USER HELPERS =====

  /**
   * Get current authenticated user's progress for a course
   * @param courseId - Course document ID
   * @returns UserProgress object or null
   */
  static async getCurrentUserProgress(courseId: string): Promise<UserProgress | null> {
    try {
      const userId = await AuthRepository.getAuthenticatedUserId()
      if (!userId) {
        return null
      }

      return await this.getUserProgress(userId, courseId)
    } catch (error) {
      console.error('Error getting current user progress:', error)
      return null
    }
  }

  /**
   * Mark lesson complete for current authenticated user
   * @param courseId - Course document ID
   * @param lessonId - Lesson ID to mark complete
   * @param totalLessons - Total lessons in course
   * @param timeSpent - Optional: time spent on lesson
   * @returns Updated UserProgress object
   */
  static async markLessonCompleteForCurrentUser(
    courseId: string,
    lessonId: string,
    totalLessons: number,
    timeSpent?: number
  ): Promise<UserProgress> {
    try {
      const userId = await AuthRepository.getAuthenticatedUserId()
      if (!userId) {
        throw new Error('User not authenticated')
      }

      return await this.markLessonComplete(userId, courseId, lessonId, totalLessons, timeSpent)
    } catch (error) {
      console.error('Error marking lesson complete for current user:', error)
      throw error
    }
  }

  // ===== ADMIN OPERATIONS =====

  /**
   * Delete all progress for a user (Admin operation)
   * Used when deleting user accounts
   * @param userId - Firebase Auth UID
   */
  static async deleteAllUserProgress(userId: string): Promise<void> {
    try {
      const progressSnapshot = await admin.firestore()
        .collection('progress')
        .where('userId', '==', userId)
        .get()

      const batch = admin.firestore().batch()
      progressSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })
      
      await batch.commit()
    } catch (error) {
      console.error('Error deleting all user progress:', error)
      throw new Error('Failed to delete user progress')
    }
  }

  /**
   * Delete progress for a specific course (Admin operation)
   * Used when deleting courses
   * @param courseId - Course document ID
   */
  static async deleteAllCourseProgress(courseId: string): Promise<void> {
    try {
      const progressSnapshot = await admin.firestore()
        .collection('progress')
        .where('courseId', '==', courseId)
        .get()

      const batch = admin.firestore().batch()
      progressSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })
      
      await batch.commit()
    } catch (error) {
      console.error('Error deleting all course progress:', error)
      throw new Error('Failed to delete course progress')
    }
  }
}
