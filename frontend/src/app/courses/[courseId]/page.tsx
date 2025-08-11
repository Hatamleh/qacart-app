import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CourseHeader } from '@/components/course-detail/CourseHeader'
import { CourseInfo } from '@/components/course-detail/CourseInfo'
import { CourseLessons } from '@/components/course-detail/CourseLessons'
import { getCourseById } from '@/client/courses'
import { notFound } from 'next/navigation'

interface CoursePageProps {
  params: Promise<{
    courseId: string
  }>
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { courseId } = await params
  
  try {
    const course = await getCourseById(courseId)
    
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
            url: course.videoThumbnail,
            width: 800,
            height: 450,
            alt: course.title,
          },
        ],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'دورة غير موجودة - QAcart',
      description: 'لم يتم العثور على الدورة المطلوبة',
    }
  }
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { courseId } = await params
  
  // Fetch course data using the client
  let course
  try {
    course = await getCourseById(courseId)
  } catch (error) {
    console.error(`Failed to load course ${courseId}:`, error)
    // Return 404 if course not found
    notFound()
  }

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Navigation */}
      <Navbar />

      {/* Course Header */}
      <CourseHeader course={course} />

      {/* Course Information */}
      <CourseInfo course={course} />

      {/* Course Lessons */}
      <CourseLessons lessons={course.lessons} />

      {/* Footer */}
      <Footer />
    </div>
  )
}