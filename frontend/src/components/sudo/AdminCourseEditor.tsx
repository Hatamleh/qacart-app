import { Save, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AdminLessonManager } from './AdminLessonManager'
import { Course } from '@/types'

interface AdminCourseEditorProps {
  course: Course
}

export const AdminCourseEditor = ({ course }: AdminCourseEditorProps) => {



  return (
    <div className="space-y-8">

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            icon={ArrowRight}
          >
            العودة
          </Button>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Save}
        >
          حفظ التغييرات
        </Button>
      </div>

      {/* Course Basic Information */}
      <div className="glass rounded-xl p-6 border border-border">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          معلومات الدورة الأساسية
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Course Title */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              عنوان الدورة
            </label>
            <input
              type="text"
              defaultValue={course.title}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
            />
          </div>

          {/* Course Type */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              نوع الدورة
            </label>
            <select
              defaultValue={course.type}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
            >
              <option value="يدوي">يدوي</option>
              <option value="أتمتة">أتمتة</option>
              <option value="API">API</option>
              <option value="أداء">أداء</option>
            </select>
          </div>

          {/* Short Description */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              وصف مختصر
            </label>
            <textarea
              defaultValue={course.shortDescription}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 resize-none"
            />
          </div>

          {/* Promo Video URL */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              رابط الفيديو التعريفي
            </label>
            <input
              type="text"
              defaultValue={course.promoVideoUrl}
              placeholder="معرف الفيديو في Vimeo"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
            />
          </div>

          {/* Video Thumbnail */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              رابط صورة الدورة
            </label>
            <input
              type="url"
              defaultValue={course.videoThumbnail}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
            />
          </div>

          {/* Instructor Name - Hardcoded */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              اسم المدرب
            </label>
            <input
              type="text"
              value="حاتم حتامله"
              readOnly
              className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground focus:outline-none"
            />
            <p className="text-xs text-muted-foreground mt-1">المدرب الوحيد في المنصة</p>
          </div>

          {/* Students Count */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              عدد الطلاب
            </label>
            <input
              type="number"
              defaultValue={course.studentsCount}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
            />
          </div>
        </div>
      </div>

      {/* Lessons Management */}
      <AdminLessonManager
        course={course}
      />
    </div>
  )
}
