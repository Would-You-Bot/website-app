import { PackData, PackType } from '@/app/packs/create/_components/PackForm'
import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const PAGE_NUMBER = parseInt(searchParams.get('page') || '1')
  const TYPE = searchParams.get('type') || ''
  const PAGE_SIZE = 15

  const skip = (PAGE_NUMBER - 1) * PAGE_SIZE

  const where = {
    pending: false,
    ...(TYPE && ['wouldyourather', 'neverhaveiever', 'whatwouldyoudo', 'truth', 'dare', 'topic', 'mixed'].includes(TYPE) && { type: TYPE as PackType })
  };

  const questionsPromise = prisma.questionPack
  .findMany({
    where,
    select: {
      type: true,
      id: true,
      name: true,
      description: true,
      tags: true,
      likes: true,
      questions: true
    },
    skip,
    take: PAGE_SIZE
  })

    const totalPagePromise = prisma.questionPack.count({
      where: {
        pending: false
      }
    })

    const [questions, totalPage] = await Promise.all([
      questionsPromise,
      totalPagePromise
    ])

    console.log(questions)

    if (!questions) {
      return NextResponse.json(
        { message: 'No questions found!' },
        { status: 404 }
      )
    }

    const questionsWithCounts = questions.map((question) => ({
      ...question,
      likes: question.likes.length,
      questions: question.questions.length
    }))

  return NextResponse.json(
    { data: questionsWithCounts, pages: Math.floor(totalPage / PAGE_SIZE) === 0 ? 1 : Math.floor(totalPage / PAGE_SIZE) },
    { status: 200 }
  )
}

export async function POST(request: NextRequest) {
  const data: PackData = await request.json()

  const { packSchema } = await import('@/utils/zod/schemas')

  const parsedPackResult = packSchema.safeParse(data)

  if (!parsedPackResult.success) {
    return NextResponse.json(
      { error: parsedPackResult.error.issues },
      { status: 400 }
    )
  }

  const tokenData = await getAuthTokenOrNull()

  type Questions = {
      id: string
      question: string
      type: Exclude<PackType, 'mixed'>
  }

  const {
    type,
    name,
    description,
    tags,
    questions: preProcessedQuestions
  } = data

  const questions: Questions[] = []

  for (const question of preProcessedQuestions) {
    console.log(question)
    questions.push({
        id: uuidv4(),
        type: type === 'mixed' ? question.type : type,
        question: question.question
    })
  }

  if (!tokenData?.payload.id) {
    return NextResponse.json(
      { message: 'You need to be logged in to create a pack!' },
      { status: 401 }
    )
  }

  console.log(questions)

  const newPack = await prisma.questionPack
    .create({
      data: {
        authorId: tokenData?.payload.id,
        type,
        name,
        description,
        tags,
        featured: false,
        likes: [`${tokenData?.payload.id}`],
        questions,
        pending: false
      }
    })
    .catch((err: Error) => {
      return NextResponse.json(
        {
          message:
            'Error creating a database entry for the pack, please contact the support!',
          error: err.message
        },
        { status: 500 }
      )
    })
   

    console.log(newPack)
    // @ts-ignore If the pack creation fails, return a 500 status code
    if(newPack.status === 500) {
      return NextResponse.json(
        { message: 'Error creating a database entry for the pack, please contact the support!' },
        { status: 500 }
      )
    }

  return NextResponse.json(
    { message: 'New pack creation successfully!', data: newPack },
    { status: 200 }
  )
}
