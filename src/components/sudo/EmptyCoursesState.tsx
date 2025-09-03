import { Clock } from 'lucide-react'

export const EmptyCoursesState = () => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
        <Clock className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        لا توجد دورات
      </h3>
      <p className="text-muted-foreground">
        ابدأ بإضافة أول دورة لك
      </p>
    </div>
  )
}
