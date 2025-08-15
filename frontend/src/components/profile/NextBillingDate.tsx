import { Calendar } from 'lucide-react'
import { User } from '@/types'

interface NextBillingDateProps {
  user: User
}

export const NextBillingDate = ({ user }: NextBillingDateProps) => {
  // Only render if user is premium and has a next billing date
  if (user.subscription.status !== 'premium' || !user.subscription.nextBillingDate) {
    return null
  }

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
