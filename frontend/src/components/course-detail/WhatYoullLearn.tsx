import { CheckCircle, Target } from 'lucide-react'
import type { Course } from '@/types'

interface WhatYoullLearnProps {
    learningGoals: Course['learningGoals']
}

export const WhatYoullLearn = ({ learningGoals }: WhatYoullLearnProps) => {
    return (
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
                {learningGoals.map((goal, index) => (
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
    )
}
