'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LessonNavigation } from './LessonNavigation'
import { LessonVideoArea } from './LessonVideoArea'
import { LessonControls } from './LessonControls'
import { LessonArticle } from './LessonArticle'
import { CourseInfoSection } from './CourseInfoSection'
import { Navbar } from '../layout/Navbar'
import { Course, Lesson } from '@/types/course'

interface CoursePlayerProps {
  course: Course
  currentLesson: Lesson
}

export const CoursePlayer = ({ course, currentLesson: initialLesson }: CoursePlayerProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentLesson, setCurrentLesson] = useState<Lesson>(initialLesson)

  // Update current lesson when URL changes
  useEffect(() => {
    const lessonParam = searchParams.get('lesson')
    if (lessonParam) {
      const lessonId = parseInt(lessonParam)
      const lesson = course.lessons.find(l => l.id === lessonId)
      if (lesson) {
        setCurrentLesson(lesson)
      }
    }
  }, [searchParams, course.lessons])

  // Navigate to a specific lesson
  const navigateToLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson)
    router.push(`/courses/${course.id}/player?lesson=${lesson.id}`)
  }

  // Get previous and next lessons
  const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
  const previousLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null

  // Handle previous/next navigation
  const handlePrevious = () => {
    if (previousLesson) {
      navigateToLesson(previousLesson)
    }
  }

  const handleNext = () => {
    if (nextLesson) {
      navigateToLesson(nextLesson)
    }
  }

  // Simple mark as complete handler (just for UI demo)
  const handleMarkComplete = () => {
    console.log('Lesson marked as complete:', currentLesson.title)
    // Note: Completion logic will be implemented with backend integration
  }

  // Check if lesson has video
  const hasVideo = !currentLesson.isFree || currentLesson.videoUrl

  return (
    <div className="min-h-screen bg-background">
      {/* Standard Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full pt-32">
        {/* Course Info Section */}
        <CourseInfoSection course={course} />

        {/* Progress Note - Under course info */}
        <div className="bg-muted/30 border border-muted/50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-foreground text-sm leading-relaxed">
              <span className="font-semibold">تذكير:</span> لا تنس الضغط على زر &quot;أكمل الدرس الآن&quot; في نهاية الدرس لتحديث تقدمك في الدورة.
            </p>
          </div>
        </div>

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
              onPrevious={handlePrevious}
              onNext={handleNext}
              onMarkComplete={handleMarkComplete}
              afterArticle={true}
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
