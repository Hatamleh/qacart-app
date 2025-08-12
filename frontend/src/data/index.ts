import { Course } from '@/types/course'
import { ProPlan } from '@/types/plan'
import coursesData from './courses.json'
import plansData from './plans.json'

/**
 * Static data for frontend design purposes
 * This replaces API calls for development
 */

// Type-safe access to data
export const courses: Course[] = coursesData as Course[]
export const plans = plansData

/**
 * Get all courses
 * @returns Array of all courses
 */
export const getAllCourses = (): Course[] => {
  return courses
}

/**
 * Get a course by ID
 * @param courseId - The ID of the course to find
 * @returns Course object (defaults to first course if not found)
 */
export const getCourseById = (courseId: string | number): Course => {
  const id = typeof courseId === 'string' ? parseInt(courseId, 10) : courseId
  return courses.find(course => course.id === id) || courses[0]
}

/**
 * Get courses by type
 * @param type - The type of courses to filter by
 * @returns Array of courses matching the type
 */
export const getCoursesByType = (type: string): Course[] => {
  return courses.filter(course => course.type === type)
}

/**
 * Get featured courses (for display on homepage)
 * @returns Array of first 3 courses
 */
export const getFeaturedCourses = (): Course[] => {
  return courses.slice(0, 3)
}

/**
 * Search courses by title or description
 * @param query - Search query string
 * @returns Array of courses matching the search
 */
export const searchCourses = (query: string): Course[] => {
  const searchTerm = query.toLowerCase()
  return courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm) ||
    course.shortDescription.toLowerCase().includes(searchTerm) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

/**
 * Get the Pro plan data
 * @returns Pro plan object
 */
export const getProPlan = (): ProPlan => {
  return plans.proPlan as ProPlan
}
