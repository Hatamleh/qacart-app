'use client'

import { Rocket, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'

export const LetsGo = () => {
    const router = useRouter()
    
    const goToCourses = () => {
        router.push('/courses')
    }
    return (
        <section id="lets-go-section" className="py-20 lg:py-32 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Main Heading */}
                    <h2 className="text-5xl lg:text-7xl font-bold mb-8">
                        <span className="gradient-text">هيا بنا!</span>
                    </h2>

                    {/* Subheading */}
                    <p className="text-xl lg:text-2xl text-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
                        هناك الكثير من المحتوى المجاني هنا، لذا استكشف قبل أن تقوم بالترقية
                    </p>

                    {/* Call to Action Statement */}
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <p className="text-lg text-muted-foreground">
                            كل دورة تبدأ بدروس مجانيه، جربها الآن
                        </p>
                        <Rocket className="w-6 h-6 text-primary animate-bounce" />
                    </div>



                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            variant="primary"
                            size="lg"
                            icon={BookOpen}
                            iconPosition="right"
                            onClick={goToCourses}
                        >
                            تصفح الدورات
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    )
}
