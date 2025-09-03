import { UserPlus, Target } from 'lucide-react'

export const HowToEnroll = () => {
    return (
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
    )
}
