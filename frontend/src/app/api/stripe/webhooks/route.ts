import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { StripeRepository, UserRepository } from '@/repositories'
import { StripeInvoiceWithSubscription, SubscriptionUpdateData, UserSubscriptionUpdate } from '@/types'
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



    // Handle different event types
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

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        // Unhandled event type
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

/**
 * Handle successful payment
 */
async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    // Cast invoice to our extended type to access subscription property
    const invoiceWithSub = invoice as StripeInvoiceWithSubscription
    
    // Skip if not a subscription invoice
    if (!invoiceWithSub.subscription) {
      return
    }

    const subscriptionId = typeof invoiceWithSub.subscription === 'string' 
      ? invoiceWithSub.subscription 
      : invoiceWithSub.subscription?.id
    
    if (!subscriptionId) {
      return
    }

    // Get the subscription
    const subscription = await StripeRepository.getSubscription(subscriptionId)
    if (!subscription) {
      console.error('Could not retrieve subscription:', subscriptionId)
      return
    }

    // Find user and update subscription
    const customerId = subscription.customer as string
    const userId = await findUserByCustomerId(customerId)
    
    if (userId) {
      await updateUserSubscription(userId, subscription)
    }

  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  try {
    // Cast invoice to our extended type to access subscription property
    const invoiceWithSub = invoice as StripeInvoiceWithSubscription
    
    // Skip if not a subscription invoice
    if (!invoiceWithSub.subscription) {
      return
    }

    const subscriptionId = typeof invoiceWithSub.subscription === 'string' 
      ? invoiceWithSub.subscription 
      : invoiceWithSub.subscription?.id
    
    if (!subscriptionId) {
      return
    }

    // Get the subscription
    const subscription = await StripeRepository.getSubscription(subscriptionId)
    if (!subscription) {
      console.error('Could not retrieve subscription:', subscriptionId)
      return
    }

    // Find user and update subscription status
    const customerId = subscription.customer as string
    const userId = await findUserByCustomerId(customerId)
    
    if (userId) {
      // For our simple model, we'll keep access during payment failures
      // Stripe will handle retries and eventual cancellation
      await updateUserSubscription(userId, subscription)
    }

  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}

/**
 * Update user subscription data in Firebase
 */
async function updateUserSubscription(userId: string, subscription: Stripe.Subscription) {
  try {
    const isActive = subscription.status === 'active'
    const priceId = subscription.items.data[0]?.price.id || ''

    // Determine plan type from price nickname (Arabic)
    let planType: 'monthly' | 'quarterly' | 'yearly' | undefined
    
    const price = subscription.items.data[0]?.price
    if (price?.nickname) {
      const nickname = price.nickname.toLowerCase()
      if (nickname.includes('شهري') || nickname.includes('monthly')) planType = 'monthly'
      else if (nickname.includes('ربع') || nickname.includes('quarterly')) planType = 'quarterly'  
      else if (nickname.includes('سنوي') || nickname.includes('yearly')) planType = 'yearly'
    }

    // Calculate next billing date - use a fallback since current_period_end might not be available
    const nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now as fallback

    // Build subscription update object, excluding undefined values
    const subscriptionData: SubscriptionUpdateData = {
      status: isActive ? 'premium' as const : 'free' as const,
      isActive,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId
    }

    // Only add optional fields if they have values
    if (planType) {
      subscriptionData.plan = planType
    }
    if (isActive && nextBillingDate) {
      subscriptionData.nextBillingDate = nextBillingDate
    }
    if (isActive) {
      subscriptionData.stripeStatus = 'active' as const
    }

    const subscriptionUpdate: UserSubscriptionUpdate = {
      subscription: subscriptionData
    }

    await UserRepository.updateUser(userId, subscriptionUpdate)

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
