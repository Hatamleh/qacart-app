import { NextRequest, NextResponse } from 'next/server'
import { AuthRepository, StripeRepository, UserRepository } from '@/repositories'

/**
 * POST /api/stripe/billing-portal
 * Create Stripe billing portal session for subscription management
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

    // Get user data
    const user = await UserRepository.getUserById(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 404 }
      )
    }

    // Check if user has a Stripe customer ID
    if (!user.stripeCustomerId) {
      return NextResponse.json(
        { error: 'لم يتم العثور على بيانات العميل. يرجى الاشتراك أولاً.' },
        { status: 400 }
      )
    }

    // Get return URL from request body or use default
    const body = await request.json().catch(() => ({}))
    const returnUrl = body.returnUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/profile`

    // Create billing portal session
    const session = await StripeRepository.createBillingPortalSession(
      user.stripeCustomerId,
      returnUrl
    )

    return NextResponse.json({
      url: session.url
    })

  } catch (error) {
    console.error('Billing portal creation error:', error)
    return NextResponse.json(
      { error: 'فشل في إنشاء جلسة إدارة الفواتير' },
      { status: 500 }
    )
  }
}
