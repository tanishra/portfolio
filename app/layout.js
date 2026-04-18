import './globals.css';

export const metadata = {
  title: 'Tanish Rajput',
  description: 'AI Engineer specializing in LLM systems, voice agents, and production-grade RAG pipelines.',
  keywords: ['AI Engineer','LLM','Voice Agent','RAG','LangGraph','Python','Tanish Rajput','Generative AI','Agentic AI'],
  authors: [{ name: 'Tanish Rajput' }],
  metadataBase: new URL('https://tanishrajput.dev'),
  openGraph: {
    title: 'Tanish Rajput — AI Engineer',
    description: 'AI Engineer specializing in LLM systems, voice agents, and RAG pipelines.',
    url: 'https://tanishrajput.dev',
    siteName: 'Tanish Rajput',
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Tanish Rajput — AI Engineer' },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }], shortcut: '/favicon.svg' },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: '#FAFAF8', colorScheme: 'light' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
