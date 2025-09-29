import { Clock, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import type { Course } from '@/types'

interface CourseCardProps {
    course: Course
}

export const CourseCard = ({ course }: CourseCardProps) => {
    return (
        <div className="glass rounded-lg p-6 hover:border-primary/50 transition-colors">
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-muted-foreground text-sm">
                    {course.shortDescription}
                </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.durationInMinutes} دقيقة</span>
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
