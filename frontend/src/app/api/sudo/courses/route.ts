import { NextRequest, NextResponse } from 'next/server'
import { CourseRepository, AuthRepository } from '@/repositories'

/**
 * GET /api/sudo/courses
 * Get all courses (Admin view with more details)
 */
export async function GET(request: NextRequest) {
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
    // For now, allow any authenticated user

    const courses = await CourseRepository.getAllCourses()
    
    return NextResponse.json({ 
      courses,
      count: courses.length 
    })

  } catch (error) {
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
    // For now, allow any authenticated user

    const courseData = await request.json()

    // Validate required fields
    if (!courseData.title || !courseData.description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const newCourse = await CourseRepository.createCourse(courseData)
    
    return NextResponse.json({ 
      course: newCourse,
      message: 'Course created successfully' 
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}
