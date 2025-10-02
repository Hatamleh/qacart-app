import { Metadata } from 'next'
import { Hero } from '@/components/landing/Hero'
import { HardTruth } from '@/components/landing/HardTruth'

export const metadata: Metadata = {
  title: 'QAcart - منصة تعليمية للبرمجة واختبار البرمجيات والذكاء الاصطناعي',
  description: 'تعلم البرمجة، اختبار البرمجيات، والذكاء الاصطناعي من الصفر مع خبراء المجال في منصة QAcart التعليمية',
  keywords: ['البرمجة', 'اختبار البرمجيات', 'الذكاء الاصطناعي', 'تعلم', 'QA', 'Testing', 'AI', 'Development'],
  authors: [{ name: 'QAcart Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'QAcart - منصة تعليمية للبرمجة واختبار البرمجيات والذكاء الاصطناعي',
    description: 'تعلم البرمجة، اختبار البرمجيات، والذكاء الاصطناعي من الصفر مع خبراء المجال',
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
  },
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Hard Truth Section */}
      <HardTruth />
    </>
  )
}