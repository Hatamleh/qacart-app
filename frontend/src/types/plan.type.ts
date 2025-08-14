
export interface PricingOption {
  id: string
  type: string
  duration: string
  price: number
  currency: string
  popular: boolean
  savings: string | null
}


export interface Plan {
  id: string
  name: string
  description: string
  pricingOptions: PricingOption[]
  features: string[]
}
