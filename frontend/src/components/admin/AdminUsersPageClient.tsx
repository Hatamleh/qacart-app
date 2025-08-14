import { Users, Crown, UserCheck, Filter } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AdminUsersTable } from './AdminUsersTable'
import { User } from '@/types'

interface AdminUsersPageClientProps {
  users: User[]
}

export const AdminUsersPageClient = ({ users }: AdminUsersPageClientProps) => {

  // Filter users based on selected filter (all for design-first)
  const filteredUsers = users

  // Get filter counts
  const premiumCount = users.filter(u => u.subscription.status === 'premium').length
  const freeCount = users.filter(u => u.subscription.status === 'free').length
  const expiredCount = 0 // No expired status in simplified model

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              إدارة المستخدمين
            </h1>
            <p className="text-muted-foreground">
              عرض وإدارة جميع المستخدمين واشتراكاتهم
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Users */}
          <div className="glass rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المستخدمين</p>
                <p className="text-xl font-bold text-foreground">{users.length}</p>
              </div>
            </div>
          </div>

          {/* Premium Users */}
          <div className="glass rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-premium/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-premium" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">مستخدمون بريميوم</p>
                <p className="text-xl font-bold text-foreground">{premiumCount}</p>
              </div>
            </div>
          </div>

          {/* Free Users */}
          <div className="glass rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">مستخدمون مجانيون</p>
                <p className="text-xl font-bold text-foreground">{freeCount}</p>
              </div>
            </div>
          </div>

          {/* Expired Users */}
          <div className="glass rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Filter className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">اشتراكات منتهية</p>
                <p className="text-xl font-bold text-foreground">{expiredCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-medium text-muted-foreground ml-2">تصفية:</span>
          <Button
            variant="primary"
            size="sm"
          >
            الكل ({users.length})
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            بريميوم ({premiumCount})
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            مجاني ({freeCount})
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            منتهي ({expiredCount})
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <AdminUsersTable
        users={filteredUsers}
      />
    </>
  )
}
