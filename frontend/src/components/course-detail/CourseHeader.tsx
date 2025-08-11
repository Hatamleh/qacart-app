import { User } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { VimeoPlayer } from '../video/VimeoPlayer'
import { Course } from '@/types/course'

interface CourseHeaderProps {
    course: Course
}

export const CourseHeader = ({ course }: CourseHeaderProps) => {
    return (
        <section className="pt-32 pb-20 bg-muted/20">
            <div className="container mx-auto px-6 max-w-4xl">
                
                {/* Course Tags */}
                <div className="text-center mb-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {course.tags.map((tag, index) => (
                            <Badge 
                                key={index} 
                                variant="primary" 
                                className="text-sm px-4 py-2"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Course Title - Big */}
                <div className="text-center mb-6">
                    <h1 className="text-5xl lg:text-7xl font-bold">
                        {course.title}
                    </h1>
                </div>

                {/* Short Description */}
                <div className="text-center mb-12">
                    <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        {course.shortDescription}
                    </p>
                </div>

                {/* Big Video */}
                <div className="mb-8">
                    <VimeoPlayer 
                        vimeoId={course.promoVideoUrl}
                        title={`معاينة دورة ${course.title}`}
                        thumbnail={course.videoThumbnail}
                        className="w-full"
                    />
                </div>

                {/* Small Instructor Info */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-3">
                        <Image 
                            src={course.instructor.image}
                            alt={course.instructor.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="text-sm text-muted-foreground">
                            <span>تدريس بواسطة </span>
                            <span className="font-medium text-foreground">{course.instructor.name}</span>
                        </div>
                    </div>
                </div>

                {/* Enroll Button - Centered */}
                <div className="text-center mt-12">
                    <Button 
                        variant="primary" 
                        size="lg"
                        icon={User}
                        iconPosition="right"
                        className="px-12 py-4 text-lg"
                    >
                        اشترك الآن
                    </Button>
                </div>
            </div>
        </section>
    )
}
