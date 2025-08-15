import type { Course } from '@/types'
import { currentUserData, userProgressData } from '@/data'

interface CourseProgressProps {
  course: Course
}

export const CourseProgress = ({ course }: CourseProgressProps) => {
  // Get current user's progress for this course
  const userProgress = userProgressData.find(
    p => p.userId === currentUserData.id && p.courseId === course.id
  )
  const completedLessonsCount = userProgress ? userProgress.completedLessons.length : 0
  const progressPercentage = Math.round((completedLessonsCount / course.lessons.length) * 100)

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
