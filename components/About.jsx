'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  MapPin, Target, Database, Cpu, Activity, ArrowRight, 
  Sparkles, Brain, MessageSquare, Book, Wrench, CheckCircle 
} from 'lucide-react';
import Image from 'next/image';
import { personal } from '../lib/data';

const facts = [
  { icon: <MapPin size={13} />, text: 'India' },
  { icon: <Target size={13} />, text: 'Building toward founding AI companies' },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay } },
});

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="py-28 md:py-36 bg-white relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5EDE8] opacity-[0.3] blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0)} className="mb-16">
          <span className="section-label">01 — About</span>
          <div className="section-divider mt-3" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* LEFT: Visuals */}
          <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.1)} className="flex flex-col gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#C4614A] to-transparent rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative rounded-2xl overflow-hidden border border-[#E8E6E0] bg-[#FAFAF8] aspect-[4/5]">
                <Image
                  src="/photo.jpg"
                  alt="Tanish Rajput"
                  fill
                  className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                   <div className="flex items-center gap-2 text-white/90 font-mono text-[10px] tracking-widest uppercase">
                     <Activity size={10} className="text-[#C4614A] animate-pulse" />
                     Tanish Rajput
                   </div>
                </div>
              </div>
            </div> 

            <div className="flex flex-wrap gap-3">
              {facts.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[#E8E6E0] bg-[#F4F2EE] text-[#525252] text-xs font-medium">
                  <span className="text-[#C4614A]">{f.icon}</span>
                  {f.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Narrative + Stateless Workflow */}
          <div className="flex flex-col gap-10">
            <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.15)}>
              <h2 className="font-display font-bold leading-tight mb-8" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#111111' }}>
                Engineering AI <br />
                <span className="gradient-text italic font-normal text-[0.9em]">from first principles.</span>
              </h2>
              
              <div className="space-y-6 font-body text-base text-[#525252] leading-relaxed max-w-xl">
                <p>
                  I'm an AI Engineer at <span className="text-[#111111] font-semibold border-b border-[#C4614A]/30">QualtechEdge</span>, 
                  specializing in production-grade AI systems and low-latency voice agents.
                </p>
                <p>
                AI is <span className="text-[#111111] font-medium">a stateless orchestration problem.</span> I build agentic systems with externalized memory, deterministic control layers, and observable execution paths.
              </p>
              </div>
            </motion.div>

            {/* Optimized Stateless Workflow Visual */}
            <motion.div 
              initial="hidden" 
              animate={inView ? 'show' : 'hidden'} 
              variants={fadeUp(0.25)}
              className="px-6 py-10 rounded-3xl border border-[#E8E6E0] bg-[#F4F2EE]/30 relative overflow-hidden group w-full"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A3A3A3] mb-12 text-center">Stateless Engine</p>
              
              <div className="relative h-40 flex items-center justify-between px-2">
                {/* SVG EDGES - Spanning whole container */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 0 }}>
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                      <path d="M 0 0 L 10 3.5 L 0 7 z" fill="#C4614A" />
                    </marker>
                  </defs>
                  
                  {/* Sources to Context (Merging) - Adjusted x to 85 */}
                  <path d="M 40,25 C 70,25 70,80 100,80" stroke="#C4614A" fill="none" strokeWidth="1" opacity="0.25" markerEnd="url(#arrowhead)" />
                  <path d="M 40,80 L 100,80" stroke="#C4614A" fill="none" strokeWidth="1" opacity="0.25" markerEnd="url(#arrowhead)" />
                  <path d="M 40,135 C 70,135 70,80 100,80" stroke="#C4614A" fill="none" strokeWidth="1" opacity="0.25" markerEnd="url(#arrowhead)" />
                  
                  {/* Context Builder to LLM - Adjusted x to 180 start */}
                  <path d="M 180,80 L 235,80" stroke="#C4614A" fill="none" strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrowhead)" />
                  
                  {/* LLM to Tool Call (Top Branch) */}
                  <path d="M 315,80 C 335,80 335,25 365,25" stroke="#C4614A" fill="none" strokeWidth="1" opacity="0.25" markerEnd="url(#arrowhead)" />
                  {/* LLM to Result (Bottom Branch) */}
                  <path d="M 315,80 C 335,80 335,135 365,135" stroke="#C4614A" fill="none" strokeWidth="1" opacity="0.25" markerEnd="url(#arrowhead)" />

                  {/* Tool Call Loop back to LLM */}
                  <path d="M 385,15 Q 320,-30 280,55" stroke="#C4614A" fill="none" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" markerEnd="url(#arrowhead)" />
                </svg>

                {/* 1. SOURCES */}
                <div className="flex flex-col justify-between h-full relative z-10 py-1">
                  {[
                    { icon: <MessageSquare size={12} />, label: 'Prompt' },
                    { icon: <Book size={12} />, label: 'Knowledge' },
                    { icon: <Database size={12} />, label: 'Memory' }
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E6E0] shadow-sm flex items-center justify-center text-[#C4614A]">
                        {s.icon}
                      </div>
                      <span className="font-mono text-[7px] uppercase tracking-wider text-[#A3A3A3]">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* 2. REASONING CORE */}
                <div className="flex items-center gap-4 relative z-10 translate-y-[-4px]">
                  {/* Context box shifted left further */}
                  <div className="px-3 py-1.5 rounded-lg bg-white border border-[#C4614A]/20 shadow-sm font-mono text-[8px] uppercase tracking-widest text-[#C4614A] font-bold translate-x-[-50px] translate-y-[5px]">
                    Context
                  </div>
                  <div className="w-16 h-16 rounded-xl bg-[#111111] shadow-lg flex items-center justify-center text-white relative">
                    <Brain size={24} />
                    <motion.div 
                      className="absolute inset-0 rounded-xl bg-[#C4614A] opacity-20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>

                {/* 3. OUTCOMES */}
                <div className="flex flex-col justify-between h-full items-end relative z-10 py-1">
                  {/* Tool Call Node */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg bg-[#F4F2EE] border border-[#E8E6E0] flex items-center justify-center text-[#525252]">
                      <Wrench size={14} />
                    </div>
                    <span className="font-mono text-[7px] uppercase text-[#A3A3A3]">Tool Call</span>
                  </div>
                  {/* Result Node */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg bg-[#2D7D52]/10 border border-[#2D7D52]/20 flex items-center justify-center text-[#2D7D52]">
                      <CheckCircle size={16} />
                    </div>
                    <span className="font-mono text-[7px] uppercase text-[#2D7D52] font-bold">Result</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.p initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.35)} className="font-body text-sm text-[#A3A3A3] italic">
              "Architecting deterministic stateless flows for the agentic era."
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
