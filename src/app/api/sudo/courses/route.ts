import { NextRequest, NextResponse } from 'next/server'
import { CourseRepository, AuthRepository } from '@/repositories'

/**
 * GET /api/sudo/courses
 * Get all courses (Admin view with more details)
 */
export async function GET(request: NextRequest) {
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

    const courses = await CourseRepository.getAllCourses()
    
    return NextResponse.json({ 
      courses,
      count: courses.length 
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
    
    console.error('Error fetching courses for admin:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/sudo/courses
 * Create a new course (Admin only)
 */
export async function POST(request: NextRequest) {
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

    const courseData = await request.json()

    // Validate required fields
    if (!courseData.title || !courseData.shortDescription) {
      return NextResponse.json(
        { error: 'Title and short description are required' },
        { status: 400 }
      )
    }

    const newCourse = await CourseRepository.createCourse(courseData)
    
    return NextResponse.json({ 
      course: newCourse,
      message: 'Course created successfully' 
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
    }
    
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}
