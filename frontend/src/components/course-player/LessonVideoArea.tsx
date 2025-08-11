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
  course
}: LessonVideoAreaProps) => {
  return (
    <div className="relative bg-background p-6">
      {/* Video Player or Access Gate */}
      <div className="w-full">
        {/* Check if lesson requires payment and user doesn't have access */}
        {!lesson.isFree ? (
          <AccessGate lesson={lesson} userHasPaidAccess={false} />
        ) : lesson.videoUrl ? (
          <VimeoPlayer
            vimeoId={lesson.videoUrl}
            title={lesson.title}
            className="w-full"
            autoplay={false}
          />
        ) : (
          // Placeholder when no video URL for free lessons
          <div className="w-full h-96 md:h-[500px] lg:h-[600px] bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="text-lg mb-2">لا يوجد فيديو متاح</div>
              <div className="text-sm">سيتم إضافة الفيديو قريباً</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
