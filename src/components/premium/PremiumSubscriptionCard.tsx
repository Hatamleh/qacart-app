'use client'

import { useState } from 'react'
import { RefreshCw, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'
import { Plan, PricingOption } from '@/types'
import { PlanFeatures } from './PlanFeatures'
import { PriceSection } from './PriceSection'
import { PricingOptionsDisplay } from './PricingOptionsDisplay'
import { createCheckoutSession } from '@/actions'
import { useAuth, useIsAuthenticated } from '@/contexts/AuthContext'

interface PremiumSubscriptionCardProps {
  plan: Plan
}

export const PremiumSubscriptionCard = ({ plan }: PremiumSubscriptionCardProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const isAuthenticated = useIsAuthenticated()
  
  // State for selected pricing option
  const [selectedPricingId, setSelectedPricingId] = useState<string>(plan.pricingOptions[0].id)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Get the currently selected pricing option
  const selectedPricing = plan.pricingOptions.find(opt => opt.id === selectedPricingId) || plan.pricingOptions[0]

  // Handle pricing option selection
  const handlePricingChange = (pricingOption: PricingOption) => {
    setSelectedPricingId(pricingOption.id)
    setError(null) // Clear any previous errors
  }

  // Handle subscription
  const handleSubscribe = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push('/auth')
      return
    }

    // Check if user already has premium
    if (user?.subscription.status === 'premium') {
      setError('لديك اشتراك نشط بالفعل')
      return
    }

    // Check if selected pricing has Stripe price ID
    if (!selectedPricing.stripePriceId) {
      setError('معرف السعر غير متوفر')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Create checkout session and redirect
      const { url } = await createCheckoutSession({
        priceId: selectedPricing.stripePriceId,
        successUrl: `${window.location.origin}/profile?checkout=success`,
        cancelUrl: `${window.location.origin}/premium?checkout=cancelled`,
      })

      // Redirect to Stripe checkout
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      setError(error instanceof Error ? error.message : 'حدث خطأ أثناء معالجة الدفع')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Terminal-style Card */}
      <div className="relative terminal-window bg-muted border-2 border-premium overflow-hidden">

        {/* Terminal accent line below dots */}
        <div className="absolute top-8 left-0 w-full h-px bg-border" />

        {/* Card Content */}
        <div className="relative p-8 lg:p-10">

          {/* Plan Badge - Coding style */}
          <div className="flex justify-center mb-8">
            <div className="px-6 py-2 bg-premium/10 border-2 border-premium/40 rounded shadow-[0_0_10px_rgba(163,190,140,0.2)]">
              <h3 className="text-sm font-bold text-premium tracking-wider uppercase">{'//'} {plan.name}</h3>
            </div>
          </div>

          {/* Price Section */}
          <PriceSection selectedPricing={selectedPricing} />

          {/* Pricing Options Display */}
          <PricingOptionsDisplay 
            pricingOptions={plan.pricingOptions}
            selectedPricingId={selectedPricingId}
            onPricingChange={handlePricingChange}
          />

          {/* Features Grid */}
          <PlanFeatures features={plan.features} />

          {/* Error Message - Coding style */}
          {error && (
            <div className="mb-4 p-4 bg-destructive/10 border-2 border-destructive/40 rounded">
              <p className="text-destructive text-sm text-center font-mono">ERROR: {error}</p>
            </div>
          )}

          {/* CTA Button */}
          <div className="mb-6">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري المعالجة...</span>
                </div>
              ) : (
                'اشترك_الآن'
              )}
            </Button>
          </div>

          {/* Guarantee */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-primary transition-colors group"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              <span>اقرأ المزيد حول سياسة الاسترداد</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
