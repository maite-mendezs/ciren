import React, { useState, useEffect } from 'react';
import { PHASES, G, BRAND, PrimaryBtn } from './shared';
import { saveSettings } from '../api';

const SERIF = '"Cormorant Garamond", serif';
const SANS  = '"DM Sans", sans-serif';

function today() {
  return new Date().toISOString().slice(0, 10);
}

function Dots({ total, current }) {
  return (
    <div style={{ display:'flex', gap:6, justifyContent:'center', paddingBottom:8 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: i === current ? 18 : 6,
          height: 6, borderRadius: 3,
          background: i === current ? BRAND : G.line,
          transition: 'all .3s ease',
        }}/>
      ))}
    </div>
  );
}

function BackBtn({ onBack }) {
  return (
    <button onClick={onBack} style={{
      background:'none', border:'none', cursor:'pointer', padding:0,
      display:'inline-flex', alignItems:'center', marginBottom:20,
    }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M12 15L7 10L12 5" stroke={G.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function Stepper({ val, min, max, onChange }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:16 }}>
      <button
        onClick={() => onChange(Math.max(min, val - 1))}
        style={{ width:36, height:36, borderRadius:18, border:`1px solid ${BRAND}`, background:'none', cursor:'pointer', fontSize:18, color:BRAND, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SANS }}
      >−</button>
      <span style={{ fontSize:17, fontWeight:500, color:G.ink, minWidth:32, textAlign:'center', fontFamily:SANS }}>{val}</span>
      <button
        onClick={() => onChange(Math.min(max, val + 1))}
        style={{ width:36, height:36, borderRadius:18, border:`1px solid ${BRAND}`, background:'none', cursor:'pointer', fontSize:18, color:BRAND, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SANS }}
      >+</button>
    </div>
  );
}

function Splash({ onDone }) {
  const [fadingOut, setFadingOut] = React.useState(false);
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), 2500);
    const doneTimer = setTimeout(onDone, 2900);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);
  return (
    <>
      <style>{`
        @keyframes ob-pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.08); }
        }
        @keyframes ob-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{
        flex:1, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap:18,
        background: '#ECEAF3',
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity .4s ease',
        minHeight: '100dvh',
      }}>
        <img src="/logo.png" alt="cirén logo"
          style={{ width:80, height:80, objectFit:'contain', animation:'ob-pulse 2s ease-in-out infinite' }}
        />
        <div style={{
          fontSize:26, fontWeight:300, letterSpacing:'.08em', color:'#2E2248',
          fontFamily:SANS, opacity:0,
          animation:'ob-fade-up .5s ease forwards .3s',
        }}>cirén</div>
      </div>
    </>
  );
}

function NameScreen({ name, setName, onNext }) {
  const canContinue = name.trim().length > 0;
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:G.stone, minHeight:'100dvh' }}>
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 28px' }}>
        <div style={{ fontSize:28, fontWeight:300, color:G.ink, fontFamily:SERIF, letterSpacing:'.01em', marginBottom:10 }}>
          What's your name?
        </div>
        <p style={{ fontSize:13, color:G.muted, marginBottom:32, fontFamily:SANS, lineHeight:1.6 }}>
          We'll use it to make the app feel personal
        </p>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && canContinue && onNext()}
          autoFocus
          style={{
            height:50, borderRadius:12, padding:'0 16px',
            border:`1.5px solid ${canContinue ? BRAND : G.line}`,
            fontSize:16, fontFamily:SANS, color:G.ink,
            background:'#fff', outline:'none',
            transition:'border-color .2s',
          }}
        />
      </div>
      <div style={{ padding:'0 24px 32px', flexShrink:0 }}>
        <PrimaryBtn onClick={onNext} phase={PHASES.luteal} disabled={!canContinue}>
          Continue
        </PrimaryBtn>
      </div>
    </div>
  );
}

function CycleData({ lastPeriodStart, setLastPeriodStart, cycleLength, setCycleLength, periodLength, setPeriodLength, onNext, onSkip, onBack, finishing, skipping }) {
  const canContinue = !!lastPeriodStart;

  const StepperRow = ({ label, val, min, max, onChange, suffix }) => (
    <div style={{ padding:'18px 0', borderBottom:`1px solid ${G.line}` }}>
      <div style={{ fontSize:15, color:G.ink, fontFamily:SANS, marginBottom:10 }}>{label}</div>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <Stepper val={val} min={min} max={max} onChange={onChange}/>
        <span style={{ fontSize:14, color:G.muted, fontFamily:SANS }}>{suffix}</span>
      </div>
    </div>
  );

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:'#fff', minHeight:'100dvh' }}>
      <div style={{ flex:1, overflowX:'hidden', overflowY:'auto', padding:'20px 24px 0' }}>
        <BackBtn onBack={onBack}/>
        <div style={{ fontSize:26, fontWeight:300, color:G.ink, fontFamily:SERIF, letterSpacing:'.01em', marginBottom:28 }}>
          Tell us about your cycle
        </div>
        <div style={{ padding:'18px 0', borderBottom:`1px solid ${G.line}` }}>
          <div style={{ fontSize:15, color:G.ink, fontFamily:SANS, marginBottom:10 }}>My last period started</div>
          <input
            type="date"
            value={lastPeriodStart}
            max={today()}
            onChange={e => setLastPeriodStart(e.target.value)}
            style={{
              height:44, width:'100%', borderRadius:10, padding:'0 14px',
              border:`1.5px solid ${lastPeriodStart ? BRAND : G.line}`,
              fontSize:14, fontFamily:SANS, color:G.ink,
              background:G.stone, outline:'none', boxSizing:'border-box',
              transition:'border-color .2s',
            }}
          />
        </div>
        <StepperRow label="My cycle usually lasts"  val={cycleLength}  min={21} max={45} onChange={setCycleLength}  suffix="days"/>
        <StepperRow label="My period usually lasts" val={periodLength} min={2}  max={10} onChange={setPeriodLength} suffix="days"/>
      </div>
      <div style={{ padding:'16px 24px 28px', flexShrink:0 }}>
        <PrimaryBtn onClick={onNext} phase={PHASES.luteal} disabled={!canContinue || finishing || skipping}>
          {finishing ? 'Setting up…' : 'Get started'}
        </PrimaryBtn>
        <button onClick={onSkip} disabled={finishing || skipping} style={{
          display:'block', width:'100%', marginTop:14,
          background:'none', border:'none', cursor:'pointer',
          fontSize:13, color:'#8E8E93', fontFamily:SANS,
          textDecoration:'underline', textUnderlineOffset:3,
        }}>
          Not sure? Skip for now
        </button>
      </div>
    </div>
  );
}

export function OnboardingFlow({ onComplete }) {
  const [screen, setScreen]                   = useState(0);
  const [name, setName]                       = useState('');
  const [lastPeriodStart, setLastPeriodStart] = useState('');
  const [cycleLength, setCycleLength]         = useState(28);
  const [periodLength, setPeriodLength]       = useState(5);
  const [finishing, setFinishing] = useState(false);
  const [skipping,  setSkipping]  = useState(false);

  async function handleFinish() {
    setFinishing(true);
    try {
      await saveSettings({ name: name.trim() || 'Me', cycleLength, periodLength, lastPeriodStart, isOnboarded: true });
      onComplete();
    } finally {
      setFinishing(false);
    }
  }

  async function handleSkip() {
    setSkipping(true);
    try {
      await saveSettings({ name: name.trim() || 'Me', cycleLength, periodLength, lastPeriodStart: null, isOnboarded: true });
      onComplete();
    } finally {
      setSkipping(false);
    }
  }

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minHeight:'100dvh' }}>
      {screen === 0 && <Splash onDone={() => setScreen(1)} />}

      {screen >= 1 && (
        <div style={{ flexShrink:0, paddingTop:8 }}>
          <Dots total={2} current={screen - 1} />
        </div>
      )}

      {screen === 1 && (
        <NameScreen name={name} setName={setName} onNext={() => setScreen(2)} />
      )}
      {screen === 2 && (
        <CycleData
          lastPeriodStart={lastPeriodStart} setLastPeriodStart={setLastPeriodStart}
          cycleLength={cycleLength}         setCycleLength={setCycleLength}
          periodLength={periodLength}       setPeriodLength={setPeriodLength}
          onNext={handleFinish}
          onSkip={handleSkip}
          onBack={() => setScreen(1)}
          finishing={finishing}
          skipping={skipping}
        />
      )}
    </div>
  );
}
