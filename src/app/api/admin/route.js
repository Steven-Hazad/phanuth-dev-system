import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  const body = await request.json();
  const { type, data } = body; // 'type' tells us which table (project, education, skill)

  try {
    let result;
    if (type === "project") result = await prisma.project.create({ data });
    if (type === "education") result = await prisma.education.create({ data });
    if (type === "skill") result = await prisma.skill.create({ data });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}