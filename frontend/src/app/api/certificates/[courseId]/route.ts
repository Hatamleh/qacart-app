import { NextRequest, NextResponse } from 'next/server'
import { AuthRepository, CertificateRepository } from '@/repositories'

interface RouteParams {
  params: Promise<{ courseId: string }>
}

/**
 * GET /api/certificates/[courseId]
 * Check certificate eligibility and get existing certificate if any
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
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
    const { courseId } = await params

    // 2. Check eligibility
    const eligibility = await CertificateRepository.checkEligibility(userId, courseId)
    
    // 3. Get existing certificate if any
    const existingCertificate = await CertificateRepository.getCertificate(userId, courseId)

    return NextResponse.json({
      success: true,
      eligibility,
      certificate: existingCertificate,
      message: eligibility.isEligible 
        ? 'مؤهل للحصول على الشهادة' 
        : eligibility.reason || 'غير مؤهل للحصول على الشهادة'
    })

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Authentication required') {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }
    }
    
    console.error('Error checking certificate eligibility:', error)
    return NextResponse.json(
      { error: 'فشل في التحقق من أهلية الحصول على الشهادة' },
      { status: 500 }
    )
  }
}
