<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:111111,100:C4614A&height=180&section=header&text=Portfolio&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=38" alt="Tanish Rajput Portfolio Banner" />
  <p><strong>Professional Portfolio of Tanish Rajput</strong></p>
  <p>An interactive technical asset engineered to showcase production-grade LLM systems, low-latency voice orchestration, and complex agentic workflows.</p>
  <p>
    <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
      <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    </a>
    <a href="https://livekit.io/" target="_blank" rel="noreferrer">
      <img src="https://img.shields.io/badge/LiveKit-002CF2?style=for-the-badge&logo=livekit&logoColor=white" alt="LiveKit" />
    </a>
    <a href="https://langchain.com/" target="_blank" rel="noreferrer">
      <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=chainlink&logoColor=white" alt="LangChain" />
    </a>
    <a href="https://threejs.org/" target="_blank" rel="noreferrer">
      <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
    </a>
    <a href="https://framer.com/motion" target="_blank" rel="noreferrer">
      <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    </a>
    <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
      <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    </a>
  </p>
</div>

---

## Core Capabilities
This portfolio is engineered to move beyond static documentation, serving as a live environment for **latency optimization, observability, and systems architecture**:

*   **[Friday](https://github.com/tanishra/friday)** Voice Persona: A real-time AI assistant built using LiveKit, Deepgram and OpenAI. Features sub-second response times, bilingual support (EN/HI), and remote site navigation — Friday can scroll the page via LiveKit data channels.
*   **Experience Timeline:** Sticky year markers with a vertical "Stack DNA" rail mapping each role to its technology stack.
*   **Cinema Hero Gallery:** Full-visibility project deep-dives with brand-accurate technical tagging and vertical-stacked modal layouts.
*   **Activity Heatmap:** Live data-driven activity tracking via GitHub contribution data, styled with a signature terracotta palette and a persistent zero-setup hit counter.
*   **Performance-First Design:** GPU-accelerated rendering and hardware-optimized CSS to ensure zero-stutter interactions and high-frame-rate animations.
*   **Secure Communication:** Production-ready contact API powered by Resend, featuring professional notification templates for direct recruitment inquiries.

---

## Architecture
The system utilizes a "Stateless UI / Stateful Intelligence" architecture to minimize client-side overhead while maximizing AI response speed.

```mermaid
graph TD
    UI[Next.js Frontend] -- POST --> TB["/api/friday-token Bridge"]
    TB --> BE[Friday Backend]
    UI -- WebRTC --> LK[LiveKit Room]
    
    subgraph Voice Pipeline
    LK --> Agent[Friday Agent]
    Agent --> DG[Deepgram STT]
    DG --> LLM[LLM]
    LLM --> TTS[TTS]
    Agent -- Data Channel --> UI
    end
    
    subgraph System Data
    UI --> GH[GitHub Contributions API]
    UI --> VC[Visitor Badge Counter]
    end
    
    subgraph Communications
    UI -- POST --> RS[Resend Contact API]
    RS --> Email[(Personal Inbox)]
    end
```

---

## Tech Stack
*   **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion, Three.js, Lenis.
*   **AI/Intelligence:** LiveKit (Realtime transport), Deepgram (STT), ElevenLabs (TTS), OpenAI (LLMs).
*   **Infrastructure:** Resend (SMTP), Vercel (CD/CI), Visitor Badge (Analytics).
*   **Design Tokens:** Fraunces (Display), Inter (Sans), JetBrains Mono (Technical).

---

## Quick Start

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/tanishra/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
# Voice Agent (Friday backend that mints LiveKit tokens)
FRIDAY_BACKEND_URL=your_friday_backend_url

# Contact System
RESEND_API_KEY=re_your_resend_key
CONTACT_EMAIL=your_email@example.com

# Experience Company Links
NEXT_PUBLIC_QUALTECHEDGE_URL=https://www.qualtechedge.ai
NEXT_PUBLIC_OUTLIER_AI_URL=https://outlier.ai
NEXT_PUBLIC_MICROSOFT_URL=https://www.microsoft.com/en-in
```

### 3. Execution
```bash
npm run dev
```

---

<div align="center">
  <p>Designed and Developed by <b>Tanish Rajput</b></p>
  <a href="https://linkedin.com/in/tr26">LinkedIn</a> • <a href="https://github.com/tanishra">GitHub</a>
</div>
