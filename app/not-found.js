'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Terminal } from 'lucide-react';
import Link from 'next/link';

const glitchLines = [
  '> initializing agent loop...',
  '> loading context...',
  '> querying memory...',
  '> ERROR: route not found',
  '> 404 — page does not exist',
  '> redirecting to safe state...',
];

function GlitchTerminal() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) =>
        prev.length < glitchLines.length
          ? [...prev, glitchLines[prev.length]]
          : prev
      );
    }, 380);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] font-mono text-xs text-left">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[var(--text-muted)] text-[10px]">agent_loop.py</span>
      </div>
      <div className="space-y-1.5">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={
              line.includes('ERROR') || line.includes('404')
                ? 'text-red-400'
                : line.includes('redirecting')
                ? 'text-[var(--success)]'
                : 'text-[var(--text-muted)]'
            }
          >
            {line}
          </motion.div>
        ))}
        {lines.length === glitchLines.length && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[var(--accent)] cursor-blink"
          >
            █
          </motion.span>
        )}
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#C4614A08] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-[#E8896F08] blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-lg">
        {/* 404 big number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <h1
            className="font-display font-extrabold leading-none select-none"
            style={{
              fontSize: 'clamp(100px, 20vw, 180px)',
              background: 'linear-gradient(135deg, #C4614A30, #9E4A3630)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-4px',
            }}
          >
            404
          </h1>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col gap-2"
        >
          <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">
            Page not found.
          </h2>
          <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed">
            The agent looked everywhere in memory — this route doesn't exist.
            <br />Let's get you back to somewhere useful.
          </p>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="w-full"
        >
          <GlitchTerminal />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/">
            <motion.span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-semibold text-sm text-[var(--bg)] cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #C4614A, #9E4A36)' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Home size={14} />
              Back Home
            </motion.span>
          </Link>

          <motion.button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] font-body text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft size={14} />
            Go Back
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}
