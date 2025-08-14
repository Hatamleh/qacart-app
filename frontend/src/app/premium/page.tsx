import {Metadata} from 'next'
import {Navbar} from '@/components/layout/Navbar'
import {Footer} from '@/components/layout/Footer'
import {PremiumHero} from '@/components/premium/PremiumHero'
import {PremiumSubscriptionCard} from '@/components/premium/PremiumSubscriptionCard'
import {planData} from '@/data'

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

export default function PremiumPage() {
    return (
    <div className="min-h-screen" dir="rtl">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <PremiumHero />

      {/* Subscription Card Section */}
      <section className="pb-20 bg-muted/10">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto">
            <PremiumSubscriptionCard plan={planData} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
