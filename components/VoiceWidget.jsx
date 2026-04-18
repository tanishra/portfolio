'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, PhoneOff, X, Cpu, Globe2, Zap } from 'lucide-react';
import Vapi from '@vapi-ai/web';

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
const CALL_LIMIT_SECONDS = 120;

function SoundWave({ active }) {
  const bars = [0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.45, 0.75, 0.55, 0.85, 0.6];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2.5, height: 24 }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          style={{ width: 2, borderRadius: 99, background: '#C4614A' }}
          animate={active ? { height: ['4px', `${h * 20}px`, '4px'], opacity: [0.4, 1, 0.4] } : { height: '3px', opacity: 0.2 }}
          transition={active ? { duration: 0.8 + i * 0.05, repeat: Infinity, delay: i * 0.06, ease: 'easeInOut' } : {}}
        />
      ))}
    </div>
  );
}

export default function VoiceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [callState, setCallState] = useState('idle'); // 'idle', 'connecting', 'active'
  const [timeLeft, setTimeLeft] = useState(CALL_LIMIT_SECONDS);
  
  const vapiRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Initialize Vapi instance
    const vapi = new Vapi(VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on('call-start', () => {
      setCallState('active');
      startTimer();
    });

    vapi.on('call-end', () => {
      setCallState('idle');
      stopTimer();
    });

    vapi.on('error', (err) => {
      console.error('Vapi Error:', err);
      setCallState('idle');
      stopTimer();
    });

    return () => {
      if (vapiRef.current) vapiRef.current.stop();
      stopTimer();
    };
  }, []);

  const startTimer = () => {
    stopTimer(); // Clear any existing
    setTimeLeft(CALL_LIMIT_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (vapiRef.current) vapiRef.current.stop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const toggleCall = (e) => {
    e?.stopPropagation(); // Prevent modal interactions from interfering
    if (callState === 'active' || callState === 'connecting') {
      if (vapiRef.current) vapiRef.current.stop();
      setCallState('idle');
      stopTimer();
    } else {
      if (!vapiRef.current) return;
      setCallState('connecting');
      vapiRef.current.start(VAPI_ASSISTANT_ID);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2.5rem',
          zIndex: 100,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: callState === 'active' ? '#111111' : '#C4614A',
          color: '#FFFFFF',
          border: 'none',
          boxShadow: '0 8px 24px rgba(196,97,74,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="mic" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }}>
              <Mic size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse effect when call is active but window is closed */}
        {callState === 'active' && !isOpen && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #C4614A', pointerEvents: 'none' }}
          />
        )}
      </motion.button>

      {/* Widget Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '6.5rem',
              right: '2.5rem',
              zIndex: 100,
              width: '320px',
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #E8E6E0',
              boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ background: '#111111', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(196,97,74,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cpu size={16} color="#C4614A" />
              </div>
              <div>
                <p style={{ fontFamily: 'Fraunces', fontWeight: 600, fontSize: '0.95rem', color: '#FAFAF8', margin: 0 }}>Friday</p>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.55rem', color: '#A3A3A3', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Persona</p>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px' }}>
                {/* Pulse Rings */}
                {callState === 'active' && [1, 2].map((i) => (
                  <motion.div
                    key={i}
                    style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      borderRadius: '50%', 
                      border: '1px solid #C4614A',
                      pointerEvents: 'none', // IMPORTANT: Ensures button remains clickable
                      zIndex: 1
                    }}
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.8 }}
                  />
                ))}
                <motion.button
                  onClick={toggleCall}
                  style={{
                    position: 'relative',
                    zIndex: 10, // Higher than rings
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: (callState === 'active' || callState === 'connecting') ? '#111111' : '#C4614A',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(196,97,74,0.2)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {(callState === 'active' || callState === 'connecting') ? <PhoneOff size={28} color="#FFF" /> : <Mic size={28} color="#FFF" />}
                </motion.button>
              </div>

              <div style={{ textAlign: 'center', width: '100%' }}>
                <SoundWave active={callState === 'active'} />
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.62rem', color: callState === 'active' ? '#C4614A' : '#A3A3A3', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  {callState === 'idle' && 'Click to start'}
                  {callState === 'connecting' && 'Connecting...'}
                  {callState === 'active' && `Disconnect in ${formatTime(timeLeft)}`}
                </p>
              </div>

              <div style={{ width: '100%', height: '1px', background: '#F4F2EE' }} />

              <div style={{ display: 'flex', gap: 12, width: '100%' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Globe2 size={12} color="#C4614A" />
                  <span style={{ fontSize: '0.65rem', color: '#525252', fontFamily: 'Inter' }}>EN/HI</span>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Zap size={12} color="#C4614A" />
                  <span style={{ fontSize: '0.65rem', color: '#525252', fontFamily: 'Inter' }}>Fast Response</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
