import { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AdminCourseEditor } from '@/components/admin/AdminCourseEditor'
import { getCourseById } from '@/data'

interface AdminCourseEditPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: AdminCourseEditPageProps): Promise<Metadata> {
  const { id } = await params
  const course = getCourseById(id)
  
  return {
    title: `تعديل ${course.title} - QAcart Admin`,
    description: `إدارة وتعديل دورة ${course.title}`,
    robots: 'noindex, nofollow', // Admin pages should not be indexed
  }
}

export default async function AdminCourseEditPage({ params }: AdminCourseEditPageProps) {
  const { id } = await params
  const course = getCourseById(id)

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Navigation */}
      <Navbar />

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

      {/* Footer */}
      <Footer />
    </div>
  )
}
