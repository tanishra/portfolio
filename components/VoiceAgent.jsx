'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mic, PhoneOff, Zap, MessageCircle, Globe2, Cpu, Info } from 'lucide-react';
import Vapi from '@vapi-ai/web';

const fadeUp = (d=0) => ({ hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:0.7,ease:[0.16,1,0.3,1],delay:d}} });

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY; 
const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
const CALL_LIMIT_SECONDS = 120; // 2 minutes limit

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
  const [vapi, setVapi] = useState(null);
  const [timeLeft, setTimeLeft] = useState(CALL_LIMIT_SECONDS);
  const timerRef = useRef(null);

  useEffect(() => {
    const vapiInstance = new Vapi(VAPI_PUBLIC_KEY);
    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => {
      setCallState('active');
      startTimer();
    });

    vapiInstance.on('call-end', () => {
      setCallState('idle');
      stopTimer();
    });

    vapiInstance.on('error', (err) => {
      console.error('Vapi Error:', err);
      setCallState('idle');
      stopTimer();
    });

    return () => {
      vapiInstance.stop();
      stopTimer();
    };
  }, []);

  const startTimer = () => {
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
    setTimeLeft(CALL_LIMIT_SECONDS);
  };

  const stopCall = () => {
    if (vapi) vapi.stop();
    setCallState('idle');
    stopTimer();
  };

  const toggleCall = () => {
    if (callState === 'active') {
      stopCall();
    } else {
      setCallState('connecting');
      vapi.start(VAPI_ASSISTANT_ID);
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
          <div style={{display:'grid',gridTemplateColumns:'1fr lg:1fr',}}>

            {/* Interface Area */}
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:32,padding:'5rem 3rem',borderRight:'1px solid #E8E6E0',background:'#FFFFFF'}}>
              
              <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
                {/* Pulse Rings */}
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
                    {callState === 'active' && `Call ends in: ${formatTime(timeLeft)}`}
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
                  Have a quick chat with my AI assistant to know
                  <span style={{color:'#C4614A',fontWeight:600}}> about me.</span> 
                </p>
              </div>

              {/* Developer Note */}
              <div style={{padding:20,borderRadius:20,background:'rgba(196,97,74,0.03)',border:'1px dashed rgba(196,97,74,0.2)',display:'flex',gap:12}}>
                <Cpu size={16} color="#C4614A" style={{flexShrink:0,marginTop:2}}/>
                <p style={{fontSize:'0.72rem',fontFamily:'JetBrains Mono',color:'#C4614A',lineHeight:1.6}}>
                  <span style={{fontWeight:800}}>NOTE:</span> Currently powered by Vapi. I am building my own AI agent that will not only talk to you but also perform real-life tasks for you.
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
