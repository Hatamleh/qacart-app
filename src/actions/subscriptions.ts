'use server'

import Stripe from 'stripe'
import { admin } from '@/firebase/admin'
import { requireAuth } from '@/lib/auth'
import { StripeCheckoutRequest, User } from '@/types'

/**
 * Get Stripe instance
 */
function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set')
  }

  return new Stripe(secretKey, {
    apiVersion: '2025-07-30.basil'
  })
}

/**
 * Get user by ID
 */
async function getUserById(userId: string): Promise<User | null> {
  try {
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(userId)
      .get()

    if (!userDoc.exists) {
      return null
    }

    return userDoc.data() as User
  } catch {
    return null
  }
}

/**
 * Create Stripe checkout session
 * Requires authentication
 */
export async function createCheckoutSession(
  request: StripeCheckoutRequest
): Promise<{ sessionId: string; url: string }> {
  const userId = await requireAuth()

  try {
    // Get user info for Stripe
    const user = await getUserById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const stripe = getStripe()

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: request.priceId,
          quantity: 1,
        },
      ],
      success_url: request.successUrl || '/profile',
      cancel_url: request.cancelUrl || '/premium',
      metadata: {
        userId: user.id,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_creation: user.stripeCustomerId ? undefined : 'always',
    }

    // Set customer or customer email
    if (user.stripeCustomerId) {
      sessionParams.customer = user.stripeCustomerId
    } else {
      sessionParams.customer_email = user.email
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return {
      sessionId: session.id,
      url: session.url || ''
    }

  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw new Error('Failed to create checkout session')
  }
}

/**
 * Create Stripe billing portal session
 * Requires authentication
 */
export async function createBillingPortalSession(
  returnUrl?: string
): Promise<{ url: string }> {
  const userId = await requireAuth()

  try {
    // Get user for Stripe customer ID
    const user = await getUserById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    if (!user.stripeCustomerId) {
      throw new Error('No Stripe customer ID found')
    }

    const stripe = getStripe()

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: returnUrl || '/',
    })

    return { url: session.url }

  } catch (error) {
    console.error('Error creating billing portal session:', error)
    throw new Error('Failed to create billing portal session')
  }
}
