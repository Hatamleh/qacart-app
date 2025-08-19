'use client'

import Head from 'next/head'
import { AdminCoursesPageClient } from '@/components/sudo/AdminCoursesPageClient'
import { AdminRouteGuard } from '@/components/auth/AdminRouteGuard'
import { useCourses } from '@/hooks'

export default function AdminCoursesPage() {
  return (
    <AdminRouteGuard>
      <AdminCoursesPageContent />
    </AdminRouteGuard>
  )
}

function AdminCoursesPageContent() {
  const { courses, loading, error } = useCourses({ admin: true })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جارٍ تحميل الدورات...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">خطأ في تحميل الدورات: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>إدارة الدورات - QAcart Admin</title>
        <meta name="description" content="لوحة تحكم إدارة الدورات والدروس" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="إدارة الدورات - QAcart Admin" />
        <meta property="og:description" content="لوحة تحكم إدارة الدورات والدروس" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
      </Head>
      
      {/* Admin Courses Content */}
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Client-side component with modal functionality */}
          <AdminCoursesPageClient courses={courses} />
        </div>
      </main>
    </>
  )
}
