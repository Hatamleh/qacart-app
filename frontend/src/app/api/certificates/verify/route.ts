import { NextRequest, NextResponse } from 'next/server'
import { CertificateRepository } from '@/repositories'
import { VerifyCertificateRequest } from '@/types'

/**
 * POST /api/certificates/verify
 * Verify certificate authenticity (public endpoint, no authentication required)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate request body
    const body: VerifyCertificateRequest = await request.json()
    const { certificateId, verificationCode } = body

    if (!certificateId || !verificationCode) {
      return NextResponse.json(
        { error: 'معرف الشهادة ورمز التحقق مطلوبان' },
        { status: 400 }
      )
    }

    // 2. Verify certificate
    const verificationResult = await CertificateRepository.verifyCertificate(
      certificateId,
      verificationCode
    )

    if (!verificationResult.isValid) {
      return NextResponse.json({
        success: false,
        message: 'الشهادة غير صحيحة أو رمز التحقق خاطئ'
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      certificate: verificationResult.certificate,
      message: 'الشهادة صحيحة ومعتمدة من QAcart'
    })

  } catch (error) {
    console.error('Error verifying certificate:', error)
    return NextResponse.json(
      { error: 'فشل في التحقق من الشهادة' },
      { status: 500 }
    )
  }
}
