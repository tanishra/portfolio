export const personal = {
  name: 'Tanish Rajput',
  title: 'AI Engineer',
  taglines: [
    'Shipping agents that do real work',
    'Voice AI, wired for production',
    'LLM systems that outlast the demo',
    'Orchestration over wrappers',
  ],
  bio: `I build AI systems that survive production — voice agents, orchestration,
and the plumbing that keeps them running.`,
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

export const experience = [
  {
    role: 'AI Engineer',
    company: 'QualtechEdge',
    companyUrl: process.env.NEXT_PUBLIC_QUALTECHEDGE_URL || 'https://www.qualtechedge.ai',
    period: 'Nov 2025 – Present',
    type: 'Full-time',
    logoUrl: 'https://www.qualtechedge.ai/wp-content/uploads/elementor/thumbs/qualtech-logo-rccwi4i2gzan7mai6ylod52e47feld8r2hdv34smbk.png',
    productUrl: 'https://frida.qualtechedge.in',
    agents: [
      { name: 'Basil', desc: 'deepagent multi-agent system — builds frida workflows via natural language' },
      { name: 'Zeus',  desc: 'context-driven frida variant built on langchain' },
      { name: 'Lip-Sync Svc', desc: 'lip-movement tracking, multi-user presence + fraud detection — cross-team product' },
    ],
    description: [
      'Architected FRIDA — a config-driven agent platform where user-designed workflows stored in Postgres compile into LangGraph agent graphs at runtime; one service powers parallel voice agents across loan, insurance, and other domains.',
      'Built the agent runtime end-to-end: input normalization, provider-agnostic LLM calls, tool execution through a middleware bridge, and a Postgres checkpointer enabling pause/resume sessions across text and voice.',
      'Shipped multilingual voice agents on LiveKit with Sarvam AI STT/TTS, containerized on AWS, with full observability (OpenTelemetry, Langfuse, Prometheus/Grafana) and DeepEval-based evaluation for task completion and faithfulness.'
    ],
    tech: [
      { name: 'Python',     usage: 'core service language' },
      { name: 'LangChain',  usage: 'llm orchestration base' },
      { name: 'LangGraph',  usage: 'agent graph runtime — frida core' },
      { name: 'FastAPI',    usage: 'http layer + sse streaming' },
      { name: 'Sarvam AI',  usage: 'indic stt/tts for voice agents' },
      { name: 'LiveKit',    usage: 'realtime voice transport' },
      { name: 'OpenAI',     usage: 'primary llm provider' },
      { name: 'PostgreSQL', usage: 'configs · sessions · checkpoints' },
      { name: 'Redis',      usage: 'cache + celery broker' },
      { name: 'Celery',     usage: 'background jobs + metric flushes' },
      { name: 'Docker',     usage: 'containerized services' },
      { name: 'AWS',        usage: 'production infra' },
    ],
    current: true,
  },
  {
    role: 'Prompt Engineer',
    company: 'Outlier AI',
    companyUrl: process.env.NEXT_PUBLIC_OUTLIER_AI_URL || 'https://outlier.ai',
    period: 'Mar 2025 – May 2025',
    type: 'Freelance',
    logoUrl: 'https://app.outlier.ai/static/img/outlier/logo.svg',
    description: [
      'Designed and optimized LLM prompts to improve model performance across diverse structured tasks.',
      'Evaluated AI-generated outputs for accuracy, relevance, and clarity, contributing to iterative response improvements.',
      'Collaborated with engineers and researchers to refine prompt templates and enhance output consistency.'
    ],
    tech: [
      { name: 'Prompt Engineering', usage: 'cross-task prompt optimization' },
      { name: 'LLM Evaluation',     usage: 'output scoring + qa' },
      { name: 'RLHF',               usage: 'preference feedback loops' },
    ],
    current: false,
  },
  {
    role : "Software Engineer",
    company : "Microsoft",
    companyUrl: process.env.NEXT_PUBLIC_MICROSOFT_URL || 'https://www.microsoft.com/en-in',
    period : 'June 2024 - August 2024',
    type : "Internship",
    logoUrl: 'https://cdn.brandfetch.io/idchmboHEZ/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B',
    description : [
      'Developed an audio creation panel for Microsoft Designer using React and Fluent UI v9, enabling audio generation and MP4 export.',
      'Improved UI/UX based on feedback, reducing user friction by 20% and enhancing usability.',
      'Worked with Design and Accessibility teams to deliver accessible, WCAG-compliant UI components for production use.'
    ],
    tech : [
      { name: 'React.js',   usage: 'designer audio panel ui' },
      { name: 'Next.js',    usage: 'app framework' },
      { name: 'TypeScript', usage: 'typed components' },
      { name: 'FluentUIv9', usage: 'ms design system' },
      { name: 'Node.js',    usage: 'tooling + scripts' },
      { name: 'WCAG',       usage: 'a11y compliance' },
    ],
    current: false
  }
];

export const skills = {
  languages:      ['Python', 'Java'],
  frameworks:     ['FastAPI', 'Flask', 'LangGraph', 'PipeCat'],
  infrastructure: ['Docker', 'Redis', 'PostgreSQL', 'Supabase', 'Vercel','Neon', 'MongoDB', 'AWS'],
  tools:          ['Git', 'GitHub', 'VS Code', 'Postman', 'Cursor', 'Claude Code', 'Devin', 'Google Antigravity'],
};

export const aiTools = [
  // Core AI
  { name: 'Claude',        description: 'Reasoning & architecture planning',        category: 'LLM' },
  { name: 'ChatGPT',       description: 'Rapid prototyping & research',             category: 'LLM' },
  { name: 'Gemini',        description: 'Multimodal tasks',                         category: 'LLM' },
  
  // Frameworks & Architecture
  { name: 'LangChain',     description: 'LLM orchestration & agents',               category: 'LLM' },
  { name: 'LangSmith',     description: 'LLM observability & tracing',              category: 'Infra' },
  { name: 'Pinecone',      description: 'Vector DB for RAG',                        category: 'Infra' },
  { name: 'Weaviate',      description: 'Hybrid search vector database',            category: 'Infra' },
  
  // Voice
  { name: 'LiveKit',       description: 'Realtime voice infra',                     category: 'Voice' },
  { name: 'ElevenLabs',    description: 'Hyper-realistic TTS',                      category: 'Voice' },
  { name: 'Deepgram',      description: 'Real-time STT for voice pipelines',        category: 'Voice' },
  { name: 'Sarvam AI',     description: 'Indic STT/TTS for voice agents',           category: 'Voice' },
  { name: 'PipeCat',       description: 'Voice agent orchestration framework',      category: 'Voice' },

  // Agents & Eval
  { name: 'DeepAgents',    description: 'LangChain multi-agent lib — powers Basil', category: 'LLM' },
  { name: 'DeepEval',      description: 'Agent eval — task completion, faithfulness', category: 'LLM' },
  { name: 'Mem0',          description: 'Persistent agent memory',                  category: 'Infra' },
  { name: 'Tavily',        description: 'Web grounding for agents',                 category: 'LLM' },
  { name: 'Langfuse',      description: 'LLM observability + traces',               category: 'Infra' },

  // Dev Tools
  { name: 'Cursor',        description: 'AI-first code editor',                     category: 'Dev' },
  { name: 'Claude Code',   description: 'CLI-based coding assistant',               category: 'Dev' },
  { name: 'Devin',         description: 'Autonomous AI coding agent',               category: 'Dev' },
  { name: 'Google Antigravity', description: 'Agentic IDE',                          category: 'Dev' },

  // Automation
  { name: 'n8n',           description: 'Workflow automation with AI integrations', category: 'Auto' },
  { name: 'Zapier',        description: 'No-code automation platform',              category: 'Auto' },
];

export const projects = [
  {
    name: 'ARGUS',
    tagline: 'AI Agent Pre-Action Authorization Gateway & Firewall',
    description:
      'Production-grade pre-action authorization firewall for autonomous AI agents. Instead of input prompt filters, ARGUS intercepts and block threats at the action layer. It dynamically extracts cryptographically signed Intent Manifests using Gemini Flash and enforces strict security policies via a 5-layer pipeline using Llama-Guard and a Lobster Trap proxy. Validated across 2,240 scale-randomized benchmarks with 100% recall.',
    tech: [
      'Python',
      'FastAPI',
      'React',
      'TypeScript',
      'Google Gemini',
      'Llama-Guard',
      'Veea Lobster Trap',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Tailwind CSS',
      'Pytest'
    ],
    github: 'https://github.com/tanishra/argus',
    demo: 'https://argus-nine-opal.vercel.app/',
    featured: true,
    category: 'AI Security',
    image: '/projects/argus.png',
  },
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
