'use client'

import { Mail, Apple } from 'lucide-react'
import { Button } from '../ui/Button'

export const AuthForm = () => {
  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement magic link authentication
    alert('سيتم إضافة تسجيل الدخول بالرابط السحري قريباً!')
  }

  const handleSocialAuth = (provider: 'google' | 'apple') => {
    // TODO: Implement social authentication
    alert(`تسجيل الدخول باستخدام ${provider === 'google' ? 'Google' : 'Apple'} سيتم إضافته قريباً!`)
  }

  return (
    <div className="bg-primary/10 backdrop-blur-md rounded-2xl p-8 border border-primary/20 shadow-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">مرحباً بك في QAcart</h1>
        <p className="text-muted-foreground">
          سجل دخولك أو أنشئ حساباً جديداً للمتابعة
        </p>
      </div>

      {/* Email Magic Link Form */}
      <form onSubmit={handleEmailAuth} className="space-y-6 mb-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="w-full pr-12 pl-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-2 focus:outline-primary focus:outline-offset-2 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
        >
          إرسال رابط تسجيل الدخول
        </Button>
      </form>

      {/* Divider */}
      <div className="text-center mb-6">
        <span className="text-sm text-muted-foreground">أو</span>
      </div>

      {/* Social Login Options */}
      <div className="space-y-3">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleSocialAuth('google')}
          className="w-full"
          icon={Mail}
          iconPosition="right"
        >
          المتابعة باستخدام Google
        </Button>

        <Button
          variant="outline" 
          size="lg"
          onClick={() => handleSocialAuth('apple')}
          className="w-full"
          icon={Apple}
          iconPosition="right"
        >
          المتابعة باستخدام Apple
        </Button>
      </div>

      {/* Terms */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground leading-relaxed">
          بالمتابعة، فإنك توافق على{' '}
          <a href="/terms" className="text-primary hover:underline">شروط الخدمة</a>
          {' '}و{' '}
          <a href="/privacy" className="text-primary hover:underline">سياسة الخصوصية</a>
        </p>
      </div>
    </div>
  )
}
