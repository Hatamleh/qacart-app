'use client'

import { useState } from 'react'
import { Settings, CreditCard, Loader2 } from 'lucide-react'
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
        case 'manage-billing':
          // Redirect to Stripe billing portal for all billing management
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



  return (
    <div className="bg-primary/10 backdrop-blur-md rounded-2xl p-8 border border-primary/20 shadow-xl mb-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Settings className="w-6 h-6 text-primary" />
        إدارة الحساب
      </h2>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}
      
      {/* Beautiful Billing Management Card */}
      <div className="p-6 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/30 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-1">إدارة الفوترة والاشتراك</h3>
              <p className="text-sm text-muted-foreground">
                الفواتير، طرق الدفع، وإعدادات الاشتراك
              </p>
            </div>
          </div>
          
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleActionClick('manage-billing')}
            disabled={loadingAction !== null}
            className="px-6 py-3 rounded-xl hover:!scale-100 hover:!transform-none"
          >
            {loadingAction === 'manage-billing' ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جاري الفتح...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>فتح لوحة التحكم</span>
                <Settings className="w-4 h-4" />
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
