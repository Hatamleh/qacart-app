'use client'

import { BookOpen, Crown, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { useAuth, useIsPremium } from '@/contexts/AuthContext'
import { useMemo } from 'react'

export const NavbarLinks = () => {
  const { user } = useAuth()
  const isPremium = useIsPremium()

  // Memoize computed values
  const showAdminLinks = useMemo(() => user?.role === 'sudo', [user?.role])

  return (
    <div className="flex items-center space-x-2">
      {/* Courses Link */}
      <Link
        href="/courses"
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium text-sm"
      >
        <BookOpen className="w-4 h-4" />
        الدورات
      </Link>

      {/* Admin Links */}
      {showAdminLinks && (
        <>
          <Link
            href="/sudo/courses"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium text-sm"
          >
            <Settings className="w-4 h-4" />
            إدارة الدورات
          </Link>

          <Link
            href="/sudo/users"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium text-sm"
          >
            <User className="w-4 h-4" />
            إدارة المستخدمين
          </Link>
        </>
      )}

      {/* Premium Badge/Link */}
      {isPremium ? (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-premium/20 border border-premium/30 text-premium font-semibold text-sm shadow-lg cursor-default">
          <Crown className="w-4 h-4" />
          بريميوم مُفعّل
        </div>
      ) : (
        <Link
          href="/premium"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-premium/20 border border-premium/30 text-premium hover:bg-premium/30 hover:border-premium/50 transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl"
        >
          <Crown className="w-4 h-4" />
          {user ? 'اشترك في بريميوم' : 'بريميوم'}
        </Link>
      )}
    </div>
  )
}
