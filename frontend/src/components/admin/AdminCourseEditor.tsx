'use client'

import { useState } from 'react'
import { Save, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AdminLessonManager } from './AdminLessonManager'
import { Course } from '@/types/course'

interface AdminCourseEditorProps {
  course: Course
}

export const AdminCourseEditor = ({ course: initialCourse }: AdminCourseEditorProps) => {
  const [course, setCourse] = useState<Course>(initialCourse)
  const [isSaving, setIsSaving] = useState(false)

  // Handle course basic info changes
  const handleCourseChange = (field: keyof Course, value:any) => {
    setCourse(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle save course
  const handleSaveCourse = async () => {
    setIsSaving(true)
    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      alert('تم حفظ التغييرات بنجاح!')
    } catch  {
      alert('حدث خطأ في حفظ التغييرات')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            icon={ArrowRight}
            onClick={() => window.history.back()}
          >
            العودة
          </Button>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Save}
          onClick={handleSaveCourse}
          loading={isSaving}
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
              value={course.title}
              onChange={(e) => handleCourseChange('title', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
            />
          </div>

          {/* Course Type */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              نوع الدورة
            </label>
            <select
              value={course.type}
              onChange={(e) => handleCourseChange('type', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
            >
              <option value="manual">يدوي</option>
              <option value="automation">أتمتة</option>
              <option value="api">API</option>
              <option value="performance">أداء</option>
            </select>
          </div>

          {/* Short Description */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              وصف مختصر
            </label>
            <textarea
              value={course.shortDescription}
              onChange={(e) => handleCourseChange('shortDescription', e.target.value)}
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
              value={course.promoVideoUrl}
              onChange={(e) => handleCourseChange('promoVideoUrl', e.target.value)}
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
              value={course.videoThumbnail}
              onChange={(e) => handleCourseChange('videoThumbnail', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
            />
          </div>

          {/* Instructor Name */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              اسم المدرب
            </label>
            <input
              type="text"
              value={course.instructor.name}
              onChange={(e) => handleCourseChange('instructor', { ...course.instructor, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
            />
          </div>

          {/* Students Count */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              عدد الطلاب
            </label>
            <input
              type="number"
              value={course.studentsCount}
              onChange={(e) => handleCourseChange('studentsCount', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30"
            />
          </div>
        </div>
      </div>

      {/* Lessons Management */}
      <AdminLessonManager
        course={course}
        onCourseUpdate={setCourse}
      />
    </div>
  )
}
