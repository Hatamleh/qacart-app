import { NextRequest, NextResponse } from 'next/server'
import { LessonRepository, AuthRepository } from '@/repositories'

interface RouteParams {
  params: Promise<{
    courseId: string
  }>
}

/**
 * PUT /api/sudo/courses/[courseId]/lessons/reorder
 * Reorder lessons in a course (Admin only)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Verify admin access
    const sessionCookie = request.cookies.get('session')?.value
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    await AuthRepository.verifyAdminAccess(sessionCookie)

    const { courseId } = await params
    const { lessonIds } = await request.json()

    if (!Array.isArray(lessonIds)) {
      return NextResponse.json(
        { error: 'lessonIds must be an array' },
        { status: 400 }
      )
    }

    await LessonRepository.reorderLessons(courseId, lessonIds)
    
    return NextResponse.json({ 
      message: 'Lessons reordered successfully' 
    })

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Authentication required') {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }
      if (error.message === 'Admin access required') {
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        )
      }
    }
    
    console.error('Error reordering lessons:', error)
    return NextResponse.json(
      { error: 'Failed to reorder lessons' },
      { status: 500 }
    )
  }
}
