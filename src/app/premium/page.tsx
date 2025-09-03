'use client'

import Head from 'next/head'
import {PremiumHero} from '@/components/premium/PremiumHero'
import {PremiumSubscriptionCard} from '@/components/premium/PremiumSubscriptionCard'
import {usePlans} from '@/hooks'

export default function PremiumPage() {
  const { plan, loading, error } = usePlans()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جارٍ تحميل خطة البريميوم...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">خطأ في تحميل خطة البريميوم: {error}</p>
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

  if (!plan) {
    return null
  }

  return (
    <>
      <Head>
        <title>خطة بريميوم - QAcart</title>
        <meta name="description" content="انضم إلى خطة بريميوم واحصل على وصول كامل لجميع الدورات المتقدمة والمميزات الحصرية" />
        <meta name="keywords" content="اشتراك, خطة بريميوم, دورات متقدمة, QA, Testing" />
        <meta property="og:title" content="خطة بريميوم - QAcart" />
        <meta property="og:description" content="انضم إلى خطة بريميوم واحصل على وصول كامل لجميع الدورات المتقدمة" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
      </Head>
      
      {/* Hero Section */}
      <PremiumHero />

      {/* Subscription Card Section */}
      <section className="pb-20 bg-muted/10">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto">
            <PremiumSubscriptionCard plan={plan} />
          </div>
        </div>
      </section>
    </>
  )
}
