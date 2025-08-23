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
    
    const course = await CourseRepository.getCourseById(courseId)
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ course })

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
    const updateData = await request.json()

    await CourseRepository.updateCourse(courseId, updateData)
    
    // Get the updated course
    const updatedCourse = await CourseRepository.getCourseById(courseId)

    return NextResponse.json({ 
      course: updatedCourse,
      message: 'Course updated successfully' 
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

    // Delete the course using CourseRepository
    await CourseRepository.deleteCourse(courseId)
    
    return NextResponse.json({ 
      message: 'Course deleted successfully' 
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
    
    console.error('Error deleting course:', error)
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}
