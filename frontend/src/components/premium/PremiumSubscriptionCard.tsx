'use client'

import { useState } from 'react'
import { Check, Gift, MessageCircle, Code, Unlock, RefreshCw } from 'lucide-react'
import { Button } from '../ui/Button'
import { ProPlan, PricingOption, PlanFeature } from '@/types/plan'

interface PremiumSubscriptionCardProps {
  plan: ProPlan
}

export const PremiumSubscriptionCard = ({ plan }: PremiumSubscriptionCardProps) => {
  const [selectedOption, setSelectedOption] = useState(plan.pricingOptions[1].id) // Default to quarterly (popular)

  const selectedPricing = plan.pricingOptions.find((option: PricingOption) => option.id === selectedOption)

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'unlock':
        return <Unlock className="w-5 h-5 text-primary" />
      case 'message':
        return <MessageCircle className="w-5 h-5 text-primary" />
      case 'code':
        return <Code className="w-5 h-5 text-primary" />
      case 'gift':
        return <Gift className="w-5 h-5 text-primary" />
      default:
        return <Check className="w-5 h-5 text-primary" />
    }
  }

  const handleSubscribe = () => {
    // TODO: Implement Stripe integration
    console.log('Subscribing to:', selectedOption, selectedPricing)
    alert(`سيتم إضافة تكامل Stripe قريباً!\nالخطة المختارة: ${selectedPricing?.duration}\nالسعر: ${selectedPricing?.currency}${selectedPricing?.price}`)
  }

  return (
    <div className="bg-background border-2 border-primary/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      
      {/* Header */}
      <div className="relative">

        {/* Price Display */}
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-light text-muted-foreground">{selectedPricing?.currency}</span>
            <span className="text-6xl lg:text-7xl font-bold gradient-text">{selectedPricing?.price}</span>
            <span className="text-xl text-muted-foreground">/{selectedPricing?.duration}</span>
          </div>
        </div>

        {/* Pricing Options */}
        <div className="flex gap-2 mb-8 p-1 bg-muted/30 rounded-xl">
          {plan.pricingOptions.map((option: PricingOption) => (
            <Button
              key={option.id}
              variant={selectedOption === option.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedOption(option.id)}
              className="flex-1"
            >
              {option.duration}
            </Button>
          ))}
        </div>

        {/* Features List */}
        <div className="space-y-4 mb-8">
          {plan.features.map((feature: PlanFeature) => (
            <div key={feature.id} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                {getIcon(feature.icon)}
              </div>
              <span className="text-foreground leading-relaxed">{feature.title}</span>
            </div>
          ))}
        </div>

        {/* Subscribe Button */}
        <Button
          variant="primary"
          size="lg"
          className="w-full text-lg font-bold py-4 shadow-lg"
          onClick={handleSubscribe}
        >
          {plan.cta.buttonText}
        </Button>

        {/* Guarantee */}
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            <a href="/refund-policy" className="hover:text-primary transition-colors flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" />
              اقرأ المزيد حول سياسة الاسترداد
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}
