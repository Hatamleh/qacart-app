import { Plan } from '@/types'

export const planData: Plan = {
  id: "premium-plan",
  name: "خطة بريميوم",
  description: "اشتراك كامل للوصول إلى جميع الدورات المتقدمة والمميزات الحصرية",
  pricingOptions: [
    {
      id: "monthly",
      type: "monthly",
      duration: "شهرياً",
      price: 4.99,
      currency: "$",
      popular: false,
      savings: null,
      stripePriceId: "price_monthly_placeholder" // Replace with real Stripe price ID from Firebase
    },
    {
      id: "quarterly",
      type: "quarterly", 
      duration: "ربع سنوي",
      price: 12.99,
      currency: "$",
      popular: true,
      savings: "وفر 13%",
      stripePriceId: "price_quarterly_placeholder" // Replace with real Stripe price ID from Firebase
    },
    {
      id: "yearly",
      type: "yearly",
      duration: "سنوياً", 
      price: 49.99,
      currency: "$",
      popular: false,
      savings: "وفر 17%",
      stripePriceId: "price_yearly_placeholder" // Replace with real Stripe price ID from Firebase
    }
  ],
  features: [
    "وصول غير محدود للدروس المتقدمة",
    "تواصل مباشر مع حاتم للاستفسارات",
    "الوصول لمستودعات المشاريع وتشغيلها محلياً",
    "استيكر QAcart مجاني يُرسل لبابك"
  ]
}
