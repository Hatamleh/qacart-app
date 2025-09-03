export interface PricingOption {
  id: string
  type: string
  duration: string
  price: number
  currency: string
  popular: boolean
  savings: string | null
  
  // Stripe integration fields
  stripePriceId: string        // Stripe Price ID (price_xxx)
}


export interface Plan {
  id: string
  name: string
  description: string
  pricingOptions: PricingOption[]
  features: string[]
  
  // Stripe integration fields
  stripeProductId?: string     // Stripe Product ID (prod_xxx) - optional for backward compatibility
}

// Stripe-specific types for checkout and webhooks
export interface StripeCheckoutRequest {
  priceId: string
  successUrl?: string
  cancelUrl?: string
}

export interface StripeCheckoutResponse {
  sessionId: string
  url: string
}
