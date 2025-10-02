import { Metadata } from 'next'
import { CoursesHero } from '@/components/courses/CoursesHero'
import { CoursesGrid } from '@/components/courses/CoursesGrid'
import { getCourses } from '@/actions'

export const metadata: Metadata = {
  title: 'الدورات - QAcart',
  description: 'استكشف دورات البرمجة، اختبار البرمجيات، والذكاء الاصطناعي المتاحة في منصة QAcart',
  keywords: ['دورات', 'البرمجة', 'اختبار البرمجيات', 'الذكاء الاصطناعي', 'تدريب'],
  openGraph: {
    title: 'الدورات - QAcart',
    description: 'استكشف دورات البرمجة، اختبار البرمجيات، والذكاء الاصطناعي',
    type: 'website',
    locale: 'ar_SA',
  },
}

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <>
      {/* Courses Hero Section */}
      <CoursesHero />

      {/* Courses Grid Section */}
      <CoursesGrid courses={courses} />
    </>
  )
}
