'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CertificateTemplate } from '@/components/certificates'
import { CertificateClient } from '@/clients'
import { Certificate } from '@/types'
import { ArrowRight, Download, Share2 } from 'lucide-react'

export default function CertificatePage() {
  const params = useParams()
  const router = useRouter()
  const certificateId = params.certificateId as string
  
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Extract course ID from certificate ID (format: cert_userId_courseId_timestamp)
        const courseId = certificateId.split('_')[2]
        if (!courseId) {
          throw new Error('معرف الشهادة غير صحيح')
        }
        
        const cert = await CertificateClient.getCertificate(courseId)
        if (!cert || cert.id !== certificateId) {
          throw new Error('الشهادة غير موجودة أو غير مصرح لك بالوصول إليها')
        }
        
        setCertificate(cert)
      } catch (err) {
        console.error('Error fetching certificate:', err)
        setError(err instanceof Error ? err.message : 'فشل في جلب الشهادة')
      } finally {
        setLoading(false)
      }
    }

    if (certificateId) {
      fetchCertificate()
    }
  }, [certificateId])

  const handleDownload = () => {
    // This will be implemented in Task 10 (PDF generation)
    alert('ميزة تحميل PDF ستكون متاحة قريباً')
  }

  const handleShare = async () => {
    const shareUrl = window.location.href
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `شهادة ${certificate?.studentName} - ${certificate?.courseName}`,
          text: 'شاهد شهادة الإتمام المعتمدة من QAcart',
          url: shareUrl
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl)
        alert('تم نسخ رابط الشهادة إلى الحافظة')
      } catch (err) {
        console.log('Error copying to clipboard:', err)
      }
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جارٍ تحميل الشهادة...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">الشهادة غير موجودة</h1>
          <p className="text-muted-foreground mb-6">
            {error || 'الشهادة المطلوبة غير متاحة أو غير مصرح لك بالوصول إليها'}
          </p>
          <Button onClick={() => router.push('/courses')} icon={ArrowRight} iconPosition="right">
            العودة إلى الدورات
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              icon={ArrowRight}
              iconPosition="right"
              className="text-muted-foreground hover:text-foreground"
            >
              العودة
            </Button>

            {/* Title */}
            <div className="text-center flex-1">
              <h1 className="text-lg font-semibold text-foreground">شهادة الإتمام</h1>
              <p className="text-xs text-muted-foreground">رقم: {certificate.certificateNumber}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleShare}
                icon={Share2}
                iconPosition="right"
              >
                مشاركة
              </Button>
              <Button 
                size="sm"
                onClick={handleDownload}
                icon={Download}
                iconPosition="right"
              >
                تحميل PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Certificate Info */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            شهادة إتمام معتمدة
          </h2>
          <p className="text-muted-foreground">
            صادرة لـ <span className="font-semibold text-primary">{certificate.studentName}</span> 
            {' '}في دورة <span className="font-semibold text-primary">{certificate.courseName}</span>
          </p>
        </div>

        {/* Certificate Display */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <CertificateTemplate certificate={certificate} />
          </div>
        </div>

        {/* Verification Info */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-muted/50 border border-dashed border-border rounded-lg p-6 text-center">
            <h3 className="font-semibold text-foreground mb-3">التحقق من صحة الشهادة</h3>
            <p className="text-sm text-muted-foreground mb-4">
              يمكن التحقق من صحة هذه الشهادة باستخدام المعلومات التالية:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">رقم الشهادة:</span>
                <br />
                <code className="bg-background px-2 py-1 rounded font-mono text-primary">
                  {certificate.certificateNumber}
                </code>
              </div>
              <div>
                <span className="text-muted-foreground">رمز التحقق:</span>
                <br />
                <code className="bg-background px-2 py-1 rounded font-mono text-primary">
                  {certificate.verificationCode}
                </code>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              للتحقق من صحة الشهادة قم بزيارة: 
              <span className="font-mono text-primary mx-1">qacart.com/verify</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
