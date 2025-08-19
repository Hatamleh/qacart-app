'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface AdminRouteGuardProps {
  children: React.ReactNode
}

export const AdminRouteGuard = ({ children }: AdminRouteGuardProps) => {
  const { user, isLoading, isInitialized } = useAuth()
  const router = useRouter()

  // Handle redirects in useEffect to avoid render-time navigation
  useEffect(() => {
    if (!isInitialized || isLoading) return

    // Redirect to auth if not logged in
    if (!user) {
      const currentPath = window.location.pathname
      router.push(`/auth?redirect=${encodeURIComponent(currentPath)}`)
      return
    }

    // Redirect to home if not admin
    if (user.role !== 'sudo') {
      router.push('/?error=admin-required')
      return
    }
  }, [user, isLoading, isInitialized, router])

  // Wait for auth to initialize
  if (!isInitialized || isLoading) {
    return null // Show nothing while loading
  }

  // Block content if not logged in
  if (!user) {
    return null // Block content while redirecting
  }

  // Block content if not admin
  if (user.role !== 'sudo') {
    return null // Block content while redirecting
  }

  // User is admin - render the protected content
  return <>{children}</>
}
