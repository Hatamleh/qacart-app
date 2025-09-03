'use client'

import { CheckCircle, Mail, RefreshCw } from 'lucide-react'
import { Button } from '../ui/Button'

interface EmailSentSuccessProps {
  email: string
  onResend: () => void
  onBack: () => void
  isResending?: boolean
}

export const EmailSentSuccess = ({ email, onResend, onBack, isResending = false }: EmailSentSuccessProps) => {
  return (
    <div className="max-w-md mx-auto">
      {/* Modern Glass Card */}
      <div className="relative bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-xl border border-primary/10 rounded-3xl overflow-hidden shadow-[0_20px_70px_-10px_rgba(59,130,246,0.15)] hover:shadow-[0_25px_80px_-5px_rgba(59,130,246,0.2)] transition-all duration-500">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.04] pointer-events-none" />
        
        {/* Card Content */}
        <div className="relative p-8 lg:p-10 text-center">

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              {/* Pulse animation */}
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              تم إرسال رابط تسجيل الدخول!
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              لقد أرسلنا رابط تسجيل الدخول إلى
            </p>
            <div className="mt-3 p-3 bg-primary/10 border border-primary/20 rounded-xl">
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="font-semibold text-primary">{email}</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8 p-4 bg-muted/30 border border-border rounded-xl">
            <p className="text-sm text-muted-foreground leading-relaxed">
              تحقق من بريدك الإلكتروني واضغط على الرابط لتسجيل الدخول. 
              قد يستغرق الأمر بضع دقائق للوصول.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full py-4 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
              onClick={onResend}
              disabled={isResending}
              icon={isResending ? RefreshCw : Mail}
              iconPosition="left"
            >
              {isResending ? 'جاري الإرسال...' : 'إعادة إرسال الرابط'}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full py-4 text-lg font-semibold rounded-2xl"
              onClick={onBack}
            >
              العودة
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground/70">
              لم تستلم الرسالة؟ تحقق من مجلد الرسائل غير المرغوبة
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
