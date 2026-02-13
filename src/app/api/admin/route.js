import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

function normalizeData(data) {
  const clean = { ...data };
  // Handle achievements naming safety
  if (clean.achievements && !clean.achievement) {
    clean.achievement = clean.achievements;
    delete clean.achievements;
  }
  if (clean.gpa) clean.gpa = parseFloat(clean.gpa);
  if (clean.level) clean.level = parseInt(clean.level);
  if (clean.id) delete clean.id;
  return clean;
}

export async function GET(req) {
  const type = new URL(req.url).searchParams.get("type");
  try {
    const items = await prisma[type].findMany({ orderBy: { id: 'desc' } });
    return NextResponse.json(items);
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function POST(req) {
  try {
    const { type, data } = await req.json();
    const res = await prisma[type].create({ data: normalizeData(data) });
    return NextResponse.json(res);
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function PUT(req) {
  try {
    const { type, id, data } = await req.json();
    const res = await prisma[type].update({
      where: { id: parseInt(id) },
      data: normalizeData(data)
    });
    return NextResponse.json(res);
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    await prisma[searchParams.get("type")].delete({ where: { id: parseInt(searchParams.get("id")) } });
    return NextResponse.json({ success: true });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}