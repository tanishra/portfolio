'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Eye, Heart, ArrowUp } from 'lucide-react';
import { personal, social } from '../lib/data';

const footerLinks = [
  { label:'GitHub',   href:social.github,      icon:<GH/> },
  { label:'LinkedIn', href:social.linkedin,    icon:<LI/> },
  { label:'Email',    href:social.email,        icon:<Mail size={15}/> },
  { label:'Resume',   href:personal.resumeUrl, icon:<FileText size={15}/> },
];
const navLinks = [
  {label:'About',href:'#about'},{label:'Experience',href:'#experience'},
  {label:'Skills',href:'#skills'},{label:'Contributions',href:'#contributions'},
  {label:'Projects',href:'#projects'},{label:'Voice Agent',href:'#voice'}
];

function GH() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>; }
function LI() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>; }

function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/visitor-count', { method: 'POST' })
      .then((r) => r.json())
      .then((d) => {
        if (d.count !== undefined && d.count !== null) {
          setCount(Number(d.count));
        }
      })
      .catch((err) => console.error('Visitor count error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: 6, 
      padding: '4px 10px', 
      borderRadius: 99, 
      border: '1px solid var(--border)', 
      background: 'var(--surface)',
      width: 'fit-content'
    }}>
      <Eye size={11} style={{ color: 'var(--accent)' }} />
      <span style={{ 
        fontFamily: 'JetBrains Mono, monospace', 
        fontSize: '0.62rem', 
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap'
      }}>
        {loading ? (
          <span style={{ color: 'var(--text-muted)' }}>...</span>
        ) : count !== null ? (
          <><span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{count.toLocaleString()}</span> Views</>
        ) : (
          <span style={{ color: 'var(--text-muted)' }}>—</span>
        )}
      </span>
    </div>
  );
}

export default function Footer() {
  const scrollTop=()=>window.scrollTo({top:0,behavior:'smooth'});
  return (
    <footer style={{borderTop:'1px solid var(--border)',paddingTop:'4rem',paddingBottom:'2.5rem',background:'var(--bg)'}}>
      <div style={{maxWidth:1152,margin:'0 auto',padding:'0 1.5rem'}}>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',gap:'2.5rem',marginBottom:'3rem'}}>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <button onClick={scrollTop} className="font-display" style={{fontWeight:700,fontSize:'1.3rem',color:'var(--text-primary)',background:'none',border:'none',cursor:'pointer',textAlign:'left',fontStyle:'italic'}}>
              Tanish<span style={{color:'var(--accent)',fontStyle:'normal'}}>.</span>
            </button>
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.8rem',color:'var(--text-muted)',maxWidth:260,lineHeight:1.6}}>AI Engineer building LLM systems, voice agents, and AI-powered products.</p>
            <VisitorCounter/>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.6rem',textTransform:'uppercase',letterSpacing:'0.15em',color:'var(--text-muted)',marginBottom:4}}>Navigate</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px 32px'}}>
              {navLinks.map(l=>(
                <a key={l.label} href={l.href} onClick={e=>{e.preventDefault();document.getElementById(l.href.replace('#',''))?.scrollIntoView({behavior:'smooth'});}}
                  style={{fontFamily:'Inter,sans-serif',fontSize:'0.85rem',color:'var(--text-secondary)',textDecoration:'none',transition:'color 0.15s'}}
                  onMouseEnter={e=>{e.target.style.color='var(--accent)';}} onMouseLeave={e=>{e.target.style.color='var(--text-secondary)';}}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.6rem',textTransform:'uppercase',letterSpacing:'0.15em',color:'var(--text-muted)',marginBottom:4}}>Connect</p>
            {footerLinks.map(l=>(
              <motion.a key={l.label} href={l.href} target={l.href.startsWith('mailto')||l.href===personal.resumeUrl?undefined:'_blank'} rel="noopener noreferrer"
                style={{display:'flex',alignItems:'center',gap:8,fontFamily:'Inter,sans-serif',fontSize:'0.85rem',color:'var(--text-secondary)',textDecoration:'none',transition:'color 0.15s'}}
                whileHover={{x:3}} transition={{duration:0.15}}
                onMouseEnter={e=>{e.currentTarget.style.color='var(--accent)';}} onMouseLeave={e=>{e.currentTarget.style.color='var(--text-secondary)';}}>
                {l.icon}{l.label}
              </motion.a>
            ))}
          </div>
        </div>
        <div style={{height:1,background:'var(--border)',marginBottom:'1.5rem'}} />
        <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:12}}>
          <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'var(--text-muted)'}}>© {new Date().getFullYear()} Tanish Rajput. All rights reserved.</p>
          <div style={{display:'flex',alignItems:'center',gap:5,fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'var(--text-muted)'}}>
            Built with <Heart size={11} style={{color:'#DC2626',fill:'#DC2626'}}/> by Tanish
          </div>
          <motion.button onClick={scrollTop} whileHover={{y:-2}} style={{display:'flex',alignItems:'center',gap:5,fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'var(--text-muted)',background:'none',border:'none',cursor:'pointer'}}
            onMouseEnter={e=>{e.currentTarget.style.color='var(--accent)';}} onMouseLeave={e=>{e.currentTarget.style.color='var(--text-muted)';}}>
            <ArrowUp size={12}/> Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
