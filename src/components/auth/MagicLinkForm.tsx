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
        <label htmlFor="email" className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 font-mono">
          // email_address
        </label>
        <div className="relative group">
          <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary transition-colors group-focus-within:text-primary group-focus-within:drop-shadow-[0_0_8px_rgba(136,192,208,0.6)]" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full pr-12 pl-4 py-3 rounded border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(136,192,208,0.3)] transition-all duration-200 font-mono text-sm"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Error Message - Coding style */}
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border-2 border-destructive/40 rounded">
          <p className="text-sm text-destructive text-center font-mono">ERROR: {error}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isLoading || !email.trim()}
        icon={isLoading ? Loader2 : Mail}
        iconPosition="left"
      >
        {isLoading ? 'جاري_الإرسال...' : 'إرسال_رابط_تسجيل_الدخول'}
      </Button>
    </form>
  )
}
