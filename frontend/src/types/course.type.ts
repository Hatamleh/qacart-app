
import { Lesson } from './lesson.type'

export interface Course {
  id: number
  title: string
  shortDescription: string
  promoVideoUrl: string
  videoThumbnail: string
  lastUpdated: string
  lessons: Lesson[]
  type: string
  durationInMinutes: number
  studentsCount: number
  tags: string[]
  learningGoals: string[]
}


