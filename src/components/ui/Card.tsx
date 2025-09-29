import React from 'react'

interface CardProps {
    icon?: React.ComponentType<{ className?: string }>
    title: string
    description?: string
    badge?: string
    badgeVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
    className?: string
    onClick?: () => void
    hover?: boolean
    children?: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
                                              icon: Icon,
                                              title,
                                              description,
                                              badge,
                                              badgeVariant = 'primary',
                                              className = '',
                                              onClick,
                                              hover = true,
                                              children
                                          }) => {
    // Base styles for cards - Terminal/coding theme
    const baseStyles = 'p-6 rounded glass border-2 border-border transition-all duration-300 shadow-[0_4px_6px_rgba(0,0,0,0.3)]'

    // Hover styles - Coding theme glow
    const hoverStyles = hover
        ? 'hover:border-primary hover:shadow-[0_0_20px_rgba(136,192,208,0.3)] group cursor-pointer'
        : ''

    // Badge styles - Nord colors
    const badgeStyles = {
        default: 'text-muted-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
        success: 'text-premium',
        warning: 'text-accent-orange',
        danger: 'text-destructive'
    }

    const classes = `${baseStyles} ${hoverStyles} ${className}`

    return (
        <div className={classes} onClick={onClick}>
            {/* Icon - Coding style with accent border */}
            {Icon && (
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded border-2 border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(136,192,208,0.4)] transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>

            {/* Description */}
            {description && (
                <p className="text-muted-foreground text-sm mb-3">
                    {description}
                </p>
            )}

            {/* Badge */}
            {badge && (
                <div className={`text-xs font-semibold ${badgeStyles[badgeVariant]}`}>
                    {badge}
                </div>
            )}

            {/* Custom children content */}
            {children}
        </div>
    )
}
