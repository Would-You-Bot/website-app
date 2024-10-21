import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { type NextRequest, NextResponse } from 'next/server'

const ALLOWED_ADMIN_IDS = ['347077478726238228', '268843733317976066']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method

  // Allow GET requests to /api/packs without being logged in or an admin
  if (method === 'GET' && pathname === '/api/packs') {
    return NextResponse.next()
  }

  const token = await getAuthTokenOrNull()
  
  if (token === null) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // For review routes, check if user has admin perms
  if (pathname.includes('/review')) {
    const userId = token.payload.id 
    
    if (!ALLOWED_ADMIN_IDS.includes(userId)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/packs/review',
    '/api/packs',
    '/api/packs/:path*',
    '/api/packs/review/:path*',
  ]
}
