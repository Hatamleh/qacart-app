import { Play, User } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

interface CourseData {
    title: string
    shortDescription: string
    tags: string[]
    promoVideoUrl: string
    videoThumbnail: string
    instructor: {
        name: string
        image: string
    }
}

interface CourseHeaderProps {
    course: CourseData
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
                    <div className="relative rounded-xl overflow-hidden shadow-2xl">
                        <Image 
                            src={course.videoThumbnail}
                            alt="معاينة الدورة"
                            width={800}
                            height={450}
                            className="w-full h-64 md:h-80 lg:h-96 object-cover"
                            priority
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer">
                            <div className="bg-primary rounded-full p-6 hover:scale-110 transition-transform">
                                <Play className="w-12 h-12 text-white fill-current" />
                            </div>
                        </div>
                    </div>
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
