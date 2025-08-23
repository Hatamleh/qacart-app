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
    // Base styles for all buttons
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:outline-2 focus:outline-primary focus:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    // Size variants
    const sizeStyles = {
        sm: 'px-4 py-2 text-sm gap-2',
        md: 'px-6 py-3 text-base gap-2',
        lg: 'px-8 py-4 text-lg gap-3'
    }

    // Color variants
    const variantStyles = {
        primary: 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl hover:scale-105',
        secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md hover:shadow-lg hover:scale-105',
        outline: 'bg-transparent hover:bg-primary/10 text-primary border border-primary/30 hover:border-primary',
        ghost: 'bg-transparent hover:bg-primary/10 text-primary hover:text-primary/90',
        destructive: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
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
