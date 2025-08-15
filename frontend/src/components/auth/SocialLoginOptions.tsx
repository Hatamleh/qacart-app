import { Mail, Apple } from 'lucide-react'

export const SocialLoginOptions = () => {
  return (
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
  )
}
