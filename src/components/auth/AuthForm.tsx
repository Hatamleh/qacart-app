'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { MagicLinkForm } from './MagicLinkForm'
import { SocialLoginOptions } from './SocialLoginOptions'
import { AuthTerms } from './AuthTerms'
import { EmailSentSuccess } from './EmailSentSuccess'
import { MagicLinkVerifier } from './MagicLinkVerifier'

type AuthState = 'form' | 'email-sent' | 'verifying-link'

export const AuthForm = () => {
  console.log('🔄 AuthForm RENDERING - Timestamp:', Date.now())
  
  const [authState, setAuthState] = useState<AuthState>('form')
  const [emailSent, setEmailSent] = useState('')
  const { user, isInitialized } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check if user is already authenticated
  useEffect(() => {
    if (isInitialized && user) {
      // Check for redirect parameter
      const redirectTo = searchParams.get('redirect')
      if (redirectTo) {
        // Validate redirect URL for security
        try {
          const url = new URL(redirectTo, window.location.origin)
          // Only allow redirects to same origin
          if (url.origin === window.location.origin) {
            router.push(redirectTo)
            return
          }
        } catch {
          // Invalid URL, ignore and use default
        }
      }
      // Default redirect
      router.push('/')
    }
  }, [user, isInitialized, router, searchParams])

  // Check if this is a magic link verification
  useEffect(() => {
    // Check if URL has magic link parameters (without calling Firebase)
    const url = new URL(window.location.href)
    const hasOobCode = url.searchParams.has('oobCode')
    const hasMode = url.searchParams.get('mode') === 'signIn'
    
    if (hasOobCode && hasMode) {
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
        <div className="relative terminal-window bg-muted border-2 border-border overflow-hidden">

          {/* Terminal top bar accent line */}
          <div className="absolute top-8 left-0 w-full h-px bg-border" />

          {/* Card Content */}
          <div className="relative p-8 lg:p-10">

            {/* Welcome Badge - Coding style */}
            <div className="flex justify-center mb-8">
              <div className="px-6 py-2 bg-primary/10 border-2 border-primary/40 rounded shadow-[0_0_10px_rgba(136,192,208,0.2)]">
                <h3 className="text-sm font-bold text-primary tracking-wider uppercase">{'//'} مرحباً_بك_في_QAcart</h3>
              </div>
            </div>

            {/* Subtitle */}
            <div className="text-center mb-10">
              <p className="text-muted-foreground leading-relaxed">
                سجل دخولك أو أنشئ حساباً جديداً للمتابعة
              </p>
            </div>

            {/* Email Magic Link Form */}
            <MagicLinkForm onEmailSent={handleEmailSent} />

            {/* Coding-style Divider */}
            <div className="flex items-center justify-center mb-8 gap-3">
              <div className="h-px bg-border flex-1"></div>
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">or</span>
              <div className="h-px bg-border flex-1"></div>
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