import Stripe from 'stripe'
import {StripeCustomerData, StripeSubscriptionSync} from '@/types'

/**
 * StripeRepository - Data access layer for Stripe operations
 * Used by API routes to interact with Stripe API
 * Handles customers, subscriptions, checkout sessions, and billing portal
 */
export class StripeRepository {
  private static stripe: Stripe

  /**
   * Initialize Stripe instance with secret key
   */
  private static getStripe(): Stripe {
    if (!this.stripe) {
      const secretKey = process.env.STRIPE_SECRET_KEY
      if (!secretKey) {
        throw new Error('STRIPE_SECRET_KEY environment variable is not set')
      }

      this.stripe = new Stripe(secretKey, {
        apiVersion: '2025-07-30.basil' // Use latest API version
      })
    }
    return this.stripe
  }

  // ===== CUSTOMER MANAGEMENT =====

  /**
   * Create a new Stripe customer
   * @param customerData - Customer information
   * @returns Stripe customer object
   */
  static async createCustomer(customerData: StripeCustomerData): Promise<Stripe.Customer> {
    try {
      const stripe = this.getStripe()

      return await stripe.customers.create({
          email: customerData.email,
          name: customerData.name,
          metadata: customerData.metadata || {}
      })
    } catch (error) {
      console.error('Error creating Stripe customer:', error)
      throw new Error('Failed to create customer')
    }
  }

  /**
   * Retrieve a Stripe customer by ID
   * @param customerId - Stripe customer ID
   * @returns Stripe customer object or null if not found
   */
  static async getCustomer(customerId: string): Promise<Stripe.Customer | null> {
    try {
      const stripe = this.getStripe()

      const customer = await stripe.customers.retrieve(customerId)

      // Check if customer was deleted
      if (customer.deleted) {
        return null
      }

      return customer as Stripe.Customer
    } catch (error) {
      console.error('Error retrieving Stripe customer:', error)
      return null
    }
  }

  // ===== CHECKOUT SESSIONS =====

  /**
   * Create a checkout session for subscription
   * @param priceId - Stripe price ID
   * @param customerId - Stripe customer ID (optional, will create if not provided)
   * @param customerEmail - Customer email (required if no customerId)
   * @param successUrl - URL to redirect after successful payment
   * @param cancelUrl - URL to redirect after canceled payment
   * @param metadata
   * @returns Stripe checkout session
   */
  static async createCheckoutSession({
    priceId,
    customerId,
    customerEmail,
    successUrl,
    cancelUrl,
    metadata = {}
  }: {
    priceId: string
    customerId?: string
    customerEmail?: string
    successUrl: string
    cancelUrl: string
    metadata?: Record<string, string>
  }): Promise<Stripe.Checkout.Session> {
    try {
      const stripe = this.getStripe()

      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata,
        // Enable customer portal access
        allow_promotion_codes: true,
        billing_address_collection: 'auto',
        // Collect customer details
        customer_creation: customerId ? undefined : 'always',
      }

      // Set customer or customer email
      if (customerId) {
        sessionParams.customer = customerId
      } else if (customerEmail) {
        sessionParams.customer_email = customerEmail
      }

      return await stripe.checkout.sessions.create(sessionParams)
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw new Error('Failed to create checkout session')
    }
  }

  /**
   * Retrieve a checkout session by ID
   * @param sessionId - Stripe session ID
   * @returns Stripe checkout session or null if not found
   */
  static async getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session | null> {
    try {
      const stripe = this.getStripe()

      return await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ['subscription', 'customer']
      })
    } catch (error) {
      console.error('Error retrieving checkout session:', error)
      return null
    }
  }

  // ===== SUBSCRIPTION MANAGEMENT =====

  /**
   * Retrieve a subscription by ID
   * @param subscriptionId - Stripe subscription ID
   * @returns Stripe subscription or null if not found
   */
  static async getSubscription(subscriptionId: string): Promise<Stripe.Subscription | null> {
    try {
      const stripe = this.getStripe()

      return await stripe.subscriptions.retrieve(subscriptionId)
    } catch (error) {
      console.error('Error retrieving subscription:', error)
      return null
    }
  }

  /**
   * Cancel a subscription at the end of the current period
   * @param subscriptionId - Stripe subscription ID
   * @returns Updated subscription object
   */
  static async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    try {
      const stripe = this.getStripe()

      return await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true
      })
    } catch (error) {
      console.error('Error canceling subscription:', error)
      throw new Error('Failed to cancel subscription')
    }
  }

  /**
   * Reactivate a canceled subscription (if still within the current period)
   * @param subscriptionId - Stripe subscription ID
   * @returns Updated subscription object
   */
  static async reactivateSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    try {
      const stripe = this.getStripe()

      return await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: false
      })
    } catch (error) {
      console.error('Error reactivating subscription:', error)
      throw new Error('Failed to reactivate subscription')
    }
  }

  // ===== BILLING PORTAL =====

  /**
   * Create a billing portal session for customer management
   * @param customerId - Stripe customer ID
   * @param returnUrl - URL to return to after portal session
   * @returns Billing portal session
   */
  static async createBillingPortalSession(
    customerId: string,
    returnUrl: string
  ): Promise<Stripe.BillingPortal.Session> {
    try {
      const stripe = this.getStripe()

      return await stripe.billingPortal.sessions.create({
          customer: customerId,
          return_url: returnUrl,
      })
    } catch (error) {
      console.error('Error creating billing portal session:', error)
      throw new Error('Failed to create billing portal session')
    }
  }

  // ===== WEBHOOK UTILITIES =====

  /**
   * Construct and verify webhook event from Stripe
   * @param payload - Raw request body
   * @param signature - Stripe signature header
   * @returns Verified Stripe event
   */
  static constructWebhookEvent(payload: string | Buffer, signature: string): Stripe.Event {
    try {
      const stripe = this.getStripe()
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

      if (!webhookSecret) {
        throw new Error('STRIPE_WEBHOOK_SECRET environment variable is not set')
      }

      return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
    } catch (error) {
      console.error('Error constructing webhook event:', error)
      throw new Error('Invalid webhook signature')
    }
  }

  /**
   * Extract subscription sync data from Stripe subscription object
   * @param subscription - Stripe subscription object
   * @returns Formatted subscription sync data
   */
  static formatSubscriptionSync(subscription: Stripe.Subscription): StripeSubscriptionSync {
    return {
      subscriptionId: subscription.id,
      customerId: subscription.customer as string,
      status: subscription.status === 'active' ? 'active' : undefined, // Only set if active
      priceId: subscription.items.data[0]?.price.id || ''
    }
  }

  // ===== UTILITY FUNCTIONS =====

  /**
   * Validate that a price ID exists and is active
   * @param priceId - Stripe price ID to validate
   * @returns True if price exists and is active
   */
  static async validatePriceId(priceId: string): Promise<boolean> {
    try {
      const stripe = this.getStripe()

      const price = await stripe.prices.retrieve(priceId)

      return price.active
    } catch (error) {
      console.error('Error validating price ID:', error)
      return false
    }
  }

  /**
   * Get all active prices for a product
   * @param productId - Stripe product ID
   * @returns Array of active prices
   */
  static async getProductPrices(productId: string): Promise<Stripe.Price[]> {
    try {
      const stripe = this.getStripe()

      const prices = await stripe.prices.list({
        product: productId,
        active: true,
      })

      return prices.data
    } catch (error) {
      console.error('Error getting product prices:', error)
      return []
    }
  }
}
