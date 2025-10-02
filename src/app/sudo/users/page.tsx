import { Metadata } from 'next'
import { AdminUsersPageClient } from '@/components/sudo/AdminUsersPageClient'
import { AdminRouteGuard } from '@/components/auth/AdminRouteGuard'

export const metadata: Metadata = {
  title: 'إدارة المستخدمين - QAcart Admin',
  description: 'لوحة تحكم إدارة المستخدمين والاشتراكات',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'إدارة المستخدمين - QAcart Admin',
    description: 'لوحة تحكم إدارة المستخدمين والاشتراكات',
    type: 'website',
    locale: 'ar_SA',
  },
}

export default function AdminUsersPage() {
  return (
    <AdminRouteGuard>
      {/* Admin Users Content */}
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Client-side component with user management functionality */}
          <AdminUsersPageClient />
        </div>
      </main>
    </AdminRouteGuard>
  )
}
