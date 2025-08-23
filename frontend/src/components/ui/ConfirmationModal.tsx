'use client'

import { AlertTriangle, Trash2 } from 'lucide-react'
import { Modal } from './Modal'
import { Button } from './Button'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  isLoading?: boolean
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'تأكيد',
  cancelText = 'إلغاء',
  variant = 'danger',
  isLoading = false
}: ConfirmationModalProps) => {

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  // Variant styles
  const variantConfig = {
    danger: {
      icon: Trash2,
      iconColor: 'text-destructive',
      iconBg: 'bg-destructive/10',
      confirmButton: 'destructive' as const
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-premium',
      iconBg: 'bg-premium/10',
      confirmButton: 'primary' as const
    },
    info: {
      icon: AlertTriangle,
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
      confirmButton: 'primary' as const
    }
  }

  const config = variantConfig[variant]
  const IconComponent = config.icon

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      className="max-w-md"
    >
      <div className="text-center space-y-6">
        
        {/* Icon */}
        <div className={`w-16 h-16 mx-auto rounded-full ${config.iconBg} flex items-center justify-center`}>
          <IconComponent className={`w-8 h-8 ${config.iconColor}`} />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <p className="text-foreground text-base leading-relaxed">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 justify-center pt-2">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {cancelText}
          </Button>

          <Button
            variant={config.confirmButton}
            size="md"
            onClick={handleConfirm}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {isLoading ? 'جاري التنفيذ...' : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
