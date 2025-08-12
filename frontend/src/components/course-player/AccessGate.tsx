'use client'

import { Lock, Crown, Star } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Lesson } from '@/types/course'

interface AccessGateProps {
  lesson: Lesson
  userHasPaidAccess?: boolean // For future subscription system
}

export const AccessGate = ({ lesson, userHasPaidAccess = false }: AccessGateProps) => {
  // If lesson is free or user has paid access, don't show gate
  if (lesson.isFree || userHasPaidAccess) {
    return null
  }

  return (
    <div className="relative w-full aspect-video bg-gradient-to-br from-muted via-muted/50 to-background flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-muted-foreground/20" />
          ))}
        </div>
      </div>

      {/* Access Gate Content */}
      <Card 
        title="هذا الدرس مدفوع"
        className="mx-6 p-8 max-w-md text-center shadow-xl border-2 border-primary/20 bg-background/95 backdrop-blur-sm"
      >
        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
              <Crown className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        {/* Title is now handled by Card component */}

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          للوصول إلى هذا الدرس، تحتاج إلى الاشتراك في خطة PRO أو شراء الدورة كاملة
        </p>

        {/* Features List */}
        <div className="text-right mb-6 space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <Star className="w-4 h-4 text-primary flex-shrink-0" />
            <span>الوصول إلى جميع الدروس المدفوعة</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Star className="w-4 h-4 text-primary flex-shrink-0" />
            <span>تحميل المواد التعليمية</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Star className="w-4 h-4 text-primary flex-shrink-0" />
            <span>شهادة إتمام الدورة</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            icon={Crown}
            iconPosition="right"
          >
            اشترك في PRO
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-sm"
          >
            شراء هذه الدورة فقط
          </Button>
        </div>

        {/* Note */}
        <p className="text-xs text-muted-foreground mt-4">
          الدروس المجانية متاحة دائماً للجميع
        </p>
      </Card>
    </div>
  )
}
