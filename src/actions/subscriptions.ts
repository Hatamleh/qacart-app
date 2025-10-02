'use server'

import { StripeRepository, UserRepository } from '@/repositories'
import { requireAuth } from '@/lib/auth'
import { StripeCheckoutRequest } from '@/types'

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
    const user = await UserRepository.getUserById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    const session = await StripeRepository.createCheckoutSession({
      priceId: request.priceId,
      customerId: user.stripeCustomerId,
      customerEmail: user.email,
      successUrl: request.successUrl || '/profile',
      cancelUrl: request.cancelUrl || '/premium',
      metadata: {
        userId: user.id,
      }
    })

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
    const user = await UserRepository.getUserById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    if (!user.stripeCustomerId) {
      throw new Error('No Stripe customer ID found')
    }

    const session = await StripeRepository.createBillingPortalSession(
      user.stripeCustomerId,
      returnUrl || '/'
    )

    return { url: session.url }

  } catch (error) {
    console.error('Error creating billing portal session:', error)
    throw new Error('Failed to create billing portal session')
  }
}
