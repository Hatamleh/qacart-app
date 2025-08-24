import { NextRequest, NextResponse } from 'next/server'
import { AuthRepository, CertificateRepository } from '@/repositories'

/**
 * GET /api/certificates
 * Get all certificates for the authenticated user (premium-only feature)
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Verify authentication
    const sessionCookie = request.cookies.get('session')?.value
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = await AuthRepository.verifySession(sessionCookie)
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    // 2. Get user certificates (includes premium validation)
    const certificates = await CertificateRepository.getAllUserCertificates(userId)

    return NextResponse.json({
      success: true,
      certificates,
      count: certificates.length,
      message: certificates.length > 0 
        ? `تم العثور على ${certificates.length} شهادة` 
        : 'لا توجد شهادات'
    })

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Authentication required') {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }
      
      if (error.message.includes('الشهادات متاحة للمشتركين المميزين فقط')) {
        return NextResponse.json(
          { error: error.message },
          { status: 403 }
        )
      }
    }
    
    console.error('Error fetching user certificates:', error)
    return NextResponse.json(
      { error: 'فشل في جلب الشهادات' },
      { status: 500 }
    )
  }
}
