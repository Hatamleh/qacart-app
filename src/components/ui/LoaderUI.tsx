interface LoaderUIProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'spinner' | 'pulse' | 'skeleton'
}

export const LoaderUI = ({ 
  className = '', 
  size = 'md', 
  variant = 'spinner' 
}: LoaderUIProps) => {
  // Size configurations
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  // Spinner variant
  if (variant === 'spinner') {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <div className="animate-spin rounded-full border-2 border-primary/20 border-t-primary"></div>
      </div>
    )
  }

  // Pulse variant (for buttons, cards)
  if (variant === 'pulse') {
    return (
      <div className={`animate-pulse bg-muted-foreground/20 rounded ${className}`}></div>
    )
  }

  // Skeleton variant (for text, content)
  if (variant === 'skeleton') {
    return (
      <div className={`animate-pulse bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 rounded ${className}`}></div>
    )
  }

  return null
}

// Predefined loading components for common use cases
export const ButtonLoader = ({ className = '' }: { className?: string }) => (
  <LoaderUI variant="spinner" size="sm" className={className} />
)

export const CardLoader = ({ className = '' }: { className?: string }) => (
  <div className={`space-y-4 ${className}`}>
    <LoaderUI variant="skeleton" className="h-6 w-3/4" />
    <LoaderUI variant="skeleton" className="h-4 w-full" />
    <LoaderUI variant="skeleton" className="h-4 w-2/3" />
  </div>
)

export const PageLoader = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center justify-center p-8 ${className}`}>
    <LoaderUI variant="spinner" size="lg" />
  </div>
)
