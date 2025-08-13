import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AdminCoursesTable } from '@/components/admin/AdminCoursesTable'
import { AdminCoursesPageClient } from '@/components/admin/AdminCoursesPageClient'
import { getAllCourses } from '@/data'

export const metadata: Metadata = {
  title: 'إدارة الدورات - QAcart Admin',
  description: 'لوحة تحكم إدارة الدورات والدروس',
  robots: 'noindex, nofollow', // Admin pages should not be indexed
}

export default function AdminCoursesPage() {
  // Get all courses for admin management
  const courses = getAllCourses()

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Navigation */}
      <Navbar />

      {/* Admin Courses Content */}
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Client-side component with modal functionality */}
          <AdminCoursesPageClient courses={courses} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
