'use client'

import { Lock, Check, Circle, PlayCircle, FileText } from 'lucide-react'
import { Course, Lesson } from '@/types'
import { Button } from '../ui/Button'

interface LessonNavigationProps {
  course: Course
  currentLesson: Lesson | null
  onLessonSelect?: (lesson: Lesson) => void
  completedLessons?: string[]
}

export const LessonNavigation = ({
  course,
  currentLesson,
  onLessonSelect,
  completedLessons = []
}: LessonNavigationProps) => {
  const isLessonCompleted = (lessonId: string) => completedLessons.includes(lessonId)

  return (
    <div className="min-h-screen bg-primary/10 flex flex-col mr-2 rounded-lg"> {/* Added blue background with opacity */}
      {/* Header */}
      <div className="p-4"> {/* Removed border-b border-border */}
        <div className="mb-2">
          <h3 className="font-semibold text-lg">محتوى الدورة</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          {course.lessons.length} درس • {course.durationInMinutes} دقيقة
        </div>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {course.lessons.map((lesson) => {
            const isActive = currentLesson ? lesson.id === currentLesson.id : false
            const isLocked = !lesson.isFree
            const isCompleted = isLessonCompleted(lesson.id)

            return (
              <Button
                key={lesson.id}
                variant="ghost"
                onClick={() => onLessonSelect?.(lesson)}
                className={`w-full text-right p-3 h-auto justify-start border-2 ${
                  isActive
                    ? 'bg-primary/20 hover:bg-primary/25 border-primary shadow-[0_0_8px_rgba(136,192,208,0.4)]'
                    : 'hover:bg-muted/30 border-transparent'
                }`}
              >
                <div className="flex items-start gap-3 w-full">
                  {/* Lesson Status Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {isLocked ? (
                      <div className="w-6 h-6 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-premium" />
                      </div>
                    ) : isCompleted ? (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 flex items-center justify-center">
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div className="flex-1 min-w-0 text-right">
                    <div className={`text-sm font-medium mb-1 ${
                      isActive ? 'text-primary' : 'text-foreground'
                    }`}>
                      {lesson.lessonOrder}. {lesson.title}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {lesson.lessonType === 'video' ? (
                        <PlayCircle className="w-3 h-3" />
                      ) : (
                        <FileText className="w-3 h-3" />
                      )}
                      <span>{lesson.durationInMinutes} دقيقة</span>
                    </div>
                  </div>
                </div>
              </Button>
            )
          })}
        </div>
      </div>


    </div>
  )
}
