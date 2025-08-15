import { Crown } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { User } from '@/types'

interface SubscriptionStatusProps {
  user: User
}

export const SubscriptionStatus = ({ user }: SubscriptionStatusProps) => {
  const getSubscriptionStatusText = (status: string) => {
    switch (status) {
      case 'premium':
        return 'عضوية بريميوم'
      case 'free':
        return 'عضوية مجانية'
      default:
        return 'غير محدد'
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
          <Crown className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">حالة الاشتراك</p>
          <div className="flex items-center gap-3">
            <p className="font-semibold">{getSubscriptionStatusText(user.subscription.status)}</p>
            <Badge variant="primary">
              {user.subscription.status === 'premium' ? 'بريميوم' : 'مجاني'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
