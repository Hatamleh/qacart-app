import { LessonNavigation } from './LessonNavigation'
import { LessonVideoArea } from './LessonVideoArea'
import { LessonControls } from './LessonControls'
import { LessonArticle } from './LessonArticle'
import { CourseInfoSection } from './CourseInfoSection'
import { ProgressNote } from './ProgressNote'
import { Navbar } from '../layout/Navbar'
import type { Course, Lesson } from '@/types'

interface CoursePlayerProps {
  course: Course
  currentLesson: Lesson
}

export const CoursePlayer = ({ course, currentLesson }: CoursePlayerProps) => {
  // Get previous and next lessons for navigation
  const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
  const previousLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null

  // Check if a lesson has video
  const hasVideo = currentLesson.isFree || currentLesson.vimeoId

  return (
    <div className="min-h-screen bg-background">
      {/* Standard Navbar */}
      <Navbar />

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
              courseId={course.id}
              afterArticle={true}
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
