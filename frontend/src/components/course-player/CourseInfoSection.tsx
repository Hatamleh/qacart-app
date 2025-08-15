import type { Course } from '@/types'
import { CourseDetails } from './CourseDetails'
import { CourseProgress } from './CourseProgress'

interface CourseInfoSectionProps {
  course: Course
}

export const CourseInfoSection = ({ course }: CourseInfoSectionProps) => {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 mb-6 border border-primary/10">
      <div className="flex items-start justify-between">
        {/* Left: Course Details */}
        <CourseDetails course={course} />

        {/* Right: Course Progress */}
        <CourseProgress course={course} />
      </div>
    </div>
  )
}
