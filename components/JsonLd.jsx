const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.tanish.website/#person',
  name: 'Tanish Rajput',
  url: 'https://www.tanish.website',
  image: 'https://www.tanish.website/photo.jpg',
  jobTitle: 'AI Engineer',
  worksFor: { '@type': 'Organization', name: 'QualtechEdge', url: 'https://frida.qualtechedge.in' },
  nationality: { '@type': 'Country', name: 'India' },
  knowsAbout: [
    'Agentic AI', 'Voice AI', 'LangGraph', 'LangChain', 'LiveKit',
    'Multi-agent systems', 'LLM orchestration', 'LLM observability', 'RAG',
  ],
  sameAs: [
    'https://github.com/tanishra',
    'https://www.linkedin.com/in/tr26/',
    'mailto:tanishrajput9@gmail.com',
  ],
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.tanish.website/#website',
  name: 'Tanish Rajput — AI Engineer',
  url: 'https://www.tanish.website',
  author: { '@id': 'https://www.tanish.website/#person' },
};

export default function JsonLd() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
