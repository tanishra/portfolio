'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, MoveRight } from 'lucide-react';
import { personal, social } from '../lib/data';

/* ── Typewriter ──────────────────────────────────────────────── */
function useTypewriter(words, speed = 80, delSpeed = 40, pause = 2400) {
  const [text, setText] = useState('');
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[wi % words.length];
    let t;
    if (!del && text === cur) { t = setTimeout(() => setDel(true), pause); }
    else if (del && text === '') { setDel(false); setWi(i => (i + 1) % words.length); }
    else {
      t = setTimeout(() => setText(del ? cur.slice(0, text.length - 1) : cur.slice(0, text.length + 1)),
        del ? delSpeed : speed);
    }
    return () => clearTimeout(t);
  }, [text, del, wi, words, speed, delSpeed, pause]);
  return text;
}

/* ── Three.js wireframe sphere ──────────────────────────────── */
function ThreeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animId;
    let renderer, scene, camera, mesh, mesh2, mesh3, frame;

    const init = async () => {
      try {
        const THREE = await import('three');
        const canvas = canvasRef.current;
        if (!canvas) return;

        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setClearColor(0x000000, 0);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 5);

        // ── Design: Geometric Pulse (Nested Architectural Layers) ──
        const geo = new THREE.IcosahedronGeometry(1.6, 1);
        const mat = new THREE.MeshBasicMaterial({
          color: 0xC4614A,
          wireframe: true,
          transparent: true,
          opacity: 0.35,
        });
        mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        const geo2 = new THREE.IcosahedronGeometry(2.1, 1);
        const mat2 = new THREE.MeshBasicMaterial({
          color: 0xC4614A,
          wireframe: true,
          transparent: true,
          opacity: 0.15,
        });
        mesh2 = new THREE.Mesh(geo2, mat2);
        scene.add(mesh2);

        const geo3 = new THREE.IcosahedronGeometry(2.8, 1);
        const mat3 = new THREE.MeshBasicMaterial({
          color: 0x111111,
          wireframe: true,
          transparent: true,
          opacity: 0.06,
        });
        mesh3 = new THREE.Mesh(geo3, mat3);
        scene.add(mesh3);

        /* ── Original Design: Icosahedron Wireframe (Commented) ──
        const geo = new THREE.IcosahedronGeometry(1.8, 1);
        const mat = new THREE.MeshBasicMaterial({
          color: 0xC4614A,
          wireframe: true,
          transparent: true,
          opacity: 0.35, 
        });
        mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        const geo2 = new THREE.IcosahedronGeometry(2.6, 1);
        const mat2 = new THREE.MeshBasicMaterial({
          color: 0x111111,
          wireframe: true,
          transparent: true,
          opacity: 0.12,
        });
        mesh2 = new THREE.Mesh(geo2, mat2);
        scene.add(mesh2);
        */

        let mouseX = 0, mouseY = 0;
        const onMouse = (e) => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
        };
        window.addEventListener('mousemove', onMouse);

        const onResize = () => {
          if (!canvas || !renderer || !camera) return;
          renderer.setSize(canvas.clientWidth, canvas.clientHeight);
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', onResize);

        frame = 0;
        const animate = () => {
          animId = requestAnimationFrame(animate);
          frame += 0.004;

          // Pulse + Rotation Logic
          if (mesh) {
            mesh.rotation.x = frame * 0.6 + mouseY * 0.8;
            mesh.rotation.y = frame + mouseX * 0.8;
            const s = 1 + Math.sin(frame * 2) * 0.05;
            mesh.scale.set(s, s, s);
          }
          if (mesh2) {
            mesh2.rotation.x = -frame * 0.4;
            mesh2.rotation.y = -frame * 0.3;
            const s2 = 1 + Math.cos(frame * 1.5) * 0.08;
            mesh2.scale.set(s2, s2, s2);
          }
          if (mesh3) {
            mesh3.rotation.z = frame * 0.2;
            const s3 = 1 + Math.sin(frame * 1.2) * 0.1;
            mesh3.scale.set(s3, s3, s3);
          }

          renderer.render(scene, camera);
        };
        animate();

        return () => {
          window.removeEventListener('mousemove', onMouse);
          window.removeEventListener('resize', onResize);
        };
      } catch (e) { console.error(e); }
    };

    const cleanup = init();
    return () => {
      cancelAnimationFrame(animId);
      renderer?.dispose();
      cleanup?.then?.(fn => fn?.());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}

/* ── Main ────────────────────────────────────────────────────── */
export default function Hero() {
  const typed = useTypewriter(personal.taglines, 70, 38, 2200);
  const locationTyped = useTypewriter(['India', 'भारत'], 90, 40, 1500);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Three.js canvas — right side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-[55%] pointer-events-none select-none">
        <ThreeCanvas />
      </div>

      {/* Warm radial gradient — left anchor */}
      <div
        className="absolute top-1/3 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,97,74,0.06) 0%, transparent 70%)' }}
      />

      {/* Horizontal rule — very subtle */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'var(--border)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          {/* Status pill */}
          <motion.div variants={item} className="mb-8 inline-flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: 'var(--success)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--success)' }} />
            </span>
            <span className="font-mono text-2xs tracking-widest uppercase text-[var(--text-muted)]">
              Available for opportunities
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={item} className="mb-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-display font-bold text-xl text-[var(--text-primary)] italic">
                Tanish Rajput <span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>—</span>
              </span>
              <span className="font-mono text-xs tracking-widest uppercase text-[var(--accent)] block">
                AI Engineer · {locationTyped}
              </span>
            </div>
            <h1
              className="font-display leading-[1.05] tracking-tight text-[var(--text-primary)]"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 700 }}
            >
              I build AI<br />
              <span
                style={{
                  fontStyle: 'italic',
                  fontWeight: 300,
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                that Scales.
              </span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={item} className="mb-6 h-7">
            <p className="font-mono text-sm text-[var(--text-muted)]">
              <span style={{ color: 'var(--accent)' }}>→ </span>
              {typed}
              <span className="cursor-blink" style={{ color: 'var(--accent)', marginLeft: 2 }}>|</span>
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={item}
            className="font-body text-base leading-relaxed mb-10 max-w-xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            AI Engineer at{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>QualtechEdge</span>{' '}
            — building LLM systems, voice agents, and RAG pipelines from first principles.
            No frameworks. Full control. Obsessed with making AI work{' '}
            <em style={{ color: 'var(--text-primary)' }}>in production</em>.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3 mb-12">
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-accent"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects
              <MoveRight size={15} />
            </motion.button>
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-ghost"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>

          {/* Social handles */}
          <motion.div variants={item} className="flex items-center gap-4">
            {[
              { href: social.github,   icon: <GithubIcon />,   label: 'GitHub' },
              { href: social.linkedin, icon: <LinkedinIcon />, label: 'LinkedIn' },
              { href: social.email,    icon: <Mail size={17} />, label: 'Email' },
            ].map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={label === 'Email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-lg border text-[var(--text-muted)] hover:text-[var(--accent)] transition-all duration-200"
                style={{ borderColor: 'var(--border)' }}
                whileHover={{ scale: 1.08, y: -2, borderColor: 'var(--accent)' }}
                whileTap={{ scale: 0.95 }}
              >
                {icon}
              </motion.a>
            ))}
            <div className="h-4 w-px" style={{ background: 'var(--border)' }} />
            <span className="font-mono text-2xs text-[var(--text-muted)] uppercase tracking-widest">Beyond the wrapper</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        aria-label="Scroll down"
      >
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={15} />
        </motion.div>
      </motion.button>
    </section>
  );
}

function GithubIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;
}
function LinkedinIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}
