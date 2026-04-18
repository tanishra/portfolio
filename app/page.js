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

export default function Home() {
  useEffect(() => {
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
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contributions />
      <VoiceAgent />
      <Contact />
      <Footer />
      <VoiceWidget />
    </main>
  );
}
