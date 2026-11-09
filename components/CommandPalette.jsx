'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, User, Briefcase, Wrench, FolderGit2, Mic, Mail,
  Download, Copy, Github, Linkedin, CornerDownLeft,
} from 'lucide-react';
import { track } from '@vercel/analytics';
import { personal, social } from '../lib/data';

const isTyping = () => {
  const el = document.activeElement;
  return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const prevFocusRef = useRef(null);

  const actions = useMemo(() => [
    { id: 'about',      label: 'Go to About',       hint: 'section', icon: <User size={15} />,        run: () => scrollToId('about') },
    { id: 'experience', label: 'Go to Experience',  hint: 'section', icon: <Briefcase size={15} />,   run: () => scrollToId('experience') },
    { id: 'skills',     label: 'Go to Skills',      hint: 'section', icon: <Wrench size={15} />,      run: () => scrollToId('skills') },
    { id: 'projects',   label: 'Go to Projects',    hint: 'section', icon: <FolderGit2 size={15} />,  run: () => scrollToId('projects') },
    { id: 'voice',      label: 'Go to Voice Agent', hint: 'section', icon: <Mic size={15} />,         run: () => scrollToId('voice') },
    { id: 'contact',    label: 'Go to Contact',     hint: 'section', icon: <Mail size={15} />,        run: () => scrollToId('contact') },
    { id: 'friday',     label: 'Talk to Friday',    hint: 'action',  icon: <Mic size={15} />,         run: () => scrollToId('voice') },
    { id: 'resume',     label: 'Download Resume',   hint: 'action',  icon: <Download size={15} />,    run: () => { track('resume_download'); window.open(personal.resumeUrl, '_blank'); } },
    { id: 'email',      label: 'Copy Email',        hint: 'action',  icon: <Copy size={15} />,        run: copyEmail },
    { id: 'github',     label: 'Open GitHub',       hint: 'link',    icon: <Github size={15} />,      run: () => window.open(social.github, '_blank') },
    { id: 'linkedin',   label: 'Open LinkedIn',     hint: 'link',    icon: <Linkedin size={15} />,    run: () => window.open(social.linkedin, '_blank') },
  ], []);

  function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  function copyEmail() {
    navigator.clipboard?.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => { setCopied(false); setOpen(false); }, 900);
    });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(a => a.label.toLowerCase().includes(q));
  }, [query, actions]);

  const openPalette = () => {
    prevFocusRef.current = document.activeElement;
    setOpen(true);
    setQuery('');
    setIndex(0);
    track('cmdk_open');
  };
  const closePalette = () => {
    setOpen(false);
    prevFocusRef.current?.focus?.();
  };

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        open ? closePalette() : openPalette();
      }
    };
    const onOpen = () => openPalette();
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-cmdk', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-cmdk', onOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const runAction = (a) => {
    track('cmdk_action', { action: a.id });
    if (a.id !== 'email') setOpen(false);
    a.run();
    if (a.id === 'email') prevFocusRef.current?.focus?.();
    else prevFocusRef.current?.focus?.();
  };

  const onListKey = (e) => {
    if (e.key === 'Escape') { closePalette(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex(i => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && filtered[index]) { e.preventDefault(); runAction(filtered[index]); }
  };

  useEffect(() => { setIndex(0); }, [query]);

  useEffect(() => {
    listRef.current?.children[index]?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={closePalette}
          style={{
            position: 'fixed', inset: 0, zIndex: 150,
            background: 'rgba(17,17,17,0.5)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            padding: '15vh 1rem 1rem',
          }}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
            style={{
              width: '100%', maxWidth: 520,
              background: '#FFFFFF', borderRadius: 20,
              border: '1px solid #E8E6E0',
              boxShadow: '0 32px 80px -16px rgba(0,0,0,0.35)',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderBottom: '1px solid #F4F2EE' }}>
              <Search size={16} color="#A3A3A3" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                style={{
                  flex: 1, border: 'none', outline: 'none', background: 'transparent',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: '#111111',
                }}
              />
              <kbd style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#A3A3A3', padding: '3px 7px', borderRadius: 6, border: '1px solid #E8E6E0', background: '#F4F2EE' }}>ESC</kbd>
            </div>

            <div ref={listRef} style={{ maxHeight: 320, overflowY: 'auto', padding: 8 }}>
              {filtered.length === 0 && (
                <p style={{ padding: '24px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: '#A3A3A3', textAlign: 'center' }}>
                  no matches
                </p>
              )}
              {filtered.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => runAction(a)}
                  onMouseEnter={() => setIndex(i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 12px', borderRadius: 12, border: 'none',
                    background: i === index ? 'rgba(196,97,74,0.08)' : 'transparent',
                    cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s',
                  }}
                >
                  <span style={{ color: i === index ? '#C4614A' : '#A3A3A3', display: 'flex', flexShrink: 0 }}>{a.icon}</span>
                  <span style={{ flex: 1, fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 500, color: i === index ? '#111111' : '#525252' }}>
                    {a.id === 'email' && copied ? 'Copied!' : a.label}
                  </span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: '#D4D2CE', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {a.hint}
                  </span>
                  {i === index && <CornerDownLeft size={13} color="#C4614A" />}
                </button>
              ))}
            </div>

            <div style={{ padding: '10px 18px', borderTop: '1px solid #F4F2EE', display: 'flex', gap: 16 }}>
              {['↑↓ navigate', '↵ select', 'esc close'].map(h => (
                <span key={h} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: '#A3A3A3' }}>{h}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
