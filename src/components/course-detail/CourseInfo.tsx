import { Sparkles } from 'lucide-react'
import type { Course } from '@/types'
import { WhatYoullLearn } from './WhatYoullLearn'
import { HowToEnroll } from './HowToEnroll'

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

                    {/* What You'll Learn */}
                    <WhatYoullLearn learningGoals={course.learningGoals} />

                    {/* How to Enroll */}
                    <HowToEnroll />


                </div>
            </div>
        </section>
    )
}
