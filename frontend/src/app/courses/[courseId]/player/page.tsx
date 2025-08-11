import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CoursePlayer } from '@/components/course-player/CoursePlayer'
import { getCourseById } from '@/client/courses'
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
    const course = await getCourseById(courseId)
    
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
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'مشغل الدورة - QAcart',
      description: 'تعلم مع مشغل الدورات التفاعلي',
    }
  }
}

export default async function CoursePlayerPage({ params, searchParams }: CoursePlayerPageProps) {
  const { courseId } = await params
  const { lesson } = await searchParams
  
  // Fetch course data
  let course
  try {
    course = await getCourseById(courseId)
  } catch (error) {
    console.error(`Failed to load course ${courseId}:`, error)
    notFound()
  }

  // Get current lesson ID - default to first lesson if not specified
  const currentLessonId = lesson ? parseInt(lesson) : course.lessons[0]?.id

  // Find current lesson
  const currentLesson = course.lessons.find(l => l.id === currentLessonId)
  if (!currentLesson) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Navigation */}
      <Navbar />

      {/* Course Player - Takes remaining space */}
      <div className="flex-1 pt-20"> {/* Add top padding to account for fixed navbar */}
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
