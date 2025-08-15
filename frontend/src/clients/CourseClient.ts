import { Course } from '@/types'
import { coursesData } from '@/data'

/**
 * CourseClient - Handles all course-related data access
 * Currently reads from mock data, will connect to Firebase later
 */
export class CourseClient {
  /**
   * Fetch all courses (currently from mock data, will be Firebase later)
   */
  static async getAllCourses(): Promise<Course[]> {
    // Simulate async operation for future Firebase integration
    await new Promise(resolve => setTimeout(resolve, 100))
    return coursesData
  }

  /**
   * Fetch a single course by ID (currently from mock data, will be Firebase later)
   */
  static async getCourseById(courseId: string): Promise<Course> {
    // Simulate async operation for future Firebase integration
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const course = coursesData.find(c => c.id === courseId)
    if (!course) {
      throw new Error('Course not found')
    }
    
    return course
  }

  /**
   * Create new course (Future Firebase implementation)
   */
  static async createCourse(courseData: Omit<Course, 'id'>): Promise<{ id: string }> {
      console.log(courseData)
    // Future Firebase implementation
    throw new Error('Create course not implemented yet')
  }

  /**
   * Update course (Future Firebase implementation)
   */
  static async updateCourse(courseId: string, updates: Partial<Course>): Promise<void> {
      console.log(courseId, updates)
    // Future Firebase implementation
    console.log(courseId, updates);
    
    throw new Error('Update course not implemented yet')
  }

  /**
   * Delete course (Future Firebase implementation)
   */
  static async deleteCourse(courseId: string): Promise<void> {
      console.log(courseId)
    // Future Firebase implementation
    throw new Error('Delete course not implemented yet')
  }
}
