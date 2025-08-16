'use client'

import { useState } from 'react'
import { Mail, Loader2 } from 'lucide-react'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { auth } from '@/firebase/client'
import { Button } from '../ui/Button'

interface MagicLinkFormProps {
  onEmailSent: (email: string) => void
}

export const MagicLinkForm = ({ onEmailSent }: MagicLinkFormProps) => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Configure the magic link settings
      const actionCodeSettings = {
        url: `${window.location.origin}/auth`, // User will be redirected here after clicking the link
        handleCodeInApp: true, // This ensures the link opens in the app
      }

      // Send the magic link
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      
      // Store email in localStorage for verification when user returns
      localStorage.setItem('emailForSignIn', email)
      
      // Call success callback
      onEmailSent(email)
      
    } catch (error) {
      console.error('Error sending magic link:', error)
      
      // Handle specific Firebase errors
      const firebaseError = error as { code?: string }
      if (firebaseError.code === 'auth/invalid-email') {
        setError('البريد الإلكتروني غير صحيح')
      } else if (firebaseError.code === 'auth/user-disabled') {
        setError('هذا الحساب معطل')
      } else {
        setError('حدث خطأ أثناء إرسال الرابط. حاول مرة أخرى.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-semibold text-muted-foreground/80 uppercase tracking-wider mb-4">
          البريد الإلكتروني
        </label>
        <div className="relative group">
          <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60 group-focus-within:text-primary transition-colors" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="أدخل بريدك الإلكتروني"
            className="w-full pr-12 pl-4 py-4 rounded-2xl border border-primary/10 bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 hover:border-primary/20 transition-all duration-300"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
          <p className="text-sm text-destructive text-center">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full py-4 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        disabled={isLoading || !email.trim()}
        icon={isLoading ? Loader2 : Mail}
        iconPosition="left"
      >
        {isLoading ? 'جاري الإرسال...' : 'إرسال رابط تسجيل الدخول'}
      </Button>
    </form>
  )
}
