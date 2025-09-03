import type { Course } from '@/types'
import { CourseCard } from './CourseCard'

interface CoursesGridProps {
    courses: Course[]
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
