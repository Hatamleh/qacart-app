import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AdminUsersPageClient } from '@/components/sudo/AdminUsersPageClient'
import { usersData } from '@/data'

export const metadata: Metadata = {
  title: 'إدارة المستخدمين - QAcart Admin',
  description: 'لوحة تحكم إدارة المستخدمين والاشتراكات',
  robots: 'noindex, nofollow', // Admin pages should not be indexed
}

export default function AdminUsersPage() {

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Navigation */}
      <Navbar />

      {/* Admin Users Content */}
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Client-side component with user management functionality */}
          <AdminUsersPageClient users={usersData} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
