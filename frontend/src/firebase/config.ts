/**
 * Firebase Configuration
 * Handles environment variables and Firebase SDK configuration
 */

// Firebase Client Configuration (Public - safe for browser)
export const firebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional for analytics
}

// Firebase Admin Configuration (Private - server only)
export const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
}

// Validation function for environment variables
function validateEnvVars() {
  // Required client-side variables (browser)
  const requiredClientVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ]

  // Check client variables
  for (const varName of requiredClientVars) {
    if (!process.env[varName]) {
      throw new Error(`❌ Missing required environment variable: ${varName}`)
    }
  }

  // Required server-side variables (only check on server)
  if (typeof window === 'undefined') {
    const requiredServerVars = [
      'FIREBASE_PROJECT_ID',
      'FIREBASE_CLIENT_EMAIL',
      'FIREBASE_PRIVATE_KEY',
    ]

    for (const varName of requiredServerVars) {
      if (!process.env[varName]) {
        throw new Error(`❌ Missing required server environment variable: ${varName}`)
      }
    }
  }
}

// Run validation when this module is imported
validateEnvVars()

console.log('✅ Firebase configuration loaded successfully')
