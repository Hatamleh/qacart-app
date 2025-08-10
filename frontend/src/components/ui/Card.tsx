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
    // Base styles for cards
    const baseStyles = 'p-6 rounded-2xl glass border border-border transition-all duration-300'

    // Hover styles
    const hoverStyles = hover
        ? 'hover:border-primary/50 group transform hover:scale-105 cursor-pointer'
        : ''

    // Badge styles
    const badgeStyles = {
        default: 'text-muted-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary-foreground',
        success: 'text-green-400',
        warning: 'text-yellow-400',
        danger: 'text-red-400'
    }

    const classes = `${baseStyles} ${hoverStyles} ${className}`

    return (
        <div className={classes} onClick={onClick}>
            {/* Icon */}
            {Icon && (
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300">
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
