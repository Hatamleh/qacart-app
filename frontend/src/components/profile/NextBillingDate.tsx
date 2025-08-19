import { Calendar } from 'lucide-react'
import { User } from '@/types'
import { formatDate } from '@/lib'

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

  // For paid users, show next billing date
  if (user.subscription.status === 'premium' && user.subscription.nextBillingDate) {
    return (
      <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">تاريخ الفوترة التالي</p>
            <p className="font-semibold">{user.subscription.nextBillingDate}</p>
          </div>
        </div>
      </div>
    )
  }

  // Don't render if no relevant date info
  return null
}
