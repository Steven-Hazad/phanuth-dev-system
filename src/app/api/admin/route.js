import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// 1. CREATE (POST)
export async function POST(req) {
  const { type, data } = await req.json();
  try {
    const res = await prisma[type].create({ data });
    return NextResponse.json(res);
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

// 2. UPDATE (PUT)
// Ensure this part exists in your PUT function to handle numbers correctly
export async function PUT(req) {
  const { type, id, data } = await req.json();
  
  // Critical: Convert strings to Numbers for MySQL Int/Float fields
  if (data.gpa) data.gpa = parseFloat(data.gpa);
  if (data.level) data.level = parseInt(data.level);
  if (data.id) delete data.id; // Don't try to update the ID itself

  try {
    const res = await prisma[type].update({
      where: { id: parseInt(id) },
      data: data
    });
    return NextResponse.json(res);
  } catch (e) { 
    return NextResponse.json({ error: e.message }, { status: 500 }); 
  }
}
// 3. DELETE (DELETE)
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  try {
    await prisma[type].delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}