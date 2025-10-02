import { CoursePlayerClient } from '@/components/course-player/CoursePlayerClient'
import { getCourse, getProgress } from '@/actions'
import { getCurrentUser } from '@/lib/auth'

export default async function CoursePlayerPage({
  params,
  searchParams
}: {
  params: Promise<{ courseId: string }>
  searchParams: Promise<{ lesson?: string }>
}) {
  const { courseId } = await params
  const { lesson: lessonId } = await searchParams

  // Fetch course and progress in parallel
  const [course, currentUser] = await Promise.all([
    getCourse(courseId),
    getCurrentUser()
  ])

  // Get initial progress if user is authenticated
  let initialProgress = null
  if (currentUser) {
    try {
      initialProgress = await getProgress(courseId)
    } catch (error) {
      // Progress might not exist yet, that's ok
      console.error('Error fetching progress:', error)
    }
  }

  // Find current lesson
  const currentLesson = lessonId
    ? course.lessons.find(l => l.id === lessonId) || course.lessons[0]
    : null

  return (
    <CoursePlayerClient
      course={course}
      currentLesson={currentLesson}
      initialProgress={initialProgress}
    />
  )
}
