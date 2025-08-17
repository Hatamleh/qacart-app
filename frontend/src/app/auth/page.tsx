'use client'

import Head from 'next/head'
import { AuthForm } from '@/components/auth/AuthForm'

export default function AuthPage() {
  return (
    <>
      <Head>
        <title>تسجيل الدخول | QAcart</title>
        <meta name="description" content="سجل دخولك أو أنشئ حساباً جديداً للوصول إلى دورات QAcart" />
        <meta property="og:title" content="تسجيل الدخول | QAcart" />
        <meta property="og:description" content="سجل دخولك أو أنشئ حساباً جديداً للوصول إلى دورات QAcart" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
      </Head>

      <div className="flex-1 flex items-center justify-center px-6 py-32 lg:py-40">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </>
  )
}
