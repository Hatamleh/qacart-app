import {Course} from '@/types/course'

/**
 * Courses API Client
 * Handles all course-related API calls
 */
export class CoursesClient {
  private readonly baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  }

  /**
   * Fetch all courses from the API
   * @returns Promise<Course[]> - Array of courses
   */
  async getAllCourses(): Promise<Course[]> {
    const response = await fetch(`${this.baseUrl}/api/courses`, {
      cache: 'no-store', // Always fetch fresh data for development
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Fetch a specific course by ID
   * @param courseId - The ID of the course to fetch
   * @returns Promise<Course> - The course data
   */
  async getCourseById(courseId: string | number): Promise<Course> {
    const response = await fetch(`${this.baseUrl}/api/courses/${courseId}`, {
      cache: 'no-store', // Always fetch fresh data for development
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Course with ID ${courseId} not found`)
      }
      throw new Error(`Failed to fetch course: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }
}

// Create a singleton instance for use throughout the app
export const coursesClient = new CoursesClient()

// Convenience functions for direct usage
export const getAllCourses = () => coursesClient.getAllCourses()
export const getCourseById = (courseId: string | number) => coursesClient.getCourseById(courseId)
