import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CourseHeader } from '@/components/course-detail/CourseHeader'
import { CourseInfo } from '@/components/course-detail/CourseInfo'
import { CourseLessons } from '@/components/course-detail/CourseLessons'
import { coursesData } from '@/data'

interface CoursePageProps {
  params: Promise<{
    courseId: string
  }>
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { courseId } = await params
  const course = coursesData.find(c => c.id === parseInt(courseId)) || coursesData[0]
  
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
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { courseId } = await params
  const course = coursesData.find(c => c.id === parseInt(courseId)) || coursesData[0]

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Navigation */}
      <Navbar />

      {/* Course Header */}
      <CourseHeader course={course} />

      {/* Course Information */}
      <CourseInfo course={course} />

      {/* Course Lessons */}
      <CourseLessons lessons={course.lessons} courseId={courseId} />

      {/* Footer */}
      <Footer />
    </div>
  )
}