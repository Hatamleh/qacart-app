import { Metadata } from 'next'
import { ProfileWelcome } from '@/components/profile/ProfileWelcome'
import { UserInfo } from '@/components/profile/UserInfo'
import { ManageAccountSection } from '@/components/profile/ManageAccountSection'
import { FAQSection } from '@/components/profile/FAQSection'
import { ContactSection } from '@/components/profile/ContactSection'
import { DangerZoneSection } from '@/components/profile/DangerZoneSection'
import { UserClient } from '@/clients'
import { faqData } from '@/data'
import { redirect } from 'next/navigation'

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

export default async function ProfilePage() {
  // Get real user data from session
  const user = await UserClient.getCurrentUser()

  // Redirect to auth if not logged in
  if (!user) {
    redirect('/auth')
  }

  return (
    <>
      {/* Main Content */}
      <main className="py-32 lg:py-40">
        <div className="container mx-auto px-6 max-w-4xl">

          {/* Welcome, Section */}
          <ProfileWelcome />

          {/* User Info - Pass real user data */}
          <UserInfo user={user} />

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
    </>
  )
}
