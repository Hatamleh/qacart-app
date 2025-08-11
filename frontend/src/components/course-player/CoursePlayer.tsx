'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { LessonNavigation } from './LessonNavigation'
import { LessonVideoArea } from './LessonVideoArea'
import { LessonControls } from './LessonControls'
import { LessonArticle } from './LessonArticle'
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
    // TODO: Implement actual completion logic later
  }

  return (
    <div className="flex min-h-screen"> {/* Changed from h-full overflow-hidden to min-h-screen */}
      {/* Lesson Navigation Sidebar - Always visible */}
      <div className="w-80 flex-shrink-0">
        <LessonNavigation
          course={course}
          currentLesson={currentLesson}
          onLessonSelect={navigateToLesson}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col"> {/* Removed h-screen overflow-hidden */}
        {/* Video Area */}
        <div className="flex-shrink-0">
          <LessonVideoArea
            lesson={currentLesson}
            course={course}
          />
        </div>

        {/* Lesson Controls */}
        <div className="flex-shrink-0"> {/* Removed border-b */}
                  <LessonControls
          currentLesson={currentLesson}
          previousLesson={previousLesson}
          nextLesson={nextLesson}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onMarkComplete={handleMarkComplete}
        />
        </div>

        {/* Lesson Article */}
        <div className="flex-1">
          <LessonArticle lesson={currentLesson} />
        </div>
      </div>
    </div>
  )
}
