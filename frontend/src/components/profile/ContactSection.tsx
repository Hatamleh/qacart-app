import { Mail, ExternalLink } from 'lucide-react'
import { Button } from '../ui/Button'

export const ContactSection = () => {

  return (
    <div className="bg-primary/10 backdrop-blur-md rounded-2xl p-8 border border-primary/20 shadow-xl mb-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Mail className="w-6 h-6 text-primary" />
        تواصل معنا
      </h2>
      
      <div className="text-center">
        <p className="text-muted-foreground mb-6 leading-relaxed">
          نحن هنا لمساعدتك! لا تتردد في التواصل معنا
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl">
            <Mail className="w-5 h-5 text-primary" />
            <span className="font-semibold">hello@qacart.com</span>
          </div>
          
          <Button
            variant="primary"
            icon={ExternalLink}
            iconPosition="right"
          >
            إرسال بريد إلكتروني
          </Button>
        </div>
      </div>
    </div>
  )
}
