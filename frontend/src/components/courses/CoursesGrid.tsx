import { Clock, Users } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Course, formatDuration } from '@/types/course.type'

interface CoursesGridProps {
    courses: Course[]
}

interface CourseCardProps {
    course: Course
}

const CourseCard = ({ course }: CourseCardProps) => {
    // Determine badge variant based on course type
    const getBadgeVariant = (type: string) => {
        return type === 'automation' ? 'primary' : 'success'
    }

    // Format type for display
    const getTypeLabel = (type: string) => {
        return type === 'automation' ? 'أتمتة' : 'يدوي'
    }

    return (
        <div className="glass rounded-lg p-6 hover:border-primary/50 transition-colors">
            <div className="mb-4">
                <Badge variant={getBadgeVariant(course.type)} className="text-xs mb-3">
                    {getTypeLabel(course.type)}
                </Badge>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-muted-foreground text-sm">
                    {course.shortDescription}
                </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(course.durationInMinutes)}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.studentsCount} طالب</span>
                </div>
            </div>
            <Link href={`/courses/${course.id}`}>
                <Button variant="outline" className="w-full">
                    عرض التفاصيل
                </Button>
            </Link>
        </div>
    )
}

export const CoursesGrid = ({ courses }: CoursesGridProps) => {
    return (
        <section id="courses-grid-section" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">الدورات الشائعة</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        اختر من بين أفضل دوراتنا التدريبية المصممة بعناية من قبل خبراء الصناعة
                    </p>
                </div>

                {/* Courses Grid */}
                {courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">لا توجد دورات متاحة حالياً</p>
                    </div>
                )}


            </div>
        </section>
    )
}
