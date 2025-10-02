import { Metadata } from 'next'
import { AdminUsersPageClient } from '@/components/sudo/AdminUsersPageClient'
import { AdminRouteGuard } from '@/components/auth/AdminRouteGuard'
import { getUsers } from '@/actions'

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

export default async function AdminUsersPage({
  searchParams
}: {
  searchParams: Promise<{ filter?: string; search?: string; offset?: string }>
}) {
  const params = await searchParams
  const filter = (params.filter || 'all') as 'all' | 'premium' | 'free' | 'gifted'
  const search = params.search || ''
  const offset = parseInt(params.offset || '0')

  // Fetch initial users data
  const initialData = await getUsers({
    filter,
    search,
    offset,
    limit: 20
  })

  return (
    <AdminRouteGuard>
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <AdminUsersPageClient initialData={initialData} />
        </div>
      </main>
    </AdminRouteGuard>
  )
}
