'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { Calendar, Terminal, Activity } from 'lucide-react';
import { experience } from '../lib/data';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay } },
});

function CompanyLogo({ url, name }) {
  const [error, setError] = useState(false);
  const isQualtech = name === 'QualtechEdge';

  if (url && !error) {
    return (
      <div className={`${isQualtech ? 'bg-[#111111] px-2 py-0.5 rounded border border-white/5' : ''} h-6 flex items-center`}>
        <img 
          src={url} 
          alt={name} 
          className="h-full w-auto object-contain max-w-[100px] block" 
          onError={() => setError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-6 h-6 rounded bg-[#C4614A]/10 flex items-center justify-center text-[10px] font-bold text-[#C4614A]">
      {name.charAt(0)}
    </div>
  );
}

function ExpRow({ exp, i, inView }) {
  const rowRef = useRef(null);
  const reduced = useReducedMotion();
  const [hoveredTech, setHoveredTech] = useState(null);
  const active = useInView(rowRef, { margin: '-42% 0px -42% 0px' });
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 0.85', 'end 0.35'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <motion.div
      ref={rowRef}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={fadeUp(i * 0.15)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
    >
      {/* Year Marker - Sticky on scroll */}
      <div className="lg:col-span-2 lg:sticky lg:top-32 h-fit">
        <span
          className={`font-display text-7xl lg:text-8xl font-black select-none transition-colors duration-700 ${
            active ? 'text-[#C4614A]/25' : 'text-[#111111]/5 group-hover:text-[#C4614A]/10'
          }`}
        >
          {exp.period.split(' ').pop().replace('Present', 'Now')}
        </span>
      </div>

      {/* Main Content Card */}
      <div className="lg:col-span-8 relative">
        {/* Left border — base rail + scroll progress fill */}
        <div className="absolute -left-4 top-0 bottom-0 w-px bg-[#E8E6E0] group-hover:bg-[#C4614A]/30 transition-colors">
          <motion.div
            className="absolute inset-0 bg-[#C4614A] origin-top"
            style={reduced ? { scaleY: 1 } : { scaleY }}
          />
        </div>

        <div className="pl-8">
          {/* Status & Company Header */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <CompanyLogo url={exp.logoUrl} name={exp.company} />
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body font-bold text-lg text-[#111111]"
                  style={{ textDecoration: 'none' }}
                >
                  {exp.company}
                </a>
              ) : (
                <span className="font-body font-bold text-lg text-[#111111]">{exp.company}</span>
              )}
            </div>
            {exp.current && <span className="text-[#E8E6E0]">/</span>}
            {exp.current && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#C4614A]/20 bg-[#C4614A]/5 text-[#C4614A] text-[10px] font-mono uppercase tracking-widest">
                <Activity size={10} className="animate-pulse" />
                Current
              </div>
            )}
          </div>

          {/* Role Title */}
          <h3 className="font-display text-3xl md:text-4xl font-bold text-[#111111] mb-6 group-hover:text-[#C4614A] transition-colors duration-500">
            {exp.role}
          </h3>

          {/* Bullet points */}
          {Array.isArray(exp.description) ? (
            <ul className="space-y-4 mb-10 max-w-2xl">
              {exp.description.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4 text-sm md:text-base font-body leading-relaxed text-[#525252]">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#C4614A] shrink-0" />
                  <span>
                    {point.split(/(FRIDA)/).map((seg, k) =>
                      seg === 'FRIDA' && exp.productUrl ? (
                        <a
                          key={k}
                          href={exp.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#111111] border-b border-[#C4614A]/30 hover:text-[#C4614A] hover:border-[#C4614A] transition-colors"
                        >
                          FRIDA
                        </a>
                      ) : (
                        seg
                      )
                    )}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-body text-sm md:text-base leading-relaxed mb-10 max-w-2xl text-[#525252]">
              {exp.description}
            </p>
          )}

          {/* Agents shipped under this role */}
          {exp.agents && (
            <div className="mb-10 max-w-2xl">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#A3A3A3]">also shipped</span>
              <div className="mt-2 space-y-1.5">
                {exp.agents.map((a) => (
                  <div key={a.name} className="flex items-baseline gap-3 font-mono text-[11px]">
                    <span className="text-[#C4614A] font-semibold shrink-0">{a.name}</span>
                    <span className="text-[#A3A3A3]">—</span>
                    <span className="text-[#525252]">{a.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Metadata */}
          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-[#E8E6E0]/50">
            <div className="flex items-center gap-2 text-[#A3A3A3] font-mono text-xs uppercase tracking-wider">
              <Calendar size={14} className="text-[#C4614A]" />
              {exp.period}
            </div>
            <div className="flex items-center gap-2 text-[#A3A3A3] font-mono text-xs uppercase tracking-wider">
              <Terminal size={14} className="text-[#C4614A]" />
              {exp.type}
            </div>
          </div>
        </div>
      </div>

      {/* Tech DNA Rail - Far Right */}
      <div className="lg:col-span-2 hidden lg:flex flex-col gap-2 pt-2">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#A3A3A3] mb-2">built with</span>
        {exp.tech.map((t) => (
          <div
            key={t.name}
            onMouseEnter={() => setHoveredTech(t.name)}
            onMouseLeave={() => setHoveredTech(null)}
            className={`relative text-[10px] font-mono flex items-center gap-2 transition-colors cursor-default ${
              hoveredTech === t.name ? 'text-[#C4614A]' : 'text-[#525252] group-hover:text-[#111111]'
            }`}
          >
            <div className={`w-1 h-1 rounded-full transition-colors ${hoveredTech === t.name ? 'bg-[#C4614A]' : 'bg-[#E8E6E0] group-hover:bg-[#C4614A]'}`} />
            {t.name}
            <AnimatePresence>
              {hoveredTech === t.name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 w-48 z-50 pointer-events-none"
                >
                  <motion.div
                    initial={reduced ? false : { x: 6 }}
                    animate={reduced ? {} : { x: 0 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                  >
                    <div className="rounded-lg bg-[#111111] px-3 py-2.5 shadow-xl">
                      <div className="text-[9px] text-[#E8896F] uppercase tracking-widest mb-0.5">{t.name}</div>
                      <div className="text-[10px] text-white/80 leading-snug font-body">{t.usage}</div>
                    </div>
                    <span className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 rotate-45 bg-[#111111]" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={ref} className="py-32 bg-white relative overflow-hidden">
      {/* Background Technical Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#111111 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} 
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0)} className="mb-24 text-center lg:text-left">
          <span className="section-label">02 — Experience</span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-4">
            <h2 className="font-display font-bold leading-none text-5xl md:text-7xl text-[#111111]">
              Where I've <span className="gradient-text italic font-normal">deployed.</span>
            </h2>
            <p className="font-body text-sm text-[#525252] max-w-xs lg:text-right">
              A log of production-grade systems and high-scale AI infrastructure.
            </p>
          </div>
        </motion.div>

        <div className="space-y-32">
          {experience.map((exp, i) => (
            <ExpRow key={i} exp={exp} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
