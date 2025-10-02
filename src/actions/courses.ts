'use server'

import { revalidatePath } from 'next/cache'
import { CourseRepository, LessonRepository } from '@/repositories'
import { requireAdmin } from '@/lib/auth'
import { Course } from '@/types'

/**
 * Get all courses (public)
 * Can be called from Server Components
 */
export async function getCourses(): Promise<Course[]> {
  try {
    return await CourseRepository.getAllCourses()
  } catch (error) {
    console.error('Error fetching courses:', error)
    throw new Error('Failed to fetch courses')
  }
}

/**
 * Get course by ID (public)
 * Can be called from Server Components
 */
export async function getCourse(courseId: string): Promise<Course> {
  try {
    return await CourseRepository.getCourseById(courseId)
  } catch (error) {
    console.error(`Error fetching course ${courseId}:`, error)
    throw new Error('Course not found')
  }
}

// ===== ADMIN-ONLY OPERATIONS =====

/**
 * Create new course (Admin only)
 */
export async function createCourse(courseData: Omit<Course, 'id'>): Promise<Course> {
  await requireAdmin()

  try {
    const course = await CourseRepository.createCourse(courseData)

    // Revalidate course pages
    revalidatePath('/courses')
    revalidatePath('/sudo/courses')

    return course
  } catch (error) {
    console.error('Error creating course:', error)
    throw new Error('Failed to create course')
  }
}

/**
 * Update course (Admin only)
 */
export async function updateCourse(
  courseId: string,
  updates: Partial<Course>
): Promise<void> {
  await requireAdmin()

  try {
    await CourseRepository.updateCourse(courseId, updates)

    // Revalidate course pages
    revalidatePath('/courses')
    revalidatePath(`/courses/${courseId}`)
    revalidatePath('/sudo/courses')
    revalidatePath(`/sudo/courses/${courseId}`)

  } catch (error) {
    console.error('Error updating course:', error)
    throw new Error('Failed to update course')
  }
}

/**
 * Delete course (Admin only)
 */
export async function deleteCourse(courseId: string): Promise<void> {
  await requireAdmin()

  try {
    await CourseRepository.deleteCourse(courseId)

    // Revalidate course pages
    revalidatePath('/courses')
    revalidatePath('/sudo/courses')

  } catch (error) {
    console.error('Error deleting course:', error)
    throw new Error('Failed to delete course')
  }
}

/**
 * Add lesson to course (Admin only)
 */
export async function addLessonToCourse(
  courseId: string,
  lessonData: Record<string, unknown>
): Promise<void> {
  await requireAdmin()

  try {
    await LessonRepository.createLesson(courseId, lessonData as Omit<import('@/types').Lesson, 'id'>)

    // Revalidate course pages
    revalidatePath(`/courses/${courseId}`)
    revalidatePath(`/sudo/courses/${courseId}`)

  } catch (error) {
    console.error('Error adding lesson:', error)
    throw new Error('Failed to add lesson')
  }
}

/**
 * Update lesson in course (Admin only)
 */
export async function updateLesson(
  courseId: string,
  lessonId: string,
  updates: Record<string, unknown>
): Promise<void> {
  await requireAdmin()

  try {
    await LessonRepository.updateLesson(courseId, lessonId, updates)

    // Revalidate course pages
    revalidatePath(`/courses/${courseId}`)
    revalidatePath(`/sudo/courses/${courseId}`)

  } catch (error) {
    console.error('Error updating lesson:', error)
    throw new Error('Failed to update lesson')
  }
}

/**
 * Delete lesson from course (Admin only)
 */
export async function deleteLesson(
  courseId: string,
  lessonId: string
): Promise<void> {
  await requireAdmin()

  try {
    await LessonRepository.deleteLesson(courseId, lessonId)

    // Revalidate course pages
    revalidatePath(`/courses/${courseId}`)
    revalidatePath(`/sudo/courses/${courseId}`)

  } catch (error) {
    console.error('Error deleting lesson:', error)
    throw new Error('Failed to delete lesson')
  }
}

/**
 * Reorder lessons in course (Admin only)
 */
export async function reorderLessons(
  courseId: string,
  lessonIds: string[]
): Promise<void> {
  await requireAdmin()

  try {
    await LessonRepository.reorderLessons(courseId, lessonIds)

    // Revalidate course pages
    revalidatePath(`/courses/${courseId}`)
    revalidatePath(`/sudo/courses/${courseId}`)

  } catch (error) {
    console.error('Error reordering lessons:', error)
    throw new Error('Failed to reorder lessons')
  }
}
