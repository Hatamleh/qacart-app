import React from 'react'

interface BadgeProps {
    children: React.ReactNode
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'premium'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    withPulse?: boolean
    pulseColor?: string
}

export const Badge: React.FC<BadgeProps> = ({
                                                children,
                                                variant = 'default',
                                                size = 'md',
                                                className = '',
                                                withPulse = false,
                                                pulseColor = 'bg-primary'
                                            }) => {
    // Base styles for all badges - Coding theme
    const baseStyles = 'inline-flex items-center gap-2 rounded font-semibold transition-all duration-200 uppercase tracking-wider border-2'

    // Size variants
    const sizeStyles = {
        sm: 'px-2.5 py-0.5 text-[10px]',
        md: 'px-4 py-1 text-xs',
        lg: 'px-6 py-2 text-sm'
    }

    // Color variants - Nord/Coding theme
    const variantStyles = {
        default: 'bg-muted/50 border-border text-muted-foreground',
        primary: 'bg-primary/10 border-primary/40 text-primary shadow-[0_0_10px_rgba(136,192,208,0.2)]',
        secondary: 'bg-secondary/10 border-secondary/40 text-secondary',
        success: 'bg-premium/10 border-premium/40 text-premium shadow-[0_0_10px_rgba(163,190,140,0.2)]',
        warning: 'bg-accent-orange/10 border-accent-orange/40 text-accent-orange',
        danger: 'bg-destructive/10 border-destructive/40 text-destructive',
        premium: 'bg-premium/10 border-premium/40 text-premium shadow-[0_0_10px_rgba(163,190,140,0.2)]'
    }

    const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`

    return (
        <div className={classes}>
            {withPulse && (
                <div className={`w-2 h-2 ${pulseColor} rounded-full animate-pulse`}></div>
            )}
            {children}
        </div>
    )
}
