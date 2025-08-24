import { NextRequest, NextResponse } from 'next/server'
import { CertificateRepository } from '@/repositories'

/**
 * POST /api/certificates/verify-by-code
 * Verify certificate by verification code only (public endpoint, no authentication required)
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate request body
    const body = await request.json()
    const { verificationCode } = body

    if (!verificationCode) {
      return NextResponse.json(
        { 
          success: false,
          error: 'رمز التحقق مطلوب',
          message: 'رمز التحقق مطلوب'
        },
        { status: 400 }
      )
    }

    // 2. Verify certificate by verification code only
    const verificationResult = await CertificateRepository.verifyCertificateByCode(verificationCode)

    if (!verificationResult.isValid) {
      return NextResponse.json({
        success: false,
        message: verificationResult.message || 'الشهادة غير صحيحة أو رمز التحقق خاطئ'
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      certificate: verificationResult.certificate,
      message: verificationResult.message || 'الشهادة صحيحة ومعتمدة من QAcart'
    })

  } catch (error) {
    console.error('Error verifying certificate by code:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'فشل في التحقق من الشهادة',
        message: 'فشل في التحقق من الشهادة'
      },
      { status: 500 }
    )
  }
}
