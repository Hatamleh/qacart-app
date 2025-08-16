/**
 * Firebase Client SDK Configuration
 * Used for client-side authentication and real-time features in React components
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { firebaseClientConfig } from './config'

// Initialize Firebase Client App (singleton pattern)
let app: FirebaseApp

if (getApps().length === 0) {
  app = initializeApp(firebaseClientConfig)
} else {
  app = getApps()[0]
}

// Initialize Firebase services
export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)

// Configure Auth settings
auth.languageCode = 'ar' // Set Arabic language for Firebase Auth UI

console.log('✅ Firebase Client SDK initialized successfully')

export default app
