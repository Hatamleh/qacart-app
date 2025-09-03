import { Crown } from 'lucide-react'

export const PremiumHero = () => {
  return (
    <div className="pt-48 lg:pt-56 pb-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Crown Icon */}
          <div className="flex justify-center mb-12">
            <Crown className="w-12 h-12 text-primary" />
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-10">
            كن مختبر برمجيات 
            <span className="gradient-text"> رائعاً</span>
          </h1>

          {/* Subtitle */}
          <div className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed text-center">
            <p className="mb-2">تعلم المهارات الأساسية لاختبار البرمجيات الحديث</p>
            <p>مع الاستمتاع الكامل في العملية التعليمية</p>
          </div>

        </div>
      </div>
    </div>
  )
}
