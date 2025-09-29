
import { Lesson } from './lesson.type'

export interface Course {
  id: string
  title: string
  shortDescription: string
  vimeoId: string
  lastUpdated: string
  lessons: Lesson[]
  durationInMinutes: number
  studentsCount: number
  tags: string[]
}


