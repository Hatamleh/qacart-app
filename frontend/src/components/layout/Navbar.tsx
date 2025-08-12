'use client'

import React, { useState, useEffect } from 'react'
import { LogIn, Menu, X, BookOpen, Crown, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/Button'

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setIsMenuOpen(false)
        }
        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside)
            return () => document.removeEventListener('click', handleClickOutside)
        }
    }, [isMenuOpen])

    const closeAll = () => {
        setIsMenuOpen(false)
    }

    return (
        <header className={`
      fixed top-0 left-0 right-0 z-50 duration-300
      border-b transition-colors
      ${isScrolled
            ? 'bg-background/95 backdrop-blur-md border-border/50 shadow-xl'
            : 'bg-transparent backdrop-blur-sm border-transparent'
        }
    `}>
            <div className="relative">
                <nav className="flex items-center justify-between h-16 lg:h-20 px-4 lg:px-6 max-w-7xl mx-auto">

                    {/* Mobile Menu Toggle - Left */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 -ml-2 text-white/90 hover:text-white hover:bg-white/10"
                        icon={isMenuOpen ? X : Menu}
                    >
                    </Button>

                    {/* Logo + Navigation - Desktop Left */}
                    <div className="hidden lg:flex items-center gap-8">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center group"
                            onClick={closeAll}
                        >
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
                            <Link
                                href="/courses"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium text-sm"
                            >
                                <BookOpen className="w-4 h-4" />
                                الدورات
                            </Link>
                            
                            {/* Premium Plan - Standout */}
                            <Link
                                href="/premium"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-premium/20 border border-premium/30 text-premium hover:bg-premium/30 hover:border-premium/50 transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl"
                            >
                                <Crown className="w-4 h-4" />
                                بريميوم
                            </Link>
                        </div>
                    </div>

                    {/* Empty Space - Mobile Center */}
                    <div className="lg:hidden"></div>

                    {/* Mobile Logo - Right */}
                    <div className="lg:hidden flex items-center">
                        <Link
                            href="/"
                            className="flex items-center group"
                            onClick={closeAll}
                        >
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

                    {/* Auth Buttons - Desktop Right */}
                    <div className="hidden lg:flex items-center gap-3">
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
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className={`
          lg:hidden absolute top-full left-0 right-0 
          bg-background/98 backdrop-blur-md border-b border-border/50
          transition-all duration-300 overflow-hidden
          ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}>
                    <div className="px-4 py-6 space-y-2">

                        {/* Mobile Courses Link */}
                        <Link
                            href="/courses"
                            onClick={closeAll}
                            className="flex items-center gap-3 p-4 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                        >
                            <BookOpen className="w-5 h-5" />
                            الدورات
                        </Link>
                        
                        {/* Premium Plan - Mobile */}
                        <Link
                            href="/premium"
                            onClick={closeAll}
                            className="flex items-center gap-3 p-4 rounded-xl bg-premium/20 border border-premium/30 text-premium hover:bg-premium/30 hover:border-premium/50 transition-all duration-200 font-semibold"
                        >
                            <Crown className="w-5 h-5" />
                            بريميوم
                        </Link>

                        {/* Mobile Auth Buttons */}
                        <div className="pt-6 mt-6 border-t border-border/50 space-y-3">
                            <Link href="/profile" onClick={closeAll}>
                                <Button
                                    variant="outline"
                                    size="md"
                                    icon={User}
                                    iconPosition="left"
                                    className="w-full"
                                >
                                    الملف الشخصي
                                </Button>
                            </Link>
                            
                            <Link href="/auth" onClick={closeAll}>
                                <Button
                                    variant="primary"
                                    size="md"
                                    icon={LogIn}
                                    iconPosition="left"
                                    className="w-full"
                                >
                                    تسجيل الدخول
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
