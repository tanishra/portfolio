export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'Amazonbot', 'cohere-ai', 'OAI-SearchBot'],
        allow: '/',
      },
    ],
    sitemap: 'https://www.tanish.website/sitemap.xml',
    host: 'https://www.tanish.website',
  };
}
