'use client'

import { BookOpen, Award } from 'lucide-react'
import { GridBackground } from '../ui/GridBackground'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

export const Hero = () => {
    const scrollToNextSection = () => {
        const nextSection = document.getElementById('hard-truth-section')
        if (nextSection) {
            nextSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            })
        }
    }
    return (
        <GridBackground className="overflow-hidden min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-6 py-32 lg:py-40">
                <div className="text-center">
                    {/* Top Badge */}
                    <div className="mb-8">
                        <Badge variant="primary" className="text-sm">
                            <Award className="w-4 h-4" />
                            أفضل منصة تعليمية
                        </Badge>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl lg:text-7xl font-bold mb-8">
                        تعلم الاختبار <span className="gradient-text">بشكل أسرع</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
                        <span className="gradient-text">QAcart</span> هي طريقة سريعة بشكل مذهل ومسلية للغاية لتطوير مهاراتك في اختبار البرمجيات
                    </p>

                    {/* CTA Button */}
                    <div className="mb-16">
                        <Button
                            variant="primary"
                            size="lg"
                            icon={BookOpen}
                            iconPosition="right"
                            onClick={scrollToNextSection}
                        >
                            ابدأ من هنا
                        </Button>
                    </div>

                    {/* Social Proof */}
                    <div className="text-center">
                        <p className="text-muted-foreground mb-4">
                            انضم إلى آلاف المطورين الذين يثقون في QAcart
                        </p>
                        <div className="flex justify-center items-center gap-8 opacity-60 flex-wrap">
                            <div className="text-2xl font-bold text-primary">1500+</div>
                            <div className="text-sm text-muted-foreground">طالب محترف</div>
                            <div className="w-px h-6 bg-border hidden md:block"></div>
                            <div className="text-2xl font-bold text-primary">15+</div>
                            <div className="text-sm text-muted-foreground">دولة عربية</div>
                            <div className="w-px h-6 bg-border hidden md:block"></div>
                            <div className="text-2xl font-bold text-primary">95%</div>
                            <div className="text-sm text-muted-foreground">معدل النجاح</div>
                        </div>
                    </div>
                </div>
            </div>
        </GridBackground>
    )
}
