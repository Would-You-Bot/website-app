import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { type NextRequest, NextResponse } from 'next/server'
import { createRateLimiter, defaultRateLimiter } from './lib/ratelimiter'

const ALLOWED_ADMIN_IDS = ['347077478726238228', '268843733317976066']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method
  const ip = request.ip ?? '127.0.0.1'

  // Allow GET requests to /api/packs without being logged in or an admin
  if (method === 'GET' && pathname === '/api/packs') {

    const { success } = await defaultRateLimiter.limit(ip)

    if (!success) {
      return NextResponse.json(
        { success: false, error: `Rate limit exceeded, please wait a bit before trying again!`  },
        { status: 429 }
      )
    }

    return NextResponse.next()
  }

  const token = await getAuthTokenOrNull()
  
  if (token === null) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }
  // Limiting by user ID and IP
  const { success: successID } = await createRateLimiter.limit(token.payload.id)
  const { success: successIP } = await createRateLimiter.limit(ip)

  if (!successID || !successIP) {
    return NextResponse.json(
      { success: false, error: `Rate limit exceeded, please wait a bit before trying again!`  },
      { status: 429 }, 
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
