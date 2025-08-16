'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isSignInWithEmailLink } from 'firebase/auth'
import { auth } from '@/firebase/client'
import { useAuth } from '@/contexts/AuthContext'
import { MagicLinkForm } from './MagicLinkForm'
import { SocialLoginOptions } from './SocialLoginOptions'
import { AuthTerms } from './AuthTerms'
import { EmailSentSuccess } from './EmailSentSuccess'
import { MagicLinkVerifier } from './MagicLinkVerifier'

type AuthState = 'form' | 'email-sent' | 'verifying-link'

export const AuthForm = () => {
  const [authState, setAuthState] = useState<AuthState>('form')
  const [emailSent, setEmailSent] = useState('')
  const { user, isInitialized } = useAuth()
  const router = useRouter()

  // Check if user is already authenticated
  useEffect(() => {
    if (isInitialized && user) {
      router.push('/')
    }
  }, [user, isInitialized, router])

  // Check if this is a magic link verification
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      setAuthState('verifying-link')
    }
  }, [])

  const handleEmailSent = (email: string) => {
    setEmailSent(email)
    setAuthState('email-sent')
  }

  const handleResendEmail = async () => {
    // Go back to form to resend
    setAuthState('form')
  }

  const handleBackToForm = () => {
    setAuthState('form')
    setEmailSent('')
  }

  const handleVerificationComplete = (success: boolean) => {
    if (success) {
      // User will be redirected by the auth state effect above
      console.log('Magic link verification successful')
    }
  }

  const handleRetryVerification = () => {
    setAuthState('form')
  }

  // Don't render anything while checking auth state
  if (isInitialized && user) {
    return null
  }

  return (
    <div className="max-w-md mx-auto">
      {authState === 'form' && (
        <div className="relative bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-xl border border-primary/10 rounded-3xl overflow-hidden shadow-[0_20px_70px_-10px_rgba(59,130,246,0.15)] hover:shadow-[0_25px_80px_-5px_rgba(59,130,246,0.2)] transition-all duration-500">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.04] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          
          {/* Card Content */}
          <div className="relative p-8 lg:p-10">

            {/* Welcome Badge */}
            <div className="flex justify-center mb-8">
              <div className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <h3 className="text-lg font-semibold text-primary tracking-wide">مرحباً بك في QAcart</h3>
              </div>
            </div>

            {/* Subtitle */}
            <div className="text-center mb-10">
              <p className="text-muted-foreground/70 leading-relaxed">
                سجل دخولك أو أنشئ حساباً جديداً للمتابعة
              </p>
            </div>

            {/* Email Magic Link Form */}
            <MagicLinkForm onEmailSent={handleEmailSent} />

            {/* Modern Divider */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent flex-1"></div>
              <span className="px-4 text-sm text-muted-foreground/70 bg-background/80 rounded-full">أو</span>
              <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent flex-1"></div>
            </div>

            {/* Social Login Options */}
            <SocialLoginOptions />

            {/* Terms */}
            <AuthTerms />

          </div>
        </div>
      )}

      {authState === 'email-sent' && (
        <EmailSentSuccess 
          email={emailSent}
          onResend={handleResendEmail}
          onBack={handleBackToForm}
        />
      )}

      {authState === 'verifying-link' && (
        <MagicLinkVerifier 
          onVerificationComplete={handleVerificationComplete}
          onRetry={handleRetryVerification}
        />
      )}
    </div>
  )
}