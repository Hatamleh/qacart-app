import { Metadata } from 'next'
import { CourseHeader } from '@/components/course-detail/CourseHeader'
import { CourseInfo } from '@/components/course-detail/CourseInfo'
import { CourseLessons } from '@/components/course-detail/CourseLessons'
import { CourseClient } from '@/clients'
import { notFound } from 'next/navigation'

interface CoursePageProps {
  params: Promise<{
    courseId: string
  }>
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { courseId } = await params

  try {
    const course = await CourseClient.getCourseById(courseId)

    return {
      title: `${course.title} - QAcart`,
      description: course.shortDescription,
      keywords: ['دورة', 'اختبار البرمجيات', course.title, `courseId-${courseId}`],
      openGraph: {
        title: `${course.title} - QAcart`,
        description: course.shortDescription,
        type: 'website',
        locale: 'ar_SA',
        images: [
          {
            url: 'https://qacart.com/course-placeholder.jpg',
            width: 800,
            height: 450,
            alt: course.title,
          },
        ],
      },
    }
  } catch {
    // Fallback metadata if course not found
    return {
      title: 'الدورة غير موجودة - QAcart',
      description: 'الدورة المطلوبة غير متاحة حالياً',
    }
  }
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { courseId } = await params

  try {
    // Server-side data fetching using CourseClient
    const course = await CourseClient.getCourseById(courseId)

      return (
        <>
          {/* Course Header */}
          <CourseHeader course={course} />

          {/* Course Information */}
          <CourseInfo course={course} />

          {/* Course Lessons */}
          <CourseLessons lessons={course.lessons} courseId={courseId} />
        </>
      )
  } catch {
    // Course not found - show 404
    notFound()
  }
}
