'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, PhoneOff, X, Globe2 } from 'lucide-react';
import { Room, RoomEvent } from 'livekit-client';
import { track } from '@vercel/analytics';

const CALL_LIMIT_SECONDS = 120;

const BOOTSTRAP_LOGS = [
  "Waking up Friday from her slumber...",
  "Stretching her virtual neural networks...",
  "Brewing a cup of virtual coffee...",
  "Tuning vocal cords for perfect pitch...",
  "Opening vocabulary folders...",
  "Reviewing Tanish's project logs...",
  "Setting up bilingual translation...",
  "Powering up the vocal reactors...",
  "Polishing her smart responses...",
  "Ready to chat! Connecting line..."
];

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
  const [callError, setCallError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(CALL_LIMIT_SECONDS);
  const [logIndex, setLogIndex] = useState(0);
  
  const roomRef = useRef(null);

  useEffect(() => {
    if (callState !== 'connecting') {
      setLogIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < BOOTSTRAP_LOGS.length - 1) return prev + 1;
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [callState]);

  const getLogMessage = () => {
    if (callState !== 'connecting') return '';
    if (logIndex < BOOTSTRAP_LOGS.length - 1) {
      return `[${logIndex + 1}/${BOOTSTRAP_LOGS.length}] ${BOOTSTRAP_LOGS[logIndex]}`;
    }
    return 'Waking up Space... Please wait';
  };
  const timerRef = useRef(null);

  const startTimer = () => {
    stopTimer();
    setTimeLeft(CALL_LIMIT_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopCall();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const stopCall = async () => {
    if (roomRef.current) {
      await roomRef.current.disconnect();
      roomRef.current = null;
    }
    setCallState('idle');
    stopTimer();
  };

  const toggleCall = async (e) => {
    e?.stopPropagation();
    if (callState === 'active' || callState === 'connecting') {
      await stopCall();
      return;
    }

    if (!navigator.onLine) { setCallError('offline — check connection'); return; }

    try {
      track('friday_call');
      setCallState('connecting');
      setCallError(null);
      
      const res = await fetch('/api/friday-token', { method: 'POST' });
      if (!res.ok) throw new Error("Failed to reach Token Bridge");
      const { token, livekit_url } = await res.json();

      const room = new Room();
      roomRef.current = room;

      room.on(RoomEvent.TrackSubscribed, (track) => {
        if (track.kind === 'audio') track.attach();
      });

      room.on(RoomEvent.DataReceived, (payload) => {
        try {
          const data = JSON.parse(new TextDecoder().decode(payload));
          if (data.type === 'NAVIGATE') {
            const el = document.getElementById(data.section.toLowerCase());
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } catch (e) { console.error("Friday data error:", e); }
      });

      await room.connect(livekit_url, token);
      
      // Explicitly enable and publish the microphone
      await room.localParticipant.setMicrophoneEnabled(true);
      
      setCallState('active');
      startTimer();

    } catch (err) {
      console.error("Friday error:", err);
      setCallError(
        err.name === 'NotAllowedError' || /permission|denied/i.test(err.message)
          ? 'mic blocked — allow in browser'
          : "couldn't reach friday — retry"
      );
      setCallState('idle');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close Friday voice assistant' : 'Talk to Friday — AI voice assistant'}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: 'clamp(1rem, 5vw, 2.5rem)',
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

        {callState === 'active' && !isOpen && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #C4614A', pointerEvents: 'none' }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: '6.5rem',
              zIndex: 100,
              width: 'min(340px, calc(100vw - 32px))',
              right: 'clamp(1rem, 5vw, 2.5rem)',
              background: 'rgba(250,250,248,0.92)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderRadius: '20px',
              border: '1px solid #E8E6E0',
              boxShadow: '0 24px 64px -12px rgba(17,17,17,0.25), inset 0 1px 0 rgba(255,255,255,0.7)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(232,230,224,0.7)' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #C4614A 0%, #9E4A36 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(196,97,74,0.3), inset 0 1px 0 rgba(255,255,255,0.25)',
              }}>
                <Mic size={15} color="#FFF" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'Fraunces', fontStyle: 'italic', fontWeight: 600, fontSize: '1.05rem', color: '#111111', margin: 0, lineHeight: 1.2 }}>friday.</p>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.52rem', color: '#A3A3A3', margin: 0, textTransform: 'uppercase', letterSpacing: '0.12em' }}>voice agent · livekit</p>
              </div>
              {/* Status pill */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '4px 10px', borderRadius: 99,
                background: callState === 'active' ? 'rgba(45,125,82,0.1)' : callState === 'connecting' ? 'rgba(196,97,74,0.1)' : 'rgba(163,163,163,0.1)',
                border: `1px solid ${callState === 'active' ? 'rgba(45,125,82,0.25)' : callState === 'connecting' ? 'rgba(196,97,74,0.25)' : 'rgba(163,163,163,0.25)'}`,
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: callState === 'active' ? '#2D7D52' : callState === 'connecting' ? '#C4614A' : '#A3A3A3',
                }} className={callState !== 'idle' ? 'animate-pulse' : ''} />
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.52rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: callState === 'active' ? '#2D7D52' : callState === 'connecting' ? '#C4614A' : '#A3A3A3' }}>
                  {callState === 'idle' ? 'idle' : callState === 'connecting' ? 'dialing' : 'live'}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close panel"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A3A3A3', padding: 4, display: 'flex', borderRadius: 8 }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '96px', height: '96px' }}>
                {callState === 'active' && [0, 1].map((i) => (
                  <motion.div
                    key={i}
                    style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid #C4614A', pointerEvents: 'none' }}
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: 1.45, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 1 }}
                  />
                ))}
                {callState === 'connecting' && (
                  <motion.div
                    style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#C4614A', pointerEvents: 'none' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  />
                )}
                <motion.button
                  onClick={toggleCall}
                  aria-label={callState === 'active' || callState === 'connecting' ? 'End call' : 'Start call with Friday'}
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    background: callState === 'active' ? '#111111' : callState === 'connecting' ? '#F4F2EE' : '#C4614A',
                    border: callState === 'connecting' ? '1px solid #E8E6E0' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: callState === 'idle' ? '0 8px 24px rgba(196,97,74,0.28)' : '0 4px 16px rgba(17,17,17,0.12)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {callState === 'active' ? <PhoneOff size={24} color="#FFF" /> : <Mic size={26} color={callState === 'connecting' ? '#C4614A' : '#FFF'} />}
                </motion.button>
              </div>

              <div style={{ textAlign: 'center', width: '100%' }}>
                {callState === 'connecting' ? (
                  <div style={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: '0.52rem',
                    background: '#111111',
                    color: '#FAFAF8',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    textAlign: 'left',
                    width: '100%',
                    boxSizing: 'border-box',
                    border: '1px solid rgba(196,97,74,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="animate-pulse" style={{ color: '#C4614A', fontWeight: 900 }}>&gt;</span>
                      <span style={{ color: '#A3A3A3', fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>bootstrap sequence</span>
                    </div>
                    <span style={{ color: '#C4614A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {getLogMessage()}
                    </span>
                  </div>
                ) : (
                  <>
                    <SoundWave active={callState === 'active'} />
                    <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: callState === 'active' ? '#C4614A' : '#A3A3A3', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                      {callState === 'idle' && 'tap to talk'}
                      {callState === 'active' && `listening · ${formatTime(timeLeft)}`}
                    </p>
                    {callState === 'active' && (
                      <p style={{ fontFamily: 'Inter', fontSize: '0.68rem', color: '#A3A3A3', marginTop: '6px' }}>
                        try "go to projects" or "who is tanish"
                      </p>
                    )}
                  </>
                )}
                {callError && (
                  <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: '#DC2626', marginTop: '8px', letterSpacing: '0.03em', textAlign: 'center' }}>
                    {callError}
                  </p>
                )}
              </div>
            </div>

            {/* Footer microcopy */}
            <div style={{
              padding: '0.7rem 1.25rem', borderTop: '1px solid rgba(232,230,224,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <Globe2 size={11} color="#A3A3A3" />
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.52rem', color: '#A3A3A3', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                en/hi · autonomous · 120s cap
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
