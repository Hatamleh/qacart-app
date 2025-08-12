import { AlertTriangle, Trash2 } from 'lucide-react'
import { Button } from '../ui/Button'

export const DangerZoneSection = () => {

  return (
    <div className="bg-primary/10 backdrop-blur-md rounded-2xl p-8 border border-primary/20 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-primary">
        <AlertTriangle className="w-6 h-6" />
        المنطقة الخطيرة
      </h2>
      
      <div className="space-y-6">
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
          <p className="text-muted-foreground leading-relaxed mb-4">
            وفقاً لقانون GDPR، استخدم هذا الزر لحذف حسابك ومسح جميع البيانات من خوادمنا نهائياً.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-primary">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-semibold">هذا الإجراء لا يمكن التراجع عنه</span>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button
            variant="outline"
            icon={Trash2}
            iconPosition="right"
            className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
          >
            حذف الحساب
          </Button>
        </div>
      </div>
    </div>
  )
}
