'use client'


import { VimeoPlayer } from '../video/VimeoPlayer'
import { AccessGate } from './AccessGate'
import { Course, Lesson } from '@/types/course'

interface LessonVideoAreaProps {
  lesson: Lesson
  course: Course
}

export const LessonVideoArea = ({
  lesson,
}: LessonVideoAreaProps) => {
  // Hide video area completely if no video URL and lesson is free
  if (lesson.isFree && !lesson.videoUrl) {
    return null
  }

  return (
    <div className="relative bg-background">
      {/* Video Player or Access Gate */}
      <div className="w-full">
        {/* Check if lesson requires payment and user doesn't have access */}
        {!lesson.isFree ? (
          <AccessGate lesson={lesson} userHasPaidAccess={false} />
        ) : (
          <VimeoPlayer
            vimeoId={lesson.videoUrl!}
            title={lesson.title}
            className="w-full"
          />
        )}
      </div>
    </div>
  )
}
