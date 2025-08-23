import { StripeCheckoutRequest, StripeCheckoutResponse } from '@/types'

/**
 * StripeClient - Frontend client for Stripe operations
 * Used by React components to interact with Stripe API routes
 */
export class StripeClient {
  
  /**
   * Create checkout session for subscription
   * @param request - Checkout request data
   * @returns Checkout session response with URL
   */
  static async createCheckoutSession(request: StripeCheckoutRequest): Promise<StripeCheckoutResponse> {
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'فشل في إنشاء جلسة الدفع')
      }

      const data = await response.json()
      return {
        sessionId: data.sessionId,
        url: data.url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    }
  }

  /**
   * Redirect to Stripe checkout
   * @param priceId - Stripe price ID
   * @param successUrl - Optional success URL
   * @param cancelUrl - Optional cancel URL
   */
  static async redirectToCheckout(
    priceId: string, 
    successUrl?: string, 
    cancelUrl?: string
  ): Promise<void> {
    try {
      const { url } = await this.createCheckoutSession({
        priceId,
        successUrl,
        cancelUrl
      })

      // Redirect to Stripe checkout
      window.location.href = url
    } catch (error) {
      console.error('Error redirecting to checkout:', error)
      throw error
    }
  }

  /**
   * Create billing portal session for subscription management
   * @param returnUrl - Optional return URL after portal session
   * @returns Billing portal URL
   */
  static async createBillingPortalSession(returnUrl?: string): Promise<{ url: string }> {
    try {
      const response = await fetch('/api/stripe/billing-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ returnUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'فشل في إنشاء جلسة إدارة الفواتير')
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating billing portal session:', error)
      throw error
    }
  }

  /**
   * Redirect to Stripe billing portal
   * @param returnUrl - Optional return URL after portal session
   */
  static async redirectToBillingPortal(returnUrl?: string): Promise<void> {
    try {
      const { url } = await this.createBillingPortalSession(returnUrl)
      
      // Redirect to Stripe billing portal
      window.location.href = url
    } catch (error) {
      console.error('Error redirecting to billing portal:', error)
      throw error
    }
  }
}
