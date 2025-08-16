
import { User } from '@/types'

export const usersData: User[] = [
  {
    id: "user_12345abc",
    email: "ahmed.mohamed@example.com",
    role: "user",
    subscription: {
      status: "premium",
      plan: "yearly",
      nextBillingDate: "2024-12-15",
      isActive: true
    },
    createdAt: "2024-01-15"
  },
  {
    id: "user_67890def",
    email: "fatima.ahmed@example.com",
    role: "user",
    subscription: {
      status: "free",
      nextBillingDate: undefined,
      isActive: false
    },
    createdAt: "2024-02-20"
  },
  {
    id: "user_11111ghi",
    email: "mohamed.ali@example.com",
    role: "user",
    subscription: {
      status: "premium",
      plan: "monthly",
      nextBillingDate: "2024-12-20",
      isActive: true
    },
    createdAt: "2024-03-10"
  },
  {
    id: "user_22222jkl",
    email: "sara.khaled@example.com",
    role: "user",
    subscription: {
      status: "free",
      plan: "quarterly",
      nextBillingDate: "2024-11-15",
      isActive: false
    },
    createdAt: "2024-01-05"
  },
  {
    id: "user_33333mno",
    email: "youssef.hassan@example.com",
    role: "user",
    subscription: {
      status: "free",
      nextBillingDate: undefined,
      isActive: false
    },
    createdAt: "2024-04-12"
  },
  {
    id: "user_44444pqr",
    email: "nour.aldin@example.com",
    role: "sudo",
    subscription: {
      status: "premium",
      plan: "yearly",
      nextBillingDate: "2025-01-20",
      isActive: true
    },
    createdAt: "2024-05-18"
  },
  {
    id: "user_55555stu",
    email: "layla.abdullah@example.com",
    role: "user",
    subscription: {
      status: "free",
      nextBillingDate: undefined,
      isActive: false
    },
    createdAt: "2024-06-22"
  },
  {
    id: "user_66666vwx",
    email: "hussam.aldin@example.com",
    role: "user",
    subscription: {
      status: "premium",
      plan: "quarterly",
      nextBillingDate: "2024-12-30",
      isActive: true
    },
    createdAt: "2024-07-08"
  }
]

// Current logged-in user (for profile purposes)
export const currentUserData: User = {
  id: "user_12345abc",
  email: "user@example.com",
  role: "user",
  subscription: {
    status: "premium",
    plan: "yearly",
    nextBillingDate: "2024-12-15",
    isActive: true
  },
  createdAt: "2024-01-15"
}
