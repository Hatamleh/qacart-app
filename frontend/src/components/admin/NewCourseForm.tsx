'use client'

import { useState } from 'react'
import { Save, BookOpen, Target } from 'lucide-react'
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
    studentsCount: 0,
    learningGoals: ['', '', '', '', '', ''] // Exactly 6 learning goals
  })

  // Handle form field changes
  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Handle learning goals changes
  const handleLearningGoalChange = (index: number, value: string) => {
    const newLearningGoals = [...formData.learningGoals]
    newLearningGoals[index] = value
    setFormData(prev => ({ ...prev, learningGoals: newLearningGoals }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare course data
    const courseData: Partial<Course> = {
      title: formData.title,
      shortDescription: formData.shortDescription,
      type: formData.type,
      promoVideoUrl: formData.promoVideoUrl,
      videoThumbnail: formData.videoThumbnail || 'https://picsum.photos/800/450?random=' + Date.now(),
      instructor: {
        name: formData.instructorName,
        image: 'https://picsum.photos/200/200?random=instructor'
      },
      studentsCount: formData.studentsCount,
      lastUpdated: new Date().toLocaleDateString('ar-SA'),
      lessons: [],
      durationInMinutes: 0,
      tags: [],
      learningGoals: formData.learningGoals
    }

    onSubmit(courseData)
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

          {/* Course Title & Type Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-muted-foreground mb-3">
                عنوان الدورة *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="مثال: أساسيات اختبار البرمجيات"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 transition-all duration-200 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-3">
                نوع الدورة
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 shadow-sm"
              >
                <option value="manual">اختبار يدوي</option>
                <option value="automation">اختبار الأتمتة</option>
                <option value="api">اختبار API</option>
                <option value="performance">اختبار الأداء</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground mb-3">
              وصف مختصر *
            </label>
            <textarea
              value={formData.shortDescription}
              onChange={(e) => handleChange('shortDescription', e.target.value)}
              rows={4}
              placeholder="وصف مختصر للدورة وما سيتعلمه الطالب..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 transition-all duration-200 resize-none shadow-sm"
            />
          </div>
        </div>

        {/* Learning Goals Section */}
        <div className="glass rounded-xl p-6 border border-border space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              أهداف التعلم
            </h4>
            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-lg">
              جميع الأهداف مطلوبة
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            اكتب ما سيتعلمه الطلاب في هذه الدورة (6 أهداف مطلوبة)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.learningGoals.map((goal, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  الهدف {index + 1} *
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => handleLearningGoalChange(index, e.target.value)}
                  placeholder={`مثال: ${index === 0 ? 'فهم أساسيات اختبار البرمجيات' : index === 1 ? 'تعلم كتابة حالات الاختبار' : 'إتقان أدوات الاختبار الحديثة'}`}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 shadow-sm"
                />
              </div>
            ))}
          </div>

        </div>

        {/* Instructor & Media Section */}
        <div className="glass rounded-xl p-6 border border-border space-y-6">
          <h4 className="text-lg font-semibold text-foreground mb-4">
            معلومات المدرب والوسائط
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Instructor Name */}
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-3">
                اسم المدرب *
              </label>
              <input
                type="text"
                value={formData.instructorName}
                onChange={(e) => handleChange('instructorName', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 transition-all duration-200 shadow-sm"
              />
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
                onChange={(e) => handleChange('studentsCount', parseInt(e.target.value) || 0)}
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
                value={formData.promoVideoUrl}
                onChange={(e) => handleChange('promoVideoUrl', e.target.value)}
                placeholder="مثال: 1085509305"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 shadow-sm"
              />
            </div>

            {/* Video Thumbnail URL */}
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-3">
                رابط صورة الدورة (اختياري)
              </label>
              <input
                type="url"
                value={formData.videoThumbnail}
                onChange={(e) => handleChange('videoThumbnail', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 shadow-sm"
              />
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            💡 إذا تُركت صورة الدورة فارغة، سيتم إنشاء صورة افتراضية تلقائياً
          </p>
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
                onClick={onCancel}
                disabled={isLoading}
                className="min-w-[100px]"
              >
                إلغاء
              </Button>
              
              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={Save}
                loading={isLoading}
                className="min-w-[140px] shadow-lg hover:shadow-xl"
              >
                إنشاء الدورة
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
