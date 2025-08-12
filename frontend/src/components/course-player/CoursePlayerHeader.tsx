'use client'

import { ArrowRight, Home, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Course, Lesson } from '@/types/course'

interface CoursePlayerHeaderProps {
  course: Course
  currentLesson: Lesson
}

export const CoursePlayerHeader = ({ course, currentLesson }: CoursePlayerHeaderProps) => {
  // Calculate progress
  const currentLessonIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
  const totalLessons = course.lessons.length
  const progressPercentage = ((currentLessonIndex + 1) / totalLessons) * 100
  
  // Calculate completed lessons (for demo, we'll assume lessons before current are completed)
  const completedLessons = currentLessonIndex + 1

  return (
    <div className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Breadcrumb & Course Info */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            
            {/* Back Button */}
            <Link
              href={`/courses/${course.id}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
            >
              <ArrowRight className="w-4 h-4" />
              <span className="text-sm font-medium">العودة للدورة</span>
            </Link>

            {/* Separator */}
            <div className="w-px h-6 bg-border"></div>

            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
              <Link 
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              <span className="text-muted-foreground/50">/</span>
              <Link 
                href="/courses"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <BookOpen className="w-4 h-4" />
                <span>الدورات</span>
              </Link>
              <span className="text-muted-foreground/50">/</span>
              <span className="text-foreground font-medium truncate max-w-48">
                {course.title}
              </span>
            </nav>
          </div>

          {/* Right: Progress Info */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            
            {/* Current Lesson Info */}
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                {currentLesson.title}
              </div>
              <div className="text-xs text-muted-foreground">
                الدرس {currentLessonIndex + 1} من {totalLessons}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="text-xs text-muted-foreground min-w-max">
                {Math.round(progressPercentage)}%
              </div>
              <div className="w-24 bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground min-w-max">
                {completedLessons}/{totalLessons}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
