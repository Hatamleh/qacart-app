
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
}


