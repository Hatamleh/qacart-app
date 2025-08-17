import { NextResponse } from 'next/server'
import { UserClient } from '@/clients'

export async function DELETE() {
  try {
    // Delete the user account and all associated data
    await UserClient.deleteOwnAccount()

    // Create success response
    const response = NextResponse.json({
      success: true,
      message: 'Account deleted successfully'
    })

    // Clear the session cookie
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Account deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    )
  }
}
