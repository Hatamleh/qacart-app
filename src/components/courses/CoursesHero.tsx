'use client'

import { BookOpen } from 'lucide-react'
import { GridBackground } from '@/components/ui'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

export const CoursesHero = () => {
    return (
        <GridBackground className="overflow-hidden">
            <div className="container mx-auto px-6 pt-32 pb-20 lg:pt-44 lg:pb-32">
                <div className="text-center">
                    {/* Top Badge */}
                    <div className="mb-8">
                        <Badge variant="primary" className="text-sm">
                            <BookOpen className="w-4 h-4" />
                            دوراتنا التدريبية
                        </Badge>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
                        طوّر مهاراتك التقنية<br />
                        مع <span className="gradient-text">خبراء المجال</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                        اكتشف دورات تدريبية شاملة في البرمجة، اختبار البرمجيات، والذكاء الاصطناعي من المبتدئ إلى المتقدم
                    </p>

                    {/* CTA Button */}
                    <div className="flex justify-center mb-16">
                        <Button
                            variant="primary"
                            size="lg"
                            icon={BookOpen}
                            iconPosition="right"
                        >
                            استكشف الدورات
                        </Button>
                    </div>
                </div>
            </div>
        </GridBackground>
    )
}
