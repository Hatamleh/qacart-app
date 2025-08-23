import { Course } from '@/types'
import { admin } from '@/firebase/admin'
import { cache } from 'react'

/**
 * CourseRepository - Data access layer for course operations
 * Used by API routes to interact with Firebase Firestore
 */
export class CourseRepository {
  /**
   * Fetch all courses from Firebase Firestore
   * Cached automatically by React - no duplicate calls within same request
   */
  static getAllCourses = cache(async (): Promise<Course[]> => {
    try {
      const coursesSnapshot = await admin.firestore()
        .collection('courses')
        .orderBy('createdAt', 'desc')
        .get()

      const courses = coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[]

      return courses
    } catch (error) {
      console.error('Error fetching courses from Firebase:', error)
      throw new Error('Failed to fetch courses')
    }
  })

  /**
   * Fetch a single course by ID from Firebase Firestore
   * Cached automatically by React - no duplicate calls within same request
   */
  static getCourseById = cache(async (courseId: string): Promise<Course> => {
    try {
      const courseDoc = await admin.firestore()
        .collection('courses')
        .doc(courseId)
        .get()

      if (!courseDoc.exists) {
        throw new Error('Course not found')
      }

      const course = {
        id: courseDoc.id,
        ...courseDoc.data()
      } as Course

      return course
    } catch (error) {
      console.error(`Error fetching course ${courseId} from Firebase:`, error)
      throw new Error('Failed to fetch course')
    }
  })

  // ===== ADMIN COURSE OPERATIONS =====

  /**
   * Create a new course (Admin only)
   * Saves to Firebase Firestore
   */
  static async createCourse(courseData: Omit<Course, 'id'>): Promise<Course> {
    try {
      // Create course document in Firestore
      const courseRef = await admin.firestore()
        .collection('courses')
        .add({
          ...courseData,
          lessons: courseData.lessons || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })

      // Return the complete course object
      const createdCourse: Course = {
        id: courseRef.id,
        ...courseData,
        lessons: courseData.lessons || []
      }

      return createdCourse
    } catch (error) {
      console.error('Error creating course in Firebase:', error)
      throw new Error('Failed to create course')
    }
  }

  /**
   * Update course (Admin only)
   * Updates course in Firebase Firestore
   */
  static async updateCourse(courseId: string, updates: Partial<Course>): Promise<void> {
    try {
      // Remove id from updates to avoid conflicts (if present)
      const updateData = { ...updates }
      delete updateData.id

      // Update course document in Firestore
      await admin.firestore()
        .collection('courses')
        .doc(courseId)
        .update({
          ...updateData,
          updatedAt: new Date().toISOString()
        })
    } catch (error) {
      console.error(`Error updating course ${courseId} in Firebase:`, error)
      throw new Error('Failed to update course')
    }
  }

  /**
   * Delete course (Admin only)
   * Removes course from Firebase Firestore
   */
  static async deleteCourse(courseId: string): Promise<void> {
    try {
      // Delete course document from Firestore
      await admin.firestore()
        .collection('courses')
        .doc(courseId)
        .delete()
    } catch (error) {
      console.error(`Error deleting course ${courseId} from Firebase:`, error)
      throw new Error('Failed to delete course')
    }
  }


}
