'use client'

import { AlertTriangle, X } from 'lucide-react'
import { Button } from '../ui/Button'

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText: string
  cancelText: string
  isLoading?: boolean
  variant?: 'danger' | 'warning'
}

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  isLoading = false,
  variant = 'danger'
}: ConfirmationDialogProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-background border border-border rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 hover:bg-muted/20 rounded-lg transition-colors"
          disabled={isLoading}
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            variant === 'danger' 
              ? 'bg-destructive/10 border border-destructive/20' 
              : 'bg-warning/10 border border-warning/20'
          }`}>
            <AlertTriangle className={`w-8 h-8 ${
              variant === 'danger' ? 'text-destructive' : 'text-warning'
            }`} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-center mb-4">
          {title}
        </h3>

        {/* Message */}
        <p className="text-muted-foreground text-center leading-relaxed mb-8">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          
          <Button
            variant={variant === 'danger' ? 'primary' : 'secondary'}
            className={`flex-1 ${
              variant === 'danger' 
                ? 'bg-destructive hover:bg-destructive/90 text-white' 
                : ''
            }`}
            onClick={onConfirm}
            loading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}
