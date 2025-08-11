'use client'

import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { Button } from '../ui/Button'
import { Lesson } from '@/types/course'

interface LessonControlsProps {
  currentLesson: Lesson
  previousLesson: Lesson | null
  nextLesson: Lesson | null
  onPrevious: () => void
  onNext: () => void
  onMarkComplete: () => void
}

export const LessonControls = ({
  currentLesson,
  previousLesson,
  nextLesson,
  onPrevious,
  onNext,
  onMarkComplete
}: LessonControlsProps) => {
  return (
    <div className="bg-background p-6 mx-6">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {/* Previous Button */}
        <div className="flex-1 flex justify-start">
          {previousLesson ? (
            <Button
              variant="outline"
              onClick={onPrevious}
              icon={ChevronRight}
              iconPosition="right"
              className="text-sm"
            >
              السابق
            </Button>
          ) : (
            <div /> // Empty div for spacing
          )}
        </div>

        {/* Mark Complete Button - Center */}
        <div className="flex-1 flex justify-center">
          <Button
            variant={currentLesson.isCompleted ? "secondary" : "primary"}
            onClick={onMarkComplete}
            icon={Check}
            iconPosition="left"
            className="text-sm px-6"
          >
            {currentLesson.isCompleted ? 'مكتمل' : 'تم الانتهاء'}
          </Button>
        </div>

        {/* Next Button */}
        <div className="flex-1 flex justify-end">
          {nextLesson ? (
            <Button
              variant="outline"
              onClick={onNext}
              icon={ChevronLeft}
              iconPosition="left"
              className="text-sm"
            >
              التالي
            </Button>
          ) : (
            <div /> // Empty div for spacing
          )}
        </div>
      </div>
    </div>
  )
}
