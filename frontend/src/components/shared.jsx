// shared.jsx — Cirén brand identity
// Migrated from mellow-pwa-shared.jsx: ES module exports, ProfileTab wired to API
import React from 'react';

export const PHASES = {
  menstrual: {
    key:'menstrual', name:'Menstrual',
    bg:'#F5EEF0',
    pageBg:'#EDD8DB',
    btnAccent:'#9B5B6A',
    accent:'#E7D3D6',
    accentLight:'#F5ECED',
    text:'#5C2D3A',
    bandColor:'#E7D3D6',
  },
  follicular: {
    key:'follicular', name:'Follicular',
    bg:'#EEF2EE',
    pageBg:'#D7DFD2',
    btnAccent:'#4A7259',
    accent:'#D7DFD2',
    accentLight:'#EBF0E9',
    text:'#1E3D2A',
    bandColor:'#D7DFD2',
  },
  ovulatory: {
    key:'ovulatory', name:'Ovulatory',
    bg:'#F5F2E8',
    pageBg:'#F1E2C1',
    btnAccent:'#8A6620',
    accent:'#F1E2C1',
    accentLight:'#F8F2E0',
    text:'#4A3510',
    bandColor:'#F1E2C1',
  },
  luteal: {
    key:'luteal', name:'Luteal',
    bg:'#F0EEF5',
    pageBg:'#D6D2E1',
    btnAccent:'#6B5A8A',
    accent:'#D6D2E1',
    accentLight:'#ECEAF3',
    text:'#2E2248',
    bandColor:'#D6D2E1',
  },
};

export const G = {
  ink:      '#1E1E1E',
  labelDark:'#1E1E1E',
  muted:    '#7A7570',
  inactive: '#A8A4A0',
  subtle:   '#8A8680',
  stone:    '#FAFAF8',
  taupe:    '#DCDBD2',
  line:     '#EFEFEF',
};

export const BRAND = '#6B5A8A';

// ─── Four-petal logo mark ─────────────────────────────────────────────────────

export function PetalMark({ size=24, style }) {
  return (
    <img src="/logo.png" alt="cirén" aria-hidden="true"
      style={{ width:size, height:size, objectFit:'contain', display:'block', ...style }}
    />
  );
}

// ─── Status bar ───────────────────────────────────────────────────────────────

export function StatusBar({ dark }) {
  const c = dark ? '#fff' : G.ink;
  return (
    <div style={{ height:54, display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 24px 10px', flexShrink:0 }}>
      <span style={{ fontSize:15, fontWeight:500, color:c, fontFamily:'"DM Sans", sans-serif' }}>9:41</span>
      <div style={{ display:'flex', gap:5, alignItems:'center' }}>
        <svg width="16" height="11" viewBox="0 0 16 11" aria-hidden="true">
          <rect x="0" y="5" width="2.5" height="6" rx=".5" fill={c}/>
          <rect x="4" y="3" width="2.5" height="8" rx=".5" fill={c}/>
          <rect x="8" y="1" width="2.5" height="10" rx=".5" fill={c}/>
          <rect x="12" y="0" width="2.5" height="11" rx=".5" fill={c} opacity=".3"/>
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" aria-hidden="true">
          <path d="M7.5 2.5C5.2 2.5 3.1 3.4 1.5 4.9L0 3.3C2 1.3 4.6 0 7.5 0s5.5 1.3 7.5 3.3L13.5 4.9C11.9 3.4 9.8 2.5 7.5 2.5z" fill={c} opacity=".4"/>
          <path d="M7.5 5.5C6 5.5 4.7 6.1 3.6 7.1L2.2 5.7C3.5 4.3 5.4 3.5 7.5 3.5s4 .8 5.3 2.2L11.4 7.1C10.3 6.1 9 5.5 7.5 5.5z" fill={c} opacity=".75"/>
          <circle cx="7.5" cy="9.5" r="1.5" fill={c}/>
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11" aria-hidden="true">
          <rect x=".5" y=".5" width="20" height="10" rx="2.5" stroke={c} strokeWidth="1" fill="none" opacity=".4"/>
          <rect x="21.5" y="3.5" width="2" height="4" rx="1" fill={c} opacity=".4"/>
          <rect x="2" y="2" width="15" height="7" rx="1.5" fill={c}/>
        </svg>
      </div>
    </div>
  );
}

// ─── Phone shell ──────────────────────────────────────────────────────────────

export function PhoneShell({ children }) {
  return <>{children}</>;
}

// ─── Top bar (wordmark only) ──────────────────────────────────────────────────

export function TopBar({ phase }) {
  const p = phase || PHASES.luteal;
  return (
    <div style={{
      display:'flex', alignItems:'center',
      padding:'0 22px', height:52, flexShrink:0,
      background:G.stone,
      borderBottom:`1px solid ${G.line}`,
    }}>
      <PetalMark size={22}/>
      <span style={{ fontSize:19, fontWeight:300, color:G.ink, letterSpacing:'.04em', fontFamily:'"DM Sans", sans-serif', marginLeft:9 }}>cirén</span>
    </div>
  );
}

// ─── Bottom tab bar ───────────────────────────────────────────────────────────

export function BottomTabBar({ active, onTab, phase }) {
  const p = phase || PHASES.luteal;

  const TabBtn = ({ tabKey, label, icon }) => {
    const isActive = active === tabKey;
    const color = isActive ? BRAND : G.muted;
    return (
      <button onClick={() => onTab(tabKey)}
        style={{
          flex:1, display:'flex', flexDirection:'column', alignItems:'center',
          justifyContent:'center', gap:3, height:'100%',
          border:'none', background:'none', cursor:'pointer',
          fontFamily:'"DM Sans", sans-serif',
        }}>
        {icon(color)}
        <span style={{ fontSize:10, fontWeight: isActive ? 500 : 400, color, letterSpacing:'.02em' }}>{label}</span>
      </button>
    );
  };

  return (
    <div style={{
      flexShrink:0, height:60, display:'flex',
      background:'#fff',
      borderTop:`1px solid ${G.line}`,
      paddingBottom:'env(safe-area-inset-bottom, 0px)',
    }}>
      <TabBtn tabKey="home" label="Home" icon={c => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 9.5L11 3l8 6.5V19a1 1 0 0 1-1 1H14v-5h-4v5H4a1 1 0 0 1-1-1V9.5Z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/>
        </svg>
      )}/>
      <TabBtn tabKey="calendar" label="Journal" icon={c => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="4" width="18" height="16" rx="2" stroke={c} strokeWidth="1.4"/>
          <path d="M2 9h18" stroke={c} strokeWidth="1.4"/>
          <path d="M7 2v4M15 2v4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
          <rect x="6" y="13" width="2" height="2" rx=".4" fill={c}/>
          <rect x="10" y="13" width="2" height="2" rx=".4" fill={c}/>
          <rect x="14" y="13" width="2" height="2" rx=".4" fill={c}/>
        </svg>
      )}/>
      <TabBtn tabKey="profile" label="Account" icon={c => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="8" r="4" stroke={c} strokeWidth="1.4"/>
          <path d="M3 20c0-3.866 3.582-7 8-7s8 3.134 8 7" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      )}/>
    </div>
  );
}

// ─── Cycle bar ────────────────────────────────────────────────────────────────

export function CycleBar({ phase, cycleDay, cycleLength=28, periodLength=5 }) {
  const p = phase || PHASES.luteal;
  const segs = [
    { ph:PHASES.menstrual,  days:periodLength },
    { ph:PHASES.follicular, days:13-periodLength },
    { ph:PHASES.ovulatory,  days:3 },
    { ph:PHASES.luteal,     days:cycleLength-16 },
  ];
  const dot = ((cycleDay-.5)/cycleLength)*100;
  return (
    <div style={{ position:'relative', height:8 }} role="img" aria-label={`Day ${cycleDay} of ${cycleLength}`}>
      <div style={{ display:'flex', width:'100%', height:'100%', borderRadius:4, overflow:'hidden' }}>
        {segs.map((s,i)=><div key={i} style={{ flex:s.days, background:s.ph.accent, opacity:s.ph.key===p.key?1:.5 }}/>)}
      </div>
      <div style={{ position:'absolute', top:'50%', left:`${dot}%`, transform:'translate(-50%,-50%)', width:16, height:16, borderRadius:'50%', background:p.btnAccent, border:'2px solid #fff', boxShadow:`0 2px 8px ${p.btnAccent}50` }}/>
    </div>
  );
}

// ─── Primitives ───────────────────────────────────────────────────────────────

export function SectionLabel({ children, style }) {
  return <div style={{ fontSize:10, fontWeight:500, letterSpacing:'.12em', textTransform:'uppercase', color:G.muted, marginBottom:8, fontFamily:'"DM Sans", sans-serif', ...style }}>{children}</div>;
}

export function Card({ children, phase, style }) {
  return <div style={{ background:'#fff', borderRadius:20, border:'1.5px solid #EFEFEF', padding:'18px 20px', ...style }}>{children}</div>;
}

export function Chip({ label, active, onClick, phase, style }) {
  const p = phase || PHASES.luteal;
  return (
    <button onClick={onClick} style={{
      height:34, padding:'0 16px', borderRadius:50,
      border:`1px solid ${active ? BRAND : G.line}`,
      background: active ? '#ECEAF3' : 'transparent',
      color: active ? BRAND : G.ink,
      fontSize:13, fontWeight: active ? 500 : 400,
      cursor:'pointer', fontFamily:'"DM Sans", sans-serif', whiteSpace:'nowrap',
      transition:'all .15s ease', ...style,
    }}>{label}</button>
  );
}

export function PrimaryBtn({ children, onClick, phase, style, disabled }) {
  const p = phase || PHASES.luteal;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width:'100%', height:50, borderRadius:50, border:'none',
      background: disabled ? G.taupe : BRAND,
      color: disabled ? G.muted : '#fff',
      fontSize:14, fontWeight:500, letterSpacing:'.02em',
      cursor: disabled ? 'default' : 'pointer',
      fontFamily:'"DM Sans", sans-serif',
      transition:'opacity .15s', ...style,
    }}>{children}</button>
  );
}

export function SuccessState({ phase, message, sub, onDone }) {
  const p = phase || PHASES.luteal;
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 32px', textAlign:'center', background:G.stone }}>
      <PetalMark size={48} style={{ marginBottom:24 }}/>
      <div style={{ fontSize:22, fontWeight:300, color:G.ink, marginBottom:8, fontFamily:'"Cormorant Garamond", serif', letterSpacing:'.01em' }}>{message}</div>
      <div style={{ fontSize:13, color:G.muted, marginBottom:36, lineHeight:1.6, maxWidth:220 }}>{sub}</div>
      <PrimaryBtn onClick={onDone} phase={p} style={{ width:'auto', padding:'0 40px' }}>Back to today</PrimaryBtn>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

export function Toast({ message, onDone }) {
  const [opacity, setOpacity] = React.useState(0);
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setOpacity(1));
    const fadeOut = setTimeout(() => setOpacity(0), 1800);
    const done    = setTimeout(() => onDone?.(), 2300);
    return () => { cancelAnimationFrame(frame); clearTimeout(fadeOut); clearTimeout(done); };
  }, []);
  return (
    <div style={{
      position:'absolute', top:20, left:'50%', transform:'translateX(-50%)',
      background:'#1C1C1E', color:'#fff', fontSize:13, fontWeight:500,
      padding:'9px 20px', borderRadius:50, whiteSpace:'nowrap',
      fontFamily:'"DM Sans", sans-serif', letterSpacing:'.01em',
      opacity, transition:'opacity .4s ease',
      pointerEvents:'none', zIndex:100,
    }}>
      {message}
    </div>
  );
}

// ─── Legal content ────────────────────────────────────────────────────────────

function LegalBlock({ heading, children }) {
  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ fontSize:11, fontWeight:600, letterSpacing:'.10em', textTransform:'uppercase', color:G.muted, marginBottom:6 }}>{heading}</div>
      <div style={{ fontSize:14, color:G.ink, lineHeight:1.75 }}>{children}</div>
    </div>
  );
}

function LegalMeta({ date, operator, contact }) {
  return (
    <div style={{ fontSize:12, color:G.muted, lineHeight:1.8, marginBottom:24 }}>
      <div>Last updated: {date}</div>
      <div>Data controller: {operator}</div>
      <div>Contact: <span style={{ color:BRAND }}>{contact}</span></div>
    </div>
  );
}

function LegalPrivacy() {
  return (
    <>
      <LegalMeta date="May 2026" operator="Maite Méndez Santiváñez" contact="hello@ciren.app"/>
      <LegalBlock heading="What cirén is">
        cirén is a cycle tracking app that helps you understand how your menstrual cycle affects your daily wellbeing. It is a personal wellness tool, not a medical device.
      </LegalBlock>
      <LegalBlock heading="What data we collect">
        When you use cirén, we collect your first name, email address, cycle settings (last period date, cycle length, period length, whether your cycle is irregular), and daily logs (period flow, cravings, mood, mind state, symptoms, movement, sleep quality). This data is classified as health data under GDPR and is treated with the highest level of care.
      </LegalBlock>
      <LegalBlock heading="Why we collect it">
        Solely to provide the cirén service. We do not use your data for advertising, profiling, or any other purpose. The legal basis is your explicit consent under Article 9(2)(a) GDPR.
      </LegalBlock>
      <LegalBlock heading="How long we keep it">
        For as long as you have an active account. On deletion, all data is permanently removed within 30 days.
      </LegalBlock>
      <LegalBlock heading="Where it is stored">
        On secure servers within the European Union.
      </LegalBlock>
      <LegalBlock heading="Who we share it with">
        No one, for commercial purposes. We use Resend (login emails) and Railway (EU hosting), both GDPR-compliant.
      </LegalBlock>
      <LegalBlock heading="Your rights">
        Under GDPR you have the right to access, correct, delete, export, and withdraw consent for your data at any time. Contact hello@ciren.app. We respond within 30 days.
      </LegalBlock>
      <LegalBlock heading="Not medical advice">
        cirén is not a medical device and does not provide medical advice. Consult a qualified healthcare professional for health concerns.
      </LegalBlock>
      <LegalBlock heading="Complaints">
        Agencia Española de Protección de Datos (AEPD) — www.aepd.es
      </LegalBlock>
    </>
  );
}

function LegalTerms() {
  return (
    <>
      <LegalMeta date="May 2026" operator="Maite Méndez Santiváñez" contact="hello@ciren.app"/>
      <LegalBlock heading="1. Acceptance">
        By using cirén you agree to these terms.
      </LegalBlock>
      <LegalBlock heading="2. What cirén is">
        cirén is a personal wellness app for menstrual cycle tracking. It is not a medical device, fertility monitor, or substitute for professional medical advice.
      </LegalBlock>
      <LegalBlock heading="3. Not medical advice">
        Content in cirén is for general informational and wellness purposes only. It does not diagnose, treat, or monitor any medical condition. Always consult a qualified healthcare professional for medical concerns.
      </LegalBlock>
      <LegalBlock heading="4. Your account">
        You must be at least 18 years old to use cirén. You are responsible for keeping your login details secure.
      </LegalBlock>
      <LegalBlock heading="5. Your data">
        Your data belongs to you. You can delete your account and all data at any time from the Account screen. See our Privacy Policy for full details.
      </LegalBlock>
      <LegalBlock heading="6. Acceptable use">
        You agree not to use cirén for any unlawful purpose or attempt to disrupt the backend systems.
      </LegalBlock>
      <LegalBlock heading="7. Availability">
        cirén is provided as-is. We do not guarantee uninterrupted availability.
      </LegalBlock>
      <LegalBlock heading="8. Changes">
        We may update these terms. We will notify you in the app before significant changes take effect.
      </LegalBlock>
      <LegalBlock heading="9. Governing law">
        These terms are governed by the laws of Spain.
      </LegalBlock>
    </>
  );
}

// ─── Legal drawer ─────────────────────────────────────────────────────────────

export function LegalDrawer({ modal, onClose }) {
  if (!modal) return null;
  return (
    <>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(30,20,15,.35)', zIndex:40 }} aria-hidden="true"/>
      <div role="dialog" aria-modal="true" style={{ position:'absolute', bottom:0, left:0, right:0, top:'12%', background:G.stone, borderRadius:'20px 20px 0 0', boxShadow:'0 -8px 40px rgba(0,0,0,.14)', zIndex:50, display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'16px 20px 14px', flexShrink:0 }}>
          <div style={{ width:36, height:4, borderRadius:2, background:G.line, margin:'0 auto 16px' }}/>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:22, fontWeight:400, color:G.ink }}>
              {modal === 'privacy' ? 'Privacy policy' : 'Terms & conditions'}
            </span>
            <button onClick={onClose} style={{ width:32, height:32, borderRadius:16, border:`1px solid ${G.line}`, background:'none', cursor:'pointer', color:G.muted, fontSize:18, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>×</button>
          </div>
        </div>
        <div style={{ overflowY:'auto', padding:'0 20px 36px' }}>
          {modal === 'privacy' ? <LegalPrivacy/> : <LegalTerms/>}
        </div>
      </div>
    </>
  );
}

// ─── Profile tab ──────────────────────────────────────────────────────────────
// userData: { name, cycleLength, periodLength, lastPeriodStart }
// onSave: async ({ name, cycleLength, periodLength, lastPeriodStart }) => void

export function ProfileTab({ phase, userData, onSave, onLegal, onSignOut }) {
  const p = phase || PHASES.luteal;
  const [name, setName]           = React.useState(userData?.name          || '');
  const [nameFocused, setNameFocused] = React.useState(false);
  const [cycleLen, setCycleLen]   = React.useState(userData?.cycleLength   || 28);
  const [periodLen, setPeriodLen] = React.useState(userData?.periodLength  || 5);
  const [lastPeriod, setLastPeriod] = React.useState(userData?.lastPeriodStart || '');
  const [saving, setSaving]       = React.useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave?.({ name: name || 'Me', cycleLength: cycleLen, periodLength: periodLen, lastPeriodStart: lastPeriod });
    setSaving(false);
  };

  const Stepper = ({ val, min, max, onChange }) => (
    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
      <button onClick={()=>onChange(Math.max(min,val-1))} aria-label="Decrease"
        style={{ width:34, height:34, borderRadius:17, border:`1px solid ${G.line}`, background:'none', cursor:'pointer', fontSize:18, color:G.ink, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"DM Sans", sans-serif' }}>−</button>
      <span style={{ fontSize:16, fontWeight:500, color:G.ink, minWidth:28, textAlign:'center' }}>{val}</span>
      <button onClick={()=>onChange(Math.min(max,val+1))} aria-label="Increase"
        style={{ width:34, height:34, borderRadius:17, border:`1px solid ${G.line}`, background:'none', cursor:'pointer', fontSize:18, color:G.ink, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"DM Sans", sans-serif' }}>+</button>
    </div>
  );

  return (
    <div style={{ flex:1, overflowX:'hidden', overflowY:'auto', padding:'0 20px 20px', background:G.stone }}>
      <h2 style={{ fontSize:13, fontWeight:500, letterSpacing:'.10em', textTransform:'uppercase', color:G.muted, margin:'24px 0 20px' }}>Your profile</h2>

      <Card phase={p} style={{ marginBottom:12 }}>
        <SectionLabel>Name</SectionLabel>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            placeholder="Your name"
            style={{
              flex:1, fontSize:16, color:G.ink, fontFamily:'"DM Sans", sans-serif',
              border:'none', outline:'none', background:'transparent',
              borderBottom: nameFocused ? `1.5px solid ${BRAND}` : '1.5px solid transparent',
              padding:'2px 0', transition:'border-color .15s',
            }}
          />
          {nameFocused && (
            <button
              onMouseDown={e => { e.preventDefault(); setName(''); }}
              style={{
                width:20, height:20, borderRadius:10, border:'none',
                background:G.taupe, color:G.muted,
                fontSize:12, lineHeight:1, cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0, fontFamily:'"DM Sans", sans-serif',
              }}
              aria-label="Clear name"
            >×</button>
          )}
        </div>
      </Card>

      <Card phase={p} style={{ marginBottom:12 }}>
        <SectionLabel>Cycle settings</SectionLabel>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <span style={{ fontSize:14, color:G.ink }}>Cycle length</span>
          <Stepper val={cycleLen} min={21} max={45} onChange={setCycleLen}/>
        </div>
        <div style={{ height:1, background:G.line, marginBottom:14 }}/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <span style={{ fontSize:14, color:G.ink }}>Period length</span>
          <Stepper val={periodLen} min={2} max={10} onChange={setPeriodLen}/>
        </div>
        <div style={{ height:1, background:G.line, marginBottom:14 }}/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
          <span style={{ fontSize:14, color:G.ink }}>Last period started</span>
          <input
            type="date"
            value={lastPeriod}
            onChange={e => setLastPeriod(e.target.value)}
            style={{
              fontSize:13, color:G.ink, border:`1px solid ${G.line}`,
              borderRadius:8, padding:'6px 10px', background:'#fff',
              fontFamily:'"DM Sans", sans-serif', outline:'none',
            }}
          />
        </div>
        <button onClick={handleSave} disabled={saving}
          style={{
            width:'100%', height:42, borderRadius:50, border:'none',
            background: BRAND,
            color:'#fff', fontSize:13, fontWeight:500, cursor: saving ? 'default' : 'pointer',
            fontFamily:'"DM Sans", sans-serif',
          }}>
          {saving ? 'Saving…' : 'Save settings'}
        </button>
      </Card>

      <Card phase={p} style={{ marginBottom:12 }}>
        <SectionLabel>Partner</SectionLabel>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
          <span style={{ fontSize:15, fontWeight:600, color:G.ink, fontFamily:'"DM Sans", sans-serif' }}>Partner mode</span>
          <span style={{ fontSize:10, fontWeight:600, letterSpacing:'.10em', textTransform:'uppercase', color:BRAND, background:'#ECEAF3', borderRadius:50, padding:'4px 10px' }}>Coming soon</span>
        </div>
        <p style={{ fontSize:13, color:G.muted, margin:0, lineHeight:1.65 }}>Invite your partner to follow your cycle and learn how to support you through each phase.</p>
      </Card>

      {[['Privacy policy','privacy'],['Terms & conditions','terms']].map(([label,key])=>(
        <button key={label}
          onClick={() => onLegal?.(key)}
          style={{ display:'block', width:'100%', padding:'15px 0', border:'none', borderBottom:`1px solid ${G.line}`, background:'none', color:G.ink, fontSize:14, textAlign:'left', cursor:'pointer', fontFamily:'"DM Sans", sans-serif' }}>
          {label}
        </button>
      ))}
      <button
        onClick={onSignOut}
        style={{ display:'block', width:'100%', padding:'15px 0', border:'none', borderBottom:`1px solid ${G.line}`, background:'none', color:PHASES.menstrual.btnAccent, fontSize:14, textAlign:'left', cursor:'pointer', fontFamily:'"DM Sans", sans-serif' }}>
        Sign out
      </button>
    </div>
  );
}
