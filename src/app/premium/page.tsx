import { Metadata } from 'next'
import { PremiumHero } from '@/components/premium/PremiumHero'
import { PremiumSubscriptionCard } from '@/components/premium/PremiumSubscriptionCard'
import { getPlan } from '@/actions'

export const metadata: Metadata = {
  title: 'خطة بريميوم - QAcart',
  description: 'انضم إلى خطة بريميوم واحصل على وصول كامل لجميع الدورات المتقدمة والمميزات الحصرية',
  keywords: 'اشتراك, خطة بريميوم, دورات متقدمة, QA, Testing',
  openGraph: {
    title: 'خطة بريميوم - QAcart',
    description: 'انضم إلى خطة بريميوم واحصل على وصول كامل لجميع الدورات المتقدمة',
    type: 'website',
    locale: 'ar_SA',
  },
}

export default async function PremiumPage() {
  const plan = await getPlan()

  return (
    <>
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
