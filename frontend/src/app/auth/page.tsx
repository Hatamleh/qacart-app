'use client'

import { Suspense } from 'react'
import Head from 'next/head'
import { AuthForm } from '@/components/auth/AuthForm'
import { CardLoader } from '@/components/ui/LoaderUI'

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
          <Suspense fallback={
            <div className="max-w-md mx-auto">
              <div className="relative bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-xl border border-primary/10 rounded-3xl overflow-hidden shadow-[0_20px_70px_-10px_rgba(59,130,246,0.15)]">
                <div className="p-8 lg:p-10">
                  <CardLoader />
                </div>
              </div>
            </div>
          }>
            <AuthForm />
          </Suspense>
        </div>
      </div>
    </>
  )
}
