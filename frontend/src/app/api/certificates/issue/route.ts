import { NextRequest, NextResponse } from 'next/server'
import { AuthRepository, CertificateRepository } from '@/repositories'
import { IssueCertificateRequest } from '@/types'

/**
 * POST /api/certificates/issue
 * Issue a new certificate for premium users (premium-only feature)
 */
export async function POST(request: NextRequest) {
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

    // 2. Parse and validate request body
    const body: IssueCertificateRequest = await request.json()
    const { courseId, studentName } = body

    if (!courseId || !studentName?.trim()) {
      return NextResponse.json(
        { error: 'معرف الدورة واسم الطالب مطلوبان' },
        { status: 400 }
      )
    }

    if (studentName.trim().length < 2) {
      return NextResponse.json(
        { error: 'يجب أن يكون الاسم أكثر من حرفين' },
        { status: 400 }
      )
    }

    if (studentName.trim().length > 100) {
      return NextResponse.json(
        { error: 'يجب أن يكون الاسم أقل من 100 حرف' },
        { status: 400 }
      )
    }

    // 3. Issue certificate (includes premium validation)
    const certificate = await CertificateRepository.issueCertificate(
      userId,
      courseId,
      studentName.trim()
    )

    return NextResponse.json({
      success: true,
      certificate,
      message: `تم إصدار الشهادة بنجاح - رقم الشهادة: ${certificate.certificateNumber}`
    }, { status: 201 })

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Authentication required') {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }
      
      // Handle specific business logic errors
      if (error.message.includes('الشهادات متاحة للمشتركين المميزين فقط')) {
        return NextResponse.json(
          { error: error.message },
          { status: 403 }
        )
      }
      
      if (error.message.includes('يجب إكمال') || error.message.includes('تم إصدار')) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        )
      }
    }
    
    console.error('Error issuing certificate:', error)
    return NextResponse.json(
      { error: 'فشل في إصدار الشهادة' },
      { status: 500 }
    )
  }
}
