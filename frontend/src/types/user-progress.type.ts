export interface UserProgress {
    userId: string
    courseId: string
    completedLessons: string[] // Array of lesson IDs
    lastAccessed?: string
}
