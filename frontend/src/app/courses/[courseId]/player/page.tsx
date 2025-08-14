import { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { CoursePlayer } from '@/components/course-player/CoursePlayer'
import { coursesData } from '@/data'

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
  const course = coursesData.find(c => c.id === courseId) || coursesData[0]

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
}

export default async function CoursePlayerPage({ params, searchParams }: CoursePlayerPageProps) {
  const { courseId } = await params
  const { lesson } = await searchParams

  const course = coursesData.find(c => c.id === courseId) || coursesData[0]
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
}
