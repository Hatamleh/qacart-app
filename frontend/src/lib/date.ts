/**
 * Date formatting utilities for the application
 */

/**
 * Format a date string to Arabic Gregorian format
 * @param dateString - The date string to format
 * @returns Formatted date string in Arabic (Gregorian calendar)
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      calendar: 'gregory' // Use Gregorian calendar instead of Hijri
    })
  } catch {
    return dateString // Fallback to original string if parsing fails
  }
}

/**
 * Format a date string to short Arabic format (e.g., "27 ديسمبر 2024")
 * @param dateString - The date string to format
 * @returns Short formatted date string in Arabic
 */
export const formatDateShort = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      calendar: 'gregory'
    })
  } catch {
    return dateString
  }
}

/**
 * Format a date string to include time (e.g., "27 ديسمبر 2024، 3:30 م")
 * @param dateString - The date string to format
 * @returns Formatted date and time string in Arabic
 */
export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      calendar: 'gregory'
    })
  } catch {
    return dateString
  }
}

/**
 * Get relative time in Arabic (e.g., "منذ 3 أيام")
 * @param dateString - The date string to format
 * @returns Relative time string in Arabic
 */
export const formatRelativeTime = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) {
      return 'اليوم'
    } else if (diffInDays === 1) {
      return 'أمس'
    } else if (diffInDays < 7) {
      return `منذ ${diffInDays} أيام`
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7)
      return weeks === 1 ? 'منذ أسبوع' : `منذ ${weeks} أسابيع`
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30)
      return months === 1 ? 'منذ شهر' : `منذ ${months} أشهر`
    } else {
      const years = Math.floor(diffInDays / 365)
      return years === 1 ? 'منذ سنة' : `منذ ${years} سنوات`
    }
  } catch {
    return dateString
  }
}

/**
 * Check if a date string represents a date in the past (expired)
 * @param dateString - The date string to check
 * @returns True if the date is in the past (expired)
 */
export const isDateExpired = (dateString: string): boolean => {
  try {
    const date = new Date(dateString)
    const now = new Date()
    return date.getTime() < now.getTime()
  } catch {
    return true // If we can't parse the date, consider it expired for safety
  }
}
