'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, ArrowUpRight } from 'lucide-react';
import { personal } from '../lib/data';

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = navLinks.map(l => l.href.replace('#', ''));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href) => {
    setMenuOpen(false);
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(250,250,248,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          padding: scrolled ? '12px 0' : '20px 0',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-semibold text-lg text-[var(--text-primary)] tracking-tight hover:text-[var(--accent)] transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ fontStyle: 'italic' }}
          >
            Tanish<span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>.</span>
          </motion.button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="relative font-body text-sm font-medium transition-colors duration-200"
                  style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-0.5 left-0 right-0 h-px rounded-full"
                    style={{ background: 'var(--accent)' }}
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ originX: 0, background: 'var(--accent)' }}
                  />
                </button>
              );
            })}
          </div>

          {/* Resume CTA */}
          <div className="hidden md:flex">
            <motion.a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', gap: '0.375rem' }}
            >
              <Download size={13} />
              Resume
            </motion.a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            style={{ background: 'rgba(250,250,248,0.97)', backdropFilter: 'blur(24px)' }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => go(link.href)}
                className="font-display text-3xl font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                style={{ fontStyle: 'italic' }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.06, duration: 0.4 }}
              className="btn-accent mt-4"
            >
              <Download size={15} />
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
