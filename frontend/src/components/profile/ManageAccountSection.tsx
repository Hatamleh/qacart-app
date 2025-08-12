import { Settings, FileText, Receipt, CreditCard, Crown } from 'lucide-react'
import { Button } from '../ui/Button'

export const ManageAccountSection = () => {
  const actions = [
    {
      id: 'get-invoice',
      title: 'الحصول على فاتورة',
      description: 'تحميل فاتورة الاشتراك الحالي',
      icon: FileText
    },
    {
      id: 'get-receipt',
      title: 'الحصول على إيصال',
      description: 'تحميل إيصال آخر دفعة',
      icon: Receipt
    },
    {
      id: 'update-payment',
      title: 'تحديث طريقة الدفع',
      description: 'تغيير بطاقة الائتمان أو طريقة الدفع',
      icon: CreditCard
    },
    {
      id: 'manage-subscription',
      title: 'إدارة الاشتراك',
      description: 'تغيير أو إلغاء اشتراكك الحالي',
      icon: Crown
    }
  ]

  return (
    <div className="bg-primary/10 backdrop-blur-md rounded-2xl p-8 border border-primary/20 shadow-xl mb-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Settings className="w-6 h-6 text-primary" />
        إدارة الحساب
      </h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        {actions.map((action) => (
          <div
            key={action.id}
            className="p-4 bg-background/50 rounded-xl hover:bg-background/70 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <action.icon className="w-6 h-6 text-primary" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {action.description}
                </p>
                
                <Button
                  variant="outline"
                  size="sm"
                >
                  {action.id === 'manage-subscription' ? 'إدارة' : 'تحميل'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
