'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Star, ArrowUpRight, X, Maximize2, Image as ImageIcon, Github, Terminal } from 'lucide-react';
import { projects } from '../lib/data';

const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: d } },
});

const statusConfig = {
  Active:        { color: '#2D7D52', bg: '#F0FAF5', border: 'rgba(45,125,82,0.2)',  pulse: true  },
  'In Progress': { color: '#92400E', bg: '#FEF9F0', border: 'rgba(146,64,14,0.2)', pulse: true  },
  Architecture:  { color: '#525252', bg: '#F5F5F5', border: 'rgba(82,82,82,0.2)',  pulse: false },
  Complete:      { color: '#1D4ED8', bg: '#EFF6FF', border: 'rgba(29,78,216,0.2)', pulse: false },
};

function ProjectImage({ src, alt, className = "", style = {} }) {
  const [error, setError] = useState(false);
  if (!src || error) {
    return (
      <div className={`w-full h-full bg-[#F4F2EE] flex items-center justify-center ${className}`} style={style}>
        <ImageIcon size={32} className="text-[#A3A3A3] opacity-20" />
      </div>
    );
  }
  return (
    <img 
      src={src} alt={alt} 
      className={`w-full h-full object-cover ${className}`} 
      style={style}
      onError={() => setError(true)}
    />
  );
}

// ── Expand Modal ────────────────────────────────────────────────
function ExpandModal({ project, onClose }) {
  const status = statusConfig[project.status] || statusConfig['Active'];

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(17,17,17,0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: 1000,
            height: 'min(850px, 95vh)',
            background: '#FAFAF8',
            borderRadius: 32,
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            border: '1px solid #E8E6E0',
          }}
        >
          {/* Hero Visual Header */}
          <div style={{ position: 'relative', height: '45%', flexShrink: 0, background: '#000' }}>
            <ProjectImage src={project.image} alt={project.name} style={{ opacity: 0.9 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #FAFAF8 0%, transparent 60%)' }} />
            
            {/* Header Controls */}
            <div style={{ position: 'absolute', top: 24, left: 32, right: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
              <div style={{ display: 'flex', gap: 12 }}>
              </div>
              <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                <X size={20} />
              </button>
            </div>

            {/* Title Overlay */}
            <div style={{ position: 'absolute', bottom: 0, left: 32, right: 32, paddingBottom: 24 }}>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#111111', lineHeight: 1 }}>
                {project.name}
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: '1rem', color: '#C4614A', fontWeight: 500, marginTop: 12 }}>
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '40px 32px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48 }}>
            {/* Main Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#A3A3A3', fontFamily: 'JetBrains Mono', marginBottom: 16 }}>Description</h4>
                <p style={{ fontSize: '1.05rem', color: '#525252', lineHeight: 1.8, fontFamily: 'Inter' }}>
                  {project.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#C4614A', color: '#FFF', borderRadius: 14, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                    <Github size={18} /> Source Code <ArrowUpRight size={14} />
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', color: '#111111', border: '1px solid #E8E6E0', borderRadius: 14, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                    <ExternalLink size={18} /> Live System
                  </a>
                )}
              </div>
            </div>

            {/* Sidebar Specs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#A3A3A3', fontFamily: 'JetBrains Mono', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Terminal size={14} /> System Stack
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {project.tech.map(t => (
                    <span key={t} style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(196,97,74,0.05)', color: '#C4614A', border: '1px solid rgba(196,97,74,0.1)', fontSize: '0.75rem', fontFamily: 'JetBrains Mono', fontWeight: 500 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

// ── Project Card ───────────────────
function ProjectCard({ project, index, onOpen, inView }) {
  const [hovered, setHovered] = useState(false);
  const status = statusConfig[project.status]  || statusConfig['Active'];
  
  // Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        border: `1px solid ${hovered ? 'rgba(196,97,74,0.4)' : '#E8E6E0'}`,
        background: '#FAFAF8',
        cursor: 'pointer',
        boxShadow: hovered ? `0 32px 64px -12px rgba(196,97,74,0.2)` : '0 4px 20px rgba(0,0,0,0.03)',
        transform: hovered ? 'translateY(-12px)' : 'translateY(0)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Dynamic Spotlight Glow */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(circle 300px at ${x}px ${y}px, rgba(196,97,74,0.06), transparent 80%)`
          ),
          opacity: hovered ? 1 : 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Visual top area */}
      <div style={{ height: 220, position: 'relative', overflow: 'hidden' }}>
        <ProjectImage 
          src={project.image} 
          alt={project.name} 
          className={`transition-transform duration-1000 ease-out ${hovered ? 'scale-110' : 'scale-100'}`}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.4))' }} />

        {/* Featured badge */}
        {/* {project.featured && (
          <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', zIndex: 1 }}>
            <Star size={10} className="text-amber-500 fill-amber-500" />
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: '#111', fontWeight: 600 }}>Featured</span>
          </div>
        )} */}

        {/* Status badge */}
        {/* <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 99, fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: status.color, background: status.bg, border: `1px solid ${status.border}`, fontWeight: 600 }}>
            {status.pulse && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
            {project.status}
          </span>
        </div> */}

        <motion.div 
          animate={{ 
            opacity: hovered ? 1 : 0, 
            y: hovered ? 0 : 10,
            scale: hovered ? 1 : 0.8 
          }} 
          style={{ position: 'absolute', bottom: 16, right: 16, width: 40, height: 40, borderRadius: 14, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C4614A', zIndex: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
        >
          <Maximize2 size={18} />
        </motion.div>
      </div>

      {/* Info area */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 2 }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: '#C4614A', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>
          {project.category}
        </span>

        <h3 className="font-display" style={{ fontWeight: 800, fontSize: '1.4rem', color: hovered ? '#C4614A' : '#111111', margin: 0, lineHeight: 1.1, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', transform: hovered ? 'translateX(4px)' : 'translateX(0)' }}>
          {project.name}
        </h3>

        <p style={{ fontFamily: 'Inter', fontSize: '0.88rem', color: '#525252', margin: 0, lineHeight: 1.6, opacity: hovered ? 1 : 0.8, transition: 'opacity 0.3s' }}>
          {project.tagline}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {project.tech.slice(0, 3).map(t => (
            <span key={t} style={{ padding: '6px 12px', borderRadius: 10, fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: hovered ? '#C4614A' : '#525252', background: hovered ? 'rgba(196,97,74,0.08)' : '#F4F2EE', border: `1px solid ${hovered ? 'rgba(196,97,74,0.15)' : '#E8E6E0'}`, transition: 'all 0.3s' }}>
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: '#A3A3A3', display: 'flex', alignItems: 'center', marginLeft: 4 }}>
              + {project.tech.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main section ────────────────────────────────────────────────
export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [openProject, setOpenProject] = useState(null);

  const featured = projects.filter(p => p.featured);
  const others   = projects.filter(p => !p.featured);

  return (
    <section id="projects" ref={ref} style={{ padding: '9rem 0', background: '#F4F2EE' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>

        {/* Section Header */}
        <div style={{ marginBottom: '6rem' }}>
          <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0)}>
            <span className="section-label">04 — Projects</span>
            <div className="section-divider" style={{ margin: '16px 0 40px' }} />
          </motion.div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '3rem' }}>
            <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.1)}>
              <h2 className="font-display" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', fontWeight: 900, color: '#111111', lineHeight: 0.9, letterSpacing: '-0.03em' }}>
                Technical<br />
                <span className="gradient-text italic font-normal">Shipments.</span>
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: '1.1rem', color: '#525252', marginTop: 24, maxWidth: 480, lineHeight: 1.6 }}>
                A collection of AI platforms, orchestration systems, and intelligent automation built for production environments.
              </p>
            </motion.div>

            <motion.a
              href="https://github.com/tanishra"
              target="_blank" rel="noopener noreferrer"
              initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.2)}
              whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.98 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 28px', borderRadius: 18, border: '1px solid #E8E6E0', background: '#FAFAF8', fontFamily: 'Inter', fontSize: '0.9rem', fontWeight: 700, color: '#111111', textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
            >
              <Github size={20} /> GitHub  <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.3)}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32 }}
        >
          {[...featured, ...others].map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} inView={inView} onOpen={setOpenProject} />
          ))}
        </motion.div>

        {/* Footer Minimalist CTA */}
        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.4)}
          style={{ marginTop: 64, textAlign: 'center' }}
        >
          <a 
            href="https://github.com/tanishra" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 8,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            className="group"
          >
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#A3A3A3', letterSpacing: '0.05em' }}>
              Check out more projects on
            </span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#C4614A', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              GitHub <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Expand modal */}
      <AnimatePresence>
        {openProject && <ExpandModal key="modal" project={openProject} onClose={() => setOpenProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
