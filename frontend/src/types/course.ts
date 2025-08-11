export interface Lesson {
  id: number
  lessonOrder: number
  title: string
  durationInMinutes: number
  isFree: boolean
  isCompleted?: boolean
  videoUrl?: string
  articleContent?: string
}

export interface Course {
  id: number
  title: string
  shortDescription: string
  promoVideoUrl: string
  videoThumbnail: string
  instructor: {
    name: string
    image: string
  }
  lastUpdated: string
  lessons: Lesson[]
  type: string
  durationInMinutes: number
  studentsCount: number
  tags: string[]
}

// Utility function to format duration for display
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} دقيقة`
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) return `${hours} ساعة${hours > 1 ? '' : ''}`
  return `${hours} ساعة و ${remainingMinutes} دقيقة`
}


