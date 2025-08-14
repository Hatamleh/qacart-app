export interface User {
  id: string
  email: string
  subscription: Subscription
  createdAt: string
  preferences: UserPreferences
}

export interface AdminUser {
  id: string
  name: string
  email: string
  subscription: Subscription
  createdAt: string
  lastLogin: string
}

export interface Subscription {
  status: 'premium' | 'free' | 'expired'
  plan?: 'monthly' | 'quarterly' | 'yearly'
  nextBillingDate?: string
  isActive: boolean
}

export interface UserPreferences {
  language: string
  notifications: boolean
}

export interface FAQQuestion {
  id: string
  question: string
  answer: string
}

export interface UserData {
  user: User
}

export interface FAQData {
  faqQuestions: FAQQuestion[]
}
