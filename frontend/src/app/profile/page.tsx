'use client'

import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ProfileWelcome } from '@/components/profile/ProfileWelcome'
import { UserInfo } from '@/components/profile/UserInfo'
import { ManageAccountSection } from '@/components/profile/ManageAccountSection'
import { FAQSection } from '@/components/profile/FAQSection'
import { ContactSection } from '@/components/profile/ContactSection'
import { DangerZoneSection } from '@/components/profile/DangerZoneSection'
import { useAuth } from '@/contexts/AuthContext'
import { faqData } from '@/data'

export default function ProfilePage() {
  const { user, isLoading, isInitialized } = useAuth()
  const router = useRouter()

  // Redirect to auth if not logged in
  useEffect(() => {
    if (isInitialized && !user) {
      router.push('/auth')
    }
  }, [isInitialized, user, router])

  // Show loading state
  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جارٍ تحميل الملف الشخصي...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if redirecting
  if (!user) {
    return null
  }

  // Check if user has active premium subscription
  const isPremium = user.subscription.status === 'premium' && user.subscription.isActive

  return (
    <>
      <Head>
        <title>الملف الشخصي - QAcart</title>
        <meta name="description" content="إدارة حسابك وبياناتك الشخصية في QAcart" />
        <meta name="keywords" content="ملف شخصي, حساب, إدارة, QAcart" />
        <meta property="og:title" content="الملف الشخصي - QAcart" />
        <meta property="og:description" content="إدارة حسابك وبياناتك الشخصية في QAcart" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
      </Head>
      
      {/* Main Content */}
      <main className="py-32 lg:py-40">
        <div className="container mx-auto px-6 max-w-4xl">

          {/* Welcome Section */}
          <ProfileWelcome />

          {/* User Info - Pass real user data */}
          <UserInfo user={user} />

          {/* Manage Account - Only show for premium users */}
          {isPremium && <ManageAccountSection />}

          {/* FAQ */}
          <FAQSection questions={faqData} />

          {/* Contact */}
          <ContactSection />

          {/* Danger Zone */}
          <DangerZoneSection />

        </div>
      </main>
    </>
  )
}
