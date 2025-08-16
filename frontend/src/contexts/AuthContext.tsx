'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User as FirebaseAuthUser, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/client'
import { User } from '@/types'

interface AuthContextType {
  // Firebase Auth User (client-side)
  firebaseUser: FirebaseAuthUser | null
  
  // Our App User (with subscription, role, etc.)
  user: User | null
  
  // Loading states
  isLoading: boolean
  isInitialized: boolean
  
  // Auth actions
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
  // Server-side user passed from layout
  initialUser?: User | null
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthUser | null>(null)
  const [user, setUser] = useState<User | null>(initialUser || null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Listen to Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseAuthUser) => {
      setFirebaseUser(firebaseAuthUser)
      
      if (firebaseAuthUser) {
        // User is signed in - fetch our app user data
        setIsLoading(true)
        try {
          // Get session cookie and our app user data via API
          const response = await fetch('/api/auth/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idToken: await firebaseAuthUser.getIdToken()
            })
          })
          
          if (response.ok) {
            const userData = await response.json()
            setUser(userData.user)
          } else {
            setUser(null)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          setUser(null)
        } finally {
          setIsLoading(false)
        }
      } else {
        // User is signed out
        setUser(null)
        setIsLoading(false)
      }
      
      setIsInitialized(true)
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth)
      
      // Clear session cookie via API
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      
      // Reset state
      setFirebaseUser(null)
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const value: AuthContextType = {
    firebaseUser,
    user,
    isLoading,
    isInitialized,
    signOut: handleSignOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Convenience hooks
export function useUser() {
  const { user } = useAuth()
  return user
}

export function useIsAuthenticated() {
  const { user } = useAuth()
  return user !== null
}

export function useIsPremium() {
  const { user } = useAuth()
  return user?.subscription.status === 'premium' && user?.subscription.isActive
}

export function useIsAdmin() {
  const { user } = useAuth()
  return user?.role === 'sudo'
}
