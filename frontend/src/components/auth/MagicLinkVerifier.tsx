'use client'

import { useEffect, useState } from 'react'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { auth } from '@/firebase/client'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../ui/Button'

interface MagicLinkVerifierProps {
  onVerificationComplete: (success: boolean) => void
  onRetry: () => void
}

export const MagicLinkVerifier = ({ onVerificationComplete, onRetry }: MagicLinkVerifierProps) => {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'email-input'>('verifying')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const verifyMagicLink = async () => {
      try {
        console.log('🔍 Starting magic link verification...')
        
        // Check if this is a valid magic link
        if (!isSignInWithEmailLink(auth, window.location.href)) {
          console.log('❌ Invalid magic link')
          setStatus('error')
          setError('رابط تسجيل الدخول غير صحيح')
          return
        }

        console.log('✅ Valid magic link detected')

        // Get the email from localStorage
        let email = localStorage.getItem('emailForSignIn')
        
        // If email is not found, show email input
        if (!email) {
          console.log('📧 Email not found in localStorage, showing input')
          setStatus('email-input')
          return
        }

        console.log('📧 Using email from localStorage:', email)
        await performSignIn(email)
        
      } catch (error) {
        console.error('❌ Error in magic link verification:', error)
        setStatus('error')
        setError('حدث خطأ أثناء التحقق من الرابط')
        onVerificationComplete(false)
      }
    }

    verifyMagicLink()
  }, [onVerificationComplete])

  const performSignIn = async (emailToUse: string) => {
    try {
      console.log('🔐 Attempting sign in with email:', emailToUse)
      
      // Sign in with the email link
      const result = await signInWithEmailLink(auth, emailToUse, window.location.href)
      console.log('✅ Sign in successful:', result.user.email)
      
      // Clean up the stored email
      localStorage.removeItem('emailForSignIn')
      
      setStatus('success')
      onVerificationComplete(true)
      
    } catch (error) {
      console.error('❌ Error during sign in:', error)
      
      let errorMessage = 'حدث خطأ أثناء تسجيل الدخول'
      const firebaseError = error as { code?: string }
      if (firebaseError.code === 'auth/invalid-email') {
        errorMessage = 'البريد الإلكتروني غير صحيح'
      } else if (firebaseError.code === 'auth/invalid-action-code') {
        errorMessage = 'انتهت صلاحية الرابط أو تم استخدامه من قبل'
      }
      
      setError(errorMessage)
      setStatus('error')
      onVerificationComplete(false)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('يرجى إدخال البريد الإلكتروني')
      return
    }
    
    setStatus('verifying')
    setError('')
    await performSignIn(email.trim())
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Modern Glass Card */}
      <div className="relative bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-xl border border-primary/10 rounded-3xl overflow-hidden shadow-[0_20px_70px_-10px_rgba(59,130,246,0.15)] hover:shadow-[0_25px_80px_-5px_rgba(59,130,246,0.2)] transition-all duration-500">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.04] pointer-events-none" />
        
        {/* Card Content */}
        <div className="relative p-8 lg:p-10 text-center">

          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                {status === 'verifying' && <Loader2 className="w-10 h-10 text-primary animate-spin" />}
                {status === 'success' && <CheckCircle className="w-10 h-10 text-green-500" />}
                {status === 'error' && <XCircle className="w-10 h-10 text-destructive" />}
                {status === 'email-input' && <div className="w-10 h-10 text-primary">📧</div>}
              </div>
              {status === 'verifying' && (
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
              )}
            </div>
          </div>

          {/* Status Message */}
          <div className="mb-8">
            {status === 'verifying' && (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  جاري تسجيل الدخول...
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  يرجى الانتظار بينما نتحقق من رابط تسجيل الدخول
                </p>
              </>
            )}
            
            {status === 'email-input' && (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  تأكيد البريد الإلكتروني
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  يرجى إدخال بريدك الإلكتروني للمتابعة
                </p>
                
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
                    required
                  />
                  
                  {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
                      <p className="text-destructive text-sm">{error}</p>
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full py-4 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
                    disabled={!email.trim()}
                  >
                    متابعة
                  </Button>
                </form>
              </>
            )}
            
            {status === 'success' && (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  تم تسجيل الدخول بنجاح!
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  سيتم توجيهك إلى الصفحة الرئيسية قريباً
                </p>
              </>
            )}
            
            {status === 'error' && (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  فشل تسجيل الدخول
                </h2>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
                  <p className="text-destructive">{error}</p>
                </div>
              </>
            )}
          </div>

          {/* Action Button for Error State */}
          {status === 'error' && (
            <Button
              variant="primary"
              size="lg"
              className="w-full py-4 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
              onClick={onRetry}
            >
              المحاولة مرة أخرى
            </Button>
          )}

        </div>
      </div>
    </div>
  )
}
