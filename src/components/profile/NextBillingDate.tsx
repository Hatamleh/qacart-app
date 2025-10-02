'use client'

import { Calendar } from 'lucide-react'
import { User } from '@/types'
import { formatDate } from '@/lib'
import { createBillingPortalSession } from '@/actions'

interface NextBillingDateProps {
  user: User
}

export const NextBillingDate = ({ user }: NextBillingDateProps) => {
  // Check if user is gifted
  const isGifted = user.subscription.giftDetails != null
  
  // For gifted users, show gift expiry date
  if (isGifted && user.subscription.giftDetails?.expiresAt) {

    return (
      <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-pink-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">تاريخ انتهاء الهدية</p>
            <p className="font-semibold">{formatDate(user.subscription.giftDetails.expiresAt)}</p>
          </div>
        </div>
      </div>
    )
  }

  // For paid users, show billing information with better messaging
  if (user.subscription.status === 'premium' && user.subscription.nextBillingDate) {
    const { stripeCancelAtPeriodEnd, stripeCurrentPeriodEnd } = user.subscription
    
    // If subscription is cancelled, show cancellation info
    if (stripeCancelAtPeriodEnd && stripeCurrentPeriodEnd) {
      const endDate = formatDate(stripeCurrentPeriodEnd)
      return (
        <div className="relative p-4 bg-background/95 border border-destructive/20 rounded-xl backdrop-blur-sm overflow-hidden">
          {/* Subtle danger gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/[0.02] via-transparent to-destructive/[0.04] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-destructive/30 to-transparent" />
          
          <div className="relative flex items-start gap-3">
            <div className="w-10 h-10 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-destructive mb-1">تم إلغاء الاشتراك</p>
              <p className="text-sm text-muted-foreground mb-2">
                ستحتفظ بالوصول للمحتوى المتقدم حتى <span className="font-semibold text-foreground">{endDate}</span>
              </p>
              <p className="text-xs text-muted-foreground/70 mb-3">
                بعد هذا التاريخ، ستعود لعضوية مجانية مع الوصول للمحتوى الأساسي فقط
              </p>
              <button
                onClick={async () => {
                  try {
                    const { url } = await createBillingPortalSession(window.location.href)
                    window.location.href = url
                  } catch (error) {
                    console.error('Error opening billing portal:', error)
                  }
                }}
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 hover:bg-primary/5 px-2 py-1 rounded-md transition-all duration-200 underline decoration-primary/30 hover:decoration-primary/60"
              >
                إعادة تفعيل الاشتراك ←
              </button>
            </div>
          </div>
        </div>
      )
    }
    
    // Active subscription - show renewal info with management options
    return (
      <div className="relative p-4 bg-background/95 border border-primary/20 rounded-xl backdrop-blur-sm overflow-hidden">
        {/* Subtle success gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.04] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="relative flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-primary mb-1">اشتراك نشط</p>
            <p className="text-sm text-muted-foreground mb-3">
              اشتراكك نشط حتى <span className="font-semibold text-foreground">{formatDate(user.subscription.nextBillingDate)}</span>
            </p>
            <button
              onClick={async () => {
                try {
                  const { url } = await createBillingPortalSession(window.location.href)
                  window.location.href = url
                } catch (error) {
                  console.error('Error opening billing portal:', error)
                }
              }}
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 hover:bg-primary/5 px-2 py-1 rounded-md transition-all duration-200 underline decoration-primary/30 hover:decoration-primary/60"
            >
              إدارة الاشتراك والفوترة ←
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Don't render if no relevant date info
  return null
}
