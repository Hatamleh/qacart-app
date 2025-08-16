'use client'

import React from 'react'
import { LogIn, BookOpen, Crown, User, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/Button'
import { useAuth } from '@/contexts/AuthContext'

export const Navbar = () => {
    const { user, isLoading, isInitialized, signOut } = useAuth()

    // Helper functions to determine what to show based on user state
    const showSignIn = !user
    const showProfile = !!user
    const showAdminLinks = user?.role === 'sudo'
    const isPremium = (user?.subscription.status === 'premium' && user?.subscription.isActive) || user?.role === 'sudo'

    // Handle logout
    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    // Show skeleton while auth is initializing
    if (!isInitialized) {
        return (
            <header className="fixed top-0 left-0 right-0 z-50 duration-300 border-b transition-colors bg-background/95 backdrop-blur-md border-border/50 shadow-xl">
                <div className="relative">
                    <nav className="flex items-center justify-between h-16 lg:h-20 px-4 lg:px-6 max-w-7xl mx-auto">
                        {/* Logo */}
                        <Link href="/" className="flex items-center group">
                            <div className="relative w-12 lg:w-14 h-12 lg:h-14">
                                <Image
                                    src="/qacart-logo.svg"
                                    alt="QAcart Logo"
                                    width={56}
                                    height={56}
                                    className="w-full h-full transition-transform duration-200 group-hover:scale-105"
                                    priority
                                />
                            </div>
                        </Link>
                        
                        {/* Loading skeleton */}
                        <div className="hidden lg:flex items-center gap-3">
                            <div className="h-8 w-20 bg-muted/20 rounded-xl animate-pulse"></div>
                            <div className="h-8 w-24 bg-muted/20 rounded-xl animate-pulse"></div>
                        </div>
                    </nav>
                </div>
            </header>
        )
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 duration-300 border-b transition-colors bg-background/95 backdrop-blur-md border-border/50 shadow-xl">
            <div className="relative">
                <nav className="flex items-center justify-between h-16 lg:h-20 px-4 lg:px-6 max-w-7xl mx-auto">

                    {/* Mobile Logo - Left */}
                    <div className="lg:hidden flex items-center">
                        <Link href="/" className="flex items-center group">
                            <div className="relative w-12 h-12">
                                <Image
                                    src="/qacart-logo.svg"
                                    alt="QAcart Logo"
                                    width={48}
                                    height={48}
                                    className="w-full h-full transition-transform duration-200 group-hover:scale-105"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Logo + Navigation - Desktop Left */}
                    <div className="hidden lg:flex items-center gap-8">
                        {/* Logo */}
                        <Link href="/" className="flex items-center group">
                            <div className="relative w-14 h-14">
                                <Image
                                    src="/qacart-logo.svg"
                                    alt="QAcart Logo"
                                    width={56}
                                    height={56}
                                    className="w-full h-full transition-transform duration-200 group-hover:scale-105"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Navigation Items */}
                        <div className="flex items-center space-x-2">
                            {/* Courses Link - Always visible */}
                            <Link
                                href="/courses"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium text-sm"
                            >
                                <BookOpen className="w-4 h-4" />
                                الدورات
                            </Link>
                            
                            {/* Admin Links - Only for sudo users */}
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
                            
                            {/* Premium Button - Dynamic based on user state */}
                            {isPremium ? (
                                // Premium Active - No link, just indicator
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-premium/20 border border-premium/30 text-premium font-semibold text-sm shadow-lg cursor-default">
                                    <Crown className="w-4 h-4" />
                                    بريميوم مُفعّل
                                </div>
                            ) : (
                                // Not premium - Link to premium page
                                <Link
                                    href="/premium"
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-premium/20 border border-premium/30 text-premium hover:bg-premium/30 hover:border-premium/50 transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl"
                                >
                                    <Crown className="w-4 h-4" />
                                    {user ? 'اشترك في بريميوم' : 'بريميوم'}
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Auth Buttons - Desktop Right */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Show Profile if user is logged in */}
                        {showProfile && (
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
                        
                        {/* Show Sign In or Sign Out based on auth state */}
                        {showSignIn ? (
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
                        ) : (
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
                        )}
                    </div>

                    {/* Mobile Menu Icon Placeholder */}
                    <div className="lg:hidden">
                        {/* Future: Mobile menu implementation */}
                    </div>
                </nav>
            </div>
        </header>
    )
}