import type { Course } from '@/types'
import { currentUserData, userProgressData } from '@/data'

interface CourseInfoSectionProps {
  course: Course
}

export const CourseInfoSection = ({ course }: CourseInfoSectionProps) => {
  // Get current user's progress for this course
  const userProgress = userProgressData.find(
    p => p.userId === currentUserData.id && p.courseId === course.id
  )
  const completedLessonsCount = userProgress ? userProgress.completedLessons.length : 0
  const progressPercentage = Math.round((completedLessonsCount / course.lessons.length) * 100)
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 mb-6 border border-primary/10">
      <div className="flex items-start justify-between">
        {/* Left: Course Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground mb-2">{course.title}</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed max-w-3xl">{course.shortDescription}</p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-muted-foreground">آخر تحديث: {course.lastUpdated}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-muted-foreground">{course.lessons.length} فيديو</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-muted-foreground">{Math.floor(course.durationInMinutes / 60)} ساعة {course.durationInMinutes % 60} دقيقة</span>
            </div>
          </div>
        </div>

        {/* Right: Course Progress */}
        <div className="text-right ml-6">
          <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
            <div className="text-sm text-muted-foreground mb-1">التقدم الإجمالي</div>
            <div className="text-2xl font-bold text-primary">{progressPercentage}%</div>
            <div className="text-xs text-muted-foreground mt-1">
              {completedLessonsCount} من {course.lessons.length} مكتمل
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
