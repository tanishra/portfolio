'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mic, PhoneOff, Cpu } from 'lucide-react';
import { Room, RoomEvent } from 'livekit-client';

const fadeUp = (d=0) => ({ hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:0.7,ease:[0.16,1,0.3,1],delay:d}} });
const CALL_LIMIT_SECONDS = 120;

function SoundWave({ active }) {
  const bars=[0.4,0.7,1,0.6,0.9,0.5,0.8,0.45,0.75,0.55,0.85,0.6];
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:3,height:32,width:'100%'}}>
      {bars.map((h,i)=>(
        <motion.div key={i} style={{width:3,borderRadius:99,background:'#C4614A'}}
          animate={active?{height:['4px',`${h*28}px`,'4px'],opacity:[0.4,1,0.4]}:{height:'4px',opacity:0.25}}
          transition={active?{duration:0.8+i*0.05,repeat:Infinity,delay:i*0.06,ease:'easeInOut'}:{}}
        />
      ))}
    </div>
  );
}

export default function VoiceAgent() {
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:'-80px'});
  
  const [callState, setCallState] = useState('idle'); // 'idle', 'connecting', 'active'
  const [timeLeft, setTimeLeft] = useState(CALL_LIMIT_SECONDS);
  
  const roomRef = useRef(null);
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
    window.dispatchEvent(new CustomEvent('vapi-end')); // Signal music to return
  };

  const toggleCall = async () => {
    if (callState === 'active' || callState === 'connecting') {
      await stopCall();
      return;
    }

    try {
      setCallState('connecting');
      
      // 1. Handshake with local Token Bridge
      const res = await fetch('/api/friday-token', { method: 'POST' });
      if (!res.ok) throw new Error("Failed to reach Token Bridge");
      const { token, livekit_url } = await res.json();

      // 2. Initialize LiveKit Room
      const room = new Room();
      roomRef.current = room;

      // 3. Audio Handlers
      room.on(RoomEvent.TrackSubscribed, (track) => {
        if (track.kind === 'audio') track.attach();
      });

      // 4. Remote Control Logic
      room.on(RoomEvent.DataReceived, (payload) => {
        try {
          const data = JSON.parse(new TextDecoder().decode(payload));
          console.log("Friday Remote Command:", data);
          
          if (data.type === 'NAVIGATE') {
            const el = document.getElementById(data.section.toLowerCase());
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          if (data.type === 'OPEN_PROJECT') {
             // Logic to trigger project modal if needed
          }
        } catch (e) { console.error("Error parsing Friday data:", e); }
      });

      // 5. Connect
      await room.connect(livekit_url, token);
      
      // 6. PUBLISH MICROPHONE (Crucial Fix)
      await room.localParticipant.setMicrophoneEnabled(true);
      
      setCallState('active');
      startTimer();
      window.dispatchEvent(new CustomEvent('vapi-start')); // Signal music to duck

    } catch (err) {
      console.error("Friday Connection Error:", err);
      setCallState('idle');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="voice" ref={ref} style={{padding:'7rem 0',background:'#FAFAF8'}}>
      <div style={{maxWidth:1152,margin:'0 auto',padding:'0 1.5rem'}}>
        <motion.div initial="hidden" animate={inView?'show':'hidden'} variants={fadeUp(0)} style={{marginBottom:'4rem'}}>
          <span className="section-label">07 — Voice Agent</span>
          <div className="section-divider" style={{marginTop:12}} />
        </motion.div>

        <motion.div initial="hidden" animate={inView?'show':'hidden'} variants={fadeUp(0.1)}
          style={{borderRadius:32,border:'1px solid #E8E6E0',background:'#FAFAF8',overflow:'hidden',boxShadow:'0 4px 24px rgba(0,0,0,0.04)'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr lg:1fr'}}>

            {/* Interface Area */}
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:32,padding:'5rem 3rem',borderRight:'1px solid #E8E6E0',background:'#FFFFFF'}}>
              <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
                {callState === 'active' && [1,2,3].map(i=>(
                  <motion.div key={i} style={{position:'absolute',inset:0,borderRadius:'50%',border:'1px solid #C4614A'}}
                    initial={{scale:1,opacity:0.5}} animate={{scale:1+i*0.4,opacity:0}}
                    transition={{duration:2,repeat:Infinity,delay:i*0.5,ease:'easeOut'}}
                  />
                ))}

                <motion.button
                  onClick={toggleCall}
                  style={{
                    position:'relative',zIndex:1,width:128,height:128,borderRadius:'50%',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    cursor:'pointer',
                    background: callState === 'active' ? '#111111' : '#C4614A',
                    border:'none',
                    boxShadow: callState === 'active' ? '0 0 40px rgba(0,0,0,0.1)' : '0 12px 40px rgba(196,97,74,0.3)',
                    transition:'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                >
                  {callState === 'active' ? <PhoneOff size={40} color="#FFF" /> : <Mic size={40} color="#FFF" />}
                </motion.button>
              </div>

              <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:16}}>
                <SoundWave active={callState === 'active'}/>
                <div style={{textAlign:'center'}}>
                  <p style={{fontFamily:'JetBrains Mono',fontSize:'0.7rem',color:callState === 'active' ? '#C4614A' : '#A3A3A3',textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:600, margin:0}}>
                    {callState === 'idle' && 'Click to Start Conversation'}
                    {callState === 'connecting' && 'Establishing Connection...'}
                    {callState === 'active' && `Friday Listening... ${formatTime(timeLeft)}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Info Area */}
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',gap:32,padding:'5rem 3rem'}}>
              <div>
                <h2 className="font-display" style={{fontSize:'2.5rem',fontWeight:800,color:'#111111',lineHeight:1.1,marginBottom:16}}>
                  Talk to <br /><span className="gradient-text italic font-normal">Friday.</span>
                </h2>
                <p style={{fontFamily:'Inter',fontSize:'1.05rem',color:'#525252',lineHeight:1.6}}>
                  Have a quick chat with my custom AI assistant to learn
                  <span style={{color:'#C4614A',fontWeight:600}}> about me.</span> 
                </p>
              </div>

              <div style={{padding:20,borderRadius:20,background:'rgba(196,97,74,0.03)',border:'1px dashed rgba(196,97,74,0.2)',display:'flex',flexDirection:'column',gap:12}}>
                <div style={{display:'flex', gap:12}}>
                  <Cpu size={16} color="#C4614A" style={{flexShrink:0,marginTop:2}}/>
                  <p style={{fontSize:'0.72rem',fontFamily:'JetBrains Mono',color:'#C4614A',lineHeight:1.6, margin:0}}>
                    <span style={{fontWeight:800}}>SYSTEM:</span> Running on a proprietary LiveKit orchestration layer, utilizing Deepgram and OpenAI for autonomous task execution and real-time site control.
                  </p>
                </div>
                <a href="https://github.com/tanishra/Friday" target="_blank" rel="noopener noreferrer" 
                   style={{display:'flex', alignItems:'center', gap:6, fontSize:'0.65rem', fontFamily:'JetBrains Mono', color:'#A3A3A3', textDecoration:'none', marginLeft:28, transition:'color 0.2s'}}
                   onMouseEnter={e => e.currentTarget.style.color = '#C4614A'}
                   onMouseLeave={e => e.currentTarget.style.color = '#A3A3A3'}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  View source code
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
