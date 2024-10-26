import { PackData, PackType } from '@/app/packs/create/_components/PackForm';
import { getAuthTokenOrNull } from '@/helpers/oauth/helpers';
import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  return NextResponse.json({message: "Get Request"}, {status: 200})
}

export async function POST(request: NextRequest) {

  const data: PackData = await request.json()

  const { packSchema } = (await import('@/utils/zod/schemas'))

  const parsedPackResult = packSchema.safeParse(data)

  if(!parsedPackResult.success) {
    return NextResponse.json({success: false, error: parsedPackResult.error.issues}, { status: 400 })
  }

  const tokenData = await getAuthTokenOrNull()
  
  type Questions = {
    id: string,
    question: string,
    type: Exclude<PackType, 'mixed'>
  }

  const {type, name, description, tags, questions: preProcessedQuestion} = data;
  // Add some logic so whenever the main type is = to mixed the others have different types but when its set to anything else all questions need to have the same type

  const questions: Questions[] = []

  for (const question of preProcessedQuestion) {
    console.log(question)
    questions.push({
      id: uuidv4(),
      question,
      type: type === 'mixed' ? questionData.type : packType
    })
  }

    const newPack = await prisma.questionPack.create({
    data: {
      type,
      name,
      description,
      tags,
      featured: false,
      likes: [`${tokenData?.payload.id}`],
      questions
    }
  }).catch((err: Error) => {
      return NextResponse.json({message: "Error creating a database entry for the pack, please contact the support!", error: err.message}, {status: 500})
  })
  return NextResponse.json({message: "New pack creation successfully!", data: newPack}, {status: 200})
}
