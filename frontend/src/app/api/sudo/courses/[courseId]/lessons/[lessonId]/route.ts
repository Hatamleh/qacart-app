import { NextRequest, NextResponse } from 'next/server'
import { LessonRepository, CourseRepository, AuthRepository } from '@/repositories'

interface RouteParams {
  params: Promise<{
    courseId: string
    lessonId: string
  }>
}

/**
 * GET /api/sudo/courses/[id]/lessons/[lessonId]
 * Get a specific lesson (Admin only)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const sessionCookie = request.cookies.get('session')?.value
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = await AuthRepository.verifySession(sessionCookie)
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    // TODO: Check if user is admin

    const { courseId, lessonId } = await params
    
    // Get course with all lessons
    const course = await CourseRepository.getCourseById(courseId)
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    // Find specific lesson
    const lesson = course.lessons.find(l => l.id === lessonId)
    
    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ lesson })

  } catch (error) {
    console.error('Error fetching lesson:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lesson' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/sudo/courses/[id]/lessons/[lessonId]
 * Update a lesson (Admin only)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const sessionCookie = request.cookies.get('session')?.value
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = await AuthRepository.verifySession(sessionCookie)
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    // TODO: Check if user is admin

    const { courseId, lessonId } = await params
    const updateData = await request.json()

    await LessonRepository.updateLesson(courseId, lessonId, updateData)
    
    // Get the updated lesson
    const course = await CourseRepository.getCourseById(courseId)
    const updatedLesson = course.lessons.find(l => l.id === lessonId)

    return NextResponse.json({ 
      lesson: updatedLesson,
      message: 'Lesson updated successfully' 
    })

  } catch (error) {
    console.error('Error updating lesson:', error)
    
    if (error instanceof Error) {
      if (error.message === 'Course not found') {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        )
      }
      if (error.message === 'Lesson not found') {
        return NextResponse.json(
          { error: 'Lesson not found' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to update lesson' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/sudo/courses/[id]/lessons/[lessonId]
 * Delete a lesson (Admin only)
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const sessionCookie = request.cookies.get('session')?.value
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = await AuthRepository.verifySession(sessionCookie)
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    // TODO: Check if user is admin

    const { courseId, lessonId } = await params

    await LessonRepository.deleteLesson(courseId, lessonId)
    
    return NextResponse.json({ 
      message: 'Lesson deleted successfully' 
    })

  } catch (error) {
    console.error('Error deleting lesson:', error)
    
    if (error instanceof Error) {
      if (error.message === 'Course not found') {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        )
      }
      if (error.message === 'Lesson not found') {
        return NextResponse.json(
          { error: 'Lesson not found' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to delete lesson' },
      { status: 500 }
    )
  }
}
