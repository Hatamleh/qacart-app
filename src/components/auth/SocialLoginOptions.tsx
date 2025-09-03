'use client'

import { useState } from 'react'
import { Mail, Loader2 } from 'lucide-react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/firebase/client'

export const SocialLoginOptions = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    
    try {
      const provider = new GoogleAuthProvider()
      // Add email scope to ensure we get the user's email
      provider.addScope('email')
      
      const result = await signInWithPopup(auth, provider)
      console.log('Google sign-in successful:', result.user.email)
      
      // The AuthContext will handle the rest (session creation, user data, etc.)
      // User will be automatically redirected by the auth state change
      
    } catch (error) {
      console.error('Error with Google sign-in:', error)
      
      // Handle specific errors
      const firebaseError = error as { code?: string; message?: string }
      if (firebaseError.code === 'auth/popup-closed-by-user') {
        console.log('User closed the popup')
      } else if (firebaseError.code === 'auth/cancelled-popup-request') {
        console.log('Popup request cancelled')
      } else {
        // Show error to user if needed
        console.error('Google sign-in failed:', firebaseError.message)
      }
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="space-y-4 mb-8">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
        className="group w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl border border-primary/10 bg-background/30 hover:bg-primary/[0.02] hover:border-primary/20 transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isGoogleLoading ? (
          <Loader2 className="w-5 h-5 text-primary/70 animate-spin" />
        ) : (
          <Mail className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
        )}
        <span className="text-muted-foreground/70 font-medium group-hover:text-foreground transition-colors">
          {isGoogleLoading ? 'جاري تسجيل الدخول...' : 'المتابعة باستخدام Google'}
        </span>
      </button>
    </div>
  )
}
