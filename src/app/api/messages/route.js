import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const data = await req.json()
    const newMessage = await prisma.message.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        content: data.content
      }
    })
    return NextResponse.json({ success: true, message: "Data Transmitted" })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}