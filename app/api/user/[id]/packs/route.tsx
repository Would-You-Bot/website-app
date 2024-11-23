import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import validator from 'validator'

export async function GET(
  request: NextRequest,
  {
    params
  }: {
    params: Promise<{ id: string }>
  }
) {
  const { searchParams } = new URL(request.url)

  const type = validator.escape(searchParams.get('type') || 'created')
  const id = validator.escape((await params).id)

  const auth = await getAuthTokenOrNull()
  const userId = auth?.payload?.id

  const PAGE_SIZE = 15
  const PAGE_NUMBER = parseInt(validator.escape(searchParams.get('page') || '1'))

  const skip = (PAGE_NUMBER - 1) * PAGE_SIZE


  const userData = await prisma.user.findFirst({
    where: {
      userID: id
    }
  })

  if (!userData) {
    return NextResponse.json({ message: 'No user found!' }, { status: 404 })
  }
  
  if(userData.votePrivacy && userData.userID !== userId) {
    return NextResponse.json({ message: 'User not found!' }, { status: 404 })
  }
  
  const where = {
    ...(userData.userID !== userId && {
      pending: false,
      denied: false,
    }),
    ...(type === 'created' && { authorId: userData.userID }),
    ...(type === 'likes' && { likes: { has: userId } }),
  };

  const questionsPromise = prisma.questionPack
  .findMany({
    where,
    select: {
      type: true,
      id: true,
      featured: true,
      name: true,
      language: true,
      description: true,
      tags: true,
      likes: true,
      questions: true
    },
    skip,
    take: PAGE_SIZE
  })

    const totalPagePromise = prisma.questionPack.count({
      where
    })

    const [questions, totalPage] = await Promise.all([
      questionsPromise,
      totalPagePromise
    ])

    if (!questions) {
      return NextResponse.json(
        { message: 'No questions found!' },
        { status: 404 }
      )
    }

    const questionsWithCounts = questions.map((question) => ({
      ...question,
      questions: question.questions.length
    }))

    return NextResponse.json(
      { data: questionsWithCounts, totalPages: Math.floor(totalPage / PAGE_SIZE) === 0 ? 1 : Math.floor(totalPage / PAGE_SIZE) },
      { status: 200 }
    )
}
