/**
 * Progress Note Component - QAcart Platform
 * Displays a reminder note about marking lessons as complete
 */

export const ProgressNote = () => {
  return (
    <div className="bg-muted/30 border border-muted/50 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-foreground text-sm leading-relaxed">
          <span className="font-semibold">تذكير:</span> لا تنس الضغط على زر &quot;أكمل الدرس الآن&quot; في نهاية الدرس لتحديث تقدمك في الدورة.
        </p>
      </div>
    </div>
  )
}
