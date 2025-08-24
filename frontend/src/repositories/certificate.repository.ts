import { Certificate } from '@/types'
import { admin } from '@/firebase/admin'
import { UserRepository } from './user.repository'
import { ProgressRepository } from './progress.repository'
import { CourseRepository } from './course.repository'
import { CertificateUtils } from '@/utils/certificate.utils'

/**
 * CertificateRepository - Data access layer for premium certificate operations
 * Only premium users can issue and access certificates
 */
export class CertificateRepository {
  


  /**
   * Check if user is eligible for certificate
   * Validates premium subscription and course completion
   */
  static async checkEligibility(userId: string, courseId: string): Promise<{
    isEligible: boolean
    reason?: string
    progressPercentage: number
    isPremium: boolean
    hasExistingCertificate: boolean
  }> {
    try {
      // 1. Check if user exists and is premium
      const user = await UserRepository.getUserById(userId)
      if (!user) {
        throw new Error('المستخدم غير موجود')
      }
      
      // 2. Check user premium status
      const isPremium = CertificateUtils.isPremiumUser(user)
      
      // 3. Check course completion
      const progress = await ProgressRepository.getUserProgress(userId, courseId)
      const progressPercentage = progress?.progressPercentage || 0
      const isCompleted = CertificateUtils.isCourseCompleted(progress)
      
      // 4. Check if certificate already exists
      const existingCertificate = await this.getCertificate(userId, courseId)
      const hasExistingCertificate = !!existingCertificate
      
      // 5. Get eligibility result
      const errorMessage = CertificateUtils.getEligibilityErrorMessage(
        isPremium,
        isCompleted,
        hasExistingCertificate
      )
      
      return {
        isEligible: !errorMessage,
        reason: errorMessage || undefined,
        progressPercentage,
        isPremium,
        hasExistingCertificate
      }
      
    } catch (error) {
      console.error('Error checking certificate eligibility:', error)
      throw new Error('فشل في التحقق من أهلية الحصول على الشهادة')
    }
  }

  /**
   * Issue a new certificate for premium user
   * Validates eligibility before issuance
   */
  static async issueCertificate(
    userId: string, 
    courseId: string, 
    studentName: string
  ): Promise<Certificate> {
    try {
      // 1. Validate eligibility
      const eligibility = await this.checkEligibility(userId, courseId)
      if (!eligibility.isEligible) {
        throw new Error(eligibility.reason || 'غير مؤهل للحصول على الشهادة')
      }
      
      // 2. Get course details
      const course = await CourseRepository.getCourseById(courseId)
      
      // 3. Generate certificate data
      const now = new Date().toISOString()
      const certificateNumber = await CertificateUtils.generateCertificateNumber()
      const verificationCode = CertificateUtils.generateVerificationCode()
      const certificateId = CertificateUtils.generateCertificateId(userId, courseId)
      
      // 4. Create certificate object
      const certificate: Certificate = {
        id: certificateId,
        userId,
        courseId,
        certificateNumber,
        studentName: studentName.trim(),
        courseName: course.title,
        issuedAt: now,
        status: 'issued',
        language: 'ar',
        verificationCode,
        issuerSignature: 'حاتم حتاملة - مؤسس QAcart'
      }
      
      // 5. Save to Firebase
      await admin.firestore()
        .collection('certificates')
        .doc(certificateId)
        .set(certificate)
      
      console.log(`Certificate issued successfully: ${certificateNumber} for user ${userId}`)
      return certificate
      
    } catch (error) {
      console.error('Error issuing certificate:', error)
      throw new Error(error instanceof Error ? error.message : 'فشل في إصدار الشهادة')
    }
  }

  /**
   * Get certificate for specific user and course
   */
  static async getCertificate(userId: string, courseId: string): Promise<Certificate | null> {
    try {
      const certificatesSnapshot = await admin.firestore()
        .collection('certificates')
        .where('userId', '==', userId)
        .where('courseId', '==', courseId)
        .where('status', '==', 'issued')
        .limit(1)
        .get()
      
      if (certificatesSnapshot.empty) {
        return null
      }
      
      const certificateDoc = certificatesSnapshot.docs[0]
      return {
        id: certificateDoc.id,
        ...certificateDoc.data()
      } as Certificate
      
    } catch (error) {
      console.error('Error fetching certificate:', error)
      throw new Error('فشل في جلب الشهادة')
    }
  }

  /**
   * Get all certificates for a user (premium users only)
   */
  static async getAllUserCertificates(userId: string): Promise<Certificate[]> {
    try {
      // Verify user is premium
      const user = await UserRepository.getUserById(userId)
      if (!user) {
        throw new Error('المستخدم غير موجود')
      }
      
      if (!CertificateUtils.isPremiumUser(user)) {
        throw new Error('الشهادات متاحة للمشتركين المميزين فقط')
      }
      
      const certificatesSnapshot = await admin.firestore()
        .collection('certificates')
        .where('userId', '==', userId)
        .where('status', '==', 'issued')
        .orderBy('issuedAt', 'desc')
        .get()
      
      return certificatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Certificate[]
      
    } catch (error) {
      console.error('Error fetching user certificates:', error)
      throw new Error('فشل في جلب الشهادات')
    }
  }

  /**
   * Verify certificate by verification code only
   * Public method for simplified certificate verification
   */
  static async verifyCertificateByCode(verificationCode: string): Promise<{
    isValid: boolean
    certificate?: Certificate
    message: string
  }> {
    try {
      // Query certificates by verification code
      const certificatesSnapshot = await admin.firestore()
        .collection('certificates')
        .where('verificationCode', '==', verificationCode)
        .where('status', '==', 'issued')
        .limit(1)
        .get()

      if (certificatesSnapshot.empty) {
        return {
          isValid: false,
          message: 'رمز التحقق غير صحيح أو الشهادة غير موجودة'
        }
      }

      const certificateDoc = certificatesSnapshot.docs[0]
      const certificate = certificateDoc.data() as Certificate

      return {
        isValid: true,
        certificate,
        message: 'الشهادة صحيحة ومعتمدة من QAcart'
      }

    } catch (error) {
      console.error('Error verifying certificate by code:', error)
      return {
        isValid: false,
        message: 'فشل في التحقق من الشهادة'
      }
    }
  }

  /**
   * Verify certificate by ID and verification code
   * Public method for certificate verification
   */
  static async verifyCertificate(certificateId: string, verificationCode: string): Promise<{
    isValid: boolean
    certificate?: Pick<Certificate, 'studentName' | 'courseName' | 'issuedAt' | 'status'>
  }> {
    try {
      const certificateDoc = await admin.firestore()
        .collection('certificates')
        .doc(certificateId)
        .get()
      
      if (!certificateDoc.exists) {
        return { isValid: false }
      }
      
      const certificate = certificateDoc.data() as Certificate
      
      // Check verification code and status
      if (certificate.verificationCode !== verificationCode || certificate.status !== 'issued') {
        return { isValid: false }
      }
      
      return {
        isValid: true,
        certificate: {
          studentName: certificate.studentName,
          courseName: certificate.courseName,
          issuedAt: certificate.issuedAt,
          status: certificate.status
        }
      }
      
    } catch (error) {
      console.error('Error verifying certificate:', error)
      return { isValid: false }
    }
  }

  /**
   * Revoke a certificate (Admin only)
   */
  static async revokeCertificate(certificateId: string): Promise<void> {
    try {
      await admin.firestore()
        .collection('certificates')
        .doc(certificateId)
        .update({
          status: 'revoked',
          revokedAt: new Date().toISOString()
        })
      
      console.log(`Certificate revoked: ${certificateId}`)
      
    } catch (error) {
      console.error('Error revoking certificate:', error)
      throw new Error('فشل في إلغاء الشهادة')
    }
  }

  /**
   * Get certificate statistics (Admin only)
   */
  static async getCertificateStats(): Promise<{
    totalIssued: number
    issuedThisMonth: number
    issuedThisWeek: number
  }> {
    try {
      const now = new Date()
      
      // Total issued certificates
      const totalSnapshot = await admin.firestore()
        .collection('certificates')
        .where('status', '==', 'issued')
        .get()
      
      // This month
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      const monthSnapshot = await admin.firestore()
        .collection('certificates')
        .where('status', '==', 'issued')
        .where('issuedAt', '>=', monthStart)
        .get()
      
      // This week (last 7 days)
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      const weekSnapshot = await admin.firestore()
        .collection('certificates')
        .where('status', '==', 'issued')
        .where('issuedAt', '>=', weekStart)
        .get()
      
      return {
        totalIssued: totalSnapshot.size,
        issuedThisMonth: monthSnapshot.size,
        issuedThisWeek: weekSnapshot.size
      }
      
    } catch (error) {
      console.error('Error fetching certificate stats:', error)
      throw new Error('فشل في جلب إحصائيات الشهادات')
    }
  }
}
