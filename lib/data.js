export const personal = {
  name: 'Tanish Rajput',
  title: 'AI Engineer',
  taglines: [
    'Building Intelligence Systems that Scale',
    'Designing Voice Agents from Scratch',
    'Architecting RAG Pipelines',
    'Turning Ideas into AI Products',
  ],
  bio: `I'm an AI Engineer at QualtechEdge building production-grade LLM systems, 
voice agents, and RAG pipelines — from scratch, no frameworks. 
I obsess over architecture, latency, and making AI actually useful in the real world. 
Currently working toward building AI-powered companies that create massive value.`,
  location: 'Noida, India',
  email: 'tanishrajput9@gmail.com',   
  resumeUrl: '/resume.pdf',
  photo: '/photo.jpg',
};

export const social = {
  github:   'https://github.com/tanishra',
  linkedin: 'https://www.linkedin.com/in/tr26/',
  email:    'mailto:tanishrajput9@gmail.com',
};

export const education = [
  {
    degree: 'B.Tech — Information Technology',
    institution: 'NIET Greater Noida',
    period: '2021 - 2025',
    grade: '9.01 CGPA',
    highlights: [
      'Specialized in AI'
    ],
  },
];

export const experience = [
  {
    role: 'AI Engineer',
    company: 'QualtechEdge',
    period: 'Nov 2025 – Present',
    type: 'Full-time',
    logoUrl: 'https://www.qualtechedge.ai/wp-content/uploads/elementor/thumbs/qualtech-logo-rccwi4i2gzan7mai6ylod52e47feld8r2hdv34smbk.png', 
    description: [
      'Built a production-grade voice-based AI loan advisor using LangGraph, LLMs, LiveKit, and FastAPI to automate end-to-end loan journeys.',
      'Designed a reliable integration system with external and government APIs, implementing retries, validation, and fault-tolerant workflows.',
      'Deployed scalable containerized AI services on AWS and developed the agent’s tool ecosystem for orchestration and decision-making.'
    ],
    tech: ['Python', 'LangGraph', 'FastAPI', 'Redis', 'PostgreSQL', 'LLMs','LiveKit'],
    current: true,
  },
  {
    role: 'Prompt Engineer',
    company: 'Outlier AI',
    period: 'Mar 2025 – May 2025',
    type: 'Freelance',
    logoUrl: 'https://app.outlier.ai/static/img/outlier/logo.svg',
    description: [
      'Designed and optimized LLM prompts to improve model performance across diverse structured tasks.',
      'Evaluated AI-generated outputs for accuracy, relevance, and clarity, contributing to iterative response improvements.',
      'Collaborated with engineers and researchers to refine prompt templates and enhance output consistency.'
    ],
    tech: ['Prompt Engineering', 'LLM Evaluation', 'RLHF'],
    current: false,
  },
  {
    role : "Software Engineer",
    company : "Microsoft",
    period : 'June 2024 - August 2024',
    type : "Internship",
    logoUrl: 'https://cdn.brandfetch.io/idchmboHEZ/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B',
    description : [
      'Developed an audio creation panel for Microsoft Designer using React and Fluent UI v9, enabling audio generation and MP4 export.',
      'Improved UI/UX based on feedback, reducing user friction by 20% and enhancing usability.',
      'Worked with Design and Accessibility teams to deliver accessible, WCAG-compliant UI components for production use.'
    ],
    tech : ['React.js', 'Next.js', 'FluentUIv9', 'Node.js'],
    current: false
  }
];

export const skills = {
  languages:      ['Python', 'Java'],
  frameworks:     ['FastAPI', 'Flask', 'Asyncio', 'Parallelism'],
  infrastructure: ['Docker', 'Redis', 'PostgreSQL', 'Supabase', 'Vercel','Neon', 'MongoDB', 'AWS'],
  tools:          ['Git', 'GitHub', 'VS Code', 'Postman'],
};

export const aiTools = [
  // Core AI
  { name: 'Claude',        description: 'Reasoning & architecture planning',        category: 'LLM' },
  { name: 'ChatGPT',       description: 'Rapid prototyping & research',             category: 'LLM' },
  { name: 'Gemini',        description: 'Multimodal tasks',                         category: 'LLM' },
  
  // Frameworks & Architecture
  { name: 'LangChain',     description: 'LLM orchestration & agents',               category: 'LLM' },
  { name: 'LangSmith',     description: 'LLM observability & tracing',              category: 'LLM' },
  { name: 'Pinecone',      description: 'Vector DB for RAG',                        category: 'Infra' },
  { name: 'Weaviate',      description: 'Hybrid search vector database',            category: 'Infra' },
  { name: 'Docling',       description: 'PDF extraction for RAG pipelines',         category: 'Infra' },
  
  // Voice
  { name: 'LiveKit',       description: 'Realtime voice infra',                     category: 'Voice' },
  { name: 'ElevenLabs',    description: 'Hyper-realistic TTS',                      category: 'Voice' },
  { name: 'Deepgram',      description: 'Real-time STT for voice pipelines',        category: 'Voice' },

  // Dev Tools
  { name: 'Cursor',        description: 'AI-first code editor',                     category: 'Dev' },
  { name: 'Windsurf',      description: 'AI-native IDE for autonomous flows',       category: 'Dev' },
  { name: 'Claude Code',   description: 'CLI-based coding assistant',               category: 'Dev' },

  // Automation
  { name: 'n8n',           description: 'Workflow automation with AI integrations', category: 'Dev' },
  { name: 'Zapier',        description: 'No-code automation platform',              category: 'Dev' },
];

export const projects = [
  {
  name: 'AuthoGraph AI',
  tagline: 'Multi-Agent AI Blog Generation & Publishing Engine',
  description:
    'Production-grade multi-agent content generation platform that transforms a single topic into research-backed, SEO-optimized blog posts in minutes. Built on LangGraph orchestration with parallel agent workflows, real-time web grounding via Tavily, full observability with LangSmith, and multi-platform publishing to Dev.to, Hashnode, Medium, and LinkedIn. Includes AI-generated visuals, social teaser creation, and a credit-based monetization system.',
  tech: [
    'FastAPI',
    'React',
    'TypeScript',
    'LangGraph',
    'LangSmith',
    'OpenAI',
    'Tavily',
    'Supabase',
    'Tailwind CSS',
    'AWS',
    'Razorpay'
  ],
  github: 'https://github.com/tanishra/scribe-flow',
  demo: 'https://scribe-flow-sable.vercel.app/',
  featured: true,
  category: 'AI Platform',
  image: '/projects/authograph.png',
},
  {
  name: 'Taxyn',
  tagline: 'AI-Powered GST & Financial Compliance Automation Platform',
  description:
    'Production-grade AI system for automating Indian financial document processing and GST compliance. It extracts structured data from invoices, bank statements, and tax documents using a hybrid pipeline (pypdf + Google Document AI + GPT-4o-mini), applies deterministic compliance validation for GST/PAN/TAN/IFSC rules, and performs automated reconciliation against GSTR-2A portal data. Built with a multi-layer AgentLoop architecture, async job processing, and vendor-level learning from human corrections, Taxyn enables ERP-ready exports (Tally, Zoho, QuickBooks) from verified financial documents.',
  tech: [
    'Python',
    'FastAPI',
    'OpenAI GPT-4o-mini',
    'Instructor',
    'Google Document AI',
    'pypdf',
    'Pandas',
    'PostgreSQL',
    'Streamlit',
    'Next.js'
  ],
  github: 'https://github.com/tanishra/taxyn',
  demo: 'https://taxyn.vercel.app/',
  featured: true,
  category: 'AI Platform',
  image: '/projects/taxyn.png',
},
{
  name: 'OmniBrief',
  tagline: 'AI-Powered Technical Newsletter for Builders',
  description:
    'Production-grade AI newsletter platform that continuously scans ArXiv, GitHub, Hacker News, Product Hunt, RSS feeds, and Reddit to identify high-signal technical developments. Uses a LangGraph-based intelligence pipeline for deduplication, ranking, and LLM-driven summarization, then synthesizes a single daily technical briefing. Includes full subscription system with email confirmation/unsubscribe flows, PostgreSQL-backed persistence, and automated scheduled delivery via worker pipeline.',
  tech: [
    'Python',
    'FastAPI',
    'Next.js',
    'PostgreSQL',
    'OpenAI GPT-4o',
    'LangGraph',
    'Resend API',
    'Playwright',
    'Docker',
    'Neon DB'
  ],
  github: 'https://github.com/tanishra/OmniBrief',
  demo: 'https://omni-brief.vercel.app/',
  featured: true,
  category: 'AI Platform',
  image: '/projects/omnibrief.png',
},
{
  name: 'ResumeAI',
  tagline: 'Agentic ATS Resume Optimization Engine',
  description:
    'Production-grade AI resume optimization platform that transforms raw resumes into ATS-ready documents using a multi-stage agentic pipeline. Built with Next.js and FastAPI, it processes PDF/DOCX/TXT resumes through sequential LLM agents (Parser, Writer, Refiner, Evaluator) powered by GPT-4o-mini. Includes a grounding and repair engine that validates all generated claims against source documents to prevent hallucinations. Provides real-time SSE streaming updates, ATS scoring feedback, and exports optimized resumes in PDF, DOCX, and JSON formats for job applications.',
  tech: [
    'Next.js',
    'FastAPI',
    'Python',
    'TypeScript',
    'OpenAI GPT-4o-mini',
    'LangChain',
    'Server-Sent Events (SSE)',
    'Docker',
    'PDF Processing',
    'DOCX Processing'
  ],
  github: 'https://github.com/tanishra/resumeai',
  demo: 'https://resume-ai-cmnm.vercel.app/',
  featured: true,
  category: 'AI Platform',
  image: '/projects/resumeai.png',
},
{
  name: 'OCRBridge',
  tagline: 'AI-Powered Receipt Processing for Logistics Workflows',
  description:
    'Lightweight AI document processing pipeline that converts logistics receipts (PDF, images) into structured business data. Uses Gemini Vision for OCR and field extraction, followed by normalization of key logistics attributes like vehicle numbers, weights, and billing amounts. Supports API and Telegram-based ingestion, stores processed results in SQLite, and syncs structured outputs to Google Sheets. Includes optional Razorpay integration for payment link generation and webhook-based automation.',
  tech: [
    'Python',
    'FastAPI',
    'Streamlit',
    'Google Gemini API',
    'SQLite',
    'Google Sheets API',
    'Telegram Bot API',
    'SQLAlchemy',
    'Razorpay'
  ],
  github: 'https://github.com/tanishra/ocr-bridge',
  demo: null,
  featured: true,
  category: 'AI Tool',
  image: '/projects/ocrbridge.png',
},
  {
  name: 'FileBuddy',
  tagline: 'Voice-Controlled AI File Management System',
  description:
    'Production-style voice-driven file management system powered by LiveKit and OpenAI. Enables users to organize, search, create, move, and delete files using natural language voice commands. Includes intelligent file operations such as batch processing, smart search by metadata or content, and automated folder structuring. Built with safety-first design including confirmation prompts, protected system paths, audit logging, and a 24-hour rollback/undo system. Uses Mem0 for persistent contextual memory to improve long-term interaction continuity and responsiveness.',
  tech: [
    'Python',
    'LiveKit',
    'OpenAI GPT-4o-mini',
    'Mem0',
    'Deepgram',
    'uv',
    'Voice AI',
    'Real-time Streaming',
    'File System Automation'
  ],
  github: 'https://github.com/tanishra/file-buddy',
  demo: null,
  featured: true,
  category: 'AI Agent',
  image: '/projects/filebuddy.png',
},
{
  name: 'AI Flight Search Telegram Bot',
  tagline: 'Natural Language Flight Booking Assistant via Telegram',
  description:
    'AI-powered Telegram bot that enables natural language flight search using the Amadeus Flight Offers API. Built with n8n orchestration, it uses GPT-4.1-nano for intent classification and GPT-OSS-120B for structured extraction of travel parameters like origin, destination, date, and passengers. The workflow converts unstructured user messages into valid API requests, fetches real-time flight data, and formats results into user-friendly Telegram responses. Includes conversational handling, fallback prompts for missing data, and modular JavaScript nodes for response parsing and formatting.',
  tech: [
    'n8n',
    'OpenAI GPT-4.1-nano',
    'GPT-OSS-120B',
    'Amadeus API',
    'Telegram Bot API',
    'JavaScript',
    'REST APIs',
    'Workflow Automation'
  ],
  github: 'https://github.com/tanishra/Flight-Search-Bot',
  demo: 'https://t.me/tanish_flight_bot',
  featured: true,
  category: 'AI Automation',
  image: '/projects/flightbot.png',
},
{
  name: 'LinkedIn Post Automation (n8n)',
  tagline: 'AI-Powered Automated LinkedIn Content & Reporting Pipeline',
  description:
    'Production automation workflow built with n8n that streamlines LinkedIn content publishing from Google Sheets. Uses Gemini-2.5-flash to generate long-form LinkedIn posts from short descriptions, publishes content via LinkedIn API, and maintains end-to-end tracking through Google Sheets. Automatically generates CSV reports with post metadata, uploads them to Google Drive, and sends success/failure email notifications. Designed for marketers and creators to automate consistent LinkedIn content distribution with minimal manual effort.',
  tech: [
    'n8n',
    'Google Sheets API',
    'Google Drive API',
    'LinkedIn API',
    'Gemini 2.5 Flash',
    'SMTP Email',
    'JavaScript',
    'Workflow Automation',
    'OAuth2'
  ],
  github: 'https://github.com/tanishra/Linkedin-Post-Automation',
  demo: null,
  featured: true,
  category: 'Automation',
  image: '/projects/linkedin-automation.png',
}
];