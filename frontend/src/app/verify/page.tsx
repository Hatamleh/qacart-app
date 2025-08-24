'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCertificates } from '@/hooks'
import { Button, Card, LoaderUI } from '@/components/ui'
import { 
  CheckCircle, 
  XCircle, 
  Search, 
  Eye, 
  Share2,
  AlertCircle,
  Award,
  Calendar,
  User,
  BookOpen,
  Hash
} from 'lucide-react'
import type { Certificate } from '@/types'

/**
 * Certificate Verification Page
 * Public page for verifying certificates using verification codes
 */
function VerifyPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { verifyCertificate, loading, error } = useCertificates()
  
  const [verificationCode, setVerificationCode] = useState(searchParams?.get('code') || '')
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean
    certificate?: Certificate
    message: string
  } | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  /**
   * Handle certificate verification
   */
  const handleVerify = async () => {
    if (!verificationCode.trim()) return
    
    setHasSearched(true)
    const result = await verifyCertificate(verificationCode.trim())
    setVerificationResult(result)
  }

  /**
   * Handle sharing certificate
   */
  const handleShare = async () => {
    if (!verificationResult?.certificate) return

    const shareUrl = `${window.location.origin}/certificates/${verificationResult.certificate.id}`
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `شهادة ${verificationResult.certificate.courseName}`,
          text: `شهادة إتمام دورة ${verificationResult.certificate.courseName} من QAcart`,
          url: shareUrl
        })
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareUrl)
        alert('تم نسخ رابط الشهادة!')
      }
    } catch (err) {
      console.error('Error sharing:', err)
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl)
        alert('تم نسخ رابط الشهادة!')
      } catch {
        alert('خطأ في المشاركة')
      }
    }
  }

  /**
   * Auto-verify if code is provided in URL
   */
  useEffect(() => {
    const codeFromUrl = searchParams?.get('code')
    if (codeFromUrl && !hasSearched) {
      setVerificationCode(codeFromUrl)
      handleVerify()
    }
  }, [searchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            التحقق من الشهادة
          </h1>
          <p className="text-muted-foreground">
            أدخل رمز التحقق للتأكد من صحة الشهادة
          </p>
        </div>

        {/* Verification Form */}
        <Card title="رمز التحقق" className="p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                رمز التحقق
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="أدخل رمز التحقق (مثل: ABC123XYZ)"
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  disabled={loading}
                />
                <Button 
                  onClick={handleVerify}
                  disabled={loading || !verificationCode.trim()}
                  className="px-6"
                >
                  {loading ? (
                    <LoaderUI size="sm" />
                  ) : (
                    <>
                      <Search className="w-4 h-4 ml-2" />
                      تحقق
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
        </Card>

        {/* Verification Results */}
        {hasSearched && verificationResult && (
          <Card title="نتيجة التحقق" className="p-6">
            {verificationResult.isValid ? (
              // Valid Certificate
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-green-600">
                  <CheckCircle className="w-6 h-6" />
                  <div>
                    <h3 className="text-lg font-semibold">شهادة صحيحة ✅</h3>
                    <p className="text-sm text-muted-foreground">
                      تم التحقق من صحة هذه الشهادة بنجاح
                    </p>
                  </div>
                </div>

                {verificationResult.certificate && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-4">
                    <h4 className="font-semibold text-green-800 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      تفاصيل الشهادة
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-green-600" />
                        <span className="text-muted-foreground">اسم الطالب:</span>
                        <span className="font-medium">{verificationResult.certificate.studentName}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-green-600" />
                        <span className="text-muted-foreground">الدورة:</span>
                        <span className="font-medium">{verificationResult.certificate.courseName}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <span className="text-muted-foreground">تاريخ الإصدار:</span>
                        <span className="font-medium">
                          {new Date(verificationResult.certificate.issuedAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-green-600" />
                        <span className="text-muted-foreground">رقم الشهادة:</span>
                        <span className="font-medium">{verificationResult.certificate.certificateNumber}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button 
                        onClick={() => router.push(`/certificates/${verificationResult.certificate!.id}`)}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 ml-2" />
                        عرض الشهادة كاملة
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={handleShare}
                        className="flex-1"
                      >
                        <Share2 className="w-4 h-4 ml-2" />
                        مشاركة الشهادة
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Invalid Certificate
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3 text-destructive">
                  <XCircle className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">شهادة غير صحيحة ❌</h3>
                </div>
                
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <p className="text-destructive text-sm">
                    {verificationResult.message || 'رمز التحقق غير صحيح أو الشهادة غير موجودة'}
                  </p>
                </div>
                
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>تأكد من:</p>
                  <ul className="list-disc list-inside space-y-1 text-right">
                    <li>صحة رمز التحقق المدخل</li>
                    <li>أن الشهادة لم يتم إلغاؤها</li>
                    <li>أن رمز التحقق لم ينته صلاحيته</li>
                  </ul>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* How to verify instructions */}
        {!hasSearched && (
          <Card title="إرشادات التحقق" className="p-6 bg-muted/30">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              كيفية التحقق من الشهادة
            </h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>1. احصل على رمز التحقق من حامل الشهادة</p>
              <p>2. أدخل الرمز في الحقل أعلاه</p>
              <p>3. اضغط على "تحقق" لعرض تفاصيل الشهادة</p>
              <p>4. تأكد من صحة البيانات المعروضة</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

/**
 * Main Verify Page with Suspense boundary
 */
export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoaderUI />
      </div>
    }>
      <VerifyPageContent />
    </Suspense>
  )
}
