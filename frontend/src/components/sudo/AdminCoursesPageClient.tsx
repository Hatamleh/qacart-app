import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AdminCoursesTable } from './AdminCoursesTable'
import { Course } from '@/types'
import Link from 'next/link'

interface AdminCoursesPageClientProps {
  courses: Course[]
}

export const AdminCoursesPageClient = ({ courses }: AdminCoursesPageClientProps) => {

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              إدارة الدورات
            </h1>
            <p className="text-muted-foreground">
              إنشاء وتعديل وإدارة الدورات والدروس
            </p>
          </div>
          
          {/* Create New Course Button */}
          <div className="flex gap-3">
            <Link href="/sudo/courses/new">
              <Button
                variant="primary"
                size="md"
                icon={Plus}
                className="shadow-lg hover:shadow-xl"
              >
                إضافة دورة جديدة
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <AdminCoursesTable courses={courses} />
    </>
  )
}
