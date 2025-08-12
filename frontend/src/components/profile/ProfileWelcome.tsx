import { User } from 'lucide-react'

export const ProfileWelcome = () => {
  return (
    <div className="text-center mb-12">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
          <User className="w-10 h-10 text-primary" />
        </div>
      </div>
      
      {/* Welcome Message */}
      <h1 className="text-4xl lg:text-5xl font-bold mb-4">
        مرحباً بك في QAcart
      </h1>
      
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        منصتك المفضلة لتعلم اختبار البرمجيات
      </p>
    </div>
  )
}
