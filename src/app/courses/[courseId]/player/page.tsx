'use client'

import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CoursePlayer } from '@/components/course-player/CoursePlayer'
import { ProgressProvider } from '@/contexts/ProgressContext'
import { getCourse } from '@/actions'
import { Course } from '@/types'

export default function CoursePlayerPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const lessonId = searchParams.get('lesson')

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCourse() {
      try {
        setLoading(true)
        const fetchedCourse = await getCourse(courseId)
        setCourse(fetchedCourse)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load course')
      } finally {
        setLoading(false)
      }
    }
    loadCourse()
  }, [courseId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white">جارٍ تحميل مشغل الدورة...</p>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">الدورة غير موجودة</h1>
          <p className="text-gray-300 mb-4">
            {error || 'الدورة المطلوبة غير متاحة حالياً'}
          </p>
          <button
            onClick={() => router.push('/courses')}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            العودة إلى الدورات
          </button>
        </div>
      </div>
    )
  }

  // If no lesson is selected, show overview
  const currentLesson = lessonId
    ? course.lessons.find(l => l.id === lessonId) || course.lessons[0]
    : null

  return (
    <ProgressProvider courseId={courseId}>
      <CoursePlayer
        course={course}
        currentLesson={currentLesson}
        courseId={courseId}
      />
    </ProgressProvider>
  )
}
