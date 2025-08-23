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
import { StripeClient } from '@/clients'
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
      // Redirect to Stripe checkout
      await StripeClient.redirectToCheckout(selectedPricing.stripePriceId)
    } catch (error) {
      console.error('Checkout error:', error)
      setError(error instanceof Error ? error.message : 'حدث خطأ أثناء معالجة الدفع')
      setIsLoading(false)
    }
  }

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
          <PriceSection selectedPricing={selectedPricing} />

          {/* Pricing Options Display */}
          <PricingOptionsDisplay 
            pricingOptions={plan.pricingOptions}
            selectedPricingId={selectedPricingId}
            onPricingChange={handlePricingChange}
          />

          {/* Features Grid */}
          <PlanFeatures features={plan.features} />

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* CTA Button */}
          <div className="mb-6">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full py-4 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري المعالجة...</span>
                </div>
              ) : (
                'اشترك الآن'
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
