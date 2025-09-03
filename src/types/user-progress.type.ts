// Enhanced UserProgress interface for Firebase progress collection
// Document ID format: {userId}_{courseId}

export interface LessonProgressDetail {
  completedAt: string     // ISO timestamp when lesson was completed
  timeSpent?: number      // Minutes spent on lesson (optional)
  attempts?: number       // How many times user marked lesson complete (optional)
}

export interface UserProgress {
  // === CORE IDENTIFIERS ===
  userId: string          // Firebase Auth UID
  courseId: string        // Course document ID
  
  // === PROGRESS TRACKING ===
  completedLessons: string[]  // Array of completed lesson IDs (backward compatible)
  progressPercentage: number  // Calculated percentage (0-100)
  totalLessons: number       // Total lessons in course (for validation)
  
  // === LESSON DETAILS (Enhanced) ===
  lessonProgress: {
    [lessonId: string]: LessonProgressDetail
  }
  
  // === COURSE COMPLETION ===
  isCompleted: boolean       // True when all lessons completed
  completedAt?: string       // ISO timestamp when course completed
  
  // === TIMESTAMPS ===
  createdAt: string          // When user first started course
  updatedAt: string          // Last progress update
  lastAccessed: string       // Last time user accessed any lesson (now required)
  
  // === ANALYTICS (Optional) ===
  sessionCount?: number      // Number of study sessions
  totalTimeSpent?: number    // Total minutes spent in course
}

// Legacy interface for backward compatibility during migration
export interface UserProgressLegacy {
  userId: string
  courseId: string
  completedLessons: string[]
  lastAccessed?: string
}
