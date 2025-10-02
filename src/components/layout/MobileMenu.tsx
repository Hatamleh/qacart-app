'use client'

import { useState, useMemo } from 'react'
import { Menu, X, BookOpen, Crown, Settings, User, LogIn, LogOut } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { useAuth, useIsPremium } from '@/contexts/AuthContext'

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isLoading, signOut } = useAuth()
  const isPremium = useIsPremium()

  const showAdminLinks = useMemo(() => user?.role === 'sudo', [user?.role])

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsOpen(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Hamburger Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 border-t border-border bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {/* Courses */}
            <Link
              href="/courses"
              onClick={closeMenu}
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>الدورات</span>
            </Link>

            {/* Admin Links */}
            {showAdminLinks && (
              <>
                <Link
                  href="/sudo/courses"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>إدارة الدورات</span>
                </Link>
                <Link
                  href="/sudo/users"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>إدارة المستخدمين</span>
                </Link>
              </>
            )}

            {/* Premium */}
            {isPremium ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-premium/20 border border-premium/30 text-premium">
                <Crown className="w-5 h-5" />
                <span>بريميوم مُفعّل</span>
              </div>
            ) : (
              <Link
                href="/premium"
                onClick={closeMenu}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-premium/20 border border-premium/30 text-premium hover:bg-premium/30"
              >
                <Crown className="w-5 h-5" />
                <span>{user ? 'اشترك في بريميوم' : 'بريميوم'}</span>
              </Link>
            )}

            {/* Divider */}
            <div className="border-t border-border my-2"></div>

            {/* Profile */}
            {user && (
              <Link
                href="/profile"
                onClick={closeMenu}
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <User className="w-5 h-5" />
                <span>الملف الشخصي</span>
              </Link>
            )}

            {/* Auth */}
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                icon={LogOut}
                iconPosition="left"
                onClick={handleSignOut}
                loading={isLoading}
                className="w-full"
              >
                تسجيل الخروج
              </Button>
            ) : (
              <Link href="/auth" onClick={closeMenu} className="block">
                <Button variant="primary" size="sm" icon={LogIn} iconPosition="left" className="w-full">
                  تسجيل الدخول
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}
