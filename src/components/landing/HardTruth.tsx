import { XCircle, CircleCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/Button'

export const HardTruth = () => {
    return (
        <section className="py-24 lg:py-32 bg-muted/10">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                            لا يمكنك تعلم البرمجة
                            <br />
                            <span className="gradient-text">بمشاهدة الفيديوهات فقط</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            معظم الدورات تعطيك نظريات لا تستطيع تطبيقها في الواقع العملي
                        </p>
                    </div>

                    {/* Comparison Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {/* The Problem */}
                        <div className="border-2 border-border rounded-lg p-8 bg-muted/30">
                            <div className="flex items-center gap-3 mb-6">
                                <XCircle className="w-7 h-7 text-destructive" />
                                <h3 className="text-2xl font-bold">الطريقة التقليدية</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                                    <span className="text-muted-foreground">مشاهدة فيديوهات لساعات</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                                    <span className="text-muted-foreground">حفظ المفاهيم دون تطبيق</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                                    <span className="text-muted-foreground">عدم الثقة في المقابلات</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                                    <span className="text-muted-foreground">نسيان ما تعلمته خلال أسابيع</span>
                                </li>
                            </ul>
                        </div>

                        {/* The Solution */}
                        <div className="border-2 border-primary rounded-lg p-8 bg-primary/5">
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="w-7 h-7 text-primary" />
                                <h3 className="text-2xl font-bold text-primary">طريقة QAcart</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CircleCheck className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                    <span className="text-foreground">ممارسة عملية من اليوم الأول</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CircleCheck className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                    <span className="text-foreground">مشاريع حقيقية تضعها في portfolio</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CircleCheck className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                    <span className="text-foreground">ثقة كاملة في مهاراتك</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CircleCheck className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                    <span className="text-foreground">مهارات تبقى معك مدى الحياة</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <p className="text-lg text-muted-foreground mb-6">
                            هل أنت مستعد للتعلم بالطريقة الصحيحة؟
                        </p>
                        <Link href="/courses">
                            <Button variant="primary" size="lg" icon={CircleCheck} iconPosition="right">
                                ابدأ التعلم الصحيح الآن
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
