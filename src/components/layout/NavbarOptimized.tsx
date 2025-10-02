import Link from 'next/link'
import Image from 'next/image'
import { NavbarLinks } from './NavbarLinks'
import { NavbarAuthSection } from './NavbarAuthSection'
import { MobileMenu } from './MobileMenu'

/**
 * Optimized Navbar - Hybrid approach
 *
 * Performance improvements:
 * 1. Server Component by default (no 'use client')
 * 2. Client Components only for interactive parts (auth, mobile menu)
 * 3. Static logo and structure render on server
 * 4. Reduced JavaScript bundle size
 * 5. Better SEO (navbar structure available immediately)
 */
export const Navbar = () => {
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

          {/* Desktop: Logo + Navigation Links */}
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

            {/* Navigation Links - Client Component */}
            <NavbarLinks />
          </div>

          {/* Desktop: Auth Section - Client Component */}
          <div className="hidden lg:block">
            <NavbarAuthSection />
          </div>

          {/* Mobile Menu - Client Component */}
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  )
}
