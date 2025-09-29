import { PricingOption } from '@/types'

interface PricingOptionsDisplayProps {
  pricingOptions: PricingOption[]
  selectedPricingId: string
  onPricingChange: (pricingOption: PricingOption) => void
}

export const PricingOptionsDisplay = ({
  pricingOptions,
  selectedPricingId,
  onPricingChange
}: PricingOptionsDisplayProps) => {
  return (
    <div className="mb-10">
      <div className="grid grid-cols-3 gap-2 p-2 bg-background/50 rounded border-2 border-border">
        {pricingOptions.map((option: PricingOption) => {
          const isSelected = option.id === selectedPricingId
          const isPopular = option.popular

          return (
            <button
              key={option.id}
              onClick={() => onPricingChange(option)}
              className={`relative py-3 px-4 rounded text-sm font-bold uppercase tracking-wide transition-all duration-200 focus:outline-none ${
                isSelected
                  ? 'bg-premium text-background border-2 border-premium shadow-[0_0_15px_rgba(163,190,140,0.4)]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30 border-2 border-transparent'
              }`}
            >
              <div className="relative z-10">
                {option.duration}
                {isPopular && !isSelected && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-premium rounded-full animate-pulse shadow-[0_0_6px_rgba(163,190,140,0.8)]" />
                )}
                {option.savings && (
                  <div className={`text-xs mt-1 font-normal normal-case tracking-normal ${isSelected ? 'text-background' : 'text-accent-orange'}`}>{option.savings}</div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
