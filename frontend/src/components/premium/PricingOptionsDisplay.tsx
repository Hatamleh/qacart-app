import { PricingOption } from '@/types'

interface PricingOptionsDisplayProps {
  pricingOptions: PricingOption[]
}

export const PricingOptionsDisplay = ({ pricingOptions }: PricingOptionsDisplayProps) => {
  return (
    <div className="mb-10">
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-muted/20 rounded-2xl border border-muted/30">
        {pricingOptions.map((option: PricingOption, index: number) => (
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
  )
}
