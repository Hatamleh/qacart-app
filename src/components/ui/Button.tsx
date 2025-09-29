import React from 'react'

interface ButtonProps {
    children?: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    disabled?: boolean
    loading?: boolean
    icon?: React.ComponentType<{ className?: string }>
    iconPosition?: 'left' | 'right'
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'primary',
                                                  size = 'md',
                                                  className = '',
                                                  disabled = false,
                                                  loading = false,
                                                  icon: Icon,
                                                  iconPosition = 'right',
                                                  type = 'button',
                                                  onClick
                                              }) => {
    // Base styles for all buttons - Coding theme
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded transition-all duration-200 focus:outline-none focus:outline-2 focus:outline-primary focus:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide'

    // Size variants
    const sizeStyles = {
        sm: 'px-4 py-2 text-xs gap-2',
        md: 'px-6 py-2.5 text-sm gap-2',
        lg: 'px-8 py-3 text-base gap-3'
    }

    // Color variants - Coding theme with borders
    const variantStyles = {
        primary: 'bg-primary hover:bg-primary/90 text-background border-2 border-primary shadow-[0_0_15px_rgba(136,192,208,0.3)] hover:shadow-[0_0_25px_rgba(136,192,208,0.5)]',
        secondary: 'bg-secondary hover:bg-secondary/90 text-background border-2 border-secondary shadow-md hover:shadow-lg',
        outline: 'bg-transparent hover:bg-primary/10 text-primary border-2 border-primary hover:border-primary hover:shadow-[0_0_10px_rgba(136,192,208,0.3)]',
        ghost: 'bg-transparent hover:bg-primary/10 text-primary hover:text-primary/90 border-2 border-transparent',
        destructive: 'bg-destructive hover:bg-destructive/90 text-foreground border-2 border-destructive shadow-md hover:shadow-lg'
    }

    // Loading spinner
    const LoadingSpinner = () => (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
    )

    const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {/* Left Icon */}
            {Icon && iconPosition === 'left' && !loading && (
                <Icon className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}`}/>
            )}

            {/* Loading Spinner */}
            {loading && iconPosition === 'left' && <LoadingSpinner/>}

            {/* Button Text */}
            {children && <span>{children}</span>}

            {/* Right Icon */}
            {Icon && iconPosition === 'right' && !loading && (
                <Icon className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}`}/>
            )}

            {/* Loading Spinner */}
            {loading && iconPosition === 'right' && <LoadingSpinner/>}
        </button>
    )
}
