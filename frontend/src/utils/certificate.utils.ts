import { admin } from '@/firebase/admin'

/**
 * Certificate utility functions
 * Reusable business logic for certificate operations
 */
export class CertificateUtils {
  
  /**
   * Generate unique certificate number
   * Format: QAC-YYYY-NNNNNN (e.g., QAC-2024-000123)
   */
  static async generateCertificateNumber(): Promise<string> {
    const year = new Date().getFullYear()
    
    // Get count of certificates issued this year
    const yearStart = `${year}-01-01T00:00:00.000Z`
    const yearEnd = `${year + 1}-01-01T00:00:00.000Z`
    
    const certificatesThisYear = await admin.firestore()
      .collection('certificates')
      .where('issuedAt', '>=', yearStart)
      .where('issuedAt', '<', yearEnd)
      .get()
    
    const sequenceNumber = certificatesThisYear.size + 1
    const paddedNumber = sequenceNumber.toString().padStart(6, '0')
    
    return `QAC-${year}-${paddedNumber}`
  }

  /**
   * Generate unique verification code
   * Format: 8-character alphanumeric code
   */
  static generateVerificationCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  /**
   * Generate certificate document ID
   * Format: cert_{userId}_{courseId}_{timestamp}
   */
  static generateCertificateId(userId: string, courseId: string): string {
    return `cert_${userId}_${courseId}_${Date.now()}`
  }

  /**
   * Validate user subscription is premium and active
   */
  static isPremiumUser(user: { subscription?: { status: string; isActive?: boolean } }): boolean {
    return user.subscription?.status === 'premium' && user.subscription?.isActive === true
  }

  /**
   * Check if course is fully completed
   */
  static isCourseCompleted(progress: { progressPercentage?: number } | null): boolean {
    return (progress?.progressPercentage || 0) >= 100
  }

  /**
   * Get certificate eligibility error message
   */
  static getEligibilityErrorMessage(
    isPremium: boolean,
    isCompleted: boolean,
    hasExisting: boolean
  ): string | null {
    if (!isPremium) {
      return 'الشهادات متاحة للمشتركين المميزين فقط'
    }
    
    if (!isCompleted) {
      return 'يجب إكمال جميع دروس الدورة للحصول على الشهادة'
    }
    
    if (hasExisting) {
      return 'تم إصدار شهادة لهذه الدورة من قبل'
    }
    
    return null
  }

  /**
   * Get date range for time period queries
   */
  static getDateRange(period: 'week' | 'month' | 'year'): { start: string; end?: string } {
    const now = new Date()
    
    switch (period) {
      case 'week':
        const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return { start: weekStart.toISOString() }
        
      case 'month':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        return { start: monthStart.toISOString() }
        
      case 'year':
        const yearStart = new Date(now.getFullYear(), 0, 1)
        const yearEnd = new Date(now.getFullYear() + 1, 0, 1)
        return { 
          start: yearStart.toISOString(),
          end: yearEnd.toISOString()
        }
        
      default:
        throw new Error('Invalid period')
    }
  }
}
