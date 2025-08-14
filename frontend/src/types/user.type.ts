
export interface User {
  id: string
  email: string
  subscription: Subscription
  createdAt: string
  lastLogin?: string
}

export interface Subscription {
  status: 'premium' | 'free'
  plan?: 'monthly' | 'quarterly' | 'yearly'
  nextBillingDate?: string
  isActive: boolean
}


