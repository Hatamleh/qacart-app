import { CheckCircle, Target, Sparkles, UserPlus } from 'lucide-react'
import type { Course } from '@/types'

interface CourseInfoProps {
    course: Course
}

export const CourseInfo = ({ course }: CourseInfoProps) => {
    return (
        <section className="py-20 bg-muted/10">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Stylish Separator with Icon */}
                    <div className="flex items-center justify-center mb-20">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary"></div>
                            <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
                                <Sparkles className="w-6 h-6 text-primary" />
                            </div>
                            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary"></div>
                        </div>
                    </div>

                    {/* What You'll Learn - Enhanced */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-3 mb-4">
                                <Target className="w-8 h-8 text-primary" />
                                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                                    ماذا ستتعلم؟
                                </h2>
                            </div>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                اكتشف المهارات والمعرفة التي ستكتسبها من خلال هذه الدورة الشاملة
                            </p>
                        </div>
                        
                        {/* Learning Goals Grid - Fancy Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {course.learningGoals.map((goal, index) => (
                                <div key={index} className="group">
                                    <div className="glass rounded-xl p-6 border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                                <CheckCircle className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-foreground leading-relaxed font-medium">
                                                    {goal}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How to Enroll - Centered */}
                    <div className="max-w-4xl mx-auto">
                        <div className="glass rounded-2xl p-12 border hover:border-primary/30 transition-colors text-center">
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <UserPlus className="w-8 h-8 text-primary" />
                                <h3 className="text-3xl font-bold">كيفية التسجيل؟</h3>
                            </div>
                            <div className="space-y-6 max-w-2xl mx-auto">
                                <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                                    <p className="text-lg leading-relaxed flex items-center justify-center gap-2">
                                        <Target className="w-5 h-5 text-primary flex-shrink-0" />
                                        الفيديوهات الأولى <span className="text-primary font-bold text-xl">مجانية تماماً</span>، 
                                        ابدأ التعلم فوراً واستكشف المحتوى!
                                    </p>
                                </div>
                                <div className="p-6 bg-muted/20 rounded-xl">
                                    <p className="text-muted-foreground leading-relaxed">
                                        عندما تصل إلى المحتوى المتقدم، ستحتاج للاشتراك في 
                                        <span className="text-primary font-semibold"> QAcart بريميوم </span> 
                                        للوصول لجميع الدورات والمحتوى المتقدم.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    )
}
