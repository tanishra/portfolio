'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, FileText, CheckCircle, AlertCircle, Loader, ArrowUpRight } from 'lucide-react';
import { personal, social } from '../lib/data';

const fadeUp = (d=0) => ({ hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:0.7,ease:[0.16,1,0.3,1],delay:d}} });

const handles = [
  { label:'GitHub',   value:'github.com/tanishra',      href:social.github,      color:'#111111', icon:<GH/> },
  { label:'LinkedIn', value:'linkedin.com/in/tr26',  href:social.linkedin,    color:'#0A66C2', icon:<LI/> },
  { label:'Email',    value:personal.email,                   href:social.email,       color:'#C4614A', icon:<Mail size={15}/> },
  { label:'Resume',   value:'View / Download PDF',            href:personal.resumeUrl, color:'#525252', icon:<FileText size={15}/> },
];

function GH() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>; }
function LI() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>; }

function Field({ label, id, type='text', value, onChange, placeholder, required, rows }) {
  const isTA = type === 'textarea';
  const Tag  = isTA ? 'textarea' : 'input';
  return (
    <div style={{display:'flex',flexDirection:'column',gap:6}}>
      <label htmlFor={id} style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.15em',color:'var(--text-muted)'}}>
        {label}{required && <span style={{color:'var(--accent)',marginLeft:3}}>*</span>}
      </label>
      <Tag
        id={id} name={id} type={isTA ? undefined : type}
        value={value} onChange={onChange} placeholder={placeholder}
        required={required} rows={isTA ? (rows || 5) : undefined}
        style={{width:'100%',padding:'11px 14px',borderRadius:10,background:'var(--surface)',border:'1px solid var(--border)',fontFamily:'Inter,sans-serif',fontSize:'0.875rem',color:'var(--text-primary)',outline:'none',resize:'none',transition:'border-color 0.2s ease'}}
        onFocus={e=>{e.target.style.borderColor='var(--accent)';}}
        onBlur={e=>{e.target.style.borderColor='var(--border)';}}
      />
    </div>
  );
}

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form,   setForm]   = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault(); setStatus('loading'); setErrMsg('');
    try {
      const res  = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('success'); setForm({ name:'', email:'', message:'' });
    } catch(err) { setStatus('error'); setErrMsg(err.message); }
  };

  return (
    <section id="contact" ref={ref} style={{padding:'7rem 0', background:'var(--surface)'}}>
      <div style={{maxWidth:1152, margin:'0 auto', padding:'0 1.5rem'}}>

        {/* ── Section label ── */}
        <motion.div initial="hidden" animate={inView?'show':'hidden'} variants={fadeUp(0)} style={{marginBottom:'4rem'}}>
          <span className="section-label">08 — Contact</span>
          <div className="section-divider" style={{marginTop:12}} />
        </motion.div>

        {/* ── Big centred headline ── */}
        <motion.div
          initial="hidden" animate={inView?'show':'hidden'} variants={fadeUp(0.08)}
          style={{textAlign:'center', marginBottom:'4rem'}}
        >
          <h2 className="font-display" style={{fontSize:'clamp(2.4rem,6vw,4rem)',fontWeight:700,color:'var(--text-primary)',lineHeight:1.05,marginBottom:16}}>
            Let's build{' '}
            <em style={{fontWeight:300,fontStyle:'italic',background:'linear-gradient(135deg,var(--accent),var(--accent-dark))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
              something great.
            </em>
          </h2>
          <p style={{fontFamily:'Inter,sans-serif',fontSize:'1rem',color:'var(--text-secondary)',lineHeight:1.7,maxWidth:520,margin:'0 auto'}}>
            Got an interesting AI project, an opportunity, or just want to geek out about agent architectures? I reply to every message.
          </p>

          {/* Response badge — centred under headline */}
          <div style={{display:'inline-flex',alignItems:'center',gap:8,marginTop:20,padding:'8px 18px',borderRadius:99,border:'1px solid rgba(45,125,82,0.25)',background:'#F0FAF5'}}>
            <span style={{width:7,height:7,borderRadius:'50%',background:'var(--success)',flexShrink:0}} />
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'0.82rem',color:'var(--text-secondary)',margin:0}}>
              <span style={{color:'var(--success)',fontWeight:600}}>Usually responds within 24h.</span>{' '}Faster on LinkedIn.
            </p>
          </div>
        </motion.div>

        {/* ── Two-column body ── */}
        <div style={{display:'grid',gridTemplateColumns:'1fr',gap:'2.5rem',alignItems:'start'}} className="contact-grid">
          <style>{`@media(min-width:768px){.contact-grid{grid-template-columns:1fr 1.4fr !important;}}`}</style>

          {/* LEFT — social handles stacked cleanly */}
          <motion.div initial="hidden" animate={inView?'show':'hidden'} variants={fadeUp(0.14)}>

            {/* Decorative top accent */}
            <div style={{height:3,width:48,borderRadius:99,background:'linear-gradient(90deg,var(--accent),var(--accent-light))',marginBottom:28}} />

            <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',textTransform:'uppercase',letterSpacing:'0.18em',color:'var(--text-muted)',marginBottom:16}}>
              Find me on
            </p>

            {/* Handle list */}
            <div style={{display:'flex',flexDirection:'column',gap:2}}>
              {handles.map((h, i) => (
                <motion.a
                  key={h.label}
                  href={h.href}
                  target={h.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  initial={{opacity:0, x:-14}}
                  animate={inView ? {opacity:1, x:0} : {}}
                  transition={{delay:0.22 + i * 0.07, duration:0.5, ease:[0.16,1,0.3,1]}}
                  style={{display:'flex',alignItems:'center',gap:14,padding:'14px 16px',borderRadius:14,textDecoration:'none',transition:'all 0.2s ease',border:'1px solid transparent'}}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--bg)';
                    e.currentTarget.style.borderColor = h.color + '25';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {/* Icon circle */}
                  <div style={{width:36,height:36,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,background:h.color+'12',border:`1px solid ${h.color}20`,color:h.color}}>
                    {h.icon}
                  </div>

                  {/* Text */}
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:'0.875rem',color:'var(--text-primary)',margin:0}}>{h.label}</p>
                    <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.62rem',color:'var(--text-muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',margin:'2px 0 0'}}>{h.value}</p>
                  </div>

                  <ArrowUpRight size={13} style={{color:'var(--text-faint)',flexShrink:0}} />
                </motion.a>
              ))}
            </div>

            {/* Subtle divider */}
            <div style={{height:1,background:'var(--border)',margin:'24px 0'}} />

            {/* Tagline */}
            <p className="font-display" style={{fontStyle:'italic',fontWeight:300,fontSize:'1.05rem',color:'var(--text-muted)',lineHeight:1.5}}>
              "The best way to reach me is still the oldest way — just say hello."
            </p>
          </motion.div>

          {/* RIGHT — form card */}
          <motion.div initial="hidden" animate={inView?'show':'hidden'} variants={fadeUp(0.2)}>
            <form
              onSubmit={onSubmit}
              style={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:20,overflow:'hidden',boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}
            >
              {/* Form header strip */}
              <div style={{padding:'20px 28px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div>
                  <h3 className="font-display" style={{fontWeight:600,fontSize:'1.1rem',color:'var(--text-primary)',margin:0}}>Send a message</h3>
                  <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.62rem',color:'var(--text-muted)',margin:'3px 0 0'}}>Secure line — lands in my inbox.</p>
                </div>
                <div style={{width:8,height:8,borderRadius:'50%',background:'var(--success)',boxShadow:'0 0 0 3px rgba(45,125,82,0.15)'}} />
              </div>

              {/* Fields */}
              <div style={{padding:'24px 28px',display:'flex',flexDirection:'column',gap:16}}>
                {/* Name + Email side by side */}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}} className="form-row">
                  <style>{`@media(max-width:520px){.form-row{grid-template-columns:1fr !important;}}`}</style>
                  <Field label="Name"  id="name"  value={form.name}  onChange={onChange} placeholder="Your name"       required />
                  <Field label="Email" id="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
                </div>

                <Field label="Message" id="message" type="textarea" value={form.message} onChange={onChange}
                  placeholder="Hey Tanish, I have an interesting AI project..." required rows={5} />

                {/* Status banners */}
                {status === 'success' && (
                  <motion.div initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}}
                    style={{display:'flex',alignItems:'center',gap:8,padding:'10px 14px',borderRadius:10,border:'1px solid rgba(45,125,82,0.25)',background:'#F0FAF5',color:'var(--success)'}}>
                    <CheckCircle size={14}/><span style={{fontFamily:'Inter,sans-serif',fontSize:'0.82rem',fontWeight:500}}>Message sent! I'll be in touch soon.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}}
                    style={{display:'flex',alignItems:'center',gap:8,padding:'10px 14px',borderRadius:10,border:'1px solid rgba(220,38,38,0.2)',background:'#FEF2F2',color:'#DC2626'}}>
                    <AlertCircle size={14}/><span style={{fontFamily:'Inter,sans-serif',fontSize:'0.82rem'}}>{errMsg}</span>
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status==='loading' || status==='success'}
                  className="btn-accent"
                  whileHover={{scale: status==='loading' ? 1 : 1.02}}
                  whileTap={{scale: status==='loading' ? 1 : 0.97}}
                  style={{width:'100%',justifyContent:'center',opacity:status==='loading'?0.65:1,cursor:'pointer',fontFamily:'Inter,sans-serif',fontWeight:500,marginTop:4}}
                >
                  {status==='loading' ? <><Loader size={14} className="animate-spin"/>Sending...</>
                   : status==='success' ? <><CheckCircle size={14}/>Sent!</>
                   : <><Send size={14}/>Send Message</>}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
