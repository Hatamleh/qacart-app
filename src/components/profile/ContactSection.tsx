import { Mail } from 'lucide-react'

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
        
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl">
            <Mail className="w-5 h-5 text-primary" />
            <span className="font-semibold">hello@qacart.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}
