import {UserProgress} from "@/types";

export const userProgressData: UserProgress[] = [
  {
    userId: "user_12345abc", // From currentUserData
    courseId: "course_setup_dev_env",
    completedLessons: ["lesson_101", "lesson_102"], // First 2 lessons completed
    progressPercentage: 40, // 2 out of 5 lessons
    totalLessons: 5,
    lessonProgress: {
      "lesson_101": { completedAt: "2024-12-09T10:30:00Z", timeSpent: 45 },
      "lesson_102": { completedAt: "2024-12-10T14:15:00Z", timeSpent: 38 }
    },
    isCompleted: false,
    createdAt: "2024-12-09T10:00:00Z",
    updatedAt: "2024-12-10T14:15:00Z",
    lastAccessed: "2024-12-10",
    sessionCount: 3,
    totalTimeSpent: 83
  },
  {
    userId: "user_12345abc",
    courseId: "course_manual_testing",
    completedLessons: ["lesson_201", "lesson_202", "lesson_203"], // First 3 lessons completed
    progressPercentage: 75, // 3 out of 4 lessons
    totalLessons: 4,
    lessonProgress: {
      "lesson_201": { completedAt: "2024-12-07T09:30:00Z", timeSpent: 52 },
      "lesson_202": { completedAt: "2024-12-08T11:45:00Z", timeSpent: 48 },
      "lesson_203": { completedAt: "2024-12-09T16:20:00Z", timeSpent: 41 }
    },
    isCompleted: false,
    createdAt: "2024-12-07T09:00:00Z",
    updatedAt: "2024-12-09T16:20:00Z",
    lastAccessed: "2024-12-09",
    sessionCount: 4,
    totalTimeSpent: 141
  },
  {
    userId: "user_12345abc",
    courseId: "course_selenium_java",
    completedLessons: ["lesson_301"], // Only first lesson completed
    progressPercentage: 25, // 1 out of 4 lessons
    totalLessons: 4,
    lessonProgress: {
      "lesson_301": { completedAt: "2024-12-08T13:45:00Z", timeSpent: 62 }
    },
    isCompleted: false,
    createdAt: "2024-12-08T13:00:00Z",
    updatedAt: "2024-12-08T13:45:00Z",
    lastAccessed: "2024-12-08",
    sessionCount: 1,
    totalTimeSpent: 62
  },
  {
    userId: "user_12345abc",
    courseId: "course_playwright_typescript",
    completedLessons: [], // No lessons completed yet
    progressPercentage: 0, // 0 out of 4 lessons
    totalLessons: 4,
    lessonProgress: {},
    isCompleted: false,
    createdAt: "2024-12-07T15:00:00Z",
    updatedAt: "2024-12-07T15:00:00Z",
    lastAccessed: "2024-12-07",
    sessionCount: 1,
    totalTimeSpent: 15
  }
]


