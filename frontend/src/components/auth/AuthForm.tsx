import { Mail, Apple } from 'lucide-react'
import { Button } from '../ui/Button'

export const AuthForm = () => {

  return (
    <div className="max-w-md mx-auto">
      {/* Modern Glass Card */}
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
          <form className="mb-8">
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold text-muted-foreground/80 uppercase tracking-wider mb-4">
                البريد الإلكتروني
              </label>
              <div className="relative group">
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60 group-focus-within:text-primary transition-colors" />
                <input
                  id="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full pr-12 pl-4 py-4 rounded-2xl border border-primary/10 bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 hover:border-primary/20 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full py-4 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
            >
              إرسال رابط تسجيل الدخول
            </Button>
          </form>

          {/* Modern Divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent flex-1"></div>
            <span className="px-4 text-sm text-muted-foreground/70 bg-background/80 rounded-full">أو</span>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent flex-1"></div>
          </div>

          {/* Social Login Options */}
          <div className="space-y-4 mb-8">
            <div className="group w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl border border-primary/10 bg-background/30 hover:bg-primary/[0.02] hover:border-primary/20 transition-all duration-300 hover:scale-[1.01]">
              <Mail className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
              <span className="text-muted-foreground/70 font-medium group-hover:text-foreground transition-colors">المتابعة باستخدام Google</span>
            </div>

            <div className="group w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl border border-primary/10 bg-background/30 hover:bg-primary/[0.02] hover:border-primary/20 transition-all duration-300 hover:scale-[1.01]">
              <Apple className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
              <span className="text-muted-foreground/70 font-medium group-hover:text-foreground transition-colors">المتابعة باستخدام Apple</span>
            </div>
          </div>

          {/* Terms */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              بالمتابعة، فإنك توافق على{' '}
              <a href="/terms" className="text-primary/80 hover:text-primary transition-colors">شروط الخدمة</a>
              {' '}و{' '}
              <a href="/privacy" className="text-primary/80 hover:text-primary transition-colors">سياسة الخصوصية</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
