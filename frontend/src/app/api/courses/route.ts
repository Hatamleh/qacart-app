import { NextResponse } from 'next/server'
import { CourseRepository } from '@/repositories'

/**
 * GET /api/courses
 * Get all courses
 */
export async function GET() {
  try {
    const courses = await CourseRepository.getAllCourses()
    
    return NextResponse.json({ 
      courses,
      count: courses.length 
    })

  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}


