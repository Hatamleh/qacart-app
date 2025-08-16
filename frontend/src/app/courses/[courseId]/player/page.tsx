import { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { CoursePlayer } from '@/components/course-player/CoursePlayer'
import { CourseClient } from '@/clients'
import { notFound } from 'next/navigation'

interface CoursePlayerPageProps {
  params: Promise<{
    courseId: string
  }>
  searchParams: Promise<{
    lesson?: string
  }>
}

export async function generateMetadata({ params }: CoursePlayerPageProps): Promise<Metadata> {
  const { courseId } = await params

  try {
    const course = await CourseClient.getCourseById(courseId)

    return {
      title: `تشغيل ${course.title} - QAcart`,
      description: `تعلم ${course.title} خطوة بخطوة`,
      keywords: ['دورة', 'تعلم', course.title, `courseId-${courseId}`],
      openGraph: {
        title: `تشغيل ${course.title} - QAcart`,
        description: `تعلم ${course.title} خطوة بخطوة`,
        type: 'website',
        locale: 'ar_SA',
      },
    }
  } catch {
    return {
      title: 'الدورة غير موجودة - QAcart',
      description: 'الدورة المطلوبة غير متاحة حالياً',
    }
  }
}

export default async function CoursePlayerPage({ params, searchParams }: CoursePlayerPageProps) {
  const { courseId } = await params
  const { lesson } = await searchParams

  try {
    // Server-side data fetching using CourseClient
    const course = await CourseClient.getCourseById(courseId)
    const currentLessonId = lesson || course.lessons[0].id
    const currentLesson = course.lessons.find(l => l.id === currentLessonId) || course.lessons[0]

    return (
      <div className="min-h-screen bg-background flex flex-col" dir="rtl">
        <div className="flex-1">
          <CoursePlayer
            course={course}
            currentLesson={currentLesson}
          />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    )
  } catch {
    // Course not found - show 404
    notFound()
  }
}
