import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProHero } from '@/components/pro/ProHero'
import { ProSubscriptionCard } from '@/components/pro/ProSubscriptionCard'
import { getPremiumPlan } from '@/data'

export const metadata: Metadata = {
  title: 'خطة بريميوم - QAcart',
  description: 'انضم إلى خطة بريميوم واحصل على وصول كامل لجميع الدورات المتقدمة والمميزات الحصرية',
  keywords: ['اشتراك', 'خطة بريميوم', 'دورات متقدمة', 'QA', 'Testing'],
  openGraph: {
    title: 'خطة بريميوم - QAcart',
    description: 'انضم إلى خطة بريميوم واحصل على وصول كامل لجميع الدورات المتقدمة',
    type: 'website',
    locale: 'ar_SA',
  },
}

export default function ProPage() {
  const premiumPlan = getPremiumPlan()

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <ProHero />

      {/* Subscription Card Section */}
      <section className="pb-20 bg-muted/10">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto">
            <ProSubscriptionCard plan={premiumPlan} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
