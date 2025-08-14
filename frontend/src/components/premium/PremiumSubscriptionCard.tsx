import { Check, RefreshCw } from 'lucide-react'
import { Button } from '../ui/Button'
import { Plan, PricingOption } from '@/types'

interface PremiumSubscriptionCardProps {
  plan: Plan
}

export const PremiumSubscriptionCard = ({ plan }: PremiumSubscriptionCardProps) => {
  // Use the first pricing option by default for a design-first approach
  const selectedPricing = plan.pricingOptions[0]

  return (
    <div className="max-w-lg mx-auto">
      {/* Modern Glass Card */}
      <div className="relative bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-xl border border-primary/10 rounded-3xl overflow-hidden shadow-[0_20px_70px_-10px_rgba(59,130,246,0.15)] hover:shadow-[0_25px_80px_-5px_rgba(59,130,246,0.2)] transition-all duration-500">

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.04] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Card Content */}
        <div className="relative p-8 lg:p-10">

          {/* Plan Badge */}
          <div className="flex justify-center mb-8">
            <div className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <h3 className="text-lg font-semibold text-primary tracking-wide">{plan.name}</h3>
            </div>
          </div>

          {/* Price Section */}
          <div className="text-center mb-10">
            <div className="flex items-end justify-center gap-2 mb-4">
              <span className="text-2xl font-medium text-muted-foreground self-start mt-2">{selectedPricing?.currency}</span>
              <span className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent leading-none">{selectedPricing?.price}</span>
              <span className="text-lg text-muted-foreground self-end mb-1">/{selectedPricing?.duration}</span>
            </div>
            <p className="text-sm text-muted-foreground/70">يتم الدفع {selectedPricing?.duration === 'شهرياً' ? 'كل شهر' : selectedPricing?.duration === 'ربع سنوي' ? 'كل 3 أشهر' : 'مرة واحدة في السنة'}</p>
          </div>

          {/* Pricing Options Display */}
          <div className="mb-10">
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-muted/20 rounded-2xl border border-muted/30">
              {plan.pricingOptions.map((option: PricingOption, index: number) => (
                <div
                  key={option.id}
                  className={`relative py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                    index === 0 
                      ? 'bg-primary text-background shadow-lg shadow-primary/25 scale-[1.02]' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {option.duration}
                  {index === 0 && (
                    <div className="absolute inset-0 bg-primary/10 rounded-xl blur-xl" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-10">
            <div className="space-y-5">
              {plan.features.map((feature: string, index: number) => (
                <div key={index} className="group flex items-start gap-2 p-3 rounded-xl hover:bg-primary/[0.02] transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary/15 to-primary/25 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-5 h-5 text-primary/80" />
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="text-muted-foreground/70 leading-relaxed font-medium">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full py-4 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
            >
              اشترك الآن
            </Button>
          </div>

          {/* Guarantee */}
          <div className="text-center">
            <a
              href="/refund-policy"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-primary transition-colors group"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              <span>اقرأ المزيد حول سياسة الاسترداد</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
