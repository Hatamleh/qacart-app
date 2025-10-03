import { Metadata } from 'next'
import Link from 'next/link'
import { AdminCourseEditor } from '@/components/sudo/AdminCourseEditor'
import { AdminRouteGuard } from '@/components/auth/AdminRouteGuard'
import { getCourse } from '@/actions'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const course = await getCourse(id)

  return {
    title: `تعديل ${course.title} - QAcart Admin`,
    description: `إدارة وتعديل دورة ${course.title}`,
    robots: 'noindex, nofollow',
    openGraph: {
      title: `تعديل ${course.title} - QAcart Admin`,
      description: `إدارة وتعديل دورة ${course.title}`,
      type: 'website',
      locale: 'ar_SA',
    },
  }
}

export default async function AdminCourseEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = await getCourse(id)

  return (
    <AdminRouteGuard>
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
    </AdminRouteGuard>
  )
}
