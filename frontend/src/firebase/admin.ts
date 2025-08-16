/**
 * Firebase Admin SDK Configuration
 * Used for server-side operations (API routes, server components)
 * Provides elevated privileges for secure operations
 */

import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { firebaseAdminConfig } from './config'

// Initialize Firebase Admin App (singleton pattern)
let adminApp: App

if (getApps().length === 0) {
  adminApp = initializeApp({
    credential: cert({
      projectId: firebaseAdminConfig.projectId,
      clientEmail: firebaseAdminConfig.clientEmail,
      privateKey: firebaseAdminConfig.privateKey,
    }),
    projectId: firebaseAdminConfig.projectId,
  })
} else {
  adminApp = getApps()[0]
}

// Initialize Firebase Admin services
export const adminAuth: Auth = getAuth(adminApp)
export const adminDb: Firestore = getFirestore(adminApp)

// Export the admin app instance
export const admin = {
  app: adminApp,
  auth: () => adminAuth,
  firestore: () => adminDb,
}

console.log('✅ Firebase Admin SDK initialized successfully')

export default admin
