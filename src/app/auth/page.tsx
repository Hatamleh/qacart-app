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
              <div className="relative terminal-window bg-muted border-2 border-border overflow-hidden">
                <div className="absolute top-8 left-0 w-full h-px bg-border" />
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
