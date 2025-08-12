'use client'

import { Home, BookOpen, PlayCircle } from 'lucide-react'
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

  return (
    <div className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Breadcrumb & Course Info */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-4 rtl:space-x-reverse text-sm">
              <Link 
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                <span>الصفحة الرئيسية</span>
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
              <span className="text-muted-foreground hover:text-foreground transition-colors truncate max-w-48 flex items-center gap-1 ml-2">
                <PlayCircle className="w-4 h-4" />
                {course.title}
              </span>
            </nav>
          </div>

          {/* Right: Lesson Info */}
          <div className="text-right">
            <div className="text-sm font-medium text-foreground flex items-center gap-2">
              <span>{currentLesson.title}</span>
              <span className="text-xs text-muted-foreground">
                الدرس {currentLessonIndex + 1} من {totalLessons}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
