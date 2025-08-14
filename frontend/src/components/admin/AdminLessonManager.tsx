import { Plus, GripVertical, Trash2, ChevronDown, Video, FileText, Save } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Course } from '@/types'

interface AdminLessonManagerProps {
  course: Course
}

export const AdminLessonManager = ({ course }: AdminLessonManagerProps) => {

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
        >
          إضافة درس جديد
        </Button>
      </div>

      {/* Lessons List */}
      <div className="space-y-3">
        {course.lessons.map((lesson) => {
          // Show first lesson expanded for demo
          const isExpanded = lesson.lessonOrder === 1
          
          return (
            <div
              key={lesson.id}
              className="bg-background/50 rounded-xl border border-border transition-all duration-200 hover:border-primary/30"
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
                    icon={ChevronDown}
                    className="text-muted-foreground hover:text-foreground"
                  />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
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
                        defaultValue={lesson.title}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        المدة (دقيقة)
                      </label>
                      <input
                        type="number"
                        defaultValue={lesson.durationInMinutes}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
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
          >
            إضافة درس جديد
          </Button>
        </div>
      )}
    </div>
  )
}
