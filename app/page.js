'use client';

import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contributions from '../components/Contributions';
import VoiceAgent from '../components/VoiceAgent';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import VoiceWidget from '../components/VoiceWidget';
import CommandPalette from '../components/CommandPalette';
import EasterEgg from '../components/EasterEgg';

export default function Home() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let lenis;
    (async () => {
      const LenisModule = await import('lenis');
      const Lenis = LenisModule.default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    })();
    return () => lenis?.destroy();
  }, []);

  return (
    <main>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#111111] focus:text-[#FAFAF8] focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Navbar />
      <div id="main-content">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contributions />
      <VoiceAgent />
      <Contact />
      <Footer />
      </div>
      <VoiceWidget />
      <CommandPalette />
      <EasterEgg />
    </main>
  );
}
