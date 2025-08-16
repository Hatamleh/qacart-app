import { Metadata } from 'next'
import Link from 'next/link'
import { AdminCourseEditor } from '@/components/sudo/AdminCourseEditor'
import { CourseClient } from '@/clients/course.client'
import { notFound } from 'next/navigation'

interface AdminCourseEditPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: AdminCourseEditPageProps): Promise<Metadata> {
  const { id } = await params

  try {
    const course = await CourseClient.getCourseById(id)

    return {
      title: `تعديل ${course.title} - QAcart Admin`,
      description: `إدارة وتعديل دورة ${course.title}`,
      robots: 'noindex, nofollow', // Admin pages should not be indexed
    }
  } catch {
    return {
      title: 'الدورة غير موجودة - QAcart Admin',
      description: 'الدورة المطلوبة غير متاحة حالياً',
      robots: 'noindex, nofollow',
    }
  }
}

export default async function AdminCourseEditPage({ params }: AdminCourseEditPageProps) {
  const { id } = await params

  try {
    // Server-side data fetching using CourseClient
    const course = await CourseClient.getCourseById(id)

    return (
      <>
        {/* Admin Course Editor */}
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">

          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/sudo/courses" className="hover:text-primary transition-colors">
                إدارة الدورات
              </Link>
              <span>/</span>
              <span className="text-foreground">تعديل الدورة</span>
            </div>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              تعديل الدورة
            </h1>
            <p className="text-muted-foreground">
              تعديل تفاصيل الدورة وإدارة الدروس
            </p>
          </div>

          {/* Course Editor Component */}
          <AdminCourseEditor course={course} />
        </div>
      </main>
      </>
    )
  } catch {
    // Course isn't found - show 404
    notFound()
  }
}
