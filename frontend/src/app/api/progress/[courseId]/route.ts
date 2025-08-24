import { NextRequest, NextResponse } from 'next/server'
import { ProgressRepository, AuthRepository } from '@/repositories'

interface RouteParams {
  params: Promise<{
    courseId: string
  }>
}

/**
 * GET /api/progress/[courseId]
 * Get authenticated user's progress for a specific course
 * Used by course player components to display progress
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    // Verify user is authenticated
    const userId = await AuthRepository.getAuthenticatedUserId()
    if (!userId) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }

    const { courseId } = await params

    if (!courseId) {
      return NextResponse.json(
        { error: 'معرف الدورة مطلوب' },
        { status: 400 }
      )
    }

    // Get user's progress for the course
    const progress = await ProgressRepository.getUserProgress(userId, courseId)

    // If no progress exists, return null (course not started yet)
    if (!progress) {
      return NextResponse.json({ 
        progress: null,
        message: 'لم يتم البدء في هذه الدورة بعد' 
      })
    }

    // Update last accessed time (non-blocking)
    ProgressRepository.updateLastAccessed(userId, courseId).catch(error => {
      console.warn('Failed to update last accessed time:', error)
    })

    return NextResponse.json({ 
      progress,
      message: 'تم جلب التقدم بنجاح' 
    })

  } catch (error) {
    console.error('Error fetching user progress:', error)
    return NextResponse.json(
      { error: 'فشل في جلب بيانات التقدم' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/progress/[courseId]
 * Create initial progress when user first accesses a course
 * Used when course player detects no existing progress
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    // Verify user is authenticated
    const userId = await AuthRepository.getAuthenticatedUserId()
    if (!userId) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }

    const { courseId } = await params
    const { totalLessons } = await request.json()

    if (!courseId) {
      return NextResponse.json(
        { error: 'معرف الدورة مطلوب' },
        { status: 400 }
      )
    }

    if (!totalLessons || typeof totalLessons !== 'number' || totalLessons <= 0) {
      return NextResponse.json(
        { error: 'عدد الدروس يجب أن يكون رقم موجب' },
        { status: 400 }
      )
    }

    // Check if progress already exists
    const existingProgress = await ProgressRepository.getUserProgress(userId, courseId)
    if (existingProgress) {
      return NextResponse.json({ 
        progress: existingProgress,
        message: 'التقدم موجود بالفعل' 
      })
    }

    // Create initial progress
    const progress = await ProgressRepository.createInitialProgress(userId, courseId, totalLessons)

    return NextResponse.json({ 
      progress,
      message: 'تم إنشاء تقدم جديد بنجاح' 
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating initial progress:', error)
    return NextResponse.json(
      { error: 'فشل في إنشاء بيانات التقدم' },
      { status: 500 }
    )
  }
}
