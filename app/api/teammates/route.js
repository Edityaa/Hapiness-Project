import { NextResponse } from 'next/server';

// In-memory storage (acts like temporary database)
let teammates = [];

// GET all teammates
export async function GET() {
  try {
    return NextResponse.json(teammates);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// ADD teammate
export async function POST(req) {
  try {
    const body = await req.json();

    const newEntry = {
      ...body,
      id: Date.now(),
      createdAt: new Date()
    };

    teammates.unshift(newEntry);

    return NextResponse.json(newEntry, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
