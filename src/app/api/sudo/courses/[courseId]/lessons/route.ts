import { NextRequest, NextResponse } from 'next/server'
import { LessonRepository, CourseRepository, AuthRepository } from '@/repositories'

interface RouteParams {
  params: Promise<{
    courseId: string
  }>
}

/**
 * GET /api/sudo/courses/[id]/lessons
 * Get all lessons for a course (Admin only)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
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
    
    // Get course with all lessons
    const course = await CourseRepository.getCourseById(courseId)
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      lessons: course.lessons,
      count: course.lessons.length,
      courseId 
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
    
    console.error('Error fetching lessons:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/sudo/courses/[id]/lessons
 * Create a new lesson in a course (Admin only)
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
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
    const lessonData = await request.json()

    // Validate required fields
    if (!lessonData.title) {
      return NextResponse.json(
        { error: 'Lesson title is required' },
        { status: 400 }
      )
    }

    const newLesson = await LessonRepository.createLesson(courseId, lessonData)
    
    return NextResponse.json({ 
      lesson: newLesson,
      message: 'Lesson created successfully' 
    }, { status: 201 })

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
      if (error.message === 'Course not found') {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        )
      }
    }
    
    console.error('Error creating lesson:', error)
    return NextResponse.json(
      { error: 'Failed to create lesson' },
      { status: 500 }
    )
  }
}
