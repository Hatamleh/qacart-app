'use client'


import { VimeoPlayer } from '../video/VimeoPlayer'
import { AccessGate } from './AccessGate'
import { Course, Lesson } from '@/types'

interface LessonVideoAreaProps {
  lesson: Lesson
  course: Course
}

export const LessonVideoArea = ({
  lesson,
}: LessonVideoAreaProps) => {
  // Hide video area completely if no vimeo ID and lesson is free
  if (lesson.isFree && !lesson.vimeoId) {
    return null
  }

  return (
    <>
      {/* Check if a lesson requires payment and user doesn't have access */}
      {!lesson.isFree ? (
        <AccessGate lesson={lesson} userHasPaidAccess={false} />
      ) : (
        <VimeoPlayer
          vimeoId={lesson.vimeoId!}
          title={lesson.title}
          className="w-full"
        />
      )}
    </>
  )
}
