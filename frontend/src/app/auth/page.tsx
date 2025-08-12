import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AuthForm } from '@/components/auth/AuthForm'

export const metadata: Metadata = {
  title: 'تسجيل الدخول | QAcart',
  description: 'سجل دخولك أو أنشئ حساباً جديداً للوصول إلى دورات QAcart',
  openGraph: {
    title: 'تسجيل الدخول | QAcart',
    description: 'سجل دخولك أو أنشئ حساباً جديداً للوصول إلى دورات QAcart',
    type: 'website',
    locale: 'ar_SA',
  },
}

export default function AuthPage() {
  return (
    <div className="min-h-screen" dir="rtl">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-32 lg:py-40">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
