import { Mail } from 'lucide-react'
import { Button } from '../ui/Button'

export const MagicLinkForm = () => {
  return (
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
  )
}
