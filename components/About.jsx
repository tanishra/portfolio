'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Target } from 'lucide-react';
import Image from 'next/image';
import { personal } from '../lib/data';

const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: d } },
});

const facts = [
  { icon: <MapPin size={12} />, text: 'Noida, India' },
  { icon: <Target size={12} />, text: 'Toward solving real problems' },
];

function DefinitionCard() {
  return (
    <div className="rounded-2xl border border-[#E8E6E0] bg-[#FAFAF8] p-6 max-w-xl">
      <p className="font-display text-2xl text-[#111111]">
        agentic <span className="font-mono text-xs text-[#A3A3A3] font-normal">/eɪˈdʒen.tɪk/</span>
        <span className="font-mono text-[10px] text-[#C4614A] ml-2 uppercase tracking-widest">adj.</span>
      </p>
      <p className="font-body text-sm text-[#525252] mt-3 leading-relaxed">
        systems that <em className="text-[#111111]">act</em>, not just answer.
      </p>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="py-28 md:py-36 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5EDE8] opacity-30 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0)} className="mb-16">
          <span className="section-label">01 — About</span>
          <div className="section-divider mt-3" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* LEFT — polaroid portrait */}
          <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.1)} className="lg:col-span-4">
            <motion.div
              className="relative w-64 sm:w-72 rotate-[-2deg] bg-white p-3 pb-12 rounded-md shadow-[0_14px_36px_rgba(0,0,0,0.10)] border border-[#E8E6E0] group"
              whileHover={{ rotate: 0, y: -4 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#F5EDE8]/90 border border-[#E8E6E0] rotate-[-4deg] z-10" />
              <div className="rounded-sm overflow-hidden aspect-[3/4] relative bg-[#F4F2EE]">
                <Image
                  src={personal.photo}
                  alt={personal.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/90">
                    noida, in · available
                  </span>
                </div>
              </div>
              <p className="absolute bottom-3 left-0 right-0 text-center font-display italic text-sm text-[#525252]">
                {personal.name.toLowerCase()}
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-2 mt-8">
              {facts.map((f, i) => (
                <div key={i} className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#E8E6E0] bg-[#F4F2EE] text-[#525252] text-[11px] font-medium">
                  <span className="text-[#C4614A]">{f.icon}</span>
                  {f.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — narrative + definition card */}
          <div className="lg:col-span-8 flex flex-col gap-9">
            <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.15)}>
              <h2 className="font-display font-bold leading-[1.05] mb-7 text-[#111111]" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
                Engineering AI<br />
                <span className="gradient-text italic font-normal">from first principles.</span>
              </h2>
              <div className="space-y-4 font-body text-[15px] text-[#525252] leading-relaxed max-w-xl">
                <p>
                  AI Engineer at <span className="text-[#111111] font-semibold border-b border-[#C4614A]/30">QualtechEdge</span> —
                  production voice agents and agentic workflows.
                </p>
                <p>
                  I design agentic systems like infrastructure: externalized state, policy gates,
                  observable traces. <span className="text-[#111111] font-medium">The model is the easy part.</span>
                </p>
              </div>
            </motion.div>

            <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.25)}>
              <DefinitionCard />
            </motion.div>

            <motion.p initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.35)}
              className="font-display italic font-light text-lg text-[#A3A3A3]">
              "Agents that survive production."
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
