'use client'

import {useCallback, useEffect, useState} from 'react'
import {CertificateClient} from '@/clients'
import {useAuth} from '@/contexts/AuthContext'
import type {Certificate, CertificateEligibility, IssueCertificateRequest} from '@/types'

/**
 * Custom hook for managing certificate operations
 * Provides state management, eligibility checks, and certificate actions
 */
export const useCertificates = () => {
  const { user } = useAuth()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetch all user certificates
   */
  const fetchUserCertificates = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)
      const response = await CertificateClient.getUserCertificates()
      if (response.success) {
        setCertificates(response.certificates)
      } else {
        setError(response.error || 'خطأ في جلب الشهادات')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في جلب الشهادات')
      console.error('Error fetching certificates:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  /**
   * Check eligibility for a specific course certificate
   */
  const checkEligibility = useCallback(async (courseId: string): Promise<CertificateEligibility | null> => {
    if (!user) return null

    try {
      setError(null)
      const response = await CertificateClient.checkEligibility(courseId)
      return response.eligibility
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في فحص الأهلية')
      console.error('Error checking eligibility:', err)
      return null
    }
  }, [user])

  /**
   * Issue a new certificate
   */
  const issueCertificate = useCallback(async (request: IssueCertificateRequest): Promise<Certificate | null> => {
    if (!user) return null

    try {
      setLoading(true)
      setError(null)
      const response = await CertificateClient.issueCertificate(request)

      if (response.success && response.certificate) {
        // Update local certificates list
        setCertificates(prev => [...prev, response.certificate!])
        return response.certificate
      } else {
        setError(response.error || 'خطأ في إصدار الشهادة')
        return null
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في إصدار الشهادة')
      console.error('Error issuing certificate:', err)
      return null
    } finally {
      setLoading(false)
    }
  }, [user])

  /**
   * Verify a certificate by verification code (public)
   */
  const verifyCertificate = useCallback(async (verificationCode: string): Promise<{
    isValid: boolean
    certificate?: Certificate
    message: string
  } | null> => {
    try {
      setLoading(true)
      setError(null)
        return await CertificateClient.verifyCertificateByCode(verificationCode)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في التحقق من الشهادة')
      console.error('Error verifying certificate:', err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Get certificate by course ID from local state
   */
  const getCertificateByCourse = useCallback((courseId: string): Certificate | undefined => {
    return certificates.find(cert => cert.courseId === courseId && cert.status === 'issued')
  }, [certificates])

  /**
   * Check if user has a certificate for a specific course
   */
  const hasCertificate = useCallback((courseId: string): boolean => {
    return certificates.some(cert => cert.courseId === courseId && cert.status === 'issued')
  }, [certificates])

  /**
   * Generate shareable certificate URL
   */
  const getCertificateShareUrl = useCallback((certificateId: string): string => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/certificates/${certificateId}`
    }
    return `/certificates/${certificateId}`
  }, [])

  /**
   * Get certificate verification URL
   */
  const getCertificateVerifyUrl = useCallback((verificationCode: string): string => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/verify?code=${verificationCode}`
    }
    return `/verify?code=${verificationCode}`
  }, [])

  /**
   * Helper function to get certificate status text
   */
  const getCertificateStatusText = useCallback((certificate: Certificate): string => {
    switch (certificate.status) {
      case 'issued':
        return 'مُصدرة'
      case 'revoked':
        return 'مُلغاة'
      default:
        return 'غير معروف'
    }
  }, [])

  /**
   * Auto-fetch user certificates when user changes
   */
  useEffect(() => {
    if (user) {
      fetchUserCertificates()
    } else {
      setCertificates([])
      setError(null)
    }
  }, [user, fetchUserCertificates])

  return {
    // State
    certificates,
    loading,
    error,

    // Actions
    fetchUserCertificates,
    checkEligibility,
    issueCertificate,
    verifyCertificate,

    // Helpers
    getCertificateByCourse,
    hasCertificate,
    getCertificateShareUrl,
    getCertificateVerifyUrl,
    getCertificateStatusText,

    // Computed
    certificateCount: certificates.length,
    hasAnyCertificates: certificates.length > 0
  }
}

export default useCertificates
