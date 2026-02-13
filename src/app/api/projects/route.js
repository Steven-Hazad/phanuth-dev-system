import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET: Fetch all projects
export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { id: 'desc' } })
  return NextResponse.json(projects)
}

// POST: Add a new project
export async function POST(request) {
  const body = await request.json()
  const newProject = await prisma.project.create({
    data: {
      title: body.title,
      category: body.category,
      description: body.description,
      techStack: body.techStack,
      status: body.status,
    }
  })
  return NextResponse.json(newProject)
}