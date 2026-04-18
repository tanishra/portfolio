import { NextResponse } from 'next/server';

/**
 * Visitor counter using dwyl hits API (Zero Setup).
 */
export async function POST() {
  try {
    // We use a unique key for your portfolio
    const identifier = 'tanish-rajput-portfolio-v1';
    
    const res = await fetch(`https://hits.dwyl.com/tanishra/${identifier}.json`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });

    if (!res.ok) throw new Error('Counter service unavailable');

    const data = await res.json();
    
    // The dwyl API returns the count in the 'message' field as a string
    const count = parseInt(data.message, 10) || 0;

    return NextResponse.json({ count });
  } catch (err) {
    console.error('[Visitor Counter Error]:', err.message);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}

export async function GET() {
  return POST();
}
