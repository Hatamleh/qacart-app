import { PricingOption } from '@/types'

interface PriceSectionProps {
  selectedPricing: PricingOption
}

export const PriceSection = ({ selectedPricing }: PriceSectionProps) => {
  return (
    <div className="text-center mb-10">
      <div className="flex items-end justify-center gap-2 mb-4">
        <span className="text-2xl font-medium text-accent-orange self-start mt-2">{selectedPricing?.currency}</span>
        <span className="text-5xl lg:text-6xl font-bold text-premium leading-none drop-shadow-[0_0_15px_rgba(163,190,140,0.5)]">{selectedPricing?.price}</span>
        <span className="text-lg text-muted-foreground self-end mb-1 font-mono">/{selectedPricing?.duration}</span>
      </div>
      <p className="text-sm text-muted-foreground font-mono">{'//'} يتم الدفع {selectedPricing?.duration === 'شهرياً' ? 'كل شهر' : selectedPricing?.duration === 'ربع سنوي' ? 'كل 3 أشهر' : 'مرة واحدة في السنة'}</p>
    </div>
  )
}
