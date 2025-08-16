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
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-muted/20 rounded-2xl border border-muted/30">
        {pricingOptions.map((option: PricingOption) => {
          const isSelected = option.id === selectedPricingId
          const isPopular = option.popular
          
          return (
            <button
              key={option.id}
              onClick={() => onPricingChange(option)}
              className={`relative py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                isSelected 
                  ? 'bg-primary text-background shadow-lg shadow-primary/25 scale-[1.02]' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
              }`}
            >
              <div className="relative z-10">
                {option.duration}
                {isPopular && !isSelected && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
                {option.savings && (
                  <div className="text-xs text-premium mt-1">{option.savings}</div>
                )}
              </div>
              {isSelected && (
                <div className="absolute inset-0 bg-primary/10 rounded-xl blur-xl" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
