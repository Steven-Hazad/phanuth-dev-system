import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const profile = await prisma.user.findFirst()
  return NextResponse.json(profile)
}