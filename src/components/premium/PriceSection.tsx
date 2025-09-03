import { PricingOption } from '@/types'

interface PriceSectionProps {
  selectedPricing: PricingOption
}

export const PriceSection = ({ selectedPricing }: PriceSectionProps) => {
  return (
    <div className="text-center mb-10">
      <div className="flex items-end justify-center gap-2 mb-4">
        <span className="text-2xl font-medium text-muted-foreground self-start mt-2">{selectedPricing?.currency}</span>
        <span className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent leading-none">{selectedPricing?.price}</span>
        <span className="text-lg text-muted-foreground self-end mb-1">/{selectedPricing?.duration}</span>
      </div>
      <p className="text-sm text-muted-foreground/70">يتم الدفع {selectedPricing?.duration === 'شهرياً' ? 'كل شهر' : selectedPricing?.duration === 'ربع سنوي' ? 'كل 3 أشهر' : 'مرة واحدة في السنة'}</p>
    </div>
  )
}
