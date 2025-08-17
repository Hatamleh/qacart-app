'use client'

import { useParams, useRouter } from 'next/navigation'
import Head from 'next/head'
import { CourseHeader } from '@/components/course-detail/CourseHeader'
import { CourseInfo } from '@/components/course-detail/CourseInfo'
import { CourseLessons } from '@/components/course-detail/CourseLessons'
import { useCourse } from '@/hooks'

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  
  const { course, loading, error } = useCourse(courseId)

  if (loading) {
    return (
      <>
        <Head>
          <title>جارٍ التحميل... - QAcart</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">جارٍ تحميل تفاصيل الدورة...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || (!loading && !course)) {
    return (
      <>
        <Head>
          <title>الدورة غير موجودة - QAcart</title>
          <meta name="description" content="الدورة المطلوبة غير متاحة حالياً" />
        </Head>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">الدورة غير موجودة</h1>
            <p className="text-muted-foreground mb-4">
              {error || 'الدورة المطلوبة غير متاحة حالياً'}
            </p>
            <button
              onClick={() => router.push('/courses')}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              العودة إلى الدورات
            </button>
          </div>
        </div>
      </>
    )
  }

  if (!course) {
    return null 
  }

  return (
    <>
      <Head>
        <title>{course.title} - QAcart</title>
        <meta name="description" content={course.shortDescription} />
        <meta name="keywords" content={`دورة, اختبار البرمجيات, ${course.title}`} />
        <meta property="og:title" content={`${course.title} - QAcart`} />
        <meta property="og:description" content={course.shortDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:image" content="https://qacart.com/course-placeholder.jpg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="450" />
        <meta property="og:image:alt" content={course.title} />
      </Head>

      {/* Course Header */}
      <CourseHeader course={course} />

      {/* Course Information */}
      <CourseInfo course={course} />

      {/* Course Lessons */}
      <CourseLessons lessons={course.lessons} courseId={courseId} />
    </>
  )
}
