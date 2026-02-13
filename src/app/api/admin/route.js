import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// --- GET: Fetch items based on type query ---
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // project, education, or skill

  try {
    if (!type) return NextResponse.json({ error: "Type required" }, { status: 400 });
    const items = await prisma[type].findMany({ orderBy: { id: 'desc' } });
    return NextResponse.json(items);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// --- POST: CREATE ---
export async function POST(req) {
  try {
    const { type, data } = await req.json();
    const res = await prisma[type].create({ data });
    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// --- PUT: UPDATE ---
export async function PUT(req) {
  try {
    const { type, id, data } = await req.json();
    
    // Clean data for MySQL
    if (data.gpa) data.gpa = parseFloat(data.gpa);
    if (data.level) data.level = parseInt(data.level);
    if (data.id) delete data.id; 

    const res = await prisma[type].update({
      where: { id: parseInt(id) },
      data: data
    });
    return NextResponse.json(res);
  } catch (e) { 
    return NextResponse.json({ error: e.message }, { status: 500 }); 
  }
}

// --- DELETE: REMOVE ---
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");
    await prisma[type].delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}