import { NextResponse } from 'next/server';

// Cache responses for 1 hour to avoid hammering GitHub's API
const cache = new Map(); // { username: { data, timestamp } }
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username')?.trim();

  if (!username || !/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
    return NextResponse.json({ error: 'Invalid username' }, { status: 400 });
  }

  // Return cached response if fresh
  const cached = cache.get(username);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data, {
      headers: { 'X-Cache': 'HIT', 'X-Cache-Age': String(Math.floor((Date.now() - cached.timestamp) / 1000)) },
    });
  }

  try {
    // ── Strategy 1: GitHub contribution graph via jogruber's public API
    //    (parses GitHub's SVG contribution graph — no auth needed, reliable)
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        headers: { 'User-Agent': 'portfolio-contributions-fetcher' },
        next: { revalidate: 3600 }, // Next.js cache hint
      }
    );

    if (!res.ok) throw new Error(`jogruber API: ${res.status}`);
    const json = await res.json();

    // Response shape: { total: { YYYY: N }, contributions: [{ date, count, level }] }
    if (!json.contributions || !Array.isArray(json.contributions)) {
      throw new Error('Unexpected API shape');
    }

    const data = {
      contributions: json.contributions.map((c) => ({
        date:  c.date,
        count: c.count,
        level: c.level,
      })),
      total: json.total,
    };

    cache.set(username, { data, timestamp: Date.now() });

    return NextResponse.json(data, {
      headers: {
        'X-Cache': 'MISS',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (primaryErr) {
    console.warn('[GitHub Contributions] Primary fetch failed:', primaryErr.message);

    // ── Strategy 2: Scrape GitHub's contribution graph directly via their SVG endpoint
    try {
      const svgRes = await fetch(
        `https://github.com/users/${username}/contributions`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } }
      );

      if (!svgRes.ok) throw new Error(`GitHub SVG: ${svgRes.status}`);
      const svgText = await svgRes.text();

      // Parse <rect data-date="YYYY-MM-DD" data-count="N" .../>
      const pattern = /data-date="(\d{4}-\d{2}-\d{2})"\s[^>]*data-count="(\d+)"/g;
      const contributions = [];
      let match;
      while ((match = pattern.exec(svgText)) !== null) {
        contributions.push({ date: match[1], count: parseInt(match[2], 10) });
      }

      if (contributions.length === 0) throw new Error('No data extracted from SVG');

      const data = { contributions, total: {} };
      cache.set(username, { data, timestamp: Date.now() });

      return NextResponse.json(data, {
        headers: { 'X-Cache': 'MISS-FALLBACK' },
      });
    } catch (fallbackErr) {
      console.error('[GitHub Contributions] All strategies failed:', fallbackErr.message);
      return NextResponse.json(
        { error: 'Failed to fetch GitHub contributions', detail: fallbackErr.message },
        { status: 502 }
      );
    }
  }
}
