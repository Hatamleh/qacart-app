import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/landing/Hero'
import { HardTruth } from '@/components/landing/HardTruth'
import { LetsGo } from '@/components/landing/LetsGo'

export const metadata: Metadata = {
  title: 'QAcart - منصة تعلم اختبار البرمجيات',
  description: 'تعلم اختبار البرمجيات من الصفر مع خبراء المجال في منصة QAcart التعليمية',
  keywords: ['اختبار البرمجيات', 'تعلم', 'QA', 'Testing', 'Software'],
  authors: [{ name: 'QAcart Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'QAcart - منصة تعلم اختبار البرمجيات',
    description: 'تعلم اختبار البرمجيات من الصفر مع خبراء المجال',
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Hard Truth Section */}
      <HardTruth />

      {/* Lets Go Section */}
      <LetsGo />

      {/* Footer */}
      <Footer />
    </div>
  )
}