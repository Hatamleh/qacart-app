'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { CertificateClaimModal } from './CertificateClaimModal'

import { CertificateClient } from '@/clients'
import { useAuth } from '@/contexts/AuthContext'
import { Certificate } from '@/types'
import { Award, CheckCircle, Crown, Share2, ExternalLink } from 'lucide-react'

interface CertificateSectionProps {
  courseId: string
  courseName: string
  progressPercentage: number
}

export const CertificateSection = ({
  courseId,
  courseName,
  progressPercentage
}: CertificateSectionProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showClaimModal, setShowClaimModal] = useState(false)

  const isPremium = user?.subscription?.status === 'premium' && user?.subscription?.isActive === true
  const isCourseCompleted = progressPercentage >= 100
  const isEligibleForCertificate = isCourseCompleted && isPremium

  // Check for existing certificate
  useEffect(() => {
    const checkExistingCertificate = async () => {
      if (!user || !isCourseCompleted) {
        setIsLoading(false)
        return
      }

      try {
        const existingCertificate = await CertificateClient.getCertificate(courseId)
        setCertificate(existingCertificate)
      } catch (error) {
        console.error('Error checking existing certificate:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkExistingCertificate()
  }, [user, courseId, isCourseCompleted])

  const handleCertificateIssued = (newCertificate: Certificate) => {
    setCertificate(newCertificate)
    setShowClaimModal(false)
    // Navigate to the certificate page
    router.push(`/certificates/${newCertificate.id}`)
  }

  // Don't show anything if course is not completed
  if (!isCourseCompleted) {
    return null
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="border border-border rounded-lg p-4 mt-4">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          <span className="text-sm text-muted-foreground">جارٍ التحقق من الشهادة...</span>
        </div>
      </div>
    )
  }

  // State 1: User already has certificate
  if (certificate) {
    return (
      <div className="border border-green-500/20 rounded-lg p-4 bg-green-500/5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-green-700 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                تم إصدار الشهادة
              </p>
              <p className="text-sm text-muted-foreground truncate">
                رقم: {certificate.certificateNumber}
              </p>
              <p className="text-xs text-muted-foreground">
                رمز التحقق: {certificate.verificationCode}
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push(`/certificates/${certificate.id}`)}
            >
              <ExternalLink className="w-3 h-3 ml-1" />
              عرض
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={async () => {
                const shareUrl = `${window.location.origin}/certificates/${certificate.id}`
                try {
                  if (navigator.share) {
                    await navigator.share({
                      title: `شهادة ${certificate.courseName}`,
                      text: `شهادة إتمام دورة ${certificate.courseName} من QAcart`,
                      url: shareUrl
                    })
                  } else {
                    await navigator.clipboard.writeText(shareUrl)
                    alert('تم نسخ رابط الشهادة!')
                  }
                } catch (err) {
                  console.error('Error sharing:', err)
                  try {
                    await navigator.clipboard.writeText(shareUrl)
                    alert('تم نسخ رابط الشهادة!')
                  } catch {
                    alert('خطأ في المشاركة')
                  }
                }
              }}
            >
              <Share2 className="w-3 h-3 ml-1" />
              مشاركة
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // State 2: Premium user eligible for certificate
  if (isEligibleForCertificate) {
    return (
      <>
        <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 mt-0.5">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-primary flex items-center gap-2 mb-1">
                <Award className="w-4 h-4" />
                مبروك! أكملت الدورة
              </p>
              <p className="text-sm text-muted-foreground">
                احصل على شهادة إتمام معتمدة من QAcart
              </p>
            </div>
          </div>
          <Button 
            onClick={() => setShowClaimModal(true)} 
            className="w-full"
            icon={Award}
            iconPosition="right"
          >
            احصل على شهادة الإتمام
          </Button>
        </div>

        <CertificateClaimModal
          isOpen={showClaimModal}
          onClose={() => setShowClaimModal(false)}
          courseId={courseId}
          courseName={courseName}
          isPremium={isPremium}
          isEligible={isEligibleForCertificate}
          onCertificateIssued={handleCertificateIssued}
        />
      </>
    )
  }

  // State 3: Free user (course completed but not premium)
  if (isCourseCompleted && !isPremium) {
    return (
      <div className="border border-orange-500/20 rounded-lg p-4 bg-orange-500/5">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 mt-0.5">
            <Crown className="w-5 h-5 text-orange-600" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-orange-700 flex items-center gap-2 mb-1">
              <Award className="w-4 h-4" />
              مؤهل للحصول على شهادة!
            </p>
            <p className="text-sm text-muted-foreground">
              ترقي إلى بريميوم للحصول على شهادة معتمدة
            </p>
          </div>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-orange-700 mb-2 flex items-center gap-2">
            <Crown className="w-4 h-4" />
            <strong>مميزات الشهادة:</strong>
          </p>
          <ul className="text-xs text-orange-600 space-y-1">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3" />
              شهادة معتمدة من QAcart
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3" />
              رقم تحقق فريد للشهادة
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3" />
              تحميل بصيغة PDF عالية الجودة
            </li>
          </ul>
        </div>
        
        <Button 
          onClick={() => router.push('/premium')} 
          className="w-full"
          variant="outline"
          icon={Crown}
          iconPosition="right"
        >
          ترقية إلى بريميوم
        </Button>
      </div>
    )
  }

  // Fallback (shouldn't reach here)
  return null
}
