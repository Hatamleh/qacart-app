import { NextRequest, NextResponse } from 'next/server'
import { CourseRepository, AuthRepository } from '@/repositories'

interface RouteParams {
  params: Promise<{
    courseId: string
  }>
}

/**
 * GET /api/sudo/courses/[id]
 * Get a specific course by ID (Admin view with more details)
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

    const { courseId } = await params
    
    const course = await CourseRepository.getCourseById(courseId)
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ course })

  } catch (error) {
    console.error('Error fetching course for admin:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/sudo/courses/[id]
 * Update a course (Admin only)
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

    const { courseId } = await params
    const updateData = await request.json()

    await CourseRepository.updateCourse(courseId, updateData)
    
    // Get the updated course
    const updatedCourse = await CourseRepository.getCourseById(courseId)

    return NextResponse.json({ 
      course: updatedCourse,
      message: 'Course updated successfully' 
    })

  } catch (error) {
    console.error('Error updating course:', error)
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/sudo/courses/[id]
 * Delete a course (Admin only)
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

    const { courseId } = await params

    // TODO: Implement delete course method in CourseRepository
    // const success = await CourseRepository.removeCourse(id)
    
    return NextResponse.json({ 
      message: `Course deletion not implemented yet for course: ${courseId}` 
    }, { status: 501 })

  } catch (error) {
    console.error('Error deleting course:', error)
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}
