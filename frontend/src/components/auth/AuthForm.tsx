import { MagicLinkForm } from './MagicLinkForm'
import { SocialLoginOptions } from './SocialLoginOptions'
import { AuthTerms } from './AuthTerms'

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
          <MagicLinkForm />

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
    </div>
  )
}
