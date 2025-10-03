'use server'

import { admin } from '@/firebase/admin'
import { requireAuth } from '@/lib/auth'
import { UserProgress, LessonProgressDetail } from '@/types'

/**
 * Get user progress for a course
 */
export async function getProgress(courseId: string): Promise<UserProgress> {
  const userId = await requireAuth()

  const docId = `${userId}_${courseId}`
  const progressDoc = await admin.firestore()
    .collection('progress')
    .doc(docId)
    .get()

  if (!progressDoc.exists) {
    // Return empty progress if none exists
    return {
      userId,
      courseId,
      completedLessons: [],
      progressPercentage: 0,
      totalLessons: 0,
      lessonProgress: {},
      isCompleted: false,
      lastAccessed: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  return progressDoc.data() as UserProgress
}

/**
 * Mark lesson as complete
 */
export async function markLessonComplete(
  courseId: string,
  lessonId: string,
  totalLessons: number,
  timeSpent?: number
): Promise<{ progress: UserProgress }> {
  const userId = await requireAuth()

  const docId = `${userId}_${courseId}`
  const now = new Date().toISOString()

  // Get current progress or create initial if doesn't exist
  const progressDoc = await admin.firestore()
    .collection('progress')
    .doc(docId)
    .get()

  let currentProgress: UserProgress

  if (!progressDoc.exists) {
    // Create initial progress
    currentProgress = {
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
      .set(currentProgress)

    // Update course student count (new student started the course)
    const studentsCount = await admin.firestore()
      .collection('progress')
      .where('courseId', '==', courseId)
      .get()
      .then(snapshot => snapshot.size)

    await admin.firestore()
      .collection('courses')
      .doc(courseId)
      .update({ studentsCount })
  } else {
    currentProgress = progressDoc.data() as UserProgress
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

    return {
      progress: { ...currentProgress, lastAccessed: now, updatedAt: now }
    }
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
  const progress: UserProgress = {
    ...currentProgress,
    ...updateData
  } as UserProgress

  return { progress }
}
