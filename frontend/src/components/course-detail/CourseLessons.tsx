import { Play, Lock, Clock, BookOpen } from 'lucide-react'

interface Lesson {
    id: number
    lessonOrder: number
    title: string
    duration: string
    isFree: boolean
}

interface CourseLessonsProps {
    lessons: Lesson[]
    onLessonClick: (lessonId: number) => void
}

const LessonCard = ({ lesson, lessonIndex, onLessonClick }: { 
    lesson: Lesson, 
    lessonIndex: number,
    onLessonClick: (id: number) => void 
}) => {
    return (
        <div 
            className={`glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer group ${
                lesson.isFree ? 'hover:bg-primary/5 hover:shadow-lg' : 'opacity-75 hover:opacity-90'
            }`}
            onClick={() => onLessonClick(lesson.id)}
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
                                    <span>{lesson.duration}</span>
                                </div>
                                {lesson.isFree && (
                                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                                        مجاني
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {/* Play/Lock Icon */}
                        <div className={`p-2 rounded-lg ${
                            lesson.isFree ? 'bg-primary/10 text-primary' : 'bg-muted/50 text-muted-foreground'
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

export const CourseLessons = ({ lessons, onLessonClick }: CourseLessonsProps) => {
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
                                <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                                <span className="text-muted-foreground">
                                    {totalLessons - freeLessonsCount} درس بالاشتراك
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
                                onLessonClick={onLessonClick}
                            />
                        ))}
                    </div>

                    {/* Bottom Info */}
                    <div className="text-center mt-12">
                        <div className="inline-flex items-center gap-3 px-6 py-4 bg-primary/5 rounded-xl border border-primary/10">
                            <Lock className="w-5 h-5 text-primary" />
                            <span className="text-muted-foreground">
                                للوصول إلى جميع الدروس، اشترك في 
                                <span className="text-primary font-semibold"> QAcart PRO</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
