import { NextResponse, type NextRequest } from 'next/server'

export async function GET() {
  return NextResponse.json({message: "Get Request"}, {status: 200})
}

export async function POST(request: NextRequest) {

  const data = await request.json()

  const { packSchema } = (await import('@/utils/zod/schemas'))

  const parsedPackResult = packSchema.safeParse(data)

  if(!parsedPackResult.success) {
    return NextResponse.json({success: false, error: parsedPackResult.error.issues}, { status: 400 })
  }
  return NextResponse.json({message: "Post Request", data}, {status: 200})
}
