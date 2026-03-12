import connectDB from '@/lib/mongodb';
import Teammate from '@/models/Teammate';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const data = await Teammate.find({}).sort({ createdAt: -1 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newEntry = await Teammate.create(body);
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}