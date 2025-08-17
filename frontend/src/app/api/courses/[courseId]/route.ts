import { NextRequest, NextResponse } from 'next/server'
import { CourseRepository } from '@/repositories'

interface RouteParams {
  params: Promise<{
    courseId: string
  }>
}

/**
 * GET /api/courses/[id]
 * Get a specific course by ID
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
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
    console.error('Error fetching course:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    )
  }
}


