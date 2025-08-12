'use client'

import { Play, Lock, Clock, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Lesson, formatDuration } from '@/types/course'

interface CourseLessonsProps {
    lessons: Lesson[]
    courseId: string | number
}

const LessonCard = ({ lesson, lessonIndex, courseId }: { 
    lesson: Lesson, 
    lessonIndex: number,
    courseId: string | number
}) => {
    const router = useRouter()
    
    const handleLessonClick = () => {
        if (lesson.isFree) {
            // Navigate to course player for free lessons
            router.push(`/courses/${courseId}/player?lesson=${lesson.id}`)
        } else {
            // Navigate to premium page for premium lessons
            router.push('/premium')
        }
    }
    return (
        <div 
            className={`glass rounded-xl p-6 transition-all duration-300 group cursor-pointer ${
                lesson.isFree 
                    ? 'hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg' 
                    : 'hover:border-premium/50 hover:bg-premium/5 hover:shadow-lg'
            }`}
            onClick={handleLessonClick}
        >
            <div className="flex items-start gap-4">
                {/* Lesson Number */}
                <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        lesson.isFree 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-muted text-muted-foreground'
                    }`}>
                        {lessonIndex + 1}
                    </div>
                </div>
                
                {/* Lesson Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <h4 className="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                                {lesson.title}
                            </h4>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    <span>{formatDuration(lesson.durationInMinutes)}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Play/Lock Icon */}
                        <div className={`p-2 rounded-lg ${
                            lesson.isFree ? 'bg-primary/10 text-primary' : 'bg-premium/10 text-premium'
                        }`}>
                            {lesson.isFree ? (
                                <Play className="w-5 h-5" />
                            ) : (
                                <Lock className="w-5 h-5" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
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
