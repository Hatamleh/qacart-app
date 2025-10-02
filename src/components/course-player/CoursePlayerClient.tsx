'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LessonNavigation } from './LessonNavigation'
import { LessonVideoArea } from './LessonVideoArea'
import { LessonControls } from './LessonControls'
import { LessonArticle } from './LessonArticle'
import { CourseInfoSection } from './CourseInfoSection'
import { ProgressNote } from './ProgressNote'
import { markLessonComplete as markLessonCompleteAction } from '@/actions'
import { useAuth } from '@/contexts/AuthContext'
import type { Course, Lesson, UserProgress } from '@/types'

interface CoursePlayerClientProps {
  course: Course
  currentLesson: Lesson | null
  initialProgress: UserProgress | null
}

export const CoursePlayerClient = ({
  course,
  currentLesson,
  initialProgress
}: CoursePlayerClientProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [progress, setProgress] = useState(initialProgress)
  const [isMarkingComplete, setIsMarkingComplete] = useState(false)

  const isAuthenticated = !!user

  // Helper to check if lesson is completed
  const isLessonCompleted = (lessonId: string): boolean => {
    return progress?.completedLessons?.includes(lessonId) || false
  }

  // Navigation functions
  const navigateToLesson = (lesson: Lesson) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('lesson', lesson.id)
    router.push(`/courses/${course.id}/player?${params.toString()}`)
  }

  const navigateToPreviousLesson = () => {
    if (!currentLesson) return
    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
    if (currentIndex > 0) {
      navigateToLesson(course.lessons[currentIndex - 1])
    }
  }

  const navigateToNextLesson = () => {
    if (!currentLesson) return
    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
    if (currentIndex < course.lessons.length - 1) {
      navigateToLesson(course.lessons[currentIndex + 1])
    }
  }

  const handleMarkComplete = async () => {
    if (!currentLesson || !isAuthenticated || isMarkingComplete) return

    setIsMarkingComplete(true)

    try {
      // Optimistic update
      if (progress && !progress.completedLessons.includes(currentLesson.id)) {
        setProgress({
          ...progress,
          completedLessons: [...progress.completedLessons, currentLesson.id],
          progressPercentage: Math.round(
            ((progress.completedLessons.length + 1) / course.lessons.length) * 100
          ),
          isCompleted: progress.completedLessons.length + 1 === course.lessons.length,
          updatedAt: new Date().toISOString()
        })
      }

      // Call server action
      const result = await markLessonCompleteAction(
        course.id,
        currentLesson.id,
        course.lessons.length,
        currentLesson.durationInMinutes
      )

      // Update with server response
      setProgress(result.progress)

      // Auto-advance to next lesson
      setTimeout(() => {
        navigateToNextLesson()
      }, 300)

    } catch (error) {
      console.error('Error marking lesson complete:', error)
      // Rollback optimistic update
      setProgress(initialProgress)
    } finally {
      setIsMarkingComplete(false)
    }
  }

  // Get previous and next lessons for navigation
  const currentIndex = currentLesson ? course.lessons.findIndex(l => l.id === currentLesson.id) : -1
  const previousLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null

  return (
    <div className="bg-background">
      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full pt-32">
        {/* Course Info Section */}
        <CourseInfoSection
          course={course}
          progressPercentage={progress?.progressPercentage || 0}
          completedLessonsCount={progress?.completedLessons.length || 0}
          isAuthenticated={isAuthenticated}
        />

        {/* Progress Note */}
        <ProgressNote />

        <div className="flex gap-6 items-start">
          {/* Lesson Navigation Sidebar */}
          <div className="w-80 flex-shrink-0">
            <LessonNavigation
              course={course}
              currentLesson={currentLesson}
              onLessonSelect={navigateToLesson}
              completedLessons={progress?.completedLessons || []}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {currentLesson ? (
              <>
                {/* Video Lesson */}
                {currentLesson.lessonType === 'video' && (
                  <LessonVideoArea lesson={currentLesson} course={course} />
                )}

                {/* Article Lesson */}
                {currentLesson.lessonType === 'article' && (
                  <div className="flex-1">
                    <LessonArticle lesson={currentLesson} noTopPadding={true} />
                  </div>
                )}

                {/* Lesson Controls */}
                <div className="flex-shrink-0">
                  <LessonControls
                    currentLesson={currentLesson}
                    previousLesson={previousLesson}
                    nextLesson={nextLesson}
                    onPrevious={navigateToPreviousLesson}
                    onNext={navigateToNextLesson}
                    onMarkComplete={handleMarkComplete}
                    isMarkingComplete={isMarkingComplete}
                    afterArticle={true}
                    isCompleted={isLessonCompleted(currentLesson.id)}
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>اختر درساً من القائمة للبدء</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
