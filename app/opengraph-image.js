import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size  = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#080B12',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow blobs */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '20%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Status chip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 8,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 14, color: '#6B7280', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              AI Engineer · Available
            </span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              lineHeight: 1,
              color: '#F0F4FF',
              letterSpacing: '-2px',
            }}
          >
            Tanish{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Rajput
            </span>
          </div>

          {/* Role */}
          <div style={{ fontSize: 28, color: '#9CA3AF', fontWeight: 400, marginTop: 4 }}>
            Building LLM systems · Voice agents · RAG pipelines
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            {['Python', 'LangGraph', 'FastAPI', 'Next.js', 'Groq', 'ElevenLabs'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  border: '1px solid rgba(0,212,255,0.25)',
                  background: 'rgba(0,212,255,0.08)',
                  color: '#00D4FF',
                  fontFamily: 'monospace',
                  fontSize: 14,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 80,
            fontFamily: 'monospace',
            fontSize: 18,
            color: '#374151',
          }}
        >
          tanish.dev
        </div>

        {/* Corner T logo */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 80,
            width: 60,
            height: 60,
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
            border: '1px solid rgba(0,212,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            fontWeight: 900,
            color: '#00D4FF',
          }}
        >
          T
        </div>
      </div>
    ),
    { ...size }
  );
}
