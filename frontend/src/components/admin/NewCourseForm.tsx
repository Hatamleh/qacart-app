'use client'

import { useState } from 'react'
import { Save, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Course } from '@/types/course'

interface NewCourseFormProps {
  onSubmit: (courseData: Partial<Course>) => void
  onCancel: () => void
  isLoading?: boolean
}

export const NewCourseForm = ({ onSubmit, onCancel, isLoading = false }: NewCourseFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    type: 'manual',
    promoVideoUrl: '',
    videoThumbnail: '',
    instructorName: 'حاتم حتامله',
    studentsCount: 0
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle form field changes
  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'عنوان الدورة مطلوب'
    }
    
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'وصف الدورة مطلوب'
    }

    if (!formData.instructorName.trim()) {
      newErrors.instructorName = 'اسم المدرب مطلوب'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    // Prepare course data
    const courseData: Partial<Course> = {
      title: formData.title.trim(),
      shortDescription: formData.shortDescription.trim(),
      type: formData.type,
      promoVideoUrl: formData.promoVideoUrl.trim(),
      videoThumbnail: formData.videoThumbnail.trim() || 'https://picsum.photos/800/450?random=' + Date.now(),
      instructor: {
        name: formData.instructorName.trim(),
        image: 'https://picsum.photos/200/200?random=instructor'
      },
      studentsCount: formData.studentsCount,
      lastUpdated: new Date().toLocaleDateString('ar-SA'),
      lessons: [],
      durationInMinutes: 0,
      tags: [],
      learningGoals: []
    }

    onSubmit(courseData)
  }

  return (
    <div className="space-y-6">
      
      {/* Form Description */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-xl flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground">
          أدخل معلومات الدورة الجديدة. يمكنك إضافة الدروس لاحقاً من صفحة التعديل.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Course Title */}
        <div>
          <label className="block text-sm font-semibold text-muted-foreground mb-2">
            عنوان الدورة *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="مثال: أساسيات اختبار البرمجيات"
            className={`
              w-full px-4 py-3 rounded-xl border bg-background/50 text-foreground 
              placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 
              focus:ring-primary/25 transition-all duration-200
              ${errors.title ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary/30'}
            `}
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Course Type */}
        <div>
          <label className="block text-sm font-semibold text-muted-foreground mb-2">
            نوع الدورة
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
          >
            <option value="manual">اختبار يدوي</option>
            <option value="automation">اختبار الأتمتة</option>
            <option value="api">اختبار API</option>
            <option value="performance">اختبار الأداء</option>
          </select>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-semibold text-muted-foreground mb-2">
            وصف مختصر *
          </label>
          <textarea
            value={formData.shortDescription}
            onChange={(e) => handleChange('shortDescription', e.target.value)}
            rows={3}
            placeholder="وصف مختصر للدورة وما سيتعلمه الطالب..."
            className={`
              w-full px-4 py-3 rounded-xl border bg-background/50 text-foreground 
              placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 
              focus:ring-primary/25 transition-all duration-200 resize-none
              ${errors.shortDescription ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary/30'}
            `}
          />
          {errors.shortDescription && (
            <p className="text-red-400 text-sm mt-1">{errors.shortDescription}</p>
          )}
        </div>

        {/* Instructor Name */}
        <div>
          <label className="block text-sm font-semibold text-muted-foreground mb-2">
            اسم المدرب *
          </label>
          <input
            type="text"
            value={formData.instructorName}
            onChange={(e) => handleChange('instructorName', e.target.value)}
            className={`
              w-full px-4 py-3 rounded-xl border bg-background/50 text-foreground 
              placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 
              focus:ring-primary/25 transition-all duration-200
              ${errors.instructorName ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary/30'}
            `}
          />
          {errors.instructorName && (
            <p className="text-red-400 text-sm mt-1">{errors.instructorName}</p>
          )}
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Promo Video URL */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              معرف فيديو Vimeo (اختياري)
            </label>
            <input
              type="text"
              value={formData.promoVideoUrl}
              onChange={(e) => handleChange('promoVideoUrl', e.target.value)}
              placeholder="مثال: 1085509305"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
            />
          </div>

          {/* Students Count */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              عدد الطلاب المبدئي
            </label>
            <input
              type="number"
              min="0"
              value={formData.studentsCount}
              onChange={(e) => handleChange('studentsCount', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
            />
          </div>
        </div>

        {/* Video Thumbnail URL */}
        <div>
          <label className="block text-sm font-semibold text-muted-foreground mb-2">
            رابط صورة الدورة (اختياري)
          </label>
          <input
            type="url"
            value={formData.videoThumbnail}
            onChange={(e) => handleChange('videoThumbnail', e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
          />
          <p className="text-xs text-muted-foreground mt-1">
            إذا تُركت فارغة، سيتم إنشاء صورة افتراضية
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onCancel}
            disabled={isLoading}
          >
            إلغاء
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={Save}
            loading={isLoading}
            className="min-w-[120px]"
          >
            إنشاء الدورة
          </Button>
        </div>
      </form>
    </div>
  )
}
