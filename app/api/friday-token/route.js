import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const backendUrl = process.env.FRIDAY_BACKEND_URL;
    
    if (!backendUrl) {
      return NextResponse.json({ error: "FRIDAY_BACKEND_URL not set in .env" }, { status: 500 });
    }

    const res = await fetch(`${backendUrl}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity: "visitor" }),
    });

    if (!res.ok) throw new Error("Failed to fetch token from backend");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[Token Bridge Error]:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
