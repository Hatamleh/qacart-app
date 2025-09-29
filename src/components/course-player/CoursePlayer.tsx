'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LessonNavigation } from './LessonNavigation'
import { LessonVideoArea } from './LessonVideoArea'
import { LessonControls } from './LessonControls'
import { LessonArticle } from './LessonArticle'
import { CourseInfoSection } from './CourseInfoSection'
import { ProgressNote } from './ProgressNote'
import { useProgressContext } from '@/contexts/ProgressContext'

import type { Course, Lesson } from '@/types'

interface CoursePlayerProps {
  course: Course
  currentLesson: Lesson | null
  courseId: string
}

export const CoursePlayer = ({ 
  course, 
  currentLesson, 
  courseId
}: CoursePlayerProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { markLessonComplete, isAuthenticated } = useProgressContext()
  const [isMarkingComplete, setIsMarkingComplete] = useState(false)

  // Navigation functions
  const navigateToLesson = (lesson: Lesson) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('lesson', lesson.id)
    router.push(`/courses/${courseId}/player?${params.toString()}`)
  }

  const navigateToPreviousLesson = () => {
    if (!currentLesson) return
    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
    if (currentIndex > 0) {
      const previousLesson = course.lessons[currentIndex - 1]
      navigateToLesson(previousLesson)
    }
  }

  const navigateToNextLesson = () => {
    if (!currentLesson) return
    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
    if (currentIndex < course.lessons.length - 1) {
      const nextLesson = course.lessons[currentIndex + 1]
      navigateToLesson(nextLesson)
    }
  }

  const handleMarkComplete = async () => {
    if (!currentLesson) return

    // Check if user is authenticated
    if (!isAuthenticated) {
      console.warn('User must be authenticated to mark lessons complete')
      return
    }

    // Prevent multiple simultaneous completion attempts
    if (isMarkingComplete) {
      return
    }

    try {
      setIsMarkingComplete(true)

      // Mark lesson as complete using the progress hook
      await markLessonComplete(
        currentLesson.id,
        course.lessons.length,
        currentLesson.durationInMinutes // Optional: use lesson duration as time spent
      )

      console.log('✅ Lesson marked complete:', currentLesson.id)

      // Auto-advance to next lesson after successful completion
      // Small delay to allow UI updates to show before navigation
      setTimeout(() => {
        navigateToNextLesson()
      }, 300)

    } catch (error) {
      console.error('❌ Error marking lesson complete:', error)

      // Show user-friendly error message (you can enhance this with toast notifications)
      const errorMessage = error instanceof Error ? error.message : 'فشل في تسجيل إكمال الدرس'
      console.warn('User-facing error:', errorMessage)

      // Don't navigate on error - let user try again
    } finally {
      setIsMarkingComplete(false)
    }
  }
  // Get previous and next lessons for navigation
  const currentIndex = currentLesson ? course.lessons.findIndex(l => l.id === currentLesson.id) : -1
  const previousLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null

  // Check if a lesson has video
  const hasVideo = currentLesson && (currentLesson.isFree || currentLesson.vimeoId)

  return (
    <div className="bg-background">
      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full pt-32">
        {/* Course Info Section */}
        <CourseInfoSection course={course} />

        {/* Progress Note - Under course info */}
        <ProgressNote />

        <div className="flex gap-6">
        {/* Lesson Navigation Sidebar - Always visible */}
        <div className="w-80 flex-shrink-0">
          <LessonNavigation
            course={course}
            currentLesson={currentLesson}
            onLessonSelect={navigateToLesson}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {currentLesson ? (
            <>
              {/* Video Area - Only show if video exists */}
              {hasVideo && (
                <div className="flex-shrink-0">
                  <LessonVideoArea
                    lesson={currentLesson}
                    course={course}
                  />
                </div>
              )}

              {/* Lesson Article */}
              <div className="flex-1">
                <LessonArticle lesson={currentLesson} noTopPadding={!hasVideo} />
              </div>

              {/* Lesson Controls - Always at the bottom after article */}
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
