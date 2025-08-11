import { Clock, Users } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

// Dummy courses data
const COURSES = [
    {
        id: 1,
        title: 'أساسيات اختبار البرمجيات',
        description: 'تعلم المفاهيم الأساسية لاختبار البرمجيات وأفضل الممارسات في الصناعة',
        level: 'مبتدئ',
        levelVariant: 'primary' as const,
        duration: '8 ساعات',
        students: '250 طالب',
    },
    {
        id: 2,
        title: 'اختبار التطبيقات الويب',
        description: 'تعلم كيفية اختبار تطبيقات الويب باستخدام أدوات حديثة ومتقدمة',
        level: 'متوسط',
        levelVariant: 'secondary' as const,
        duration: '12 ساعة',
        students: '180 طالب',
    },
    {
        id: 3,
        title: 'أتمتة الاختبارات',
        description: 'اتقن أدوات أتمتة الاختبارات وبناء إطار عمل شامل للاختبار',
        level: 'متقدم',
        levelVariant: 'primary' as const,
        duration: '20 ساعة',
        students: '95 طالب',
    },
    {
        id: 4,
        title: 'اختبار واجهات برمجة التطبيقات',
        description: 'تعلم اختبار REST APIs وGraphQL باستخدام أدوات مختلفة',
        level: 'متوسط',
        levelVariant: 'secondary' as const,
        duration: '10 ساعات',
        students: '150 طالب',
    },
    {
        id: 5,
        title: 'اختبار الأداء والحمولة',
        description: 'اختبر أداء التطبيقات تحت الضغط وحلل النتائج',
        level: 'متقدم',
        levelVariant: 'primary' as const,
        duration: '15 ساعة',
        students: '75 طالب',
    },
    {
        id: 6,
        title: 'اختبار الأمان السيبراني',
        description: 'تعلم كيفية اكتشاف الثغرات الأمنية واختبار الأمان',
        level: 'متقدم',
        levelVariant: 'primary' as const,
        duration: '18 ساعة',
        students: '120 طالب',
    },
]

interface CourseCardProps {
    course: typeof COURSES[0]
    onCourseClick: (courseId: number) => void
}

const CourseCard = ({ course, onCourseClick }: CourseCardProps) => {
    return (
        <div className="glass rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer"
             onClick={() => onCourseClick(course.id)}>
            <div className="mb-4">
                <Badge variant={course.levelVariant} className="text-xs mb-3">
                    {course.level}
                </Badge>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-muted-foreground text-sm">
                    {course.description}
                </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                </div>
            </div>
            <Button variant="outline" className="w-full">
                عرض التفاصيل
            </Button>
        </div>
    )
}

interface CoursesGridProps {
    onCourseClick?: (courseId: number) => void
}

export const CoursesGrid = ({ onCourseClick = () => {} }: CoursesGridProps) => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">الدورات الشائعة</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        اختر من بين أفضل دوراتنا التدريبية المصممة بعناية من قبل خبراء الصناعة
                    </p>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {COURSES.map((course) => (
                        <CourseCard 
                            key={course.id} 
                            course={course} 
                            onCourseClick={onCourseClick}
                        />
                    ))}
                </div>

                {/* View All Courses Button */}
                <div className="text-center mt-12">
                    <Button variant="primary" size="lg">
                        عرض جميع الدورات
                    </Button>
                </div>
            </div>
        </section>
    )
}
