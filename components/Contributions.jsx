'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitCommit, Flame, Calendar, RefreshCw, AlertCircle, ArrowUpRight } from 'lucide-react';

const GITHUB_USERNAME = 'tanishra'; // ← update to your real username

const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: d } },
});

// ── Terracotta heatmap palette ─────────────────────────────────
function getColor(count) {
  if (count === 0) return { bg: '#F4F0EB', border: '#E8E2DA' };
  if (count <= 2)  return { bg: '#F5E0D8', border: '#EAC4B4' };
  if (count <= 5)  return { bg: '#E8896F', border: '#D97757' };
  if (count <= 9)  return { bg: '#C4614A', border: '#B35540' };
  return           { bg: '#9E4A36', border: '#8A3D2C' };
}

function buildGrid(contributions) {
  const map = {};
  for (const c of contributions) map[c.date] = c.count;
  const grid = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - 363);
  start.setDate(start.getDate() - start.getDay()); // rewind to Sunday
  let cursor = new Date(start);
  while (cursor <= today) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const iso = cursor.toISOString().split('T')[0];
      week.push({ date: new Date(cursor), count: map[iso] || 0 });
      cursor.setDate(cursor.getDate() + 1);
    }
    grid.push(week);
  }
  return grid;
}

function generateFallback() {
  const raw = [];
  const today = new Date();
  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    let count = 0;
    if (Math.random() > 0.38) {
      count = Math.floor(Math.random() * (isWeekend ? 4 : 8));
      if (!isWeekend && Math.random() > 0.93) count += Math.floor(Math.random() * 8) + 6;
    }
    raw.push({ date: d.toISOString().split('T')[0], count });
  }
  return buildGrid(raw);
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

// ── Tooltip ────────────────────────────────────────────────────
function Tooltip({ cell, pos }) {
  if (!cell) return null;
  const label = cell.date.toLocaleDateString('en-US', {
    weekday:'short', month:'short', day:'numeric', year:'numeric',
  });
  return (
    <div style={{
      position:'fixed', zIndex:50, left:pos.x+14, top:pos.y-56,
      padding:'8px 12px', borderRadius:10,
      background:'#111111', color:'#FAFAF8',
      fontFamily:'JetBrains Mono,monospace', fontSize:'0.7rem',
      pointerEvents:'none', whiteSpace:'nowrap',
      boxShadow:'0 4px 16px rgba(0,0,0,0.15)',
    }}>
      <span style={{color:'#E8896F', fontWeight:700}}>{cell.count}</span>
      {' '}contribution{cell.count !== 1 ? 's' : ''} · {label}
    </div>
  );
}

export default function Contributions() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [grid,       setGrid]       = useState([]);
  const [loadState,  setLoadState]  = useState('idle');
  const [isFallback, setIsFallback] = useState(false);
  const [revealed,   setRevealed]   = useState(false);
  const [tooltip,    setTooltip]    = useState({ cell: null, pos: { x: 0, y: 0 } });

  useEffect(() => {
    if (inView && grid.length > 0) {
      const t = setTimeout(() => setRevealed(true), 200);
      return () => clearTimeout(t);
    }
  }, [inView, grid]);

  const fetchContributions = useCallback(async () => {
    setLoadState('loading'); setRevealed(false);
    try {
      const res  = await fetch(`/api/github-contributions?username=${GITHUB_USERNAME}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.contributions?.length) throw new Error('empty');
      setGrid(buildGrid(data.contributions));
      setIsFallback(false); setLoadState('done');
    } catch (err) {
      console.warn('[Contributions] fallback:', err.message);
      setGrid(generateFallback());
      setIsFallback(true); setLoadState('error');
    }
  }, []);

  useEffect(() => { fetchContributions(); }, [fetchContributions]);

  // ── Derived stats ──────────────────────────────────────────────
  const flat               = grid.flat();
  const totalContributions = flat.reduce((s, c) => s + c.count, 0);
  const currentStreak      = (() => { let s = 0; for (const c of [...flat].reverse()) { if (c.count > 0) s++; else break; } return s; })();
  const longestStreak      = (() => { let max = 0, cur = 0; for (const c of flat) { if (c.count > 0) { cur++; max = Math.max(max, cur); } else cur = 0; } return max; })();
  const activeDays         = flat.filter(c => c.count > 0).length;

  const monthLabels = [];
  let lastMonth = -1;
  grid.forEach((week, wi) => {
    const month = week[0].date.getMonth(); 
    if (month !== lastMonth) {
      monthLabels.push({ wi, label: MONTHS[month] });
      lastMonth = month;
    }
  });

  const onMouseMove  = useCallback((cell, e) => setTooltip({ cell, pos: { x: e.clientX, y: e.clientY } }), []);
  const onMouseLeave = useCallback(() => setTooltip({ cell: null, pos: { x: 0, y: 0 } }), []);

  const loading = loadState === 'loading';

  const stats = [
    { label: 'Contributions', value: loading ? '—' : totalContributions.toLocaleString(), icon: <GitCommit size={14}/>, color: '#C4614A' },
    { label: 'Current Streak', value: loading ? '—' : `${currentStreak}d`,                icon: <Flame size={14}/>,    color: '#92400E' },
    { label: 'Longest Streak', value: loading ? '—' : `${longestStreak}d`,                icon: <Flame size={14}/>,    color: '#C4614A' },
    { label: 'Active Days',    value: loading ? '—' : activeDays,                          icon: <Calendar size={14}/>, color: '#2D7D52' },
  ];

  return (
    <section id="contributions" ref={ref} style={{ padding: '7rem 0', background: '#FAFAF8' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 1.5rem' }}>

        <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0)} style={{ marginBottom: '4rem' }}>
          <span className="section-label">06 — Contributions</span>
          <div className="section-divider" style={{ marginTop: 12 }} />
        </motion.div>

        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:'1rem', marginBottom:'2rem' }}>
          <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.08)}>
            <h2 className="font-display" style={{ fontSize:'clamp(2rem,5vw,3rem)', fontWeight:700, color:'#111111', lineHeight:1.05, marginBottom:6 }}>
              Shipping{' '}
              <em style={{ fontWeight:300, fontStyle:'italic', background:'linear-gradient(135deg,#C4614A,#9E4A36)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                consistently.
              </em>
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:'0.875rem', color:'#525252' }}>
              {isFallback ? 'Sample activity — automated engineering log.' : `Real activity from @${GITHUB_USERNAME} on GitHub.`}
            </p>
          </motion.div>

          <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.12)} style={{ display:'flex', alignItems:'center', gap:8 }}>
            <motion.button
              onClick={fetchContributions} disabled={loading}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ display:'flex', alignItems:'center', gap:5, padding:'7px 13px', borderRadius:9, border:'1px solid #E8E6E0', background:'#FAFAF8', fontFamily:'JetBrains Mono,monospace', fontSize:'0.65rem', color:'#525252', cursor:'pointer', transition:'all 0.2s', opacity: loading ? 0.5 : 1 }}
            >
              <RefreshCw size={11} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
              {loading ? 'Loading…' : 'Refresh'}
            </motion.button>
            <motion.a
              href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'7px 13px', borderRadius:9, border:'1px solid #E8E6E0', background:'#FAFAF8', fontFamily:'Inter,sans-serif', fontSize:'0.8rem', fontWeight:500, color:'#111111', textDecoration:'none', transition:'all 0.2s' }}
            >
              <ArrowUpRight size={11} /> @{GITHUB_USERNAME}
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.18)}
          style={{ borderRadius: 20, border: '1px solid #E8E6E0', background: '#FAFAF8', overflow: 'hidden', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}
        >
          <div style={{ display:'flex', flexDirection:'row' }}>

            {/* LEFT — vertical stat strip */}
            <div style={{ flexShrink:0, width:180, borderRight:'1px solid #E8E6E0', display:'flex', flexDirection:'column' }}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity:0, x:-12 }}
                  animate={inView ? { opacity:1, x:0 } : {}}
                  transition={{ delay: 0.28 + i * 0.07, duration: 0.5, ease:[0.16,1,0.3,1] }}
                  style={{
                    flex: 1,
                    padding: '1.25rem',
                    borderBottom: i < stats.length - 1 ? '1px solid #E8E6E0' : 'none',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4,
                    transition: 'background 0.2s',
                    cursor: 'default',
                  }}
                  whileHover={{ backgroundColor: '#F4F2EE' }}
                >
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ color: s.color }}>{s.icon}</span>
                    <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.55rem', textTransform:'uppercase', letterSpacing:'0.12em', color:'#A3A3A3' }}>
                      {s.label}
                    </span>
                  </div>
                  <p className="font-display" style={{ fontSize:'1.4rem', fontWeight:700, color: s.color, lineHeight:1, letterSpacing:'-0.5px', margin:0 }}>
                    {s.value}
                  </p>
                  <motion.div style={{ height:2, borderRadius:99, background: s.color + '25', overflow:'hidden', width: '40px' }}>
                    <motion.div
                      style={{ height:'100%', borderRadius:99, background: s.color }}
                      initial={{ width:'0%' }}
                      animate={inView ? { width:'60%' } : {}}
                      transition={{ delay: 0.4 + i * 0.09, duration: 0.9, ease:[0.16,1,0.3,1] }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* RIGHT — heatmap */}
            <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column' }}>
              <div style={{ padding:'12px 20px', borderBottom:'1px solid #E8E6E0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                  <div style={{ width:3, height:14, borderRadius:99, background:'#C4614A' }} />
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.6rem', textTransform:'uppercase', letterSpacing:'0.15em', color:'#525252' }}>
                    Activity — past 12 months
                  </span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.55rem', color:'#A3A3A3' }}>Less</span>
                  {[0, 1, 3, 6, 12].map(n => {
                    const { bg, border } = getColor(n);
                    return <div key={n} style={{ width:10, height:10, borderRadius:2, background:bg, border:`1px solid ${border}` }} />;
                  })}
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.55rem', color:'#A3A3A3' }}>More</span>
                </div>
              </div>

              <div style={{ flex:1, padding:'20px', display:'flex', alignItems:'center', justifyContent: 'center', overflow: 'hidden' }}>
                {loading && grid.length === 0 ? (
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:120, gap:8, color:'#A3A3A3' }}>
                    <RefreshCw size={14} style={{ animation:'spin 1s linear infinite' }} />
                    <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.75rem' }}>Fetching GitHub data…</span>
                  </div>
                ) : (
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display:'flex', marginBottom:6, width: '100%', paddingLeft: '24px' }}>
                      <div style={{ position:'relative', flex:1, height:14 }}>
                        {monthLabels.map(({ wi, label }) => (
                          <span
                            key={`${label}-${wi}`}
                            style={{
                              position:'absolute',
                              fontFamily:'JetBrains Mono,monospace', fontSize:'0.55rem',
                              color:'#A3A3A3',
                              left:`${(wi / grid.length) * 100}%`,
                              whiteSpace:'nowrap',
                            }}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display:'flex', gap:6, alignItems:'flex-start', width: '100%' }}>
                      <div style={{ display:'flex', flexDirection:'column', gap:3, marginRight:4, flexShrink:0, paddingTop:1 }}>
                        {DAYS.map((d, i) => (
                          <div key={i} style={{ height:12, fontFamily:'JetBrains Mono,monospace', fontSize:'0.5rem', color:'#A3A3A3', display:'flex', alignItems:'center' }}>
                            {d}
                          </div>
                        ))}
                      </div>

                      <div style={{ display:'flex', gap:3, flex: 1, justifyContent: 'space-between' }}>
                        {grid.map((week, wi) => (
                          <div key={wi} style={{ display:'flex', flexDirection:'column', gap:3, flex: 1 }}>
                            {week.map((cell, di) => {
                              const { bg, border } = getColor(cell.count);
                              const animDelay = revealed ? (wi * 7 + di) * 0.0012 : 9999;
                              return (
                                <motion.div
                                  key={di}
                                  initial={{ opacity: 0, scale: 0.2 }}
                                  animate={revealed ? { opacity: 1, scale: 1 } : {}}
                                  transition={{ delay: animDelay, duration: 0.25, ease: [0.34, 1, 0.3, 1] }}
                                  onMouseMove={e => onMouseMove(cell, e)}
                                  onMouseLeave={onMouseLeave}
                                  whileHover={{ scale: 1.7, zIndex: 10 }}
                                  style={{
                                    width: '100%', paddingTop: '100%', borderRadius: 2,
                                    background: bg, border: `1px solid ${border}`,
                                    cursor: 'pointer',
                                    boxShadow: cell.count >= 10 ? '0 0 4px #C4614A30' : 'none',
                                    position: 'relative'
                                  }}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'} variants={fadeUp(0.35)}
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginTop:12 }}
        >
          <p style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.62rem', color:'#A3A3A3' }}>
            Past 365 days of execution
          </p>
        </motion.div>
      </div>

      <style>{`@keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }`}</style>
      <Tooltip cell={tooltip.cell} pos={tooltip.pos} />
    </section>
  );
}
