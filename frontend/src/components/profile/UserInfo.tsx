import { Mail, LogOut, User as UserIcon } from 'lucide-react'
import { Button } from '../ui/Button'
import { User } from '@/types'
import { SubscriptionStatus } from './SubscriptionStatus'
import { NextBillingDate } from './NextBillingDate'

interface UserInfoProps {
  user: User
}

export const UserInfo = ({ user }: UserInfoProps) => {

  return (
    <div className="bg-primary/10 backdrop-blur-md rounded-2xl p-8 border border-primary/20 shadow-xl mb-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <UserIcon className="w-6 h-6 text-primary" />
        معلومات المستخدم
      </h2>
      
      <div className="space-y-6">
        {/* User ID */}
        <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">#</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">معرف المستخدم</p>
              <p className="font-semibold">{user.id}</p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
              <p className="font-semibold">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Subscription Status */}
        <SubscriptionStatus user={user} />

        {/* Next Billing Date (if premium) */}
        <NextBillingDate user={user} />

        {/* Sign Out Button */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            icon={LogOut}
            iconPosition="right"
            className="w-full"
          >
            تسجيل الخروج
          </Button>
        </div>
      </div>
    </div>
  )
}
