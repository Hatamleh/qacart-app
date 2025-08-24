'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { CertificateClient } from '@/clients'
import { Certificate } from '@/types'

interface CertificateClaimModalProps {
  isOpen: boolean
  onClose: () => void
  courseId: string
  courseName: string
  isPremium: boolean
  isEligible: boolean
  reason?: string
  onCertificateIssued?: (certificate: Certificate) => void
}

export const CertificateClaimModal = ({
  isOpen,
  onClose,
  courseId,
  courseName,
  isPremium,
  isEligible,
  reason,
  onCertificateIssued
}: CertificateClaimModalProps) => {
  const router = useRouter()
  const [studentName, setStudentName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClose = () => {
    setStudentName('')
    setError(null)
    onClose()
  }

  const handleUpgrade = () => {
    handleClose()
    router.push('/premium')
  }

  const handleClaimCertificate = async () => {
    // Client-side validation
    const validation = CertificateClient.validateStudentName(studentName)
    if (!validation.isValid) {
      setError(validation.error!)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await CertificateClient.issueCertificate({
        courseId,
        studentName: studentName.trim()
      })

      if (result.success && result.certificate) {
        // Success! Certificate issued
        onCertificateIssued?.(result.certificate)
        handleClose()
      } else {
        // Handle API errors
        setError(result.error || 'فشل في إصدار الشهادة')
      }
    } catch (err) {
      setError('فشل في إصدار الشهادة')
      console.error('Certificate issuance error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Non-premium user view
  if (!isPremium) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="الشهادات - مشتركين بريميوم فقط">
        <div className="p-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              الشهادات متاحة للمشتركين المميزين فقط
            </h2>
            <p className="text-muted-foreground">
              احصل على اشتراك بريميوم للوصول إلى الشهادات المعتمدة
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-foreground mb-2">🎯 مميزات الشهادات:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-right">
              <li>• شهادة معتمدة من QAcart</li>
              <li>• رقم تحقق فريد للشهادة</li>
              <li>• تحميل بصيغة PDF عالية الجودة</li>
              <li>• إمكانية التحقق من صحة الشهادة</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleUpgrade}
              className="flex-1"
            >
              💎 ترقية إلى بريميوم
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClose}
            >
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>
    )
  }

  // Premium user - not eligible view
  if (!isEligible) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="غير مؤهل للحصول على الشهادة">
        <div className="p-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              غير مؤهل للحصول على الشهادة
            </h2>
            <p className="text-muted-foreground">
              {reason || 'يجب إكمال جميع متطلبات الدورة'}
            </p>
          </div>

          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={handleClose}
            >
              إغلاق
            </Button>
          </div>
        </div>
      </Modal>
    )
  }

  // Premium user - eligible for certificate
  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="احصل على شهادة الإتمام">
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏆</span>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            احصل على شهادة الإتمام
          </h2>
          <p className="text-muted-foreground">
            مبروك! لقد أكملت دورة <span className="font-semibold">{courseName}</span>
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              الاسم الكامل كما تريد أن يظهر على الشهادة
            </label>
            <input
              type="text"
              placeholder="مثال: أحمد محمد علي"
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value)
                setError(null) // Clear error when user types
              }}
              className="w-full p-3 border rounded-lg text-right"
              dir="rtl"
              disabled={isLoading}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              💡 <strong>نصيحة:</strong> تأكد من كتابة اسمك بالشكل الصحيح حيث لا يمكن تعديله بعد إصدار الشهادة
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button 
            onClick={handleClaimCertificate}
            disabled={!studentName.trim() || isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                جارٍ إنشاء الشهادة...
              </span>
            ) : (
              '🏆 إنشاء الشهادة'
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isLoading}
          >
            إلغاء
          </Button>
        </div>
      </div>
    </Modal>
  )
}
