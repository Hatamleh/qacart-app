'use client'

import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Head from 'next/head'
import { CoursePlayer } from '@/components/course-player/CoursePlayer'
import { useCourse } from '@/hooks'

export default function CoursePlayerPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const lessonId = searchParams.get('lesson')
  
  const { course, loading, error } = useCourse(courseId)

  if (loading) {
    return (
      <>
        <Head>
          <title>جارٍ التحميل... - QAcart</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-white">جارٍ تحميل مشغل الدورة...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || !course) {
    return (
      <>
        <Head>
          <title>الدورة غير موجودة - QAcart</title>
          <meta name="description" content="الدورة المطلوبة غير متاحة حالياً" />
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-white">الدورة غير موجودة</h1>
            <p className="text-gray-300 mb-4">
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

  const currentLessonId = lessonId || course.lessons[0]?.id
  const currentLesson = course.lessons.find(l => l.id === currentLessonId) || course.lessons[0]

  return (
    <>
      <Head>
        <title>تشغيل {course.title} - QAcart</title>
        <meta name="description" content={`تعلم ${course.title} خطوة بخطوة`} />
        <meta name="keywords" content={`دورة, تعلم, ${course.title}`} />
        <meta property="og:title" content={`تشغيل ${course.title} - QAcart`} />
        <meta property="og:description" content={`تعلم ${course.title} خطوة بخطوة`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
      </Head>

      <CoursePlayer
        course={course}
        currentLesson={currentLesson}
        courseId={courseId}
      />
    </>
  )
}
