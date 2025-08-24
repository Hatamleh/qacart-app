import {
  Certificate,
  CertificateEligibility,
  IssueCertificateRequest,
  IssueCertificateResponse,
  GetUserCertificatesResponse,
  VerifyCertificateRequest,
  VerifyCertificateResponse
} from '@/types'

/**
 * CertificateClient - Frontend API client for premium certificate operations
 * Handles all certificate-related API calls with proper error handling
 */
export class CertificateClient {

  /**
   * Check certificate eligibility for a course
   * Returns eligibility status and existing certificate if any
   */
  static async checkEligibility(courseId: string): Promise<{
    eligibility: CertificateEligibility
    certificate: Certificate | null
    message: string
  }> {
    try {
      const response = await fetch(`/api/certificates/${courseId}`, {
        method: 'GET',
        credentials: 'include', // Include session cookie
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'فشل في التحقق من أهلية الحصول على الشهادة')
      }

      const data = await response.json()
      return {
        eligibility: data.eligibility,
        certificate: data.certificate,
        message: data.message
      }

    } catch (error) {
      console.error('Error checking certificate eligibility:', error)
      throw new Error(error instanceof Error ? error.message : 'فشل في التحقق من أهلية الحصول على الشهادة')
    }
  }

  /**
   * Issue a new certificate for premium users
   * Requires premium subscription and course completion
   */
  static async issueCertificate(request: IssueCertificateRequest): Promise<IssueCertificateResponse> {
    try {
      const response = await fetch('/api/certificates/issue', {
        method: 'POST',
        credentials: 'include', // Include session cookie
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'فشل في إصدار الشهادة',
          message: data.error || 'فشل في إصدار الشهادة'
        }
      }

      return {
        success: true,
        certificate: data.certificate,
        message: data.message
      }

    } catch (error) {
      console.error('Error issuing certificate:', error)
      return {
        success: false,
        error: 'فشل في إصدار الشهادة',
        message: 'فشل في إصدار الشهادة'
      }
    }
  }

  /**
   * Get all certificates for the authenticated user
   * Premium users only
   */
  static async getUserCertificates(): Promise<GetUserCertificatesResponse> {
    try {
      const response = await fetch('/api/certificates', {
        method: 'GET',
        credentials: 'include', // Include session cookie
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          certificates: [],
          error: data.error || 'فشل في جلب الشهادات'
        }
      }

      return {
        success: true,
        certificates: data.certificates,
        error: undefined
      }

    } catch (error) {
      console.error('Error fetching user certificates:', error)
      return {
        success: false,
        certificates: [],
        error: 'فشل في جلب الشهادات'
      }
    }
  }

  /**
   * Verify certificate authenticity (public method)
   * No authentication required
   */
  static async verifyCertificate(request: VerifyCertificateRequest): Promise<VerifyCertificateResponse> {
    try {
      const response = await fetch('/api/certificates/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'فشل في التحقق من الشهادة'
        }
      }

      return {
        success: data.success,
        certificate: data.certificate,
        error: undefined
      }

    } catch (error) {
      console.error('Error verifying certificate:', error)
      return {
        success: false,
        error: 'فشل في التحقق من الشهادة'
      }
    }
  }

  /**
   * Check if user is eligible for certificate (helper method)
   * Simplified version that only returns boolean eligibility
   */
  static async isEligibleForCertificate(courseId: string): Promise<boolean> {
    try {
      const result = await this.checkEligibility(courseId)
      return result.eligibility.isEligible
    } catch (error) {
      console.error('Error checking certificate eligibility:', error)
      return false
    }
  }

  /**
   * Check if user already has certificate for course (helper method)
   */
  static async hasCertificate(courseId: string): Promise<boolean> {
    try {
      const result = await this.checkEligibility(courseId)
      return !!result.certificate
    } catch (error) {
      console.error('Error checking existing certificate:', error)
      return false
    }
  }

  /**
   * Get certificate for specific course (helper method)
   */
  static async getCertificate(courseId: string): Promise<Certificate | null> {
    try {
      const result = await this.checkEligibility(courseId)
      return result.certificate
    } catch (error) {
      console.error('Error getting certificate:', error)
      return null
    }
  }

  /**
   * Check premium status and course completion (helper method)
   * Returns detailed status for UI components
   */
  static async getCertificateStatus(courseId: string): Promise<{
    isPremium: boolean
    isCompleted: boolean
    hasExisting: boolean
    canClaim: boolean
    reason?: string
  }> {
    try {
      const result = await this.checkEligibility(courseId)
      const { eligibility } = result

      return {
        isPremium: eligibility.isPremium,
        isCompleted: eligibility.progressPercentage >= 100,
        hasExisting: eligibility.hasExistingCertificate,
        canClaim: eligibility.isEligible,
        reason: eligibility.reason
      }
    } catch (error) {
      console.error('Error getting certificate status:', error)
      return {
        isPremium: false,
        isCompleted: false,
        hasExisting: false,
        canClaim: false,
        reason: 'فشل في التحقق من الحالة'
      }
    }
  }

  /**
   * Validate student name before issuing certificate
   * Client-side validation helper
   */
  static validateStudentName(name: string): { isValid: boolean; error?: string } {
    const trimmedName = name.trim()

    if (!trimmedName) {
      return { isValid: false, error: 'الاسم مطلوب' }
    }

    if (trimmedName.length < 2) {
      return { isValid: false, error: 'يجب أن يكون الاسم أكثر من حرفين' }
    }

    if (trimmedName.length > 100) {
      return { isValid: false, error: 'يجب أن يكون الاسم أقل من 100 حرف' }
    }

    // Check for invalid characters (optional - can be customized)
    if (!/^[\u0600-\u06FF\s\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z\s]+$/.test(trimmedName)) {
      return { isValid: false, error: 'يجب أن يحتوي الاسم على أحرف عربية أو إنجليزية فقط' }
    }

    return { isValid: true }
  }

  /**
   * Format certificate for display (helper method)
   * Useful for UI components that need formatted certificate data
   */
  static formatCertificateForDisplay(certificate: Certificate): {
    title: string
    studentName: string
    courseName: string
    issueDate: string
    certificateNumber: string
    verificationCode: string
  } {
    return {
      title: 'شهادة إتمام - QAcart',
      studentName: certificate.studentName,
      courseName: certificate.courseName,
      issueDate: new Date(certificate.issuedAt).toLocaleDateString('ar-SA'),
      certificateNumber: certificate.certificateNumber,
      verificationCode: certificate.verificationCode
    }
  }
}
