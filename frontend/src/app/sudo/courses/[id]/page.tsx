'use client'

import Head from 'next/head'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { AdminCourseEditor } from '@/components/sudo/AdminCourseEditor'
import { useCourse } from '@/hooks'

export default function AdminCourseEditPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  
  const { course, loading, error } = useCourse(courseId)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جارٍ تحميل الدورة...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">خطأ في تحميل الدورة: {error}</p>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              إعادة المحاولة
            </button>
            <button 
              onClick={() => router.push('/sudo/courses')} 
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              العودة للقائمة
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return null
  }

  return (
    <>
      <Head>
        <title>{`تعديل ${course.title} - QAcart Admin`}</title>
        <meta name="description" content={`إدارة وتعديل دورة ${course.title}`} />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={`تعديل ${course.title} - QAcart Admin`} />
        <meta property="og:description" content={`إدارة وتعديل دورة ${course.title}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
      </Head>
      
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
}
