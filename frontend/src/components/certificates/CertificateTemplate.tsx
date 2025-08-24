'use client'

import { Certificate } from '@/types'
import { formatDateShort } from '@/lib'
import { Award, Star, GraduationCap, Shield, CheckCircle, Calendar, Hash, Key } from 'lucide-react'

interface CertificateTemplateProps {
  certificate: Certificate
  showPreview?: boolean
  className?: string
}

export const CertificateTemplate = ({ 
  certificate, 
  showPreview = false,
  className = '' 
}: CertificateTemplateProps) => {
  const formattedDate = formatDateShort(certificate.issuedAt)

  return (
    <div className={`certificate-container ${className}`} dir="rtl">
      {/* Professional Certificate Design - Dark Theme */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-xl p-10 shadow-2xl min-h-[700px] overflow-hidden">
        
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/10"></div>
          <div className="absolute inset-6 border border-slate-600/30 rounded-lg"></div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-8 relative z-10">
          {/* QAcart Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <svg width="140" height="48" viewBox="0 0 140 48" className="filter drop-shadow-lg">
                <image href="/qacart-logo.svg" width="140" height="48" />
              </svg>
            </div>
          </div>
          
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg">
            <Shield className="w-5 h-5" />
            <span>شهادة معتمدة</span>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-10 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-wide">
            شهادة إتمام
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        {/* Certification Content */}
        <div className="text-center mb-10 relative z-10 space-y-6">
          <p className="text-xl text-slate-300 font-medium">
            نشهد بأن
          </p>
          
          {/* Student Name */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
            <div className="relative border border-slate-600 bg-slate-800/80 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-4xl font-bold text-white mb-2">
                {certificate.studentName}
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto"></div>
            </div>
          </div>
          
          <p className="text-xl text-slate-300 font-medium">
            قد أتم بنجاح دورة
          </p>
          
          {/* Course Name */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
            <div className="relative border border-emerald-500/30 bg-emerald-900/20 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-emerald-300">
                {certificate.courseName}
              </h3>
            </div>
          </div>
          
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            وذلك بعد استكمال جميع المتطلبات والمعايير المطلوبة بتفوق ونجاح
          </p>
        </div>

        {/* Achievement Badges */}
        <div className="flex justify-center gap-6 mb-10 relative z-10">
          <div className="group cursor-default">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-4 rounded-2xl border border-yellow-500/30 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="group cursor-default">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-2xl border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              <Star className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="group cursor-default">
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-4 rounded-2xl border border-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Footer Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-auto relative z-10">
          {/* Certificate Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-300">
              <div className="bg-slate-800 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">تاريخ الإصدار</p>
                <p className="font-semibold">{formattedDate}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-slate-300">
              <div className="bg-slate-800 p-2 rounded-lg">
                <Hash className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">رقم الشهادة</p>
                <p className="font-mono font-semibold text-cyan-300">{certificate.certificateNumber}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-slate-300">
              <div className="bg-slate-800 p-2 rounded-lg">
                <Key className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">رمز التحقق</p>
                <code className="bg-slate-800 text-purple-300 px-3 py-1 rounded-md font-mono text-sm">{certificate.verificationCode}</code>
              </div>
            </div>
          </div>

          {/* Signature & Authority */}
          <div className="text-left">
            <div className="space-y-4">
              <div className="border-t border-slate-600 w-24"></div>
              <div>
                <p className="text-xl font-bold text-white">حاتم حتاملة</p>
                <p className="text-slate-400 text-sm">مؤسس ومدير QAcart</p>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                <CheckCircle className="w-4 h-4" />
                <span>معتمد رسمياً</span>
              </div>
            </div>
          </div>
        </div>



        {/* Preview Watermark */}
        {showPreview && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="bg-red-900/30 text-red-300 px-12 py-6 rounded-2xl border-2 border-red-500/50 border-dashed transform rotate-12 backdrop-blur-sm">
              <span className="text-3xl font-bold tracking-wider">معاينة</span>
            </div>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-tr from-cyan-600/10 to-transparent rounded-full blur-xl"></div>
      </div>

      {/* Certificate Specific Styles */}
      <style jsx>{`
        .certificate-container {
          direction: rtl;
        }
      `}</style>
    </div>
  )
}
