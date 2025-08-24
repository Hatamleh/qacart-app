import { UserProgress } from './user-progress.type'

// ===== API RESPONSE TYPES =====

export interface ProgressResponse {
  progress: UserProgress | null
  message: string
}

export interface CompleteLessonResponse {
  progress: UserProgress
  message: string
  courseCompleted: boolean
}

// ===== API REQUEST TYPES =====

export interface CompleteLessonRequest {
  courseId: string
  lessonId: string
  totalLessons: number
  timeSpent?: number // Optional: time spent on lesson in minutes
}

export interface CreateProgressRequest {
  totalLessons: number
}
