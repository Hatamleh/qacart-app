import { Play, Lock, Clock } from 'lucide-react'
import Link from 'next/link'
import type { Lesson } from '@/types'

interface LessonCardProps {
    lesson: Lesson
    lessonIndex: number
    courseId: string | number
}

export const LessonCard = ({ lesson, lessonIndex, courseId }: LessonCardProps) => {
    const linkHref = lesson.isFree 
        ? `/courses/${courseId}/player?lesson=${lesson.id}`
        : '/premium'
        
    return (
        <Link href={linkHref}>
            <div 
                className={`glass rounded-xl p-6 transition-all duration-300 group cursor-pointer ${
                    lesson.isFree 
                        ? 'hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg' 
                        : 'hover:border-premium/50 hover:bg-premium/5 hover:shadow-lg'
                }`}
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
                                        <span>{lesson.durationInMinutes} دقيقة</span>
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
        </Link>
    )
}
