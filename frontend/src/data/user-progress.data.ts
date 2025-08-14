
export interface UserProgress {
  userId: string
  courseId: string
  completedLessons: string[] // Array of lesson IDs
  lastAccessed?: string
}

export const userProgressData: UserProgress[] = [
  {
    userId: "user_12345abc", // From currentUserData
    courseId: "course_setup_dev_env",
    completedLessons: ["lesson_101", "lesson_102"], // First 2 lessons completed
    lastAccessed: "2024-12-10"
  },
  {
    userId: "user_12345abc",
    courseId: "course_manual_testing", 
    completedLessons: ["lesson_201", "lesson_202", "lesson_203"], // First 3 lessons completed
    lastAccessed: "2024-12-09"
  },
  {
    userId: "user_12345abc",
    courseId: "course_selenium_java",
    completedLessons: ["lesson_301"], // Only first lesson completed
    lastAccessed: "2024-12-08"
  },
  {
    userId: "user_12345abc",
    courseId: "course_playwright_typescript",
    completedLessons: [], // No lessons completed yet
    lastAccessed: "2024-12-07"
  }
]


