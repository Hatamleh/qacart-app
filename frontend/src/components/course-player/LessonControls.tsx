'use client'

import { ChevronLeft, ChevronRight, Check, Star } from 'lucide-react'
import { Button } from '../ui/Button'
import { Lesson } from '@/types'
import { currentUserData, userProgressData } from '@/data'

interface LessonControlsProps {
  currentLesson: Lesson
  previousLesson: Lesson | null
  nextLesson: Lesson | null
  courseId?: string
  onPrevious?: () => void
  onNext?: () => void
  onMarkComplete?: () => void
  afterArticle?: boolean
}

export const LessonControls = ({
  currentLesson,
  previousLesson,
  nextLesson,
  courseId,
  onPrevious,
  onNext,
  onMarkComplete,
  afterArticle = false
}: LessonControlsProps) => {
  // Check if the current lesson is completed
  const userProgress = userProgressData.find(
    p => p.userId === currentUserData.id && p.courseId === courseId
  )
  const isLessonCompleted = userProgress ? userProgress.completedLessons.includes(currentLesson.id) : false

  return (
    <div className={`p-6 mx-8 rounded-lg border border-primary/10 bg-muted ${afterArticle ? 'mb-24' : ''}`}>
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {/* Previous Button */}
        <div className="flex-1 flex justify-start">
          <Button
            variant="outline"
            onClick={previousLesson ? () => onPrevious?.() : undefined}
            icon={ChevronRight}
            iconPosition="right"
            className="text-sm"
            disabled={!previousLesson}
          >
            السابق
          </Button>
        </div>

        {/* Mark Complete Button - Center */}
        <div className="flex-1 flex justify-center">
          <Button
            variant={isLessonCompleted ? "secondary" : "primary"}
            onClick={() => onMarkComplete?.()}
            icon={isLessonCompleted ? Check : Star}
            iconPosition="left"
            className="text-sm px-6"
          >
            {isLessonCompleted ? 'مكتمل' : 'أكمل الدرس الآن'}
          </Button>
        </div>

        {/* Next Button */}
        <div className="flex-1 flex justify-end">
          <Button
            variant="outline"
            onClick={nextLesson ? () => onNext?.() : undefined}
            icon={ChevronLeft}
            iconPosition="left"
            className="text-sm"
            disabled={!nextLesson}
          >
            التالي
          </Button>
        </div>
      </div>
    </div>
  )
}
