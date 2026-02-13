import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const skills = await prisma.skill.findMany()
  return NextResponse.json(skills)
}