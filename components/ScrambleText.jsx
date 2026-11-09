'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const CHARS = '!<>-_\\/[]{}—=+*^?#';

export default function ScrambleText({ text, className, speed = 28 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const total = text.length * 3 + 8;
    const id = setInterval(() => {
      frame++;
      const resolved = Math.floor((frame / total) * text.length);
      setDisplay(
        text.split('').map((c, i) => {
          if (c === ' ') return ' ';
          if (i < resolved) return c;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      if (resolved >= text.length) { setDisplay(text); clearInterval(id); }
    }, speed);
    return () => clearInterval(id);
  }, [inView, text, speed]);

  return <span ref={ref} className={className}>{display}</span>;
}
