import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { StripeRepository, UserRepository } from '@/repositories'
import { SubscriptionUpdateData, UserSubscriptionUpdate } from '@/types'
import Stripe from 'stripe'

/**
 * POST /api/stripe/webhooks
 * Handle Stripe webhook events for subscription management
 */
export async function POST(request: NextRequest) {
  try {
    // Get the raw body and signature
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      console.error('❌ Missing Stripe signature')
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    // Verify and construct the webhook event
    let event: Stripe.Event
    try {
      event = StripeRepository.constructWebhookEvent(body, signature)
    } catch (error) {
      console.error('❌ Webhook signature verification failed:', error)
      return NextResponse.json(
        { error: 'توقيع غير صحيح' },
        { status: 400 }
      )
    }



    // Handle different event types - keeping only essential events
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      default:
        console.log(`ℹ️ Unhandled webhook event type: ${event.type}`)
        // We only handle essential subscription events
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('❌ Webhook handler error:', error)
    return NextResponse.json(
      { error: 'فشل في معالجة الحدث' },
      { status: 500 }
    )
  }
}

/**
 * Handle successful checkout completion
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    // Get the subscription from the session
    const subscriptionId = session.subscription as string
    if (!subscriptionId) {
      console.error('No subscription ID in checkout session')
      return
    }

    // Get user ID from session metadata
    const userId = session.metadata?.userId
    if (!userId) {
      console.error('No user ID in session metadata')
      return
    }

    // Get the subscription details
    const subscription = await StripeRepository.getSubscription(subscriptionId)
    if (!subscription) {
      console.error('Could not retrieve subscription:', subscriptionId)
      return
    }

    // Update user subscription in Firebase
    await updateUserSubscription(userId, subscription)

  } catch (error) {
    console.error('Error handling checkout completion:', error)
  }
}

/**
 * Handle subscription creation or updates
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    // Find user by Stripe customer ID
    const customerId = subscription.customer as string
    const userId = await findUserByCustomerId(customerId)
    
    if (!userId) {
      console.error('Could not find user for customer:', customerId)
      return
    }

    // Update user subscription in Firebase
    await updateUserSubscription(userId, subscription)

  } catch (error) {
    console.error('Error handling subscription update:', error)
  }
}

/**
 * Handle subscription deletion/cancellation
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    // Find user by Stripe customer ID
    const customerId = subscription.customer as string
    const userId = await findUserByCustomerId(customerId)
    
    if (!userId) {
      console.error('Could not find user for customer:', customerId)
      return
    }

    // Update user to free status
    await UserRepository.updateUser(userId, {
      subscription: {
        status: 'free',
        isActive: false
      }
    })

  } catch (error) {
    console.error('Error handling subscription deletion:', error)
  }
}

// Removed payment handlers - subscription.updated handles all status changes

/**
 * Update user subscription data in Firebase
 * Now properly handles cancellation status and end dates
 */
async function updateUserSubscription(userId: string, subscription: Stripe.Subscription) {
  try {
    const isActive = subscription.status === 'active'
    const priceId = subscription.items.data[0]?.price.id || ''

    // Get cancellation fields with proper TypeScript typing (no 'any' needed)
    const cancelAtPeriodEnd = subscription.cancel_at_period_end
    
    // Get current_period_end from subscription items (correct location!)
    const subscriptionItem = subscription.items.data[0]
    const currentPeriodEnd = subscriptionItem?.current_period_end

    // Determine plan type from price nickname (Arabic)
    let planType: 'monthly' | 'quarterly' | 'yearly' | undefined
    
    const price = subscription.items.data[0]?.price
    if (price?.nickname) {
      const nickname = price.nickname.toLowerCase()
      if (nickname.includes('شهري') || nickname.includes('monthly')) planType = 'monthly'
      else if (nickname.includes('ربع') || nickname.includes('quarterly')) planType = 'quarterly'  
      else if (nickname.includes('سنوي') || nickname.includes('yearly')) planType = 'yearly'
    }

    // Use actual Stripe dates from subscription item
    const currentPeriodEndISO = currentPeriodEnd 
      ? new Date(currentPeriodEnd * 1000).toISOString()
      : null

    // Build subscription update object
    const subscriptionData: SubscriptionUpdateData = {
      status: isActive ? 'premium' as const : 'free' as const,
      isActive,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId
    }

    // Add plan type if available
    if (planType) {
      subscriptionData.plan = planType
    }

    // Handle cancellation status and dates properly
    if (isActive) {
      subscriptionData.stripeStatus = 'active' as const
      
      if (cancelAtPeriodEnd && currentPeriodEndISO) {
        // Subscription is cancelled but still active until period end
        subscriptionData.stripeCancelAtPeriodEnd = true
        subscriptionData.stripeCurrentPeriodEnd = currentPeriodEndISO
        subscriptionData.nextBillingDate = currentPeriodEndISO // This becomes the end date
      } else if (currentPeriodEndISO) {
        // Active subscription with normal renewal
        subscriptionData.stripeCancelAtPeriodEnd = false
        subscriptionData.stripeCurrentPeriodEnd = currentPeriodEndISO
        subscriptionData.nextBillingDate = currentPeriodEndISO
      }
    }

    const subscriptionUpdate: UserSubscriptionUpdate = {
      subscription: subscriptionData
    }

    await UserRepository.updateUser(userId, subscriptionUpdate)

    console.log(`✅ Updated subscription for user ${userId}:`, {
      status: subscriptionData.status,
      isActive: subscriptionData.isActive,
      cancelAtPeriodEnd: subscriptionData.stripeCancelAtPeriodEnd,
      periodEnd: subscriptionData.stripeCurrentPeriodEnd
    })

  } catch (error) {
    console.error('Error updating user subscription:', error)
    throw error
  }
}

/**
 * Find user by Stripe customer ID
 */
async function findUserByCustomerId(customerId: string): Promise<string | null> {
  return await UserRepository.findUserByStripeCustomerId(customerId)
}
