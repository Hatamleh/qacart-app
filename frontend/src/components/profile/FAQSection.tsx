import { HelpCircle } from 'lucide-react'
import { FAQQuestion } from '@/types'

interface FAQSectionProps {
  questions: FAQQuestion[]
}

export const FAQSection = ({ questions }: FAQSectionProps) => {

  return (
    <div className="bg-primary/10 backdrop-blur-md rounded-2xl p-8 border border-primary/20 shadow-xl mb-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <HelpCircle className="w-6 h-6 text-primary" />
        الأسئلة الشائعة
      </h2>
      
      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-background/50 rounded-xl overflow-hidden"
          >
            <div className="p-4">
              <span className="font-semibold">{question.question}</span>
            </div>
            
            <div className="px-4 pb-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-muted-foreground leading-relaxed">
                  {question.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
