'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createCourse } from '@/actions'

export const NewCourseForm = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    vimeoId: '',
    studentsCount: 0
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
      // Create course using Server Action
      await createCourse({
        title: formData.title.trim(),
        shortDescription: formData.shortDescription.trim(),
        vimeoId: formData.vimeoId.trim() || '',
        studentsCount: formData.studentsCount,
        lastUpdated: new Date().toLocaleDateString('ar-SA'),
        durationInMinutes: 0, // Will be calculated when lessons are added
        tags: [], // Empty tags array - can be added later
        lessons: [] // Empty lessons array for new course
      })



      // Redirect to courses list so admin can see the new course and choose to edit
      router.push('/sudo/courses')

    } catch (error) {
      console.error('❌ Failed to create course:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle input changes
  const updateField = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }


  return (
    <div className="space-y-8">

      {/* Form Header */}
      <div className="text-center pb-6 border-b border-border">
        <div className="w-20 h-20 mx-auto mb-4 glass rounded-2xl flex items-center justify-center border border-primary/20">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          إنشاء دورة جديدة
        </h3>
        <p className="text-muted-foreground text-sm">
          أدخل معلومات الدورة الأساسية. يمكنك إضافة الدروس وتعديل التفاصيل لاحقاً من صفحة الإدارة.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Basic Information Section */}
        <div className="glass rounded-xl p-6 border border-border space-y-6">
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            المعلومات الأساسية
          </h4>

          {/* Course Title */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-3">
              عنوان الدورة *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="مثال: أساسيات اختبار البرمجيات"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 transition-all duration-200 shadow-sm"
              required
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-3">
              وصف مختصر *
            </label>
            <textarea
              value={formData.shortDescription}
              onChange={(e) => updateField('shortDescription', e.target.value)}
              rows={4}
              placeholder="وصف مختصر للدورة وما سيتعلمه الطالب..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 transition-all duration-200 resize-none shadow-sm"
              required
            />
          </div>
        </div>

        {/* Instructor & Media Section */}
        <div className="glass rounded-xl p-6 border border-border space-y-6">
          <h4 className="text-lg font-semibold text-foreground mb-4">
            معلومات المدرب والوسائط
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Instructor Name - Hardcoded */}
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-3">
                اسم المدرب
              </label>
              <input
                type="text"
                value="حاتم حتامله"
                disabled
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-muted-foreground cursor-not-allowed shadow-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                💡 المدرب ثابت لجميع الدورات
              </p>
            </div>

            {/* Students Count */}
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-3">
                عدد الطلاب المبدئي
              </label>
              <input
                type="number"
                min="0"
                value={formData.studentsCount}
                onChange={(e) => updateField('studentsCount', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 shadow-sm"
              />
            </div>

            {/* Promo Video URL */}
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-3">
                معرف فيديو Vimeo (اختياري)
              </label>
              <input
                type="text"
                value={formData.vimeoId}
                onChange={(e) => updateField('vimeoId', e.target.value)}
                placeholder="مثال: 1085509305"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 shadow-sm"
              />
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="glass rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              تأكد من صحة جميع البيانات قبل إنشاء الدورة
            </p>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="md"
                className="min-w-[100px]"
                onClick={() => router.push('/sudo/courses')}
                disabled={isSubmitting}
              >
                إلغاء
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={Save}
                className="min-w-[140px] shadow-lg hover:shadow-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري الإنشاء...' : 'إنشاء الدورة'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
