'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Users, Crown, UserCheck, Gift, Search, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AdminUsersTable } from './AdminUsersTable'
import { getUsers, deleteUser as deleteUserAction, togglePremiumGift as togglePremiumGiftAction } from '@/actions'
import type { GetUsersResponse, User } from '@/types'

interface AdminUsersPageClientProps {
  initialData: GetUsersResponse
}

export const AdminUsersPageClient = ({ initialData }: AdminUsersPageClientProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [users, setUsers] = useState(initialData.users)
  const [total, setTotal] = useState(initialData.total)
  const [hasMore, setHasMore] = useState(initialData.hasMore)
  const [loadingMore, setLoadingMore] = useState(false)

  const currentFilter = (searchParams.get('filter') || 'all') as 'all' | 'premium' | 'free' | 'gifted'
  const currentSearch = searchParams.get('search') || ''
  const [searchInput, setSearchInput] = useState(currentSearch)

  // Calculate category counts from current users (for display purposes)
  const premiumCount = users.filter(u => u.subscription.status === 'premium').length
  const freeCount = users.filter(u => u.subscription.status === 'free').length  
  const giftedCount = users.filter(u => u.subscription.status === 'premium' && u.subscription.giftDetails != null).length

  // Action handlers
  const setFilter = (filter: 'all' | 'premium' | 'free' | 'gifted') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('filter', filter)
    params.delete('offset')
    router.push(`/sudo/users?${params.toString()}`)
  }

  const setSearch = (search: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    params.delete('offset')
    router.push(`/sudo/users?${params.toString()}`)
  }

  const loadMore = async () => {
    if (!hasMore || loadingMore) return

    setLoadingMore(true)
    try {
      const result = await getUsers({
        filter: currentFilter,
        search: currentSearch,
        offset: users.length,
        limit: 20
      })

      setUsers(prev => [...prev, ...result.users])
      setTotal(result.total)
      setHasMore(result.hasMore)
    } catch (error) {
      console.error('Error loading more users:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      await deleteUserAction(userId)
      setUsers(prev => prev.filter(u => u.id !== userId))
      setTotal(prev => prev - 1)
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }

  const togglePremiumGift = async (userId: string): Promise<{ action: 'granted' | 'revoked'; user: User }> => {
    try {
      const result = await togglePremiumGiftAction(userId)
      setUsers(prev => prev.map(u => u.id === userId ? result.user : u))
      return result
    } catch (error) {
      console.error('Error toggling premium gift:', error)
      throw error
    }
  }

  const refresh = () => {
    router.refresh()
  }

  // Handle search input submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput.trim())
  }

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchInput(value)
    // Auto-search on empty (to clear search)
    if (!value.trim() && currentSearch) {
      setSearch('')
    }
  }

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
          
          {/* Search and Refresh */}
          <div className="flex items-center gap-3">
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="البحث بالبريد أو معرف المستخدم..."
                  value={searchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-4 pr-10 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                />
              </div>
              <Button type="submit" size="sm" variant="outline">
                بحث
              </Button>
            </form>
            
            {/* Refresh Button */}
            <Button
              onClick={refresh}
              size="sm"
              variant="outline"
              icon={RotateCcw}
            >
              تحديث
            </Button>
          </div>
        </div>

        {/* Current View Info */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            عرض {users.length} من أصل {total} مستخدم
            {currentSearch && (
              <span className="mx-2">
                • البحث: &ldquo;{currentSearch}&rdquo;
              </span>
            )}
            {currentFilter !== 'all' && (
              <span className="mx-2">
                • التصفية: {currentFilter === 'premium' ? 'بريميوم' : currentFilter === 'free' ? 'مجاني' : 'هدايا'}
              </span>
            )}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Results */}
          <div className="glass rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي النتائج</p>
                <p className="text-xl font-bold text-foreground">{total}</p>
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

          {/* Gifted Users */}
          <div className="glass rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Gift className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">هدايا بريميوم</p>
                <p className="text-xl font-bold text-foreground">{giftedCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-medium text-muted-foreground ml-2">تصفية:</span>
          <Button
            variant={currentFilter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            الكل
          </Button>
          <Button
            variant={currentFilter === 'premium' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('premium')}
          >
            بريميوم
          </Button>
          <Button
            variant={currentFilter === 'free' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('free')}
          >
            مجاني
          </Button>
          <Button
            variant={currentFilter === 'gifted' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('gifted')}
          >
            هدايا
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <AdminUsersTable
        users={users}
        onDeleteUser={deleteUser}
        onTogglePremiumGift={togglePremiumGift}
      />

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-8 text-center">
          <Button
            onClick={loadMore}
            variant="outline"
            size="lg"
            disabled={loadingMore}
            className="min-w-[200px]"
          >
            {loadingMore ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                جارٍ التحميل...
              </>
            ) : (
              `تحميل المزيد (${total - users.length} متبقي)`
            )}
          </Button>
        </div>
      )}

      {/* No More Results */}
      {!hasMore && users.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            تم عرض جميع النتائج ({total} مستخدم)
          </p>
        </div>
      )}
    </>
  )
}
