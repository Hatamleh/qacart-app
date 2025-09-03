export interface Lesson {
  id: string
  lessonOrder: number
  title: string
  durationInMinutes: number
  isFree: boolean
  vimeoId?: string
  articleContent?: string
}