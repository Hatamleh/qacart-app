import { NextRequest, NextResponse } from 'next/server'
import { ProgressRepository, AuthRepository } from '@/repositories'

interface CompleteLessonRequest {
  courseId: string
  lessonId: string
  totalLessons: number
  timeSpent?: number // Optional: time spent on lesson in minutes
}

/**
 * POST /api/progress/complete-lesson
 * Mark a lesson as completed for authenticated user
 * Used by course player when user clicks "أكمل الدرس الآن"
 */
export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const userId = await AuthRepository.getAuthenticatedUserId()
    if (!userId) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }

    // Parse request body
    const body: CompleteLessonRequest = await request.json()
    const { courseId, lessonId, totalLessons, timeSpent } = body

    // Validate required fields
    if (!courseId) {
      return NextResponse.json(
        { error: 'معرف الدورة مطلوب' },
        { status: 400 }
      )
    }

    if (!lessonId) {
      return NextResponse.json(
        { error: 'معرف الدرس مطلوب' },
        { status: 400 }
      )
    }

    if (!totalLessons || totalLessons <= 0) {
      return NextResponse.json(
        { error: 'عدد الدروس يجب أن يكون رقم موجب' },
        { status: 400 }
      )
    }

    // Validate timeSpent if provided
    if (timeSpent !== undefined && (timeSpent < 0)) {
      return NextResponse.json(
        { error: 'وقت الدرس يجب أن يكون رقم غير سالب' },
        { status: 400 }
      )
    }

    // Mark lesson as complete
    const updatedProgress = await ProgressRepository.markLessonComplete(
      userId,
      courseId,
      lessonId,
      totalLessons,
      timeSpent
    )

    // Determine response message based on completion status
    let message = 'تم تسجيل إكمال الدرس بنجاح'

    if (updatedProgress.isCompleted && updatedProgress.completedAt) {
      message = '🎉 مبروك! لقد أكملت الدورة بالكامل'
    } else if (updatedProgress.completedLessons.includes(lessonId)) {
      const remainingLessons = updatedProgress.totalLessons - updatedProgress.completedLessons.length
      if (remainingLessons > 0) {
        message = `ممتاز! تبقى ${remainingLessons} درس لإكمال الدورة`
      }
    }

    return NextResponse.json({
      progress: updatedProgress,
      message,
      courseCompleted: updatedProgress.isCompleted
    })

  } catch (error) {
    // Handle specific error messages
    if (error instanceof Error) {
      if (error.message === 'User not authenticated') {
        return NextResponse.json(
          { error: 'يجب تسجيل الدخول أولاً' },
          { status: 401 }
        )
      }

      if (error.message === 'Failed to mark lesson complete') {
        return NextResponse.json(
          { error: 'فشل في تسجيل إكمال الدرس' },
          { status: 500 }
        )
      }
    }

    console.error('Error completing lesson:', error)
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/progress/complete-lesson
 * Not supported - return method not allowed
 */
export async function GET() {
  return NextResponse.json(
    { error: 'هذا الطريق يدعم POST فقط' },
    { status: 405 }
  )
}
