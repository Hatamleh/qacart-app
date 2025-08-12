'use client'

import React, { useState, useEffect } from 'react'
import { LogIn, Menu, X, BookOpen } from 'lucide-react'
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

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsMenuOpen(!isMenuOpen)
    }

    const closeAll = () => {
        setIsMenuOpen(false)
    }

    return (
        <header className={`
      fixed top-0 left-0 right-0 z-50 duration-300
      border-b transition-colors
      ${isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md border-slate-800/50 shadow-xl'
            : 'bg-transparent backdrop-blur-sm border-transparent'
        }
    `}>
            <div className="relative">
                <nav className="flex items-center justify-between h-16 lg:h-20 px-4 lg:px-6 max-w-7xl mx-auto">

                    {/* Mobile Menu Toggle - Left */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden p-2 -ml-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-5 h-5 transition-transform duration-200" />
                        ) : (
                            <Menu className="w-5 h-5 transition-transform duration-200" />
                        )}
                    </button>

                    {/* Desktop Logo - Left */}
                    <div className="hidden lg:flex items-center">
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

                    {/* Desktop Navigation - Absolute Center */}
                    <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
                        <div className="flex items-center space-x-1">
                            <Link
                                href="/courses"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium text-sm"
                            >
                                <BookOpen className="w-4 h-4" />
                                الدورات
                            </Link>
                        </div>
                    </div>

                    {/* Auth Buttons - Desktop Right */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Button
                            variant="primary"
                            size="sm"
                            icon={LogIn}
                            iconPosition="left"
                        >
                            تسجيل الدخول
                        </Button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className={`
          lg:hidden absolute top-full left-0 right-0 
          bg-slate-900/98 backdrop-blur-md border-b border-slate-800/50
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

                        {/* Mobile Auth Button */}
                        <div className="pt-6 mt-6 border-t border-slate-800/50 space-y-3">
                            <Button
                                variant="primary"
                                size="md"
                                icon={LogIn}
                                iconPosition="left"
                                className="w-full"
                            >
                                تسجيل الدخول
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
