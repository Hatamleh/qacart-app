import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProfileWelcome } from '@/components/profile/ProfileWelcome'
import { UserInfo } from '@/components/profile/UserInfo'
import { ManageAccountSection } from '@/components/profile/ManageAccountSection'
import { FAQSection } from '@/components/profile/FAQSection'
import { ContactSection } from '@/components/profile/ContactSection'
import { DangerZoneSection } from '@/components/profile/DangerZoneSection'
import { currentUserData, faqData } from '@/data'

export const metadata: Metadata = {
  title: 'الملف الشخصي | QAcart',
  description: 'إدارة حسابك وبياناتك الشخصية في QAcart',
  openGraph: {
    title: 'الملف الشخصي | QAcart',
    description: 'إدارة حسابك وبياناتك الشخصية في QAcart',
    type: 'website',
    locale: 'ar_SA',
  },
}

export default function ProfilePage() {

  return (
    <div className="min-h-screen" dir="rtl">
      <Navbar />

      {/* Main Content */}
      <main className="py-32 lg:py-40">
        <div className="container mx-auto px-6 max-w-4xl">

          {/* Welcome, Section */}
          <ProfileWelcome />

          {/* User Info */}
          <UserInfo user={currentUserData} />

          {/* Manage Account */}
          <ManageAccountSection />

          {/* FAQ */}
          <FAQSection questions={faqData} />

          {/* Contact */}
          <ContactSection />

          {/* Danger Zone */}
          <DangerZoneSection />

        </div>
      </main>

      <Footer />
    </div>
  )
}
