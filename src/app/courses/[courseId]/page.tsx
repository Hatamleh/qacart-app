'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string

  useEffect(() => {
    // Redirect to player page
    router.replace(`/courses/${courseId}/player`)
  }, [courseId, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground font-mono">// جارٍ_التوجيه...</p>
      </div>
    </div>
  )
}
