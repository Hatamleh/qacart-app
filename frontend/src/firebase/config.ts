/**
 * Firebase Configuration
 * Handles environment variables and Firebase SDK configuration
 */

// Firebase Client Configuration (Public - safe for browser)
export const firebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '', // Optional for analytics
}

// Firebase Admin Configuration (Private - server only)
export const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID || '',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
}

// Validate client config (only check required fields)
if (typeof window !== 'undefined') {
  // Client-side validation
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId']
  const missingFields = requiredFields.filter(field => !firebaseClientConfig[field as keyof typeof firebaseClientConfig])
  
  if (missingFields.length > 0) {
    console.error('❌ Missing Firebase client configuration:', missingFields)
    console.error('Current config:', firebaseClientConfig)
    throw new Error(`Missing Firebase client configuration: ${missingFields.join(', ')}`)
  }
}

console.log('✅ Firebase configuration loaded successfully')
