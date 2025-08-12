import React from 'react'

interface BadgeProps {
    children: React.ReactNode
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
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
    // Base styles for all badges
    const baseStyles = 'inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200'

    // Size variants
    const sizeStyles = {
        sm: 'px-3 py-1 text-xs',
        md: 'px-6 py-2 text-sm',
        lg: 'px-8 py-3 text-base'
    }

    // Color variants
    const variantStyles = {
        default: 'bg-muted/50 border border-border text-muted-foreground',
        primary: 'bg-primary/10 border border-primary/20 text-primary',
        secondary: 'bg-secondary/10 border border-secondary/20 text-secondary-foreground',
        success: 'bg-primary/10 border border-primary/20 text-primary',
        warning: 'bg-primary/10 border border-primary/20 text-primary',
        danger: 'bg-primary/10 border border-primary/20 text-primary'
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
