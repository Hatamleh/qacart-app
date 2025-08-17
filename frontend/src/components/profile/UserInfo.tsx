import { Mail, LogOut, User as UserIcon, Crown, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { User } from '@/types'
import { NextBillingDate } from './NextBillingDate'
import Link from 'next/link'

interface UserInfoProps {
  user: User
}

export const UserInfo = ({ user }: UserInfoProps) => {
  // Check if user has active premium subscription
  const isPremium = user.subscription.status === 'premium' && user.subscription.isActive

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

        {/* Conditional Subscription Display */}
        {isPremium ? (
          /* Premium User - Show subscription status and billing date */
          <>
            {/* Subscription Status */}
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-premium/20 rounded-lg flex items-center justify-center">
                  <Crown className="w-5 h-5 text-premium" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">حالة الاشتراك</p>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold">عضوية بريميوم</p>
                    <Badge variant="primary">
                      بريميوم مُفعّل
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Billing Date */}
            <NextBillingDate user={user} />
          </>
        ) : (
          /* Free User - Show upgrade option */
          <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted/20 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">حالة الاشتراك</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold">اشتراك بريميوم غير مُفعّل</p>
                    <Badge variant="secondary">
                      مجاني
                    </Badge>
                  </div>
                  {/* Upgrade Button */}
                  <Link href="/premium">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={ArrowRight}
                      iconPosition="left"
                      className="mr-4"
                    >
                      ترقية إلى بريميوم
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

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
