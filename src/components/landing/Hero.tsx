import { BookOpen, Award } from 'lucide-react'
import Link from 'next/link'
import { GridBackground } from '@/components/ui'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { coursesData } from '@/data'

export const Hero = () => {
    // In future this will be fetched from the backend
    const totalStudents = coursesData.reduce((total, course) => total + course.studentsCount, 0)
    const totalCourses = coursesData.length
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
                        تعلم البرمجة <span className="gradient-text">بشكل احترافي</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
                        <span className="gradient-text">QAcart</span> منصة تعليمية متكاملة لتعلم البرمجة، اختبار البرمجيات، والذكاء الاصطناعي بمحتوى عربي عالي الجودة
                    </p>

                    {/* CTA Button */}
                    <div className="mb-16">
                        <Link href="/courses">
                            <Button
                                variant="primary"
                                size="lg"
                                icon={BookOpen}
                                iconPosition="right"
                            >
                                ابدأ من هنا
                            </Button>
                        </Link>
                    </div>

                    {/* Social Proof */}
                    <div className="text-center">
                        <p className="text-muted-foreground mb-4">
                            انضم إلى آلاف المطورين الذين يثقون في QAcart
                        </p>
                        <div className="flex justify-center items-center gap-8 opacity-60 flex-wrap">
                            <div className="text-2xl font-bold text-primary">{totalStudents}+</div>
                            <div className="text-sm text-muted-foreground">طالب محترف</div>
                            <div className="w-px h-6 bg-border hidden md:block"></div>
                            <div className="text-2xl font-bold text-primary">{totalCourses}</div>
                            <div className="text-sm text-muted-foreground">دورة متخصصة</div>
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
