import { Course, Lesson } from '@/types'
import { coursesData } from '@/data'
import { cache } from 'react'

/**
 * CourseClient - Handles all course-related data access
 * Currently reads from mock data, will connect to Firebase later
 */
export class CourseClient {
  /**
   * Fetch all courses (currently from mock data, will be Firebase later)
   * Cached automatically by React - no duplicate calls within same request
   */
  static getAllCourses = cache(async (): Promise<Course[]> => {
    // Simulate async operation for future Firebase integration
    await new Promise(resolve => setTimeout(resolve, 100))
    return coursesData
  })

  /**
   * Fetch a single course by ID (currently from mock data, will be Firebase later)
   * Cached automatically by React - no duplicate calls within same request
   */
  static getCourseById = cache(async (courseId: string): Promise<Course> => {
    // Simulate async operation for future Firebase integration
    await new Promise(resolve => setTimeout(resolve, 100))

    const course = coursesData.find(c => c.id === courseId)
    if (!course) {
      throw new Error('Course not found')
    }

    return course
  })

  // ===== ADMIN COURSE OPERATIONS =====

  /**
   * Create a new course (Admin only)
   * Modifies coursesData array in memory for development
   */
  static async createCourse(courseData: Omit<Course, 'id'>): Promise<{ id: string }> {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))

    // Generate unique ID
    const newId = `course_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

    // Create a new course with generated ID
    const newCourse: Course = {
      id: newId,
      ...courseData,
      // Ensure lessons array exists
      lessons: courseData.lessons || []
    }

    // Add to mock data array (in memory)
    coursesData.push(newCourse)

    console.log('✅ Course created:', newCourse.title, 'ID:', newId)
    return { id: newId }
  }

  /**
   * Update course (Admin only)
   * Updates coursesData array in memory for development
   */
  static async updateCourse(courseId: string, updates: Partial<Course>): Promise<void> {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))

    // Find course index in mock data
    const courseIndex = coursesData.findIndex(c => c.id === courseId)
    if (courseIndex === -1) {
      throw new Error('Course not found')
    }

    // Update course in mock data (in memory)
    coursesData[courseIndex] = {
      ...coursesData[courseIndex],
      ...updates,
      id: courseId // Ensure ID doesn't change
    }

    console.log('✅ Course updated:', courseId, updates)
  }

  /**
   * Delete course (Admin only)
   * Removes from coursesData array in memory for development
   */
  static async deleteCourse(courseId: string): Promise<void> {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))

    // Find course index in mock data
    const courseIndex = coursesData.findIndex(c => c.id === courseId)
    if (courseIndex === -1) {
      throw new Error('Course not found')
    }

    // Remove course from mock data (in memory)
    const deletedCourse = coursesData.splice(courseIndex, 1)[0]

    console.log('✅ Course deleted:', deletedCourse.title)
  }

  // ===== ADMIN LESSON OPERATIONS =====

  /**
   * Create a new lesson in a course (Admin only)
   */
  static async createLesson(courseId: string, lessonData: Omit<Lesson, 'id'>): Promise<{ id: string }> {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))

    // Find course in mock data
    const course = coursesData.find(c => c.id === courseId)
    if (!course) {
      throw new Error('Course not found')
    }

    // Generate unique lesson ID
    const newLessonId = `lesson_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

    // Create a new lesson
    const newLesson: Lesson = {
      ...lessonData,
      id: newLessonId,
      lessonOrder: course.lessons.length + 1 // Auto-increment order
    }

    // Add a lesson to course (in memory)
    course.lessons.push(newLesson)

    console.log('✅ Lesson created:', newLesson.title, 'in course:', course.title)
    return { id: newLessonId }
  }

  /**
   * Update lesson in a course (Admin only)
   */
  static async updateLesson(courseId: string, lessonId: string, updates: Partial<Lesson>): Promise<void> {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))

    // Find course
    const course = coursesData.find(c => c.id === courseId)
    if (!course) {
      throw new Error('Course not found')
    }

    // Find lesson in course
    const lessonIndex = course.lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex === -1) {
      throw new Error('Lesson not found')
    }

    // Update lesson (in memory)
    course.lessons[lessonIndex] = {
      ...course.lessons[lessonIndex],
      ...updates,
      id: lessonId // Ensure ID doesn't change
    }

    console.log('✅ Lesson updated:', lessonId, updates)
  }

  /**
   * Delete a lesson from a course (Admin only)
   */
  static async deleteLesson(courseId: string, lessonId: string): Promise<void> {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))

    // Find course
    const course = coursesData.find(c => c.id === courseId)
    if (!course) {
      throw new Error('Course not found')
    }

    // Find lesson index
    const lessonIndex = course.lessons.findIndex(l => l.id === lessonId)
    if (lessonIndex === -1) {
      throw new Error('Lesson not found')
    }

    // Remove lesson (in memory)
    const deletedLesson = course.lessons.splice(lessonIndex, 1)[0]

    // Reorder remaining lessons
    course.lessons.forEach((lesson, index) => {
      lesson.lessonOrder = index + 1
    })

    console.log('✅ Lesson deleted:', deletedLesson.title)
  }

  /**
   * Reorder lessons in a course (Admin only)
   */
  static async reorderLessons(courseId: string, lessonIds: string[]): Promise<void> {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))

    // Find course
    const course = coursesData.find(c => c.id === courseId)
    if (!course) {
      throw new Error('Course not found')
    }

    // Create new lessons array in the specified order
    const reorderedLessons: Lesson[] = []

    lessonIds.forEach((lessonId, index) => {
      const lesson = course.lessons.find(l => l.id === lessonId)
      if (lesson) {
        reorderedLessons.push({
          ...lesson,
          lessonOrder: index + 1
        })
      }
    })

    // Update course lessons (in memory)
    course.lessons = reorderedLessons

    console.log('✅ Lessons reordered for course:', course.title)
  }
}
