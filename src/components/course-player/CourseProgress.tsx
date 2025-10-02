import type { Course } from '@/types'

interface CourseProgressProps {
  course: Course
  progressPercentage: number
  completedLessonsCount: number
  isAuthenticated: boolean
}

export const CourseProgress = ({
  course,
  progressPercentage,
  completedLessonsCount,
  isAuthenticated
}: CourseProgressProps) => {
  // Show authentication required state
  if (!isAuthenticated) {
    return (
      <div className="text-right ml-6">
        <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
          <div className="text-sm text-muted-foreground mb-1">التقدم الإجمالي</div>
          <div className="text-2xl font-bold text-muted-foreground">---%</div>
          <div className="text-xs text-muted-foreground mt-1">
            يجب تسجيل الدخول
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-right ml-6">
      <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
        <div className="text-sm text-muted-foreground mb-1">التقدم الإجمالي</div>
        <div className="text-2xl font-bold text-primary">{progressPercentage}%</div>
        <div className="text-xs text-muted-foreground mt-1">
          {completedLessonsCount} من {course.lessons.length} مكتمل
        </div>
      </div>
    </div>
  )
}
