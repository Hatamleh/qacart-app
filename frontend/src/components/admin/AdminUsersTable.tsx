import { Trash2, Clock, Crown, Gift, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { User as UserType } from '@/types'

interface AdminUsersTableProps {
  users: UserType[]
}

export const AdminUsersTable = ({ users }: AdminUsersTableProps) => {
  // Get subscription status display info
  const getSubscriptionDisplay = (user: UserType) => {
    const { subscription } = user
    
    switch (subscription.status) {
      case 'premium':
        return {
          text: 'بريميوم',
          className: 'text-premium bg-premium/10 border-premium/20',
          icon: Crown
        }
      case 'free':
        return {
          text: 'مجاني',
          className: 'text-muted-foreground bg-muted/30 border-border',
          icon: User
        }
      default:
        return {
          text: 'غير محدد',
          className: 'text-muted-foreground bg-muted/30 border-border',
          icon: User
        }
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return dateString // Just return the original date string to avoid hydration mismatch
  }

  return (
    <div className="space-y-6">
      {/* Table Header */}
      <div className="bg-muted/30 rounded-xl p-4">
        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-muted-foreground">
          <div className="col-span-3">المستخدم</div>
          <div className="col-span-2 text-center">حالة الاشتراك</div>
          <div className="col-span-2 text-center">تاريخ التسجيل</div>
          <div className="col-span-2 text-center">آخر دخول</div>
          <div className="col-span-2 text-center">منح بريميوم</div>
          <div className="col-span-1 text-center">حذف</div>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-3">
        {users.map((user) => {
          const subscriptionInfo = getSubscriptionDisplay(user)
          const StatusIcon = subscriptionInfo.icon
          
          return (
            <div
              key={user.id}
              className="glass rounded-xl p-4 border border-border hover:border-primary/30 transition-all duration-200"
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                
                {/* User Info */}
                <div className="col-span-3">
                  <div className="flex items-center gap-3">
                    {/* User Avatar */}
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    
                    {/* User Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm mb-1 truncate">
                        {user.email}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subscription Status */}
                <div className="col-span-2 text-center">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-medium ${subscriptionInfo.className}`}>
                    <StatusIcon className="w-3 h-3" />
                    <span>{subscriptionInfo.text}</span>
                  </div>
                  {user.subscription.status === 'premium' && user.subscription.plan && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {user.subscription.plan === 'monthly' && 'شهري'}
                      {user.subscription.plan === 'quarterly' && 'ربع سنوي'}
                      {user.subscription.plan === 'yearly' && 'سنوي'}
                    </div>
                  )}
                </div>

                {/* Registration Date */}
                <div className="col-span-2 text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(user.createdAt)}</span>
                  </div>
                </div>

                {/* Last Login */}
                <div className="col-span-2 text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(user.lastLogin)}</span>
                  </div>
                </div>

                {/* Assign Premium Column */}
                <div className="col-span-2">
                  <div className="flex items-center justify-center">
                    {user.subscription.status !== 'premium' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Gift}
                        className="text-xs px-3 py-2 text-premium hover:text-premium border-premium/30 hover:bg-premium/10"
                      >
                        منح بريميوم
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
                        مشترك بالفعل
                      </span>
                    )}
                  </div>
                </div>

                {/* Delete Column */}
                <div className="col-span-1">
                  <div className="flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      className="text-xs px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      حذف
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            لا يوجد مستخدمون
          </h3>
          <p className="text-muted-foreground">
            لم يتم العثور على أي مستخدمين في النظام
          </p>
        </div>
      )}
    </div>
  )
}
