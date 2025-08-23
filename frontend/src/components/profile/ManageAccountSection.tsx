'use client'

import { useState } from 'react'
import { Settings, FileText, Receipt, CreditCard, Crown, Loader2 } from 'lucide-react'
import { Button } from '../ui/Button'
import { StripeClient } from '@/clients'

export const ManageAccountSection = () => {
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Handle action clicks
  const handleActionClick = async (actionId: string) => {
    setLoadingAction(actionId)
    setError(null)

    try {
      switch (actionId) {
        case 'get-invoice':
        case 'get-receipt':
        case 'update-payment':
        case 'manage-subscription':
          // All these actions redirect to Stripe billing portal
          await StripeClient.redirectToBillingPortal()
          break
        default:
          console.warn('Unknown action:', actionId)
      }
    } catch (error) {
      console.error('Action error:', error)
      setError(error instanceof Error ? error.message : 'حدث خطأ غير متوقع')
      setLoadingAction(null)
    }
  }

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

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
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
                  onClick={() => handleActionClick(action.id)}
                  disabled={loadingAction !== null}
                >
                  {loadingAction === action.id ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري المعالجة...</span>
                    </div>
                  ) : (
                    action.id === 'manage-subscription' ? 'إدارة' : 'فتح'
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
