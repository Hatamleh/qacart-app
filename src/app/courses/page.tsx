'use client'

import Head from 'next/head'
import { CoursesHero } from '@/components/courses/CoursesHero'
import { CoursesGrid } from '@/components/courses/CoursesGrid'
import { useCourses } from '@/hooks'

export default function CoursesPage() {
  const { courses, loading, error } = useCourses()

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
        <title>الدورات - QAcart</title>
        <meta name="description" content="استكشف دورات اختبار البرمجيات المتاحة في منصة QAcart" />
        <meta name="keywords" content="دورات, اختبار البرمجيات, تدريب, QA, Testing" />
        <meta property="og:title" content="الدورات - QAcart" />
        <meta property="og:description" content="استكشف دورات اختبار البرمجيات المتاحة في منصة QAcart" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
      </Head>
      
      {/* Courses Hero Section */}
      <CoursesHero />

      {/* Courses Grid Section */}
      <CoursesGrid courses={courses} />
    </>
  )
}
