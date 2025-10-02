'use server'

import { cache } from 'react'
import { revalidatePath } from 'next/cache'
import { admin } from '@/firebase/admin'
import { requireAdmin } from '@/lib/auth'
import { Course, Lesson } from '@/types'

/**
 * Get all courses (public)
 * Can be called from Server Components
 */
export const getCourses = cache(async (): Promise<Course[]> => {
  const coursesSnapshot = await admin.firestore()
    .collection('courses')
    .orderBy('createdAt', 'desc')
    .get()

  return coursesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Course[]
})

/**
 * Get course by ID (public)
 * Can be called from Server Components
 */
export const getCourse = cache(async (courseId: string): Promise<Course> => {
  const courseDoc = await admin.firestore()
    .collection('courses')
    .doc(courseId)
    .get()

  if (!courseDoc.exists) {
    throw new Error('Course not found')
  }

  return {
    id: courseDoc.id,
    ...courseDoc.data()
  } as Course
})

// ===== ADMIN-ONLY OPERATIONS =====

/**
 * Create new course (Admin only)
 */
export async function createCourse(courseData: Omit<Course, 'id'>): Promise<Course> {
  await requireAdmin()

  // Create course document in Firestore
  const courseRef = await admin.firestore()
    .collection('courses')
    .add({
      ...courseData,
      lessons: courseData.lessons || [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    })

  // Revalidate course pages
  revalidatePath('/courses')
  revalidatePath('/sudo/courses')

  // Return the complete course object
  return {
    id: courseRef.id,
    ...courseData,
    lessons: courseData.lessons || []
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

  // Remove id from updates to avoid conflicts
  const updateData = { ...updates }
  delete updateData.id

  // Update course document in Firestore
  await admin.firestore()
    .collection('courses')
    .doc(courseId)
    .update({
      ...updateData,
      lastUpdated: new Date().toISOString()
    })

  // Revalidate course pages
  revalidatePath('/courses')
  revalidatePath(`/courses/${courseId}`)
  revalidatePath('/sudo/courses')
  revalidatePath(`/sudo/courses/${courseId}`)
}

/**
 * Delete course (Admin only)
 */
export async function deleteCourse(courseId: string): Promise<void> {
  await requireAdmin()

  // Delete course document from Firestore
  await admin.firestore()
    .collection('courses')
    .doc(courseId)
    .delete()

  // Revalidate course pages
  revalidatePath('/courses')
  revalidatePath('/sudo/courses')
}

/**
 * Add lesson to course (Admin only)
 */
export async function addLessonToCourse(
  courseId: string,
  lessonData: Omit<Lesson, 'id'>
): Promise<Lesson> {
  await requireAdmin()

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
      lastUpdated: new Date().toISOString()
    })

  // Revalidate course pages
  revalidatePath(`/courses/${courseId}`)
  revalidatePath(`/sudo/courses/${courseId}`)

  return newLesson
}

/**
 * Update lesson in course (Admin only)
 */
export async function updateLesson(
  courseId: string,
  lessonId: string,
  updates: Partial<Lesson>
): Promise<void> {
  await requireAdmin()

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
      lastUpdated: new Date().toISOString()
    })

  // Revalidate course pages
  revalidatePath(`/courses/${courseId}`)
  revalidatePath(`/sudo/courses/${courseId}`)
}

/**
 * Delete lesson from course (Admin only)
 */
export async function deleteLesson(
  courseId: string,
  lessonId: string
): Promise<void> {
  await requireAdmin()

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
      lastUpdated: new Date().toISOString()
    })

  // Revalidate course pages
  revalidatePath(`/courses/${courseId}`)
  revalidatePath(`/sudo/courses/${courseId}`)
}

/**
 * Reorder lessons in course (Admin only)
 */
export async function reorderLessons(
  courseId: string,
  lessonIds: string[]
): Promise<void> {
  await requireAdmin()

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
      lastUpdated: new Date().toISOString()
    })

  // Revalidate course pages
  revalidatePath(`/courses/${courseId}`)
  revalidatePath(`/sudo/courses/${courseId}`)
}
