'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '@vercel/analytics';

export default function EasterEgg() {
  const [show, setShow] = useState(false);
  const buffer = useRef('');
  const lastFire = useRef(0);

  useEffect(() => {
    const onKey = (e) => {
      const el = document.activeElement;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;

      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-6);
      if (buffer.current === 'friday' && Date.now() - lastFire.current > 10000) {
        lastFire.current = Date.now();
        setShow(true);
        track('easter_egg_friday');
        setTimeout(() => setShow(false), 4000);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          style={{
            position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 140,
            background: '#111111', borderRadius: 16, padding: '14px 20px',
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* mini waveform */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 18 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <motion.span
                key={i}
                style={{ width: 3, borderRadius: 2, background: '#C4614A', height: '100%' }}
                animate={{ scaleY: [0.3, 1, 0.45, 0.9, 0.3] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <div>
            <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: '0.95rem', color: '#FAFAF8', lineHeight: 1.2 }}>
              friday.
            </p>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(250,250,248,0.45)', letterSpacing: '0.08em', marginTop: 2 }}>
              hello. i'm listening.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
