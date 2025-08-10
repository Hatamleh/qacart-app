import { AlertTriangle, X, CheckCircle } from 'lucide-react'
import { Button } from '../ui/Button'

export const HardTruth = () => {
    return (
        <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Warning Icon */}
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 border border-primary/20 rounded-full">
                            <AlertTriangle className="w-10 h-10 text-primary" />
                        </div>
                    </div>

                    {/* Hard Truth Statement */}
                    <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-foreground">
                        لا يمكنك تعلم الاختبار
                        <br />
                        <span className="text-primary">بمشاهدة الفيديوهات فقط</span>
                    </h2>

                    {/* Supporting Text */}
                    <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                        الحقيقة المؤلمة: معظم الدورات تعطيك نظريات لا تستطيع تطبيقها في الواقع
                    </p>

                    {/* Problem vs Solution Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mt-16">

                        {/* The Problem */}
                        <div className="p-8 rounded-2xl bg-muted/50 border border-border">
                            <div className="flex items-center gap-3 mb-6">
                                <X className="w-6 h-6 text-muted-foreground" />
                                <h3 className="text-xl font-semibold text-foreground">الطريقة التقليدية</h3>
                            </div>

                            <ul className="space-y-4 text-right">
                                <li className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">مشاهدة فيديوهات لساعات</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">حفظ المفاهيم دون تطبيق</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">عدم الثقة في المقابلات</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">نسيان ما تعلمته خلال أسابيع</span>
                                </li>
                            </ul>
                        </div>

                        {/* The Solution */}
                        <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
                            <div className="flex items-center gap-3 mb-6">
                                <CheckCircle className="w-6 h-6 text-primary" />
                                <h3 className="text-xl font-semibold text-primary">طريقة QAcart</h3>
                            </div>

                            <ul className="space-y-4 text-right">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-foreground">ممارسة عملية من اليوم الأول</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-foreground">مشاريع حقيقية تضعها في portfolio</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-foreground">ثقة كاملة في مهاراتك</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-foreground">مهارات تبقى معك مدى الحياة</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-12">
                        <p className="text-lg text-muted-foreground mb-6">
                            هل أنت مستعد للتعلم بالطريقة الصحيحة؟
                        </p>
                        <Button
                            variant="primary"
                            size="lg"
                            icon={CheckCircle}
                            iconPosition="right"
                        >
                            نعم، أريد أن أتعلم بشكل صحيح
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    )
}
