'use client'

import { Lock, Check, Clock, Circle } from 'lucide-react'
import { Course, Lesson, formatDuration } from '@/types/course'
import { Button } from '../ui/Button'

interface LessonNavigationProps {
  course: Course
  currentLesson: Lesson
  onLessonSelect: (lesson: Lesson) => void
}

export const LessonNavigation = ({ 
  course, 
  currentLesson, 
  onLessonSelect
}: LessonNavigationProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col mr-2"> {/* Changed from h-screen to min-h-screen */}
      {/* Header */}
      <div className="p-4"> {/* Removed border-b border-border */}
        <div className="mb-2">
          <h3 className="font-semibold text-lg">محتوى الدورة</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          {course.lessons.length} درس • {formatDuration(course.durationInMinutes)}
        </div>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {course.lessons.map((lesson) => {
            const isActive = lesson.id === currentLesson.id
            const isLocked = !lesson.isFree
            const isCompleted = lesson.isCompleted || false

            return (
              <Button
                key={lesson.id}
                variant="ghost"
                onClick={() => onLessonSelect(lesson)}
                className={`w-full text-right p-3 h-auto justify-start ${
                  isActive 
                    ? 'bg-primary/10 border border-primary/20 hover:bg-primary/15' 
                    : 'hover:bg-muted/30'
                }`}
              >
                <div className="flex items-start gap-3 w-full">
                  {/* Lesson Status Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {isLocked ? (
                      <div className="w-6 h-6 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-muted-foreground" />
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
                  <div className="flex-1 min-w-0 text-left">
                    <div className={`text-sm font-medium mb-1 ${
                      isActive ? 'text-primary' : 'text-foreground'
                    }`}>
                      {lesson.lessonOrder}. {lesson.title}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatDuration(lesson.durationInMinutes)}</span>
                    </div>
                  </div>
                </div>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Course Info Footer */}
      <div className="p-4"> {/* Removed border-t border-border */}
        <div className="text-center">
          <h4 className="font-medium text-sm mb-1">{course.title}</h4>
          <div className="text-xs text-muted-foreground">
            بواسطة {course.instructor.name}
          </div>
        </div>
      </div>
    </div>
  )
}
