import { NextRequest, NextResponse } from 'next/server'
import { LessonRepository } from '@/repositories'

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
    // TODO: Add admin authentication middleware
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
    console.error('Error reordering lessons:', error)
    return NextResponse.json(
      { error: 'Failed to reorder lessons' },
      { status: 500 }
    )
  }
}
