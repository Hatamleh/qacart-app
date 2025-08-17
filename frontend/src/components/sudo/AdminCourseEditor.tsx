'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AdminLessonManager } from './AdminLessonManager'
import { CourseClient } from '@/clients/course.client'
import { Course } from '@/types'

interface AdminCourseEditorProps {
  course: Course
}

export const AdminCourseEditor = ({ course }: AdminCourseEditorProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    title: course.title,
    type: course.type,
    shortDescription: course.shortDescription,
    promoVideoUrl: course.promoVideoUrl,
    studentsCount: course.studentsCount
  })

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.title.trim() || !formData.shortDescription.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Update course using CourseClient
      await CourseClient.updateCourse(course.id, {
        title: formData.title.trim(),
        type: formData.type,
        shortDescription: formData.shortDescription.trim(),
        promoVideoUrl: formData.promoVideoUrl.trim(),
        studentsCount: formData.studentsCount,
        lastUpdated: new Date().toLocaleDateString('ar-SA')
      })

      
    } catch (error) {
      console.error('❌ Failed to update course:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle input changes
  const updateField = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={ArrowRight}
            onClick={() => router.push('/sudo/courses')}
            disabled={isSubmitting}
          >
            العودة
          </Button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          icon={Save}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}
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
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
              required
            />
          </div>

          {/* Course Type */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              نوع الدورة
            </label>
            <select
              value={formData.type}
              onChange={(e) => updateField('type', e.target.value)}
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
              value={formData.shortDescription}
              onChange={(e) => updateField('shortDescription', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 resize-none"
              required
            />
          </div>

          {/* Promo Video URL */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              رابط الفيديو التعريفي
            </label>
            <input
              type="text"
              value={formData.promoVideoUrl}
              onChange={(e) => updateField('promoVideoUrl', e.target.value)}
              placeholder="معرف الفيديو في Vimeo"
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
              value={formData.studentsCount}
              onChange={(e) => updateField('studentsCount', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
            />
          </div>
        </div>
      </div>

      {/* Lessons Management */}
      <AdminLessonManager
        course={course}
      />
    </form>
  )
}
