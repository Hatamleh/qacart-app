export interface Lesson {
  id: string
  lessonOrder: number
  title: string
  durationInMinutes: number
  isFree: boolean
  lessonType: 'video' | 'article'
  vimeoId?: string
  articleContent?: string
}