'use client'

import { useState } from 'react'
import { Users, Crown, UserCheck, Filter } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AdminUsersTable } from './AdminUsersTable'
import { AdminUser } from '@/types/profile'

interface AdminUsersPageClientProps {
  users: AdminUser[]
}

export const AdminUsersPageClient = ({ users: initialUsers }: AdminUsersPageClientProps) => {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers)
  const [filter, setFilter] = useState<'all' | 'premium' | 'free' | 'expired'>('all')

  // Filter users based on selected filter
  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true
    return user.subscription.status === filter
  })

  // Handle delete user
  const handleDeleteUser = (userId: string, userName: string) => {
    if (confirm(`هل أنت متأكد من حذف المستخدم "${userName}"؟`)) {
      setUsers(prev => prev.filter(user => user.id !== userId))
      alert(`تم حذف المستخدم: ${userName}`)
    }
  }

  // Handle assign premium
  const handleAssignPremium = (userId: string, userName: string) => {
    if (confirm(`هل تريد منح اشتراك بريميوم للمستخدم "${userName}"؟`)) {
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? {
              ...user,
              subscription: {
                ...user.subscription,
                status: 'premium' as const,
                plan: 'yearly',
                nextBillingDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                isActive: true
              }
            }
          : user
      ))
      alert(`تم منح اشتراك بريميوم للمستخدم: ${userName}`)
    }
  }

  // Get filter counts
  const premiumCount = users.filter(u => u.subscription.status === 'premium').length
  const freeCount = users.filter(u => u.subscription.status === 'free').length
  const expiredCount = users.filter(u => u.subscription.status === 'expired').length

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
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            الكل ({users.length})
          </Button>
          <Button
            variant={filter === 'premium' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('premium')}
          >
            بريميوم ({premiumCount})
          </Button>
          <Button
            variant={filter === 'free' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('free')}
          >
            مجاني ({freeCount})
          </Button>
          <Button
            variant={filter === 'expired' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('expired')}
          >
            منتهي ({expiredCount})
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <AdminUsersTable 
        users={filteredUsers}
        onDeleteUser={handleDeleteUser}
        onAssignPremium={handleAssignPremium}
      />
    </>
  )
}
