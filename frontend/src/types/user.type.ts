
export interface User {
  id: string
  email: string
  role: 'user' | 'sudo'
  subscription: Subscription
  createdAt: string
}

export interface Subscription {
  status: 'premium' | 'free'
  plan?: 'monthly' | 'quarterly' | 'yearly'
  nextBillingDate?: string
  isActive: boolean
  giftDetails?: GiftDetails
}

export interface GiftDetails {
  grantedAt: string
  expiresAt: string
  type: 'admin_gift'
}

export interface FirebaseUser {
  uid: string
  email: string | null
}


