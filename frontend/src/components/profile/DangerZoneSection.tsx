'use client'

import { useState } from 'react'
import { AlertTriangle, Trash2 } from 'lucide-react'
import { Button } from '../ui/Button'
import { ConfirmationDialog } from './ConfirmationDialog'
import { useAuth } from '@/contexts/AuthContext'

export const DangerZoneSection = () => {
  const { deleteAccount } = useAuth()
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = () => {
    setIsConfirmDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    setIsDeleting(true)
    
    try {
      // Use AuthContext deleteAccount method
      await deleteAccount()
      console.log('✅ Account deleted successfully')
    } catch (error) {
      console.error('❌ Error deleting account:', error)
      alert('حدث خطأ أثناء حذف الحساب. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsDeleting(false)
      setIsConfirmDialogOpen(false)
    }
  }

  const handleCancelDelete = () => {
    setIsConfirmDialogOpen(false)
  }

  return (
    <>
      <div className="bg-primary/10 backdrop-blur-md rounded-2xl p-8 border border-primary/20 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-primary">
          <AlertTriangle className="w-6 h-6" />
          المنطقة الخطيرة
        </h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
            <p className="text-muted-foreground leading-relaxed mb-4">
              وفقاً لقانون GDPR، استخدم هذا الزر لحذف حسابك ومسح جميع البيانات من خوادمنا نهائياً.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-primary">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-semibold">هذا الإجراء لا يمكن التراجع عنه</span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              variant="outline"
              icon={Trash2}
              iconPosition="right"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
              onClick={handleDeleteClick}
              disabled={isDeleting}
            >
              حذف الحساب
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="هل أنت متأكد من حذف حسابك؟"
        message="سيتم حذف جميع بياناتك بشكل دائم بما في ذلك الملف الشخصي وتقدم الدورات. هذا الإجراء لا يمكن التراجع عنه."
        confirmText="نعم، احذف حسابي"
        cancelText="إلغاء"
        isLoading={isDeleting}
        variant="danger"
      />
    </>
  )
}
