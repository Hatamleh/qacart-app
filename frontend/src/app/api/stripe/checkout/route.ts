import { NextRequest, NextResponse } from 'next/server'
import { AuthRepository, StripeRepository, PlanRepository, UserRepository } from '@/repositories'
import { StripeCheckoutRequest } from '@/types'

/**
 * POST /api/stripe/checkout
 * Create Stripe checkout session for subscription
 */
export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const userId = await AuthRepository.getAuthenticatedUserId()
    if (!userId) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }

    // Get request body
    const body: StripeCheckoutRequest = await request.json()
    const { priceId, successUrl, cancelUrl } = body

    if (!priceId) {
      return NextResponse.json(
        { error: 'معرف السعر مطلوب' },
        { status: 400 }
      )
    }

    // Get user data
    const user = await UserRepository.getUserById(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 404 }
      )
    }

    // Validate the price ID exists in our plan data
    const plan = await PlanRepository.getPlan()
    const validPriceId = plan.pricingOptions.find(option => option.stripePriceId === priceId)
    
    if (!validPriceId) {
      return NextResponse.json(
        { error: 'معرف السعر غير صحيح' },
        { status: 400 }
      )
    }

    // Check if user already has an active subscription
    if (user.subscription.status === 'premium' && user.subscription.stripeSubscriptionId) {
      return NextResponse.json(
        { error: 'لديك اشتراك نشط بالفعل' },
        { status: 400 }
      )
    }

    // Set default URLs to redirect to profile with status
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const checkoutSuccessUrl = successUrl || `${baseUrl}/profile?status=success`
    const checkoutCancelUrl = cancelUrl || `${baseUrl}/profile?status=cancelled`

    let customerId = user.stripeCustomerId

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await StripeRepository.createCustomer({
        email: user.email,
        name: user.email.split('@')[0], // Use email prefix as name
        metadata: {
          firebaseUid: user.id
        }
      })
      
      customerId = customer.id

      // Update user with Stripe customer ID
      await UserRepository.updateUser(userId, {
        stripeCustomerId: customerId
      })
    }

    // Create checkout session
    const session = await StripeRepository.createCheckoutSession({
      priceId,
      customerId,
      successUrl: checkoutSuccessUrl,
      cancelUrl: checkoutCancelUrl,
      metadata: {
        userId: user.id,
        planType: validPriceId.type
      }
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url
    })

  } catch (error) {
    console.error('Checkout session creation error:', error)
    return NextResponse.json(
      { error: 'فشل في إنشاء جلسة الدفع' },
      { status: 500 }
    )
  }
}
