import { Lesson } from '@/types'
import { admin } from '@/firebase/admin'

/**
 * LessonRepository - Data access layer for lesson operations
 * Used by API routes to interact with Firebase Firestore
 */
export class LessonRepository {
  /**
   * Get all lessons for a specific course
   */
  static async getLessonsForCourse(courseId: string): Promise<Lesson[]> {
    try {
      const courseDoc = await admin.firestore()
        .collection('courses')
        .doc(courseId)
        .get()

      if (!courseDoc.exists) {
        throw new Error('Course not found')
      }

      const course = courseDoc.data()
      return course?.lessons || []
    } catch (error) {
      console.error(`Error fetching lessons for course ${courseId}:`, error)
      throw new Error('Failed to fetch lessons')
    }
  }

  /**
   * Get a specific lesson by ID within a course
   */
  static async getLessonById(courseId: string, lessonId: string): Promise<Lesson> {
    try {
      const lessons = await this.getLessonsForCourse(courseId)
      const lesson = lessons.find(l => l.id === lessonId)
      
      if (!lesson) {
        throw new Error('Lesson not found')
      }

      return lesson
    } catch (error) {
      console.error(`Error fetching lesson ${lessonId} from course ${courseId}:`, error)
      throw new Error('Failed to fetch lesson')
    }
  }

  // ===== ADMIN LESSON OPERATIONS =====

  /**
   * Create a new lesson in a course (Admin only)
   * Adds lesson to the course's lessons array in Firebase
   */
  static async createLesson(courseId: string, lessonData: Omit<Lesson, 'id'>): Promise<Lesson> {
    try {
      // Get current course to find lesson count
      const courseDoc = await admin.firestore()
        .collection('courses')
        .doc(courseId)
        .get()

      if (!courseDoc.exists) {
        throw new Error('Course not found')
      }

      const course = courseDoc.data()
      const currentLessons = course?.lessons || []

      // Generate unique lesson ID
      const newLessonId = `lesson_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

      // Create new lesson
      const newLesson: Lesson = {
        ...lessonData,
        id: newLessonId,
        lessonOrder: currentLessons.length + 1
      }

      // Update course with new lesson
      const updatedLessons = [...currentLessons, newLesson]
      await admin.firestore()
        .collection('courses')
        .doc(courseId)
        .update({
          lessons: updatedLessons,
          updatedAt: new Date().toISOString()
        })

      // Return the complete lesson object
      return newLesson
    } catch (error) {
      console.error(`Error creating lesson in course ${courseId}:`, error)
      throw new Error('Failed to create lesson')
    }
  }

  /**
   * Update lesson in a course (Admin only)
   * Updates lesson in the course's lessons array in Firebase
   */
  static async updateLesson(courseId: string, lessonId: string, updates: Partial<Lesson>): Promise<void> {
    try {
      // Get current course
      const courseDoc = await admin.firestore()
        .collection('courses')
        .doc(courseId)
        .get()

      if (!courseDoc.exists) {
        throw new Error('Course not found')
      }

      const course = courseDoc.data()
      const lessons = course?.lessons || []

      // Find lesson index
      const lessonIndex = lessons.findIndex((l: Lesson) => l.id === lessonId)
      if (lessonIndex === -1) {
        throw new Error('Lesson not found')
      }

      // Update lesson
      const updatedLessons = [...lessons]
      updatedLessons[lessonIndex] = {
        ...updatedLessons[lessonIndex],
        ...updates,
        id: lessonId // Ensure ID doesn't change
      }

      // Update course with modified lessons array
      await admin.firestore()
        .collection('courses')
        .doc(courseId)
        .update({
          lessons: updatedLessons,
          updatedAt: new Date().toISOString()
        })
    } catch (error) {
      console.error(`Error updating lesson ${lessonId} in course ${courseId}:`, error)
      throw new Error('Failed to update lesson')
    }
  }

  /**
   * Delete a lesson from a course (Admin only)
   * Removes lesson from the course's lessons array in Firebase
   */
  static async deleteLesson(courseId: string, lessonId: string): Promise<void> {
    try {
      // Get current course
      const courseDoc = await admin.firestore()
        .collection('courses')
        .doc(courseId)
        .get()

      if (!courseDoc.exists) {
        throw new Error('Course not found')
      }

      const course = courseDoc.data()
      const lessons = course?.lessons || []

      // Find lesson index
      const lessonIndex = lessons.findIndex((l: Lesson) => l.id === lessonId)
      if (lessonIndex === -1) {
        throw new Error('Lesson not found')
      }

      // Remove lesson and reorder
      const updatedLessons = lessons
        .filter((l: Lesson) => l.id !== lessonId)
        .map((lesson: Lesson, index: number) => ({
          ...lesson,
          lessonOrder: index + 1
        }))

      // Update course with modified lessons array
      await admin.firestore()
        .collection('courses')
        .doc(courseId)
        .update({
          lessons: updatedLessons,
          updatedAt: new Date().toISOString()
        })
    } catch (error) {
      console.error(`Error deleting lesson ${lessonId} from course ${courseId}:`, error)
      throw new Error('Failed to delete lesson')
    }
  }

  /**
   * Reorder lessons in a course (Admin only)
   * Updates lesson order in the course's lessons array in Firebase
   */
  static async reorderLessons(courseId: string, lessonIds: string[]): Promise<void> {
    try {
      // Get current course
      const courseDoc = await admin.firestore()
        .collection('courses')
        .doc(courseId)
        .get()

      if (!courseDoc.exists) {
        throw new Error('Course not found')
      }

      const course = courseDoc.data()
      const lessons = course?.lessons || []

      // Create new lessons array in the specified order
      const reorderedLessons: Lesson[] = []

      lessonIds.forEach((lessonId, index) => {
        const lesson = lessons.find((l: Lesson) => l.id === lessonId)
        if (lesson) {
          reorderedLessons.push({
            ...lesson,
            lessonOrder: index + 1
          })
        }
      })

      // Update course with reordered lessons
      await admin.firestore()
        .collection('courses')
        .doc(courseId)
        .update({
          lessons: reorderedLessons,
          updatedAt: new Date().toISOString()
        })
    } catch (error) {
      console.error(`Error reordering lessons in course ${courseId}:`, error)
      throw new Error('Failed to reorder lessons')
    }
  }
}
