'use client'

import { useState } from 'react'
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp, Video, FileText, Save } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Course, Lesson } from '@/types/course'

interface AdminLessonManagerProps {
  course: Course
  onCourseUpdate: (course: Course) => void
}

export const AdminLessonManager = ({ course, onCourseUpdate }: AdminLessonManagerProps) => {
  const [expandedLessons, setExpandedLessons] = useState<Set<number>>(new Set())
  const [draggedLesson, setDraggedLesson] = useState<number | null>(null)

  // Toggle lesson expansion
  const toggleLessonExpansion = (lessonId: number) => {
    const newExpanded = new Set(expandedLessons)
    if (newExpanded.has(lessonId)) {
      newExpanded.delete(lessonId)
    } else {
      newExpanded.add(lessonId)
    }
    setExpandedLessons(newExpanded)
  }

  // Add new lesson
  const addNewLesson = () => {
    const newLesson: Lesson = {
      id: Date.now(), // Simple ID generation for demo
      lessonOrder: course.lessons.length + 1,
      title: 'درس جديد',
      durationInMinutes: 10,
      isFree: false,
      videoUrl: '',
      articleContent: ''
    }
    
    const updatedCourse = {
      ...course,
      lessons: [...course.lessons, newLesson]
    }
    onCourseUpdate(updatedCourse)
    
    // Auto-expand the new lesson
    setExpandedLessons(prev => new Set([...prev, newLesson.id]))
  }

  // Delete lesson
  const deleteLesson = (lessonId: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الدرس؟')) {
      const updatedLessons = course.lessons
        .filter(lesson => lesson.id !== lessonId)
        .map((lesson, index) => ({ ...lesson, lessonOrder: index + 1 }))
      
      onCourseUpdate({
        ...course,
        lessons: updatedLessons
      })
      
      setExpandedLessons(prev => {
        const newSet = new Set(prev)
        newSet.delete(lessonId)
        return newSet
      })
    }
  }

  // Update lesson
  const updateLesson = (lessonId: number, field: keyof Lesson, value: any) => {
    const updatedLessons = course.lessons.map(lesson =>
      lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
    )
    onCourseUpdate({
      ...course,
      lessons: updatedLessons
    })
  }

  // Save lesson (just for UI feedback for now)
  const saveLesson = (lessonId: number) => {
    // TODO: Implement actual save functionality
    alert(`تم حفظ الدرس بنجاح!`)
  }

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, lessonId: number) => {
    setDraggedLesson(lessonId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetLessonId: number) => {
    e.preventDefault()
    if (!draggedLesson || draggedLesson === targetLessonId) return

    const draggedIndex = course.lessons.findIndex(l => l.id === draggedLesson)
    const targetIndex = course.lessons.findIndex(l => l.id === targetLessonId)

    if (draggedIndex === -1 || targetIndex === -1) return

    // Reorder lessons
    const newLessons = [...course.lessons]
    const [removed] = newLessons.splice(draggedIndex, 1)
    newLessons.splice(targetIndex, 0, removed)

    // Update lesson orders
    const updatedLessons = newLessons.map((lesson, index) => ({
      ...lesson,
      lessonOrder: index + 1
    }))

    onCourseUpdate({
      ...course,
      lessons: updatedLessons
    })
    
    setDraggedLesson(null)
  }

  const handleDragEnd = () => {
    setDraggedLesson(null)
  }

  return (
    <div className="glass rounded-xl p-6 border border-border">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          إدارة الدروس ({course.lessons.length})
        </h2>
        
        <Button
          variant="outline"
          size="sm"
          icon={Plus}
          onClick={addNewLesson}
        >
          إضافة درس جديد
        </Button>
      </div>

      {/* Lessons List */}
      <div className="space-y-3">
        {course.lessons.map((lesson) => {
          const isExpanded = expandedLessons.has(lesson.id)
          const isDragging = draggedLesson === lesson.id
          
          return (
            <div
              key={lesson.id}
              draggable
              onDragStart={(e) => handleDragStart(e, lesson.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, lesson.id)}
              onDragEnd={handleDragEnd}
              className={`
                bg-background/50 rounded-xl border border-border transition-all duration-200
                ${isDragging ? 'opacity-50 scale-95' : 'hover:border-primary/30'}
                ${isExpanded ? 'border-primary/50' : ''}
              `}
            >
              
              {/* Lesson Header */}
              <div className="flex items-center gap-4 p-4">
                
                {/* Drag Handle */}
                <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Lesson Order */}
                <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold">
                  {lesson.lessonOrder}
                </div>

                {/* Lesson Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground truncate">
                      {lesson.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      {lesson.videoUrl && (
                        <Video className="w-4 h-4 text-primary" />
                      )}
                      {lesson.articleContent && (
                        <FileText className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{lesson.durationInMinutes} دقيقة</span>
                    <span className={lesson.isFree ? 'text-green-400' : 'text-premium'}>
                      {lesson.isFree ? 'مجاني' : 'مدفوع'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={isExpanded ? ChevronUp : ChevronDown}
                    onClick={() => toggleLessonExpansion(lesson.id)}
                    className="text-muted-foreground hover:text-foreground"
                  />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    onClick={() => deleteLesson(lesson.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  />
                </div>
              </div>

              {/* Expanded Lesson Form */}
              {isExpanded && (
                <div className="border-t border-border/50 p-4 space-y-4">
                  
                  {/* Lesson Title & Duration */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        عنوان الدرس
                      </label>
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(e) => updateLesson(lesson.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        المدة (دقيقة)
                      </label>
                      <input
                        type="number"
                        value={lesson.durationInMinutes}
                        onChange={(e) => updateLesson(lesson.id, 'durationInMinutes', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
                      />
                    </div>
                  </div>

                  {/* Video URL */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      رابط الفيديو (اختياري)
                    </label>
                    <input
                      type="url"
                      value={lesson.videoUrl || ''}
                      onChange={(e) => updateLesson(lesson.id, 'videoUrl', e.target.value)}
                      placeholder="https://example.com/video.mp4"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
                    />
                  </div>

                  {/* Article Content */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      محتوى المقال (Markdown)
                    </label>
                    <textarea
                      value={lesson.articleContent || ''}
                      onChange={(e) => updateLesson(lesson.id, 'articleContent', e.target.value)}
                      rows={8}
                      placeholder="اكتب محتوى الدرس بتنسيق Markdown..."
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 resize-none font-mono"
                    />
                  </div>

                  {/* Lesson Settings */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={lesson.isFree}
                        onChange={(e) => updateLesson(lesson.id, 'isFree', e.target.checked)}
                        className="w-4 h-4 text-primary rounded border-border focus:ring-primary/25"
                      />
                      <span className="text-sm text-muted-foreground">درس مجاني</span>
                    </label>

                    {/* Save Lesson Button */}
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Save}
                      onClick={() => saveLesson(lesson.id)}
                      className="px-4 py-2"
                    >
                      حفظ الدرس
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {course.lessons.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            لا توجد دروس
          </h3>
          <p className="text-muted-foreground mb-4">
            ابدأ بإضافة أول درس في هذه الدورة
          </p>
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={addNewLesson}
          >
            إضافة درس جديد
          </Button>
        </div>
      )}
    </div>
  )
}
