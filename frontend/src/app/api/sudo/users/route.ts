import { NextRequest, NextResponse } from 'next/server'
import { UserRepository, AuthRepository } from '@/repositories'
import { GetUsersParams } from '@/types'

/**
 * GET /api/sudo/users
 * Get users with enhanced filtering, pagination, and search (Admin only)
 * 
 * Query Parameters:
 * - filter: 'all' | 'premium' | 'free' | 'gifted' (default: 'all')
 * - limit: number (default: 20)
 * - offset: number (default: 0)
 * - search: string (search by email or userID)
 * 
 * Examples:
 * - GET /api/sudo/users
 * - GET /api/sudo/users?filter=gifted&limit=10
 * - GET /api/sudo/users?search=user@email.com
 * - GET /api/sudo/users?filter=premium&search=john&offset=20
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

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    
    const filter = searchParams.get('filter') as GetUsersParams['filter'] || 'all'
    const limitParam = searchParams.get('limit')
    const offsetParam = searchParams.get('offset')
    const search = searchParams.get('search') || ''

    // Validate and parse numeric parameters
    const limit = limitParam ? Math.max(1, Math.min(100, parseInt(limitParam))) : 20 // Max 100 per request
    const offset = offsetParam ? Math.max(0, parseInt(offsetParam)) : 0

    // Validate filter parameter
    const validFilters = ['all', 'premium', 'free', 'gifted']
    if (!validFilters.includes(filter)) {
      return NextResponse.json(
        { error: `Invalid filter. Must be one of: ${validFilters.join(', ')}` },
        { status: 400 }
      )
    }

    // Build parameters for repository
    const params: GetUsersParams = {
      filter,
      limit,
      offset,
      search: search.trim()
    }

    // Get users with enhanced filtering
    const result = await UserRepository.getAllUsers(params)
    
    return NextResponse.json(result)

  } catch (error) {
    console.error('Error fetching users for admin:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
