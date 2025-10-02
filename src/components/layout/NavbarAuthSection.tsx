'use client'

import { LogIn, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { useAuth } from '@/contexts/AuthContext'

export const NavbarAuthSection = () => {
  const { user, isLoading, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="flex items-center gap-3">
      {/* Profile Button */}
      {user && (
        <Link href="/profile">
          <Button
            variant="outline"
            size="sm"
            icon={User}
            iconPosition="left"
          >
            الملف الشخصي
          </Button>
        </Link>
      )}

      {/* Sign In / Sign Out */}
      {user ? (
        <Button
          variant="ghost"
          size="sm"
          icon={LogOut}
          iconPosition="left"
          onClick={handleSignOut}
          loading={isLoading}
        >
          تسجيل الخروج
        </Button>
      ) : (
        <Link href="/auth">
          <Button
            variant="primary"
            size="sm"
            icon={LogIn}
            iconPosition="left"
          >
            تسجيل الدخول
          </Button>
        </Link>
      )}
    </div>
  )
}
