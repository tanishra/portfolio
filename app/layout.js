import './globals.css';
import JsonLd from '../components/JsonLd';

export const metadata = {
  title: {
    default: 'Tanish Rajput — AI Engineer (Voice Agents & LLM Systems)',
    template: '%s | Tanish Rajput',
  },
  description:
    'Tanish Rajput — AI Engineer building production voice agents and agentic systems at QualtechEdge. LangGraph, LiveKit, multi-agent orchestration, observability, evals.',
  keywords: [
    'Tanish Rajput', 'AI Engineer', 'Voice AI Engineer', 'agentic AI',
    'LangGraph', 'LiveKit', 'LLM systems', 'multi-agent systems',
    'Tanish Rajput portfolio', 'AI Engineer India',
  ],
  authors: [{ name: 'Tanish Rajput', url: 'https://www.tanish.website' }],
  creator: 'Tanish Rajput',
  metadataBase: new URL('https://www.tanish.website'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Tanish Rajput — AI Engineer',
    description: 'AI Engineer building production voice agents and agentic systems — LangGraph, LiveKit, multi-agent orchestration.',
    url: 'https://www.tanish.website',
    siteName: 'Tanish Rajput',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tanish Rajput — AI Engineer',
    description: 'AI Engineer building production voice agents and agentic systems.',
  },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }], shortcut: '/favicon.svg' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport = { themeColor: '#FAFAF8', colorScheme: 'light' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
      </head>
      <body>
        <noscript>
          <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'monospace', color: '#525252' }}>
            This site needs JavaScript — enable it to view the portfolio.
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
