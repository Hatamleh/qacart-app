import { CheckCircle, Calendar, HelpCircle, Star, Target, Sparkles } from 'lucide-react'
import { GridBackground } from '../ui/GridBackground'

interface CourseData {
    lastUpdated: string
    learningPoints: string[]
}

interface CourseInfoProps {
    course: CourseData
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
                        
                        {/* Learning Points Grid - Fancy Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {course.learningPoints.map((point, index) => (
                                <div key={index} className="group">
                                    <div className="glass rounded-xl p-6 border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                                <CheckCircle className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-foreground leading-relaxed font-medium">
                                                    {point}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Course Details - Redesigned */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Last Updated - Enhanced */}
                        <div className="lg:col-span-1">
                            <div className="glass rounded-2xl p-8 border hover:border-primary/30 transition-colors h-full">
                                <div className="text-center">
                                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6">
                                        <Calendar className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">آخر تحديث</h3>
                                    <div className="space-y-2">
                                        <p className="text-2xl font-bold text-primary">{course.lastUpdated}</p>
                                        <p className="text-sm text-muted-foreground">
                                            محتوى محدث ومواكب للتطورات الحديثة
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* How to Enroll - Enhanced */}
                        <div className="lg:col-span-2">
                            <div className="glass rounded-2xl p-8 border hover:border-primary/30 transition-colors h-full">
                                <div className="flex items-start gap-6">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                                        <HelpCircle className="w-8 h-8 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold mb-6">كيفية التسجيل؟</h3>
                                        <div className="space-y-4">
                                            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                                                <p className="text-lg leading-relaxed">
                                                    🎯 الفيديوهات الأولى <span className="text-primary font-bold text-xl">مجانية تماماً</span>، 
                                                    ابدأ التعلم فوراً واستكشف المحتوى!
                                                </p>
                                            </div>
                                            <div className="p-4 bg-muted/20 rounded-lg">
                                                <p className="text-muted-foreground leading-relaxed">
                                                    عندما تصل إلى المحتوى المتقدم، ستحتاج للاشتراك في 
                                                    <span className="text-primary font-semibold"> QAcart PRO </span> 
                                                    للوصول لجميع الدورات والمحتوى المتقدم.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Quality Badge */}
                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
                            <Star className="w-5 h-5 text-primary fill-current" />
                            <span className="text-primary font-semibold">دورة عالية الجودة ومعتمدة</span>
                            <Star className="w-5 h-5 text-primary fill-current" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
