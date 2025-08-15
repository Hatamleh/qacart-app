import Link from 'next/link'

export const AuthTerms = () => {
  return (
    <div className="text-center">
      <p className="text-xs text-muted-foreground/60 leading-relaxed">
        بالمتابعة، فإنك توافق على{' '}
        <Link href="/" className="text-primary/80 hover:text-primary transition-colors">
          شروط الخدمة
        </Link>
        {' '}و{' '}
        <Link href="/" className="text-primary/80 hover:text-primary transition-colors">
          سياسة الخصوصية
        </Link>
      </p>
    </div>
  )
}
