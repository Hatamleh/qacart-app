import { BookOpen } from 'lucide-react'
import type { Lesson } from '@/types'
import { LessonCard } from './LessonCard'

interface CourseLessonsProps {
    lessons: Lesson[]
    courseId: string | number
}

export const CourseLessons = ({ lessons, courseId }: CourseLessonsProps) => {
    // Sort lessons by lesson order
    const sortedLessons = [...lessons].sort((a, b) => a.lessonOrder - b.lessonOrder)
    const totalLessons = lessons.length
    const freeLessonsCount = lessons.filter(lesson => lesson.isFree).length

    return (
        <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    
                    {/* Header with Stats */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <BookOpen className="w-8 h-8 text-primary" />
                            <h2 className="text-4xl lg:text-5xl font-bold">دروس الدورة</h2>
                        </div>
                        <div className="flex items-center justify-center gap-8 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-primary rounded-full"></div>
                                <span className="text-muted-foreground">
                                    {freeLessonsCount} درس مجاني
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-primary rounded-full"></div>
                                <span className="text-muted-foreground">
                                    {totalLessons - freeLessonsCount} فيديو بريميوم
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-primary">
                                    {totalLessons} درس إجمالي
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Lessons List */}
                    <div className="space-y-4">
                        {sortedLessons.map((lesson, index) => (
                            <LessonCard 
                                key={lesson.id} 
                                lesson={lesson}
                                lessonIndex={index}
                                courseId={courseId}
                            />
                        ))}
                    </div>


                </div>
            </div>
        </section>
    )
}
