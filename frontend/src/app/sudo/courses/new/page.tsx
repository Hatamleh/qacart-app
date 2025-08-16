import { Metadata } from 'next'
import { NewCourseForm } from '@/components/sudo/NewCourseForm'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'إنشاء دورة جديدة - QAcart Admin',
  description: 'إنشاء دورة تدريبية جديدة',
  robots: 'noindex, nofollow',
}

export default function NewCoursePage() {

  return (
    <>
      {/* New Course Content */}
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link 
                href="/sudo/courses" 
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                إدارة الدورات
              </Link>
              <span>/</span>
              <span className="text-foreground">إنشاء دورة جديدة</span>
            </div>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  إنشاء دورة جديدة
                </h1>
                <p className="text-muted-foreground">
                  أدخل تفاصيل الدورة التدريبية الجديدة. يمكنك إضافة الدروس وتعديل المحتوى لاحقاً.
                </p>
              </div>
              
              {/* Back Button */}
              <Link href="/sudo/courses">
                <Button
                  variant="outline"
                  size="md"
                  icon={ArrowRight}
                  className="shadow-sm hover:shadow-md"
                >
                  العودة للقائمة
                </Button>
              </Link>
            </div>
          </div>

          {/* Course Creation Form */}
          <div className="glass rounded-2xl p-8 border border-border shadow-lg">
            <NewCourseForm />
          </div>
        </div>
      </main>
    </>
  )
}
