import Link from 'next/link'
import { Edit, Trash2, Clock, Users, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Course } from '@/types'

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
      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="glass rounded-xl p-4 border border-border hover:border-primary/30 transition-all duration-200"
          >
            <div className="grid grid-cols-12 gap-4 items-center">
              
              {/* Course Info */}
              <div className="col-span-4">
                <div className="flex items-start gap-4">
                  {/* Course Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted/50 flex-shrink-0">
                    <img
                      src={course.videoThumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Course Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {course.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                        {course.type}
                      </span>
                      <span className="text-muted-foreground">
                        {course.lessons.length} درس
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="col-span-2 text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{course.durationInMinutes} دقيقة</span>
                </div>
              </div>

              {/* Students Count */}
              <div className="col-span-2 text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{course.studentsCount}</span>
                </div>
              </div>

              {/* Last Updated */}
              <div className="col-span-2 text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{course.lastUpdated}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-2">
                <div className="flex items-center justify-center gap-2">
                  {/* Edit Button */}
                  <Link href={`/sudo/courses/${course.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Edit}
                      className="text-xs px-3 py-2"
                    >
                      تعديل
                    </Button>
                  </Link>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    className="text-xs px-3 py-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            لا توجد دورات
          </h3>
          <p className="text-muted-foreground">
            ابدأ بإضافة أول دورة لك
          </p>
        </div>
      )}
    </div>
  )
}
