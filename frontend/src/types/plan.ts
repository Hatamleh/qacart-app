export interface PricingOption {
  id: string
  type: string
  duration: string
  durationEnglish: string
  price: number
  currency: string
  popular: boolean
  savings: string | null
}

export interface PlanFeature {
  id: string
  title: string
  titleEnglish: string
  icon: string
  included: boolean
}

export interface PlanCTA {
  buttonText: string
  buttonTextEnglish: string
  guarantee: string
  guaranteeEnglish: string
}

export interface ProPlan {
  id: string
  name: string
  nameEnglish: string
  description: string
  pricingOptions: PricingOption[]
  features: PlanFeature[]
  cta: PlanCTA
}
