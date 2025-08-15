'use client'

import { BookOpen, Play, Download } from 'lucide-react'
import { GridBackground } from '../ui/GridBackground'
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
                        تعلم اختبار البرمجيات<br />
                        مع <span className="gradient-text">خبراء المجال</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                        اكتشف مجموعة شاملة من الدورات التدريبية المصممة لتطوير مهاراتك في اختبار البرمجيات من المبتدئ إلى المتقدم
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">25+</div>
                            <div className="text-sm text-muted-foreground">دورة تدريبية</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">500+</div>
                            <div className="text-sm text-muted-foreground">ساعة تدريب</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">1500+</div>
                            <div className="text-sm text-muted-foreground">طالب نشط</div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Button
                            variant="primary"
                            size="lg"
                            icon={Play}
                            iconPosition="right"
                        >
                            تصفح الدورات
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            icon={Download}
                            iconPosition="right"
                        >
                            تحميل خطة الدراسة
                        </Button>
                    </div>
                </div>
            </div>
        </GridBackground>
    )
}
