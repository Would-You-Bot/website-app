import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import validator from 'validator'

export async function GET(request: NextRequest,{
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = validator.escape((await params).id) // Sanitize ID
  const auth = await getAuthTokenOrNull()
  const userId = auth?.payload?.id

  const userData = await prisma.user.findFirst({
    where: {
      userID: id,
    },
  })

  if (!userData) {
    return NextResponse.json(
      { message: 'No user found!' },
      { status: 404 }
    )
  }

  if (userData.votePrivacy && userId !== id) {
    return NextResponse.json(
      { 
        data: {
          userID: userData.userID,
          displayName: userData.displayName,
          globalName: userData.globalName,
          avatarUrl: userData.avatarUrl,
        },
      },
      { status: 200 }
    )
  }

  return NextResponse.json(
    { data: userData },
    { status: 200 }
  )
}

export const maxDuration = 7
