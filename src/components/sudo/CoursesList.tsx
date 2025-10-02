'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Edit, Trash2, Clock, Users, Calendar, BookOpen } from 'lucide-react'
import { Button, ConfirmationModal } from '@/components/ui'
import { deleteCourse } from '@/actions'
import { Course } from '@/types'

interface CoursesListProps {
  courses: Course[]
  refetch: () => Promise<void>
}

export const CoursesList = ({ courses, refetch }: CoursesListProps) => {
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    courseId: string
    courseTitle: string
  }>({
    isOpen: false,
    courseId: '',
    courseTitle: ''
  })

  // Show confirmation modal
  const showDeleteConfirmation = (courseId: string, courseTitle: string) => {
    setConfirmModal({
      isOpen: true,
      courseId,
      courseTitle
    })
  }

  // Handle course deletion
  const handleDeleteCourse = async () => {
    const { courseId } = confirmModal
    setDeletingCourseId(courseId)

    try {
      await deleteCourse(courseId)
      // Refresh courses list using router refresh
      await refetch()
    } catch (error) {
      console.error('❌ Failed to delete course:', error)
    } finally {
      setDeletingCourseId(null)
      setConfirmModal(prev => ({ ...prev, isOpen: false }))
    }
  }

  return (
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
                {/* Course Icon */}
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary" />
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
                  onClick={() => showDeleteConfirmation(course.id, course.title)}
                  disabled={deletingCourseId === course.id}
                >
                  {deletingCourseId === course.id ? 'جاري الحذف...' : 'حذف'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleDeleteCourse}
        title="حذف الدورة"
        message={`هل أنت متأكد من حذف دورة "${confirmModal.courseTitle}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        confirmText="حذف الدورة"
        cancelText="إلغاء"
        variant="danger"
        isLoading={deletingCourseId === confirmModal.courseId}
      />
    </div>
  )
}
