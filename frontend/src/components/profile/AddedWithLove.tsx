import { Heart, Gift, Calendar, Sparkles, Clock } from 'lucide-react'
import { User } from '@/types'
import { formatDate } from '@/lib'

interface AddedWithLoveProps {
  user: User
}

export const AddedWithLove = ({ user }: AddedWithLoveProps) => {
  // Only show for gifted users
  if (!user.subscription.giftDetails) {
    return null
  }

  const giftDetails = user.subscription.giftDetails

  return (
    <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-primary/10 backdrop-blur-md rounded-2xl p-8 border border-pink-500/20 shadow-xl mb-8 relative overflow-hidden">
      
      {/* Background Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 right-4 text-pink-500/20 animate-pulse">
          <Heart className="w-6 h-6" fill="currentColor" />
        </div>
        <div className="absolute bottom-6 left-6 text-purple-500/20 animate-pulse delay-1000">
          <Heart className="w-4 h-4" fill="currentColor" />
        </div>
        <div className="absolute top-1/2 left-1/3 text-pink-500/10 animate-pulse delay-500">
          <Heart className="w-5 h-5" fill="currentColor" />
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6 text-pink-500" />
            </div>
            <Heart className="w-6 h-6 text-pink-500 animate-pulse" fill="currentColor" />
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-primary/20 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-purple-500" fill="currentColor" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2 flex items-center gap-2 justify-center">
            مُضاف بحب
            <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
          </h2>
          
          <p className="text-muted-foreground">
            تم منحك عضوية بريميوم كهدية من فريق QAcart
          </p>
        </div>

        {/* Gift Details */}
        <div className="space-y-4">
          {/* Gift Type */}
          <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-pink-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">نوع الهدية</p>
                <p className="font-semibold">عضوية بريميوم مجانية</p>
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-pink-500" />
          </div>

          {/* Granted Date */}
          <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">تاريخ المنح</p>
                <p className="font-semibold">{formatDate(giftDetails.grantedAt)}</p>
              </div>
            </div>
            <Calendar className="w-6 h-6 text-purple-500" />
          </div>

          {/* Expiry Date */}
          <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">تاريخ انتهاء الهدية</p>
                <p className="font-semibold">{formatDate(giftDetails.expiresAt)}</p>
              </div>
            </div>
            <Clock className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mt-6 text-center p-4 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-xl border border-pink-500/10">
          <p className="text-sm text-muted-foreground leading-relaxed flex items-center justify-center gap-2 flex-wrap">
            <span>استمتع بجميع مميزات البريميوم مجاناً!</span>
            <Heart className="w-4 h-4 text-purple-500" fill="currentColor" />
            <br />
            <span>نتمنى لك تجربة تعلم رائعة مع دورات QAcart</span>
          </p>
        </div>
      </div>
    </div>
  )
}
