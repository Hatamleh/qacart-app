'use client'

import { XCircle, ArrowRight, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">
        
        {/* Cancel Card */}
        <div className="relative bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-xl border border-primary/10 rounded-3xl overflow-hidden shadow-[0_20px_70px_-10px_rgba(59,130,246,0.15)] p-8 lg:p-10">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.04] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          
          {/* Content */}
          <div className="relative">
            
            {/* Cancel Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <XCircle className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            {/* Cancel Message */}
            <h1 className="text-2xl font-bold text-foreground mb-4">
              تم إلغاء العملية
            </h1>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              لا بأس! يمكنك المحاولة مرة أخرى في أي وقت. نحن هنا لمساعدتك في الحصول على أفضل تجربة تعليمية.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link href="/premium">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="w-full py-4 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
                >
                  <RefreshCw className="w-5 h-5 ml-2" />
                  المحاولة مرة أخرى
                </Button>
              </Link>
              
              <Link href="/courses">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full py-3 rounded-2xl border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <ArrowRight className="w-4 h-4 ml-2" />
                  تصفح الدورات المجانية
                </Button>
              </Link>
            </div>

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-primary/10">
              <p className="text-sm text-muted-foreground/70 mb-3">
                هل تحتاج مساعدة؟
              </p>
              <Link 
                href="mailto:hello@qacart.com"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                تواصل معنا: hello@qacart.com
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
