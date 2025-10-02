'use client'

import { ChevronLeft, ChevronRight, Check, Star } from 'lucide-react'
import { Button } from '../ui/Button'
import { Lesson } from '@/types'

interface LessonControlsProps {
  currentLesson: Lesson
  previousLesson: Lesson | null
  nextLesson: Lesson | null
  onPrevious?: () => void
  onNext?: () => void
  onMarkComplete?: () => void
  isMarkingComplete?: boolean
  afterArticle?: boolean
  isCompleted?: boolean
}

export const LessonControls = ({
  previousLesson,
  nextLesson,
  onPrevious,
  onNext,
  onMarkComplete,
  isMarkingComplete = false,
  afterArticle = false,
  isCompleted = false
}: LessonControlsProps) => {
  const lessonCompleted = isCompleted

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
            variant={lessonCompleted ? "outline" : "primary"}
            onClick={() => onMarkComplete?.()}
            icon={lessonCompleted ? Check : Star}
            iconPosition="left"
            className={`text-sm px-6 ${lessonCompleted ? 'border-green-500 text-green-600 bg-green-50 hover:bg-green-50 cursor-default' : ''}`}
            disabled={isMarkingComplete || lessonCompleted}
          >
            {isMarkingComplete 
              ? 'جارٍ الحفظ...' 
              : lessonCompleted 
                ? 'مكتمل' 
                : 'أكمل الدرس الآن'
            }
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
