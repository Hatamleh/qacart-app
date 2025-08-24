'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { CertificateTemplate } from './CertificateTemplate'
import { Certificate } from '@/types'
import { Eye, Download, Info } from 'lucide-react'

interface CertificatePreviewProps {
  certificate?: Certificate
  trigger?: React.ReactNode
}

export const CertificatePreview = ({ 
  certificate,
  trigger 
}: CertificatePreviewProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // Default certificate for preview
  const defaultCertificate: Certificate = {
    id: 'preview_cert_123',
    userId: 'preview_user',
    courseId: 'preview_course',
    certificateNumber: 'QAC-2024-000123',
    studentName: 'أحمد محمد علي',
    courseName: 'إعداد الجهاز للتطوير',
    issuedAt: new Date().toISOString(),
    status: 'issued',
    language: 'ar',
    verificationCode: 'ABC12345',
    issuerSignature: 'حاتم حتاملة - مؤسس QAcart'
  }

  const certificateToShow = certificate || defaultCertificate

  const handleDownload = () => {
    // This will be implemented in Task 10 (PDF generation)
    alert('ميزة تحميل PDF ستكون متاحة قريباً')
  }

  return (
    <>
      {/* Trigger Element */}
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {trigger || (
          <Button variant="outline" icon={Eye} iconPosition="right">
            معاينة الشهادة
          </Button>
        )}
      </div>

      {/* Preview Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="معاينة الشهادة"
        size="xl"
      >
        <div className="space-y-6">
          {/* Preview Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">معاينة الشهادة</h4>
                <p className="text-sm text-blue-700">
                  هذه معاينة لتصميم الشهادة. الشهادة الفعلية ستحتوي على بياناتك الصحيحة.
                </p>
              </div>
            </div>
          </div>

          {/* Certificate Preview */}
          <div className="max-h-[70vh] overflow-auto">
            <div className="transform scale-75 origin-top">
              <CertificateTemplate 
                certificate={certificateToShow}
                showPreview={!certificate} // Show preview watermark only for default preview
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            {certificate && (
              <Button onClick={handleDownload} icon={Download} iconPosition="right">
                تحميل PDF
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              إغلاق
            </Button>
          </div>
        </div>
      </Modal>


    </>
  )
}
