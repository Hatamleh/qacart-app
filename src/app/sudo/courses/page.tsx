import { Metadata } from 'next'
import { AdminCoursesPageClient } from '@/components/sudo/AdminCoursesPageClient'
import { AdminRouteGuard } from '@/components/auth/AdminRouteGuard'
import { getCourses } from '@/actions'

export const metadata: Metadata = {
  title: 'إدارة الدورات - QAcart Admin',
  description: 'لوحة تحكم إدارة الدورات والدروس',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'إدارة الدورات - QAcart Admin',
    description: 'لوحة تحكم إدارة الدورات والدروس',
    type: 'website',
    locale: 'ar_SA',
  },
}

export default async function AdminCoursesPage() {
  const courses = await getCourses()

  return (
    <AdminRouteGuard>
      {/* Admin Courses Content */}
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Client-side component with modal functionality */}
          <AdminCoursesPageClient courses={courses} />
        </div>
      </main>
    </AdminRouteGuard>
  )
}
