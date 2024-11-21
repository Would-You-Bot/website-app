import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'

export async function PUT(request: NextRequest) {
  return NextResponse.json({message: "Put Request"}, {status: 200})
}
