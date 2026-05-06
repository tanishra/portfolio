import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const BADGE_URL = 'https://visitor-badge.laobi.icu/badge?page_id=tanishra.portfolio';

async function fetchVisitorCount() {
  const res = await fetch(BADGE_URL, {
    method: 'GET',
    headers: {
      Accept: 'image/svg+xml,text/plain,*/*',
      'User-Agent': 'tanish-portfolio-visitor-counter',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Badge counter request failed: ${res.status} ${body}`);
  }

  const svg = await res.text();
  const matches = [...svg.matchAll(/<text\b[^>]*>([\d,]+)<\/text>/g)];
  const countText = matches.at(-1)?.[1]?.replace(/,/g, '');
  const count = Number(countText);

  if (!Number.isFinite(count)) {
    throw new Error('Badge counter response did not include a numeric count');
  }

  return count;
}

export async function POST() {
  try {
    const count = await fetchVisitorCount();
    return NextResponse.json({ count });
  } catch (err) {
    console.error('[Visitor Counter Error]:', err.message);
    return NextResponse.json(
      { error: 'Visitor counter unavailable' },
      { status: 503 }
    );
  }
}

export async function GET() {
  return POST();
}
