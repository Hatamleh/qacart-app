'use client'

import { useState } from 'react'
import { Plus, GripVertical, Trash2, ChevronDown, Video, FileText, Save } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LessonClient } from '@/clients'
import { Course } from '@/types'

interface AdminLessonManagerProps {
  course: Course
}

export const AdminLessonManager = ({ course }: AdminLessonManagerProps) => {
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(
    course.lessons.length > 0 ? course.lessons[0].id : null
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deletingLessonId, setDeletingLessonId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [draggedLessonId, setDraggedLessonId] = useState<string | null>(null)
  const [isReordering, setIsReordering] = useState(false)

  // Handle lesson creation
  const handleCreateLesson = async () => {
    setIsCreating(true)

    try {
      const result = await LessonClient.createLesson(course.id, {
        title: 'درس جديد',
        durationInMinutes: 10,
        isFree: false,
        vimeoId: '',
        articleContent: '# درس جديد\n\nاكتب محتوى الدرس هنا...',
        lessonOrder: course.lessons.length + 1
      })

      // Expand the new lesson
      setExpandedLessonId(result.lesson.id)
      
    } catch (error) {
      console.error('❌ Failed to create lesson:', error)
    } finally {
      setIsCreating(false)
    }
  }

  // Handle lesson deletion
  const handleDeleteLesson = async (lessonId: string, lessonTitle: string) => {
    if (!confirm(`هل أنت متأكد من حذف الدرس "${lessonTitle}"؟`)) {
      return
    }

    setDeletingLessonId(lessonId)

    try {
      await LessonClient.deleteLesson(course.id, lessonId)
      
      // Close expansion if we deleted the expanded lesson
      if (expandedLessonId === lessonId) {
        setExpandedLessonId(null)
      }
      
    } catch (error) {
      console.error('❌ Failed to delete lesson:', error)
    } finally {
      setDeletingLessonId(null)
    }
  }

  // Handle lesson update
  const handleUpdateLesson = async (lessonId: string) => {
    setIsSubmitting(true)

    try {
      // Get form values from DOM elements by their IDs
      const titleInput = document.getElementById(`lesson-title-${lessonId}`) as HTMLInputElement
      const durationInput = document.getElementById(`lesson-duration-${lessonId}`) as HTMLInputElement
      const vimeoInput = document.getElementById(`lesson-vimeo-${lessonId}`) as HTMLInputElement
      const articleInput = document.getElementById(`lesson-article-${lessonId}`) as HTMLTextAreaElement
      const freeCheckbox = document.getElementById(`lesson-free-${lessonId}`) as HTMLInputElement

      await LessonClient.updateLesson(course.id, lessonId, {
        title: titleInput.value.trim(),
        durationInMinutes: parseInt(durationInput.value) || 0,
        vimeoId: vimeoInput.value.trim(),
        articleContent: articleInput.value.trim(),
        isFree: freeCheckbox.checked
      })

    } catch (error) {
      console.error('❌ Failed to update lesson:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Toggle lesson expansion
  const toggleLessonExpansion = (lessonId: string) => {
    setExpandedLessonId(expandedLessonId === lessonId ? null : lessonId)
  }

  // Handle drag and drop reordering
  const handleDragStart = (lessonId: string) => {
    setDraggedLessonId(lessonId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault() // Allow drop
  }

  const handleDrop = async (e: React.DragEvent, targetLessonId: string) => {
    e.preventDefault()
    
    if (!draggedLessonId || draggedLessonId === targetLessonId) {
      setDraggedLessonId(null)
      return
    }

    setIsReordering(true)

    try {
      // Create new order by moving dragged lesson to target position
      const currentLessons = [...course.lessons].sort((a, b) => a.lessonOrder - b.lessonOrder)
      const draggedLesson = currentLessons.find(l => l.id === draggedLessonId)
      const targetLesson = currentLessons.find(l => l.id === targetLessonId)
      
      if (!draggedLesson || !targetLesson) return

      // Remove dragged lesson from current position
      const withoutDragged = currentLessons.filter(l => l.id !== draggedLessonId)
      
      // Find target index and insert dragged lesson
      const targetIndex = withoutDragged.findIndex(l => l.id === targetLessonId)
      const newOrder = [
        ...withoutDragged.slice(0, targetIndex),
        draggedLesson,
        ...withoutDragged.slice(targetIndex)
      ]

      // Call reorder API with new lesson order
      await LessonClient.reorderLessons(course.id, newOrder.map(l => l.id))

    } catch (error) {
      console.error('❌ Failed to reorder lessons:', error)
    } finally {
      setDraggedLessonId(null)
      setIsReordering(false)
    }
  }

  return (
    <div className="glass rounded-xl p-6 border border-border">
      
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-foreground">
            إدارة الدروس ({course.lessons.length})
          </h2>
          {isReordering && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              جاري إعادة الترتيب...
            </div>
          )}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          icon={Plus}
          onClick={handleCreateLesson}
          disabled={isCreating}
        >
          {isCreating ? 'جاري الإنشاء...' : 'إضافة درس جديد'}
        </Button>
      </div>

      {/* Lessons List */}
      <div className="space-y-3">
        {course.lessons
          .sort((a, b) => a.lessonOrder - b.lessonOrder)
          .map((lesson) => {
            const isExpanded = expandedLessonId === lesson.id
            const isDragging = draggedLessonId === lesson.id
            
            return (
              <div
                key={lesson.id}
                draggable
                onDragStart={() => handleDragStart(lesson.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, lesson.id)}
                className={`bg-background/50 rounded-xl border border-border transition-all duration-200 hover:border-primary/30 ${
                  isDragging ? 'opacity-50 scale-95' : ''
                } ${isReordering ? 'pointer-events-none' : 'cursor-move'}`}
              >
              
              {/* Lesson Header */}
              <div className="flex items-center gap-4 p-4">
                
                {/* Drag Handle */}
                <div 
                  className={`cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors ${
                    isReordering ? 'animate-pulse text-primary' : ''
                  }`}
                  title="اسحب لإعادة ترتيب الدروس"
                >
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
                      {lesson.vimeoId && (
                        <Video className="w-4 h-4 text-primary" />
                      )}
                      {lesson.articleContent && (
                        <FileText className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{lesson.durationInMinutes} دقيقة</span>
                    <span className={lesson.isFree ? 'text-premium' : 'text-muted-foreground'}>
                      {lesson.isFree ? 'مجاني' : 'مدفوع'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={ChevronDown}
                    className={`text-muted-foreground hover:text-foreground transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    onClick={() => toggleLessonExpansion(lesson.id)}
                  />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteLesson(lesson.id, lesson.title)}
                    disabled={deletingLessonId === lesson.id}
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
                        id={`lesson-title-${lesson.id}`}
                        defaultValue={lesson.title}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        المدة (دقيقة)
                      </label>
                      <input
                        type="number"
                        id={`lesson-duration-${lesson.id}`}
                        defaultValue={lesson.durationInMinutes}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  {/* Vimeo ID */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      معرف فيديو Vimeo (اختياري)
                    </label>
                    <input
                      type="text"
                      id={`lesson-vimeo-${lesson.id}`}
                      defaultValue={lesson.vimeoId || ''}
                      placeholder="290256877"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
                    />
                  </div>

                  {/* Article Content */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      محتوى المقال (Markdown)
                    </label>
                    <textarea
                      id={`lesson-article-${lesson.id}`}
                      defaultValue={lesson.articleContent || ''}
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
                        id={`lesson-free-${lesson.id}`}
                        defaultChecked={lesson.isFree}
                        className="w-4 h-4 text-primary rounded border-border focus:ring-primary/25"
                      />
                      <span className="text-sm text-muted-foreground">درس مجاني</span>
                    </label>

                    {/* Save Lesson Button */}
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Save}
                      className="px-4 py-2"
                      disabled={isSubmitting}
                      onClick={() => handleUpdateLesson(lesson.id)}
                    >
                      {isSubmitting ? 'جاري الحفظ...' : 'حفظ الدرس'}
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
            onClick={handleCreateLesson}
            disabled={isCreating}
          >
            {isCreating ? 'جاري الإنشاء...' : 'إضافة درس جديد'}
          </Button>
        </div>
      )}
    </div>
  )
}
