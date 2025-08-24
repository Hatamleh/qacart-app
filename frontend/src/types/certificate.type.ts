// Certificate System Types - Premium Feature Only
// These interfaces define the structure for QAcart premium certificates

export interface Certificate {
  // === CORE IDENTIFIERS ===
  id: string                    // Format: cert_{userId}_{courseId}_{timestamp}
  userId: string               // Firebase Auth UID
  courseId: string             // Course document ID
  certificateNumber: string    // Unique certificate number (e.g., "QAC-2024-000123")
  
  // === CERTIFICATE CONTENT ===
  studentName: string          // Full name entered by user when claiming
  courseName: string           // Course title at time of issuance
  
  // === TIMESTAMPS ===
  issuedAt: string            // ISO timestamp when certificate was issued
  
  // === CERTIFICATE METADATA ===
  status: 'issued' | 'revoked'     // Certificate status
  language: 'ar' | 'en'       // Certificate language (default: ar)
  
  // === VERIFICATION ===
  verificationCode: string     // Unique code for certificate verification
  issuerSignature: string     // Digital signature or issuer identifier
  

}

// API Request/Response Types
export interface IssueCertificateRequest {
  courseId: string
  studentName: string
}

export interface IssueCertificateResponse {
  success: boolean
  certificate?: Certificate
  error?: string
  message: string
}

export interface VerifyCertificateRequest {
  certificateId: string
  verificationCode: string
}

export interface VerifyCertificateResponse {
  success: boolean
  certificate?: Pick<Certificate, 'studentName' | 'courseName' | 'issuedAt' | 'status'>
  error?: string
}

export interface GetUserCertificatesResponse {
  success: boolean
  certificates: Certificate[]
  error?: string
}

// Certificate Eligibility Check
export interface CertificateEligibility {
  isEligible: boolean
  reason?: 'not_premium' | 'course_incomplete' | 'already_issued' | 'course_not_found'
  progressPercentage: number
  isPremium: boolean
  hasExistingCertificate: boolean
  courseId: string
}

// Certificate Template Data
export interface CertificateTemplateData {
  certificate: Certificate
  qrCodeUrl?: string           // QR code for verification
  logoUrl?: string             // QAcart logo URL
  signatureImageUrl?: string   // Signature image
}

// Certificate Statistics (for admin/analytics)
export interface CertificateStats {
  totalIssued: number
  issuedThisMonth: number
  issuedThisWeek: number
  topCourses: Array<{
    courseId: string
    courseName: string
    certificateCount: number
  }>
  recentCertificates: Certificate[]
}
