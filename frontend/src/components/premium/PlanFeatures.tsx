import { Check } from 'lucide-react'

interface PlanFeaturesProps {
  features: string[]
}

export const PlanFeatures = ({ features }: PlanFeaturesProps) => {
  return (
    <div className="mb-10">
      <div className="space-y-5">
        {features.map((feature: string, index: number) => (
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
  )
}
