
import Stripe from 'stripe'

export interface User {
  id: string
  email: string
  role: 'user' | 'sudo'
  subscription: Subscription
  createdAt: string
  
  // Stripe integration fields
  stripeCustomerId?: string    // Stripe Customer ID (cus_xxx) - created when user first subscribes
}

export interface Subscription {
  status: 'premium' | 'free'
  plan?: 'monthly' | 'quarterly' | 'yearly'
  nextBillingDate?: string
  isActive: boolean
  giftDetails?: GiftDetails
  
  // Stripe integration fields
  stripeSubscriptionId?: string       // Stripe Subscription ID (sub_xxx) - for active subscriptions
  stripeStatus?: StripeSubscriptionStatus  // Real-time status from Stripe webhooks
  stripePriceId?: string             // Current Stripe Price ID being billed
  stripeCurrentPeriodEnd?: string    // When current billing period ends (ISO string)
  stripeCancelAtPeriodEnd?: boolean  // Whether subscription will cancel at period end
}

export interface GiftDetails {
  grantedAt: string
  expiresAt: string
  type: 'admin_gift'
}

// Stripe subscription status (super simple!)
export type StripeSubscriptionStatus = 'active'  // If it exists, user has access ✅

export interface FirebaseUser {
  uid: string
  email: string | null
}

// Enhanced user query parameters for admin APIs
export interface GetUsersParams {
  filter?: 'all' | 'premium' | 'free' | 'gifted'
  limit?: number
  offset?: number
  search?: string
}

// Enhanced user query response for admin APIs
export interface GetUsersResponse {
  users: User[]
  total: number
  hasMore: boolean
  currentFilter: string
  currentSearch: string
}

// Stripe customer creation data
export interface StripeCustomerData {
  email: string
  name?: string
  metadata?: {
    firebaseUid: string
    [key: string]: string
  }
}

// Stripe subscription sync data (from webhooks)
export interface StripeSubscriptionSync {
  subscriptionId: string
  customerId: string
  status?: StripeSubscriptionStatus  // Optional - only set if active
  priceId: string
}

// Webhook-specific types for handling Stripe invoice data
export interface StripeInvoiceWithSubscription extends Stripe.Invoice {
  subscription?: string | { id: string }  // Can be string ID or object with ID
}

// Subscription update data structure for Firebase
export interface SubscriptionUpdateData {
  status: 'premium' | 'free'
  isActive: boolean
  stripeSubscriptionId: string
  stripePriceId: string
  plan?: 'monthly' | 'quarterly' | 'yearly'
  nextBillingDate?: string
  stripeStatus?: StripeSubscriptionStatus
}

// User update structure for webhook operations
export interface UserSubscriptionUpdate {
  subscription: SubscriptionUpdateData
}

