'use client'

import Head from 'next/head'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { ProfileWelcome } from '@/components/profile/ProfileWelcome'
import { UserInfo } from '@/components/profile/UserInfo'
import { ManageAccountSection } from '@/components/profile/ManageAccountSection'
import { AddedWithLove } from '@/components/profile/AddedWithLove'
import { FAQSection } from '@/components/profile/FAQSection'
import { ContactSection } from '@/components/profile/ContactSection'
import { DangerZoneSection } from '@/components/profile/DangerZoneSection'
import { useAuth } from '@/contexts/AuthContext'
import { faqData } from '@/data'

export default function ProfilePage() {
  const { user, isLoading, isInitialized } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Status banner state
  const status = searchParams.get('status')
  const [showStatusBanner, setShowStatusBanner] = useState(!!status)

  // Auto-hide status banner after 10 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setShowStatusBanner(false), 10000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [status])

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

  // Check if user has premium access (paid subscription or admin gift)
  const isPremium = user.subscription.status === 'premium' && 
    (user.subscription.isActive || user.subscription.giftDetails != null)
  
  // Check if user is gifted (for different UI treatment)
  const isGifted = user.subscription.giftDetails != null

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

          {/* Status Banner */}
          {showStatusBanner && status && (
            <div className={`mb-6 p-4 rounded-xl border relative ${
              status === 'success' 
                ? 'bg-primary/10 border-primary/20' 
                : 'bg-muted/30 border-muted-foreground/20'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  status === 'success' 
                    ? 'bg-primary/20' 
                    : 'bg-muted/50'
                }`}>
                  {status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  ) : (
                    <XCircle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                
                <div className="flex-1">
                  {status === 'success' ? (
                    <>
                      <p className="font-semibold text-primary mb-1">تم الاشتراك بنجاح! 🎉</p>
                      <p className="text-sm text-muted-foreground">
                        مرحباً بك في عائلة بريميوم. يمكنك الآن الوصول إلى جميع الدورات المتقدمة والمميزات الحصرية.
                      </p>
                    </>
                  ) : status === 'cancelled' ? (
                    <>
                      <p className="font-semibold text-foreground mb-1">تم إلغاء العملية</p>
                      <p className="text-sm text-muted-foreground">
                        لا بأس! يمكنك المحاولة مرة أخرى في أي وقت. نحن هنا لمساعدتك في الحصول على أفضل تجربة تعليمية.
                      </p>
                    </>
                  ) : null}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowStatusBanner(false)}
                  className="flex-shrink-0 p-1 hover:bg-background/50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          )}

          {/* User Info - Pass real user data */}
          <UserInfo user={user} />

          {/* Added with Love - Only show for gifted users */}
          {isGifted && <AddedWithLove user={user} />}

          {/* Manage Account - Only show for paid premium users (not gifted) */}
          {isPremium && !isGifted && <ManageAccountSection />}

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
