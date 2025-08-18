'use client'

import Head from 'next/head'
import { AdminUsersPageClient } from '@/components/sudo/AdminUsersPageClient'
import { useUsers } from '@/hooks'

export default function AdminUsersPage() {
  const { users, loading, error, deleteUser, togglePremiumGift } = useUsers()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جارٍ تحميل المستخدمين...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">خطأ في تحميل المستخدمين: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>إدارة المستخدمين - QAcart Admin</title>
        <meta name="description" content="لوحة تحكم إدارة المستخدمين والاشتراكات" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="إدارة المستخدمين - QAcart Admin" />
        <meta property="og:description" content="لوحة تحكم إدارة المستخدمين والاشتراكات" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
      </Head>
      
      {/* Admin Users Content */}
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Client-side component with user management functionality */}
          <AdminUsersPageClient users={users} onDeleteUser={deleteUser} onTogglePremiumGift={togglePremiumGift} />
        </div>
      </main>
    </>
  )
}
