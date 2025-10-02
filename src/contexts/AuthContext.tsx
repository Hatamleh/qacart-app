'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User as FirebaseAuthUser, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/client'
import { User } from '@/types'
import { createSession, logoutUser, deleteAccount as deleteAccountAction } from '@/actions/auth'

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
  refreshUser: () => Promise<void>
  deleteAccount: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthUser | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Listen to Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseAuthUser) => {
      setFirebaseUser(firebaseAuthUser)
      
      if (firebaseAuthUser) {
        // User just signed in - create session and get user data
        setIsLoading(true)
        try {
          const idToken = await firebaseAuthUser.getIdToken()
          const user = await createSession(idToken)
          setUser(user)
        } catch (error) {
          console.error('Error creating session:', error)
          setUser(null)
        } finally {
          setIsLoading(false)
        }
      } else {
        // User signed out - clear everything
        setUser(null)
      }
      
      setIsInitialized(true)
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      // Clear session cookie via Server Action first
      await logoutUser()

      // Sign out from Firebase (this triggers the auth state change)
      await signOut(auth)

      // State will be cleared by the auth state change listener
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const refreshUser = async () => {
    if (!firebaseUser) return

    setIsLoading(true)
    try {
      const idToken = await firebaseUser.getIdToken(true) // Force refresh
      const user = await createSession(idToken)
      setUser(user)
    } catch (error) {
      console.error('Error refreshing user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true)

      // Use Server Action to delete account
      await deleteAccountAction()

      // Account deleted successfully - clear state and redirect
      setUser(null)
      setFirebaseUser(null)

      // Force page reload to ensure clean state
      window.location.href = '/'
    } catch (error) {
      console.error('Error deleting account:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    firebaseUser,
    user,
    isLoading,
    isInitialized,
    signOut: handleSignOut,
    refreshUser,
    deleteAccount: handleDeleteAccount,
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
