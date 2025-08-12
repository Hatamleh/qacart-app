'use client'

import { ChevronLeft, ChevronRight, Check, Star } from 'lucide-react'
import { Button } from '../ui/Button'
import { Lesson } from '@/types/course'

interface LessonControlsProps {
  currentLesson: Lesson
  previousLesson: Lesson | null
  nextLesson: Lesson | null
  onPrevious: () => void
  onNext: () => void
  onMarkComplete: () => void
  afterArticle?: boolean
}

export const LessonControls = ({
  currentLesson,
  previousLesson,
  nextLesson,
  onPrevious,
  onNext,
  onMarkComplete,
  afterArticle = false
}: LessonControlsProps) => {
  return (
    <div className={`p-6 mx-8 rounded-lg border border-primary/10 ${afterArticle ? 'mb-24' : ''}`} style={{ backgroundColor: '#152038' }}>
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {/* Previous Button */}
        <div className="flex-1 flex justify-start">
          <Button
            variant="outline"
            onClick={previousLesson ? onPrevious : undefined}
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
            variant={currentLesson.isCompleted ? "secondary" : "primary"}
            onClick={onMarkComplete}
            icon={currentLesson.isCompleted ? Check : Star}
            iconPosition="left"
            className="text-sm px-6"
          >
            {currentLesson.isCompleted ? 'مكتمل' : 'أكمل الدرس الآن'}
          </Button>
        </div>

        {/* Next Button */}
        <div className="flex-1 flex justify-end">
          <Button
            variant="outline"
            onClick={nextLesson ? onNext : undefined}
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
