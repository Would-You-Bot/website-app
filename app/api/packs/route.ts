import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'

export async function GET() {
 const token = await getAuthTokenOrNull()
 if(token === null) {
  return Response.json({success: false, error: "Unauthorized"}, { status: 401 })
 }
  return Response.json({message: "Get Request", token})
}

export async function POST(request: Request) {

  const data = await request.json()

  const { packSchema } = (await import('@/utils/zod/schemas'))

  const parsedPackResult = packSchema.safeParse(data)

  if(!parsedPackResult.success) {
    return Response.json({success: false, error: parsedPackResult.error.issues}, { status: 400 })
  }
  return Response.json({message: "Post Request", data},)
}
