import { Course } from '@/types'
import { CoursesList } from './CoursesList'
import { EmptyCoursesState } from './EmptyCoursesState'

interface AdminCoursesTableProps {
  courses: Course[]
}

export const AdminCoursesTable = ({ courses }: AdminCoursesTableProps) => {

  return (
    <div className="space-y-6">
      {/* Table Header */}
      <div className="bg-muted/30 rounded-xl p-4">
        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-muted-foreground">
          <div className="col-span-4">الدورة</div>
          <div className="col-span-2 text-center">المدة</div>
          <div className="col-span-2 text-center">الطلاب</div>
          <div className="col-span-2 text-center">آخر تحديث</div>
          <div className="col-span-2 text-center">الإجراءات</div>
        </div>
      </div>

      {/* Courses List */}
      {courses.length > 0 ? (
        <CoursesList courses={courses} />
      ) : (
        <EmptyCoursesState />
      )}
    </div>
  )
}
