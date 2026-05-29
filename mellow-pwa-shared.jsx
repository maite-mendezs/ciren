// mellow-pwa-shared.jsx — Cirén brand identity applied
// Colors, fonts, logo, primitives

const PHASES = {
  menstrual: {
    key:'menstrual', name:'Menstrual',
    bg:'#F5EEF0',         // Stone tinted pink
    pageBg:'#EDD8DB',     // Warm phase bg
    btnAccent:'#9B5B6A',  // Deep rose
    accent:'#E7D3D6',     // Brand exact
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

const G = {
  ink:      '#1E1E1E',
  labelDark:'#1E1E1E',
  muted:    '#7A7570',
  inactive: '#A8A4A0',
  subtle:   '#8A8680',
  stone:    '#F5F3F0',
  taupe:    '#DCDBD2',
  line:     '#C7C4BE',
};

const DEMO = {
  phase: PHASES.luteal,
  cycleDay: 26,
  daysToPeriod: 2,
  cycleLength: 28,
  periodLength: 5,
  name: 'Sophia',
};

// ─── Four-petal logo mark ─────────────────────────────────────────────────────

function PetalMark({ size=24, color='#1E1E1E', style }) {
  const s = size, h = s/2;
  // Four petals: top, right, bottom, left — drawn as bezier leaf shapes
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={style} aria-hidden="true">
      {/* Top petal */}
      <path d="M12 12 C10 8, 10 3, 12 2 C14 3, 14 8, 12 12Z" stroke={color} strokeWidth="1" fill="none" strokeLinejoin="round"/>
      {/* Right petal */}
      <path d="M12 12 C16 10, 21 10, 22 12 C21 14, 16 14, 12 12Z" stroke={color} strokeWidth="1" fill="none" strokeLinejoin="round"/>
      {/* Bottom petal */}
      <path d="M12 12 C14 16, 14 21, 12 22 C10 21, 10 16, 12 12Z" stroke={color} strokeWidth="1" fill="none" strokeLinejoin="round"/>
      {/* Left petal */}
      <path d="M12 12 C8 14, 3 14, 2 12 C3 10, 8 10, 12 12Z" stroke={color} strokeWidth="1" fill="none" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Status bar ───────────────────────────────────────────────────────────────

function StatusBar({ dark }) {
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

function PhoneShell({ children, phase }) {
  const p = phase || PHASES.luteal;
  return (
    <div style={{
      width:390, height:844, borderRadius:50,
      background: G.stone,
      border:'9px solid #1C1C1E',
      outline:'1.5px solid #3A3A3C',
      boxShadow:'0 50px 120px rgba(0,0,0,.4), inset 0 0 0 1px rgba(255,255,255,.06)',
      overflow:'hidden', display:'flex', flexDirection:'column',
      fontFamily:'"DM Sans", sans-serif', color:G.ink,
      position:'relative',
    }}>
      <div style={{ position:'absolute', top:11, left:'50%', transform:'translateX(-50%)', width:120, height:34, background:'#000', borderRadius:20, zIndex:10 }} aria-hidden="true"/>
      <StatusBar />
      <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column', position:'relative' }}>
        {children}
      </div>
      <div style={{ height:30, display:'flex', alignItems:'center', justifyContent:'center', background:'transparent', flexShrink:0, zIndex:30, position:'relative' }}>
        <div style={{ width:134, height:5, borderRadius:3, background:G.ink, opacity:.15 }}/>
      </div>
    </div>
  );
}

// ─── Drawer nav ───────────────────────────────────────────────────────────────

const DRAWER_ITEMS = [
  { key:'home',     label:'Today',    icon:(c)=><svg width="20" height="20" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke={c} strokeWidth="1.4"/><path d="M11 7v4.5l3 1.5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { key:'calendar', label:'Journal', icon:(c)=><svg width="20" height="20" viewBox="0 0 22 22" fill="none"><rect x="2" y="4" width="18" height="16" rx="2" stroke={c} strokeWidth="1.4"/><path d="M2 9h18" stroke={c} strokeWidth="1.4"/><path d="M7 2v4M15 2v4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><rect x="6" y="13" width="2" height="2" rx=".4" fill={c}/><rect x="10" y="13" width="2" height="2" rx=".4" fill={c}/><rect x="14" y="13" width="2" height="2" rx=".4" fill={c}/></svg> },
  { key:'profile',  label:'Account',      icon:(c)=><svg width="20" height="20" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke={c} strokeWidth="1.4"/><path d="M3 20c0-3.866 3.582-7 8-7s8 3.134 8 7" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg> },
];

function PWANav({ active, onTab, phase }) {
  const p = phase || PHASES.luteal;
  const [open, setOpen] = React.useState(false);
  const navigate = (key) => { onTab(key); setOpen(false); };

  return (
    <>
      {/* Top bar */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 22px', height:52, flexShrink:0,
        background: G.stone,
        borderBottom:`1px solid ${G.line}`,
      }}>
        {/* Wordmark */}
        <div style={{ display:'flex', alignItems:'center', gap:9 }}>
          <PetalMark size={22} color={p.btnAccent}/>
          <span style={{
            fontSize:19, fontWeight:300, color:G.ink,
            letterSpacing:'.04em', fontFamily:'"DM Sans", sans-serif',
          }}>cirén</span>
        </div>

        {/* Hamburger */}
        <button onClick={()=>setOpen(true)} aria-label="Open menu" aria-expanded={open}
          style={{ width:40, height:40, display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'center', gap:5, background:'none', border:'none', cursor:'pointer', borderRadius:10, padding:'0 2px' }}>
          <span style={{ display:'block', width:20, height:1.5, background:G.ink, borderRadius:2 }}/>
          <span style={{ display:'block', width:20, height:1.5, background:G.ink, borderRadius:2 }}/>
          <span style={{ display:'block', width:13, height:1.5, background:G.ink, borderRadius:2 }}/>
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div onClick={()=>setOpen(false)}
          style={{ position:'absolute', inset:0, background:'rgba(30,20,15,.35)', zIndex:50, backdropFilter:'blur(2px)' }}
          aria-hidden="true"/>
      )}

      {/* Drawer */}
      <div role="dialog" aria-modal="true" aria-label="Navigation"
        style={{
          position:'absolute', top:0, right:0, bottom:0, width:260,
          background:'#fff',
          boxShadow:'-8px 0 40px rgba(30,20,15,.14)',
          zIndex:60, display:'flex', flexDirection:'column',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition:'transform .26s cubic-bezier(.32,.72,0,1)',
        }}>
        {/* Drawer header */}
        <div style={{ padding:'22px 20px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:`1px solid ${G.line}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:9 }}>
            <PetalMark size={20} color={p.btnAccent}/>
            <span style={{ fontSize:17, fontWeight:300, color:G.ink, letterSpacing:'.04em', fontFamily:'"DM Sans", sans-serif' }}>cirén</span>
          </div>
          <button onClick={()=>setOpen(false)} aria-label="Close menu"
            style={{ width:32, height:32, borderRadius:16, border:`1px solid ${G.line}`, background:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:G.muted, fontSize:18, lineHeight:1 }}>×</button>
        </div>

        {/* Phase context */}
        <div style={{ padding:'14px 20px 10px', borderBottom:`1px solid ${G.line}` }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'6px 12px', borderRadius:50, background:p.accent }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:p.btnAccent }}/>
            <span style={{ fontSize:11, fontWeight:500, color:p.text, letterSpacing:'.04em' }}>{p.name} · Day {DEMO.cycleDay}</span>
          </div>
        </div>

        {/* Nav items */}
        <div style={{ flex:1, padding:'10px 10px' }}>
          {DRAWER_ITEMS.map(item => {
            const isActive = active === item.key;
            return (
              <button key={item.key} onClick={()=>navigate(item.key)}
                style={{
                  display:'flex', alignItems:'center', gap:14, width:'100%',
                  padding:'13px 14px', borderRadius:12, border:'none', cursor:'pointer',
                  background: isActive ? p.accent : 'transparent',
                  marginBottom:2,
                  fontFamily:'"DM Sans", sans-serif',
                  transition:'background .15s',
                }}>
                {item.icon(isActive ? p.btnAccent : G.inactive)}
                <span style={{ fontSize:15, fontWeight: isActive ? 500 : 400, color: isActive ? p.text : G.ink }}>
                  {item.label}
                </span>
                {isActive && <div style={{ marginLeft:'auto', width:5, height:5, borderRadius:'50%', background:p.btnAccent }}/>}
              </button>
            );
          })}

          {/* Log — highlighted */}
          <div style={{ marginTop:10, padding:'10px 0 0', borderTop:`1px solid ${G.line}` }}>
            <button onClick={()=>navigate('log')}
              style={{
                display:'flex', alignItems:'center', gap:14, width:'100%',
                padding:'13px 14px', borderRadius:12, border:'none', cursor:'pointer',
                background: active==='log' ? p.btnAccent : p.accentLight,
                fontFamily:'"DM Sans", sans-serif',
                transition:'background .15s',
              }}>
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M11 5v12M5 11h12" stroke={active==='log'?'#fff':p.btnAccent} strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize:15, fontWeight:500, color: active==='log' ? '#fff' : p.text }}>Log today</span>
            </button>
          </div>
        </div>

        <div style={{ padding:'14px 20px 24px', borderTop:`1px solid ${G.line}` }}>
          <div style={{ fontSize:11, color:G.muted, letterSpacing:'.04em' }}>Four phases. Daily insight.<br/>No pressure. Just clarity.</div>
        </div>
      </div>
    </>
  );
}

// ─── Cycle bar ────────────────────────────────────────────────────────────────

function CycleBar({ phase, cycleDay, cycleLength=28, periodLength=5 }) {
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

function SectionLabel({ children, style }) {
  return <div style={{ fontSize:10, fontWeight:500, letterSpacing:'.12em', textTransform:'uppercase', color:G.muted, marginBottom:8, fontFamily:'"DM Sans", sans-serif', ...style }}>{children}</div>;
}

function Card({ children, phase, style }) {
  const p = phase || PHASES.luteal;
  return <div style={{ background:'#fff', borderRadius:20, border:'1.5px solid #d8d0e8', padding:'18px 20px', ...style }}>{children}</div>;
}

function Chip({ label, active, onClick, phase, style }) {
  const p = phase || PHASES.luteal;
  return (
    <button onClick={onClick} style={{
      height:34, padding:'0 16px', borderRadius:50,
      border:`1px solid ${active ? p.btnAccent : G.line}`,
      background: active ? p.accent : 'transparent',
      color: active ? p.text : G.ink,
      fontSize:13, fontWeight: active ? 500 : 400,
      cursor:'pointer', fontFamily:'"DM Sans", sans-serif', whiteSpace:'nowrap',
      transition:'all .15s ease', ...style,
    }}>{label}</button>
  );
}

function PrimaryBtn({ children, onClick, phase, style, disabled }) {
  const p = phase || PHASES.luteal;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width:'100%', height:50, borderRadius:12, border:'none',
      background: disabled ? G.taupe : p.btnAccent,
      color: disabled ? G.muted : '#fff',
      fontSize:14, fontWeight:500, letterSpacing:'.02em',
      cursor: disabled ? 'default' : 'pointer',
      fontFamily:'"DM Sans", sans-serif',
      transition:'opacity .15s', ...style,
    }}>{children}</button>
  );
}

function SuccessState({ phase, message, sub, onDone }) {
  const p = phase || PHASES.luteal;
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 32px', textAlign:'center', background:G.stone }}>
      <PetalMark size={48} color={p.btnAccent} style={{ marginBottom:24 }}/>
      <div style={{ fontSize:22, fontWeight:300, color:G.ink, marginBottom:8, fontFamily:'"Cormorant Garamond", serif', letterSpacing:'.01em' }}>{message}</div>
      <div style={{ fontSize:13, color:G.muted, marginBottom:36, lineHeight:1.6, maxWidth:220 }}>{sub}</div>
      <PrimaryBtn onClick={onDone} phase={p} style={{ width:'auto', padding:'0 40px' }}>Back to today</PrimaryBtn>
    </div>
  );
}

function ProfileTab({ phase }) {
  const p = phase || PHASES.luteal;
  const [cycleLen, setCycleLen] = React.useState(28);
  const [periodLen, setPeriodLen] = React.useState(5);
  const Stepper = ({val, min, max, onChange}) => (
    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
      <button onClick={()=>onChange(Math.max(min,val-1))} aria-label="Decrease"
        style={{ width:34, height:34, borderRadius:17, border:`1px solid ${G.line}`, background:'none', cursor:'pointer', fontSize:18, color:G.ink, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"DM Sans", sans-serif' }}>−</button>
      <span style={{ fontSize:16, fontWeight:500, color:G.ink, minWidth:28, textAlign:'center' }}>{val}</span>
      <button onClick={()=>onChange(Math.min(max,val+1))} aria-label="Increase"
        style={{ width:34, height:34, borderRadius:17, border:`1px solid ${G.line}`, background:'none', cursor:'pointer', fontSize:18, color:G.ink, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"DM Sans", sans-serif' }}>+</button>
    </div>
  );
  return (
    <div style={{ flex:1, overflow:'auto', padding:'0 20px 20px', background:G.stone }}>
      <h2 style={{ fontSize:13, fontWeight:500, letterSpacing:'.10em', textTransform:'uppercase', color:G.muted, margin:'24px 0 20px' }}>Your profile</h2>
      <Card phase={p} style={{ marginBottom:12 }}>
        <SectionLabel>Name</SectionLabel>
        <div style={{ fontSize:16, fontWeight:400, color:G.ink }}>Sophia</div>
      </Card>
      <Card phase={p} style={{ marginBottom:12 }}>
        <SectionLabel>Cycle settings</SectionLabel>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <span style={{ fontSize:14, color:G.ink }}>Cycle length</span>
          <Stepper val={cycleLen} min={21} max={45} onChange={setCycleLen}/>
        </div>
        <div style={{ height:1, background:G.line, marginBottom:14 }}/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:14, color:G.ink }}>Period length</span>
          <Stepper val={periodLen} min={2} max={10} onChange={setPeriodLen}/>
        </div>
      </Card>
      <Card phase={p} style={{ marginBottom:12 }}>
        <SectionLabel>Partner</SectionLabel>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
          <span style={{ fontSize:15, fontWeight:600, color:G.ink, fontFamily:'"DM Sans", sans-serif' }}>Partner mode</span>
          <span style={{ fontSize:10, fontWeight:600, letterSpacing:'.10em', textTransform:'uppercase', color:p.btnAccent, background:p.accentLight, borderRadius:50, padding:'4px 10px' }}>Coming soon</span>
        </div>
        <p style={{ fontSize:13, color:G.muted, margin:0, lineHeight:1.65 }}>Invite your partner to follow your cycle and learn how to support you through each phase.</p>
      </Card>
      {[['Privacy policy',false],['Terms & conditions',false],['Sign out',true]].map(([label,danger])=>(
        <button key={label} style={{ display:'block', width:'100%', padding:'15px 0', border:'none', borderBottom:`1px solid ${G.line}`, background:'none', color:danger?PHASES.menstrual.btnAccent:G.ink, fontSize:14, textAlign:'left', cursor:'pointer', fontFamily:'"DM Sans", sans-serif' }}>{label}</button>
      ))}
    </div>
  );
}

Object.assign(window, { PHASES, G, DEMO, PetalMark, StatusBar, PhoneShell, PWANav, CycleBar, SectionLabel, Card, Chip, PrimaryBtn, SuccessState, ProfileTab });
