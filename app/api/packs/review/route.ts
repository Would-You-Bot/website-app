import { NextResponse, type NextRequest } from 'next/server'


// Get all packs left to review
export async function GET() {
  return NextResponse.json({message: "Get Request"}, {status: 200})
}
// Review a pack should just be a boolean and an id
export async function PUT(request: NextRequest) {
  return NextResponse.json({message: "Put Request"}, {status: 200})
}
