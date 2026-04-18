'use client';

import { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { skills, aiTools } from '../lib/data';

const techMeta = {
  // Languages
  Python:     { icon: 'logos:python',           color: '#3776AB' },
  Java:       { icon: 'logos:java',             color: '#ED8B00', label: 'Java' },
  
  // AI / ML Core
  'LLMs (OpenAI, Claude, Gemini, Groq, Mistral, DeepSeek, Sarvam, Moonshot, Llamma)': { icon: 'logos:openai-icon', color: '#10A37F', label: 'LLMs' },
  'LangChain / LangGraph':         { si: 'langchain', color: '#1C3C3C', label: 'LangChain' },
  'RAG Pipelines':      { icon: 'fluent:brain-circuit-24-filled', color: '#C4614A', label: 'RAG' },
  'Prompt Engineering': { icon: 'fluent:chat-bubbles-question-24-filled', color: '#92400E', label: 'Prompting' },
  'Context Engineering':{ icon: 'fluent:layer-24-filled', color: '#6366F1', label: 'Context' },
  'Vector Databases':   { icon: 'logos:pinecone-icon', color: '#00B388', label: 'Vector DBs' },
  'Embeddings':         { icon: 'fluent:database-link-24-filled', color: '#4285F4', label: 'Embeddings' },
  'Fine-tuning LLMs':   { icon: 'fluent:wrench-settings-24-filled', color: '#059669', label: 'Fine-tuning' },
  'Agentic AI':         { icon: 'fluent:bot-24-filled', color: '#C4614A', label: 'Agents' },
  MCP:                  { icon: 'fluent:connector-24-filled', color: '#525252', label: 'MCP' },
  
  // Backend & Core
  FastAPI:    { icon: 'logos:fastapi',          color: '#009688' },
  Flask:      { icon: 'logos:flask',            color: '#000000' },
  Asyncio:    { icon: 'logos:python',           color: '#3776AB', letter: '⚡' },
  Parallelism:{ icon: 'logos:python',           color: '#3776AB', letter: '◈' },
  CrewAI:     { si: 'crewai',           color: '#FF4B4B', label: 'CrewAI' },
  'LangChain': { si: 'langchain',       color: '#1C3C3C' },
  'LangGraph': { si: 'langchain',       color: '#1C3C3C' },

  // Infrastructure & Cloud
  Docker:     { icon: 'logos:docker-icon',      color: '#2496ED' },
  Redis:      { icon: 'logos:redis',            color: '#DC382D' },
  PostgreSQL: { icon: 'logos:postgresql',       color: '#336791' },
  Supabase:   { icon: 'logos:supabase-icon',    color: '#3ECF8E' },
  Vercel:     { icon: 'logos:vercel-icon',      color: '#111111' },
  Neon:       { icon: 'logos:neon-icon',        color: '#00E599' },
  MongoDB:    { icon: 'logos:mongodb-icon',     color: '#47A248' },
  AWS:        { icon: 'logos:aws',              color: '#FF9900' },
  
  // Tools
  Git:        { icon: 'logos:git-icon',         color: '#F05032' },
  GitHub:     { icon: 'logos:github-icon',      color: '#111111' },
  'VS Code':  { icon: 'logos:visual-studio-code', color: '#007ACC' },
  Postman:    { icon: 'logos:postman-icon',     color: '#FF6C37' },

  // AI Ecosystem Tools
  Cursor:     { si: 'cursor',            color: '#111111', label: 'Cursor' },
  Claude:     { icon: 'logos:claude-icon',      color: '#D97757' },
  ChatGPT:    { icon: 'logos:openai-icon',      color: '#10A37F' },
  Gemini:     { icon: 'logos:google-gemini',    color: '#4285F4' },
  Groq:       { si: 'groq',              color: '#F55036' },
  ElevenLabs: { si: 'elevenlabs',        color: '#111111' },
  Deepgram:   { si: 'deepgram',          color: '#13EF95' },
  Pinecone:   { icon: 'logos:pinecone-icon',    color: '#00B388' },
  LangSmith:  { si: 'langchain',       color: '#1C3C3C' },
  LiveKit:    { si: 'livekit',           color: '#002CF2' },
  Docling:    { icon: 'fluent:document-pdf-24-filled', color: '#C4614A' },
  Windsurf:   { si: 'windsurf',          color: '#09B3AF' },
  'Claude Code': { icon: 'logos:claude-icon',    color: '#D97757' },
  'Codex CLI':   { icon: 'logos:openai-icon',    color: '#10A37F' },
  'Gemini CLI':  { icon: 'logos:google-gemini',  color: '#4285F4' },
  LangFuse:   { icon: 'fluent:flash-24-filled', color: '#000000' },
  'Google Stitch': { icon: 'logos:google-icon',   color: '#4285F4' },
  'Google Pomeli': { icon: 'logos:google-icon',   color: '#4285F4' },
  'Google Antigravity': { icon: 'logos:google-icon', color: '#4285F4' },
  n8n:        { si: 'n8n',             color: '#FF6D5A' },
  Zapier:     { icon: 'logos:zapier-icon',      color: '#FF4F00' },
  ChromaDB:   { icon: 'logos:chroma-icon',      color: '#FFCC33' },
  Weaviate:   { icon: 'logos:weaviate-icon',    color: '#00D09F' },
};

const skillCategories = [
  { key: 'languages',      label: 'Languages',      accent: '#3776AB' },
  { key: 'frameworks',     label: 'Backend & Core', accent: '#009688' },
  { key: 'infrastructure', label: 'Cloud & Data',   accent: '#DC382D' },
  { key: 'tools',          label: 'Workflow',       accent: '#525252' },
];

const toolCategories = [
  { key: 'All',   label: 'All Tools', accent: '#111111' },
  { key: 'LLM',   label: 'Reasoning', accent: '#C4614A' },
  { key: 'Voice', label: 'Voice AI',  accent: '#10A37F' },
  { key: 'Infra', label: 'Infra',     accent: '#1a7a4a' },
  { key: 'Dev',   label: 'Dev Tools', accent: '#111111' },
];

function SkillCard({ name, index, isTool = false, description = "" }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  const meta = techMeta[name] || { icon: null, color: '#525252' };
  const label = meta.label || name;
  const color = meta.color;
  
  const iconUrl = useMemo(() => {
    if (imgError) return null;
    if (meta.sk) return `https://skillicons.dev/icons?i=${meta.sk}`;
    if (meta.si) return `https://cdn.simpleicons.org/${meta.si}/${(meta.color || '111111').replace('#','')}`;
    if (meta.icon) return `https://api.iconify.design/${meta.icon}.svg`;
    return null;
  }, [meta, imgError]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group p-5 rounded-2xl border transition-all duration-500 overflow-hidden cursor-default bg-white ${isTool ? 'min-h-[140px]' : ''}`}
      style={{ borderColor: isHovered ? `${color}40` : 'var(--border)' }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, ${color}12, transparent)` }} />

      <div className={`relative z-10 flex ${isTool ? 'flex-col items-start text-left' : 'flex-col items-center text-center'} gap-4`}>
        <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-[#F4F2EE] group-hover:bg-white transition-colors duration-300 shadow-sm border border-transparent group-hover:border-[#E8E6E0]`}>
          {iconUrl ? (
            <img 
              src={iconUrl} 
              alt={label} 
              className="w-7 h-7 object-contain group-hover:scale-110 transition-all duration-300"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-xl font-display font-bold" style={{ color }}>{meta.letter || label.charAt(0)}</span>
          )}
        </div>
        <div className="w-full">
          <h4 className="font-body text-[13px] font-semibold text-[#111111]">{label}</h4>
          {isTool && description && (
             <p className="font-body text-[11px] text-[#A3A3A3] mt-1 leading-tight line-clamp-2">{description}</p>
          )}
          {!isTool && <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 mt-1 mx-auto" style={{ background: color }} />}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [view, setView] = useState('skills'); // 'skills' or 'tools'
  const [activeKey, setActiveKey] = useState('languages');
  const [activeToolCat, setActiveToolCat] = useState('All');

  const activeItems = useMemo(() => {
    if (view === 'skills') return skills[activeKey] || [];
    return activeToolCat === 'All' ? aiTools : aiTools.filter(t => t.category === activeToolCat);
  }, [view, activeKey, activeToolCat]);

  const categories = view === 'skills' ? skillCategories : toolCategories;
  const currentActiveKey = view === 'skills' ? activeKey : activeToolCat;
  const setKey = view === 'skills' ? setActiveKey : setActiveToolCat;
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const marqueeItems = useMemo(() => {
    const keys = Object.keys(techMeta);
    return [...keys, ...keys, ...keys];
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-32 bg-[#FAFAF8] relative overflow-hidden">
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#C4614A] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#E8896F] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="section-label mb-4">
            Capabilities
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-6xl font-bold text-[#111111] mb-10">
            Engineering <span className="gradient-text italic font-normal">Intelligence.</span>
          </motion.h2>

          {/* View Toggle */}
          <div className="flex p-1 bg-[#F4F2EE] rounded-2xl border border-[#E8E6E0] mb-8">
            {['skills', 'tools'].map((v) => (
              <button key={v} onClick={() => { setView(v); if(v==='tools') setActiveToolCat('All'); else setActiveKey('languages'); }}
                className={`px-8 py-2.5 rounded-xl font-body text-sm font-semibold transition-all duration-300 ${view === v ? 'bg-white text-[#111111] shadow-sm' : 'text-[#A3A3A3] hover:text-[#525252]'}`}>
                {v === 'skills' ? 'Core Stack' : 'AI Ecosystem'}
              </button>
            ))}
          </div>
          
          {/* Category Switcher */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-white border border-[#E8E6E0] shadow-sm backdrop-blur-md">
            {categories.map((cat) => (
              <button key={cat.key} onClick={() => setKey(cat.key)}
                className={`px-5 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-300 relative ${currentActiveKey === cat.key ? 'text-white' : 'text-[#525252] hover:bg-[#F4F2EE]'}`}>
                {currentActiveKey === cat.key && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-[#C4614A] rounded-xl" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </motion.div>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div key={view + currentActiveKey} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {activeItems.map((item, i) => (
                <SkillCard key={typeof item === 'string' ? item : item.name} name={typeof item === 'string' ? item : item.name} 
                  description={typeof item === 'string' ? '' : item.description} index={i} isTool={view === 'tools'} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Marquee for Complete Stack */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="mt-24 pt-12 border-t border-[#E8E6E0]">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-center text-[#A3A3A3] mb-10">Comprehensive Technology Ecosystem</p>
          <div className="relative flex overflow-hidden group">
            <motion.div className="flex whitespace-nowrap py-4 items-center" animate={{ x: [0, -1035] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
              {marqueeItems.map((name, i) => {
                 const meta = techMeta[name];
                 const color = meta?.color || '#525252';
                 const iconUrl = meta?.sk ? `https://skillicons.dev/icons?i=${meta.sk}` : (meta?.si ? `https://cdn.simpleicons.org/${meta.si}/${(meta.color || '111111').replace('#','')}` : (meta?.icon ? `https://api.iconify.design/${meta.icon}.svg` : null));
                 return (
                   <div key={`${name}-${i}`} className="flex items-center gap-3 mx-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default">
                     {iconUrl ? <img src={iconUrl} alt={name} className="w-5 h-5" /> : <div className="w-5 h-5 rounded bg-[#D4D2CE] flex items-center justify-center text-[10px] font-bold" style={{ color }}>{meta?.letter || name.charAt(0)}</div>}
                     <span className="font-mono text-xs font-medium text-[#111111]">{meta?.label || name}</span>
                   </div>
                 );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
