import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CoursesHero } from '@/components/courses/CoursesHero'
import { CoursesGrid } from '@/components/courses/CoursesGrid'
import { getAllCourses } from '@/client/courses'
import {Course} from "@/types/course";

export const metadata: Metadata = {
  title: 'الدورات - QAcart',
  description: 'استكشف دورات اختبار البرمجيات المتاحة في منصة QAcart',
  keywords: ['دورات', 'اختبار البرمجيات', 'تدريب', 'QA', 'Testing'],
  openGraph: {
    title: 'الدورات - QAcart',
    description: 'استكشف دورات اختبار البرمجيات المتاحة في منصة QAcart',
    type: 'website',
    locale: 'ar_SA',
  },
}

export default async function CoursesPage() {
  // Fetch courses using the client
  let courses: Course[] = []
  try {
    courses = await getAllCourses()
  } catch (error) {
    console.error('Failed to load courses:', error)
    // courses remains empty array for graceful fallback
  }

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Navigation */}
      <Navbar />

      {/* Courses Hero Section */}
      <CoursesHero />

      {/* Courses Grid Section */}
      <CoursesGrid courses={courses} />

      {/* Footer */}
      <Footer />
    </div>
  )
}
