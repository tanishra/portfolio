'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { aiTools } from '../lib/data';

const fadeUp = (d=0) => ({ hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:0.7,ease:[0.16,1,0.3,1],delay:d}} });

const toolMeta = {
  Cursor:     { slug:null,           color:'#111111', letter:'Csr' },
  Claude:     { slug:'anthropic',    color:'#D97757' },
  ChatGPT:    { slug:'openai',       color:'#10A37F' },
  Gemini:     { slug:'googlegemini', color:'#4285F4' },
  Groq:       { slug:null,           color:'#F55036', letter:'G' },
  ElevenLabs: { slug:null,           color:'#111111', letter:'11' },
  Deepgram:   { slug:null,           color:'#0A9960', letter:'DG' },
  Supabase:   { slug:'supabase',     color:'#1a7a4a' },
  Pinecone:   { slug:null,           color:'#00B388', letter:'P' },
  LangSmith:  { slug:'langchain',    color:'#1C3C3C' },
  LiveKit:    { slug:null,           color:'#A855F7', letter:'LK' },
  Docling:    { slug:null,           color:'#C4614A', letter:'D' },
};

const catColors = { All:'#111111',LLM:'#C4614A',Voice:'#10A37F',Inference:'#F55036',Infra:'#1a7a4a',Vector:'#00B388',Observability:'#6366F1',Dev:'#111111',Data:'#F59E0B' };
const allCats = ['All',...Array.from(new Set(aiTools.map(t=>t.category)))];

function ToolLogo({ name, size=36 }) {
  const meta = toolMeta[name]||{slug:null,color:'#525252',letter:name[0]};
  const [err,setErr] = useState(false);
  const url = meta.slug&&!err ? `https://cdn.simpleicons.org/${meta.slug}/${meta.color.replace('#','')}` : null;
  if (url) return <img src={url} alt={name} width={size} height={size} loading="lazy" style={{objectFit:'contain'}} onError={()=>setErr(true)} />;
  return <div style={{width:size,height:size,background:meta.color+'18',color:meta.color,fontSize:(meta.letter||name[0]).length>1?size*0.28:size*0.38,border:`1px solid ${meta.color}25`,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Fraunces,serif',fontWeight:800}}>{meta.letter||name[0]}</div>;
}

function ToolCard({ tool, index }) {
  const [hov,setHov]=useState(false);
  const color=(toolMeta[tool.name]||{}).color||catColors[tool.category]||'#525252';
  return (
    <motion.div
      initial={{opacity:0,y:20,scale:0.94}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,scale:0.9}}
      transition={{duration:0.35,delay:index*0.04,ease:[0.34,1.56,0.64,1]}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:'var(--surface)',borderRadius:14,border:`1px solid ${hov?color+'40':'var(--border)'}`,boxShadow:hov?`0 8px 32px ${color}14`:'0 1px 4px rgba(0,0,0,0.04)',transform:hov?'translateY(-4px)':'translateY(0)',transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',overflow:'hidden',position:'relative',cursor:'default'}}
    >
      <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${color},transparent)`,opacity:hov?1:0,transition:'opacity 0.3s'}} />
      <div style={{padding:'1.25rem',display:'flex',flexDirection:'column',gap:12}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between'}}>
          <motion.div animate={{scale:hov?1.08:1,rotate:hov?3:0}} transition={{duration:0.25}}><ToolLogo name={tool.name} size={36} /></motion.div>
          <span style={{padding:'2px 8px',borderRadius:99,fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color,border:`1px solid ${color}30`,background:color+'0D'}}>{tool.category}</span>
        </div>
        <div>
          <div style={{fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:'0.875rem',color:hov?color:'var(--text-primary)',marginBottom:3,transition:'color 0.2s'}}>{tool.name}</div>
          <div style={{fontFamily:'Inter,sans-serif',fontSize:'0.75rem',color:'var(--text-muted)',lineHeight:1.5}}>{tool.description}</div>
        </div>
      </div>
      <div style={{position:'absolute',bottom:0,left:0,height:2,background:`linear-gradient(90deg,${color},transparent)`,width:hov?'100%':'0%',transition:'width 0.3s ease'}} />
    </motion.div>
  );
}

export default function AITools() {
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:'-80px'});
  const [cat,setCat]=useState('All');
  const filtered=cat==='All'?aiTools:aiTools.filter(t=>t.category===cat);
  return (
    <section id="aitools" ref={ref} style={{padding:'7rem 0',background:'var(--bg)'}}>
      <div style={{maxWidth:1152,margin:'0 auto',padding:'0 1.5rem'}}>
        <motion.div initial="hidden" animate={inView?'show':'hidden'} variants={fadeUp(0)} style={{marginBottom:'4rem'}}>
          <span className="section-label">04 — AI Tools</span>
          <div className="section-divider" style={{marginTop:12}} />
        </motion.div>
        <div style={{display:'flex',flexWrap:'wrap',alignItems:'flex-end',justifyContent:'space-between',gap:'1.5rem',marginBottom:'2.5rem'}}>
          <motion.div initial="hidden" animate={inView?'show':'hidden'} variants={fadeUp(0.1)}>
            <h2 className="font-display" style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:700,color:'var(--text-primary)',lineHeight:1.1,marginBottom:8}}>
              Tools I{' '}<em style={{fontWeight:300,background:'linear-gradient(135deg,var(--accent),var(--accent-dark))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontStyle:'italic'}}>live in.</em>
            </h2>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.875rem',color:'var(--text-muted)'}}>Real logos. Real tools. Daily use.</p>
          </motion.div>
          <motion.div initial="hidden" animate={inView?'show':'hidden'} variants={fadeUp(0.15)} style={{display:'flex',flexWrap:'wrap',gap:8}}>
            {allCats.map(c=>{
              const isActive=cat===c; const clr=catColors[c]||'#111111';
              return <motion.button key={c} onClick={()=>setCat(c)} whileHover={{scale:1.04}} whileTap={{scale:0.96}}
                style={{padding:'6px 14px',borderRadius:8,fontFamily:'Inter,sans-serif',fontSize:'0.75rem',fontWeight:500,border:`1px solid ${isActive?clr:'var(--border)'}`,color:isActive?'#FFFFFF':'var(--text-secondary)',background:isActive?clr:'transparent',boxShadow:isActive?`0 2px 12px ${clr}30`:'none',cursor:'pointer',transition:'all 0.2s'}}>{c}</motion.button>;
            })}
          </motion.div>
        </div>
        <motion.div layout style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
          <AnimatePresence mode="popLayout">
            {filtered.map((tool,i)=><ToolCard key={tool.name} tool={tool} index={i} />)}
          </AnimatePresence>
        </motion.div>
        <motion.div initial="hidden" animate={inView?'show':'hidden'} variants={fadeUp(0.3)} style={{marginTop:32,display:'flex',alignItems:'center',gap:16,justifyContent:'center'}}>
          <div style={{height:1,flex:1,background:'var(--border)'}} />
          <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'var(--text-muted)',whiteSpace:'nowrap'}}>{filtered.length} of {aiTools.length} tools shown</span>
          <div style={{height:1,flex:1,background:'var(--border)'}} />
        </motion.div>
      </div>
    </section>
  );
}
