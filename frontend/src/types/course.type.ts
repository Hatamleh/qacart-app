
import { Lesson } from './lesson.type'

export interface Course {
  id: string
  title: string
  shortDescription: string
  promoVideoUrl: string
  lastUpdated: string
  lessons: Lesson[]
  type: string
  durationInMinutes: number
  studentsCount: number
  tags: string[]
  learningGoals: string[]
}


