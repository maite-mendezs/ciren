// mellow-innovative.jsx — Cirén brand applied
// Cormorant Garamond for editorial headings, DM Sans body, exact brand colors

// ─── Daily insights per phase ─────────────────────────────────────────────────

const PHASE_INSIGHTS = {
  menstrual: {
    headline: 'Rest is not\nfalling behind.',
    sub: 'Your body is shedding. Energy is low — and that\'s exactly how it should be.',
    guidance: [
    { k: 'Food', v: 'Warm, grounding meals that nourish and comfort.' },
    { k: 'Move', v: 'Rest or gentle walks. Nothing that depletes.' },
    { k: 'Mood', v: 'Emotions may feel close to the surface. Let them.' },
    { k: 'Work', v: 'Reflect and close. Don\'t start new things today.' }]

  },
  follicular: {
    headline: 'A fresh start\nfrom within.',
    sub: 'Energy rising. This is your window to set things in motion.',
    guidance: [
    { k: 'Food', v: 'Light, fresh foods. Your digestion is at its best.' },
    { k: 'Move', v: 'Build strength, explore new ideas, move with intention.' },
    { k: 'Mood', v: 'Optimism is natural here. Use it.' },
    { k: 'Work', v: 'Start new projects. Pitch ideas. Make the call.' }]

  },
  ovulatory: {
    headline: 'This is your\npower day.',
    sub: 'You\'re magnetic, focused and expressive. Lean in.',
    guidance: [
    { k: 'Food', v: 'Anti-inflammatory foods. Your body can handle more.' },
    { k: 'Move', v: 'Peak performance. Push if it feels good.' },
    { k: 'Mood', v: 'You\'re at your most magnetic. Show up fully.' },
    { k: 'Work', v: 'Share your ideas, collaborate, be visible.' }]

  },
  luteal: {
    headline: 'You don\'t have\nto do it all.',
    sub: 'Go inward. Protect your energy and choose what matters.',
    guidance: [
    { k: 'Food', v: 'Magnesium-rich foods — dark chocolate, pumpkin seeds.' },
    { k: 'Move', v: 'Yin yoga or light walking. Skip high-intensity.' },
    { k: 'Mood', v: 'Sensitivity peaks here. Give yourself margin.' },
    { k: 'Work', v: 'Wrap up. Analytical clarity is still yours.' }]

  }
};

// ─── Home ─────────────────────────────────────────────────────────────────────

function InnoHome({ phase, onTab }) {
  const p = phase;
  const insight = PHASE_INSIGHTS[p.key];
  const lines = insight.headline.split('\n');

  return (
    <div style={{ flex: 1, overflow: 'auto', background: p.accent }}>
      {/* Hero — full phase color, editorial headline */}
      <div style={{ minHeight: 160, display: 'flex', flexDirection: 'column', position: 'relative', width: "372px", justifyContent: "center", alignItems: "stretch", height: "auto", padding: "20px 28px" }}>
        {/* Ambient circle */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,.18)', pointerEvents: 'none' }} aria-hidden="true" />

        {/* Date + phase */}
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: p.text, opacity: .6, marginBottom: 20 }}>
          {p.name} · Day {DEMO.cycleDay}
        </div>

        {/* THE insight */}
        <h1 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 42, fontWeight: 400, lineHeight: 1.12,
          color: p.text, margin: '0 0 20px',
          letterSpacing: '-.02em',
          whiteSpace: 'pre-line'
        }}>{insight.headline}</h1>

        <p style={{
          fontSize: 14, color: p.text, opacity: .72,
          margin: 0, lineHeight: 1.7, maxWidth: 260,
          fontFamily: '"DM Sans", sans-serif'
        }}>{insight.sub}</p>
      </div>

      {/* Guidance — Co-Star-style list on white */}
      <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '28px 28px 0' }}>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: G.muted, marginBottom: 20 }}>Today</div>

        {insight.guidance.map((row, i, arr) =>
        <div key={row.k} style={{
          display: 'flex', gap: 20, paddingBottom: 18, marginBottom: 18,
          borderBottom: i < arr.length - 1 ? `1px solid ${G.line}` : 'none',
          alignItems: 'flex-start'
        }}>
            <span style={{
            fontSize: 10, fontWeight: 500, letterSpacing: '.12em',
            textTransform: 'uppercase', color: G.muted,
            minWidth: 44, paddingTop: 3,
            fontFamily: '"DM Sans", sans-serif'
          }}>{row.k}</span>
            <span style={{ fontSize: 14, color: G.ink, lineHeight: 1.65, fontFamily: '"DM Sans", sans-serif' }}>{row.v}</span>
          </div>
        )}

        {/* Cycle position */}
        <div style={{ paddingTop: 20, paddingBottom: 20, borderTop: `1px solid ${G.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: G.muted }}>Your cycle</span>
            <span style={{ fontSize: 11, color: G.muted }}>Period in {DEMO.daysToPeriod} days</span>
          </div>
          <CycleBar phase={p} cycleDay={DEMO.cycleDay} cycleLength={DEMO.cycleLength} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            {['Men', 'Fol', 'Ovu', 'Lut'].map((n, i) =>
            <span key={n} style={{ fontSize: 9, fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', color: i === 3 ? p.btnAccent : G.inactive }}>{n}</span>
            )}
          </div>
        </div>

        {/* Check in */}
        <div style={{ paddingBottom: 28, borderTop: `1px solid ${G.line}`, paddingTop: 20 }}>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, fontWeight: 400, color: G.ink, margin: '0 0 12px', lineHeight: 1.3 }}>How are you feeling today?</p>
          <PrimaryBtn phase={p} onClick={() => onTab('log')}>Check in</PrimaryBtn>
        </div>
      </div>
    </div>);

}

// ─── Log — scrollable chips ───────────────────────────────────────────────────

function InnoLog({ phase, onTab }) {
  const p = phase;
  const [sel, setSel] = React.useState({ flow: [], mood: [], symptoms: [], activity: [], drive: [], lifestyle: [], movement: [] });
  const [saved, setSaved] = React.useState(false);

  const toggle = (section, val, single = false) => setSel((prev) => {
    if (single) return { ...prev, [section]: prev[section].includes(val) ? [] : [val] };
    return { ...prev, [section]: prev[section].includes(val) ? prev[section].filter((v) => v !== val) : [...prev[section], val] };
  });

  const LogChip = ({ section, val, emoji, single }) => {
    const active = sel[section].includes(val);
    return (
      <button onClick={() => toggle(section, val, single)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '9px 16px', borderRadius: 50,
        border: `1.5px solid ${active ? p.btnAccent : '#d8d0e8'}`,
        background: active ? p.btnAccent : '#fff',
        color: active ? '#fff' : G.ink,
        fontSize: 14, fontWeight: active ? 500 : 400,
        cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
        transition: 'all .15s',
        whiteSpace: 'nowrap',
      }}>
        {emoji && <span style={{ fontSize: 16 }}>{emoji}</span>}
        {val}
      </button>
    );
  };

  const LogCard = ({ label, children }) => (
    <div style={{
      background: '#fff', borderRadius: 20,
      border: `1.5px solid #d8d0e8`,
      padding: '18px 18px 16px', marginBottom: 12,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: G.ink, marginBottom: 14 }}>{label}</div>
      {children}
    </div>
  );

  const ChipRow = ({ section, items, single }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {items.map(([val, emoji]) => <LogChip key={val} section={section} val={val} emoji={emoji} single={single} />)}
    </div>
  );

  if (saved) return (
    <SuccessState phase={p} message="Logged." sub="You're building a clearer picture every day" onDone={() => { setSaved(false); onTab('home'); }} />
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: G.stone }}>
      <div style={{ padding: '28px 20px 8px', flexShrink: 0 }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, fontWeight: 400, color: G.ink, margin: '0 0 2px', letterSpacing: '-.01em' }}>Log today</h2>
        <p style={{ fontSize: 12, color: G.muted, margin: '0 0 0' }}>Sunday, 27 April</p>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px 0' }}>

        <LogCard label="Period Flow">
          <ChipRow section="flow" single items={[['None',null],['Light',null],['Medium',null],['Heavy',null]]} />
        </LogCard>

        <LogCard label="Mood">
          <ChipRow section="mood" items={[
            ['Calm','🌸'],['Happy','☀️'],['Energetic','⚡'],
            ['Frisky','🔥'],['Mood swings','📊'],['Irritated','🤨'],
            ['Sad','🌧️'],['Anxious','🌀'],['Feeling guilty','💔'],
            ['Obsessive thoughts','🔄'],['Conflictive','⚡'],
            ['Low energy','🪫'],['Apathetic','🩶'],
            ['Confused','❓'],['Very self-critical','🔍'],
          ]} />
        </LogCard>

        <LogCard label="Symptoms">
          <ChipRow section="symptoms" items={[
            ['Cramps','🌀'],['Tender breasts','🌸'],
            ['Headache','🤕'],['Acne','🙂'],['Backache','🪨'],
            ['Fatigue','🪫'],['Hot flashes','🔥'],
            ['Night sweats','💧'],['Brain fog','🩶'],
            ['Bloating','🔘'],['Constipation','💩'],
            ['Diarrhea','🗒️'],
          ]} />
        </LogCard>

        <LogCard label="Sex & Drive">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: G.muted, marginBottom: 10 }}>Activity</div>
          <ChipRow section="activity" items={[['Sex','🍒'],['Masturbation','💗']]} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: G.muted, margin: '14px 0 10px' }}>Drive Level</div>
          <ChipRow section="drive" single items={[['Low',null],['Neutral',null],['High',null]]} />
        </LogCard>

        <LogCard label="Lifestyle">
          <ChipRow section="lifestyle" items={[['Eat out','🍽️'],['Alcohol','🥂'],['Travel','✈️']]} />
        </LogCard>

        <LogCard label="Movement">
          <ChipRow section="movement" items={[
            ['Strength','🏋️'],['Pilates','🧘'],['Yoga','🪷'],
            ['Barre','🦶'],['Walk','🚶'],['Run','🏃'],
          ]} />
        </LogCard>

        <div style={{ height: 12 }} />
      </div>

      <div style={{ padding: '12px 20px 4px', borderTop: `1px solid ${G.line}`, flexShrink: 0, background: G.stone }}>
        <PrimaryBtn phase={p} onClick={() => setSaved(true)}>Save log</PrimaryBtn>
      </div>
    </div>
  );
}

// ─── Calendar — monthly log tracker ──────────────────────────────────────────

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function buildMonthData(count = 18, startOffset = -6) {
  const today = new Date(2026, 3, 27); // April 27 2026
  const result = [];
  // cumulative cycle offset — we anchor April (month index 3, year 2026) at offset 3
  // April 1 = cycle day 4 => offset 3 means (offset+0)%28+1 = 4 ✓
  const anchorYear = 2026, anchorMonth = 3, anchorOffset = 3;
  for (let i = startOffset; i < startOffset + count; i++) {
    const d = new Date(anchorYear, anchorMonth + i, 1);
    const year = d.getFullYear();
    const month = d.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const startDow = d.getDay();
    // offset: days between anchor month start and this month start
    const msPerDay = 86400000;
    const anchorDate = new Date(anchorYear, anchorMonth, 1);
    const diffDays = Math.round((d - anchorDate) / msPerDay);
    const offset = ((anchorOffset + diffDays) % 28 + 28) % 28;
    result.push({ name: MONTH_NAMES[month], year, month, days, startDow, offset });
  }
  return result;
}

const MONTH_DATA = buildMonthData(18, -6);


function dayPhase(offset, i) {
  const cd = (offset + i) % 28 + 1;
  if (cd <= 5) return PHASES.menstrual;
  if (cd <= 13) return PHASES.follicular;
  if (cd <= 16) return PHASES.ovulatory;
  return PHASES.luteal;
}

function DayLogDrawer({ drawer, phase, onClose }) {
  const p = phase;
  const [sel, setSel] = React.useState({ flow: [], mood: [], symptoms: [], activity: [], drive: [], lifestyle: [], movement: [] });
  const [saved, setSaved] = React.useState(false);

  const toggle = (section, val, single = false) => setSel((prev) => {
    if (single) return { ...prev, [section]: prev[section].includes(val) ? [] : [val] };
    return { ...prev, [section]: prev[section].includes(val) ? prev[section].filter((v) => v !== val) : [...prev[section], val] };
  });

  const ph = drawer.phase;

  const LogChip = ({ section, val, emoji, single }) => {
    const active = sel[section].includes(val);
    return (
      <button onClick={() => toggle(section, val, single)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '8px 14px', borderRadius: 50,
        border: `1.5px solid ${active ? ph.btnAccent : '#d8d0e8'}`,
        background: active ? ph.btnAccent : '#fff',
        color: active ? '#fff' : G.ink,
        fontSize: 13, fontWeight: active ? 500 : 400,
        cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
        transition: 'all .15s', whiteSpace: 'nowrap',
      }}>
        {emoji && <span style={{ fontSize: 15 }}>{emoji}</span>}{val}
      </button>
    );
  };

  const LogCard = ({ label, children }) => (
    <div style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #d8d0e8', padding: '16px 16px 14px', marginBottom: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: G.ink, marginBottom: 12 }}>{label}</div>
      {children}
    </div>
  );

  const ChipRow = ({ section, items, single }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
      {items.map(([val, emoji]) => <LogChip key={val} section={section} val={val} emoji={emoji} single={single} />)}
    </div>
  );

  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(30,20,15,.3)', zIndex: 10 }} aria-hidden="true" />
      <div role="dialog" aria-modal="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, top: '15%',
        background: G.stone, borderRadius: '20px 20px 0 0',
        boxShadow: '0 -8px 40px rgba(0,0,0,.12)',
        zIndex: 20, display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '12px 0 0', flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: G.line, margin: '0 auto' }} />
        </div>
        <div style={{ padding: '12px 20px 14px', borderBottom: `1px solid ${G.line}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: ph.btnAccent }} />
                <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '.10em', textTransform: 'uppercase', color: G.muted }}>{ph.name}</span>
              </div>
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, fontWeight: 400, color: G.ink }}>{drawer.day} {drawer.month} {drawer.year}</div>
            </div>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 16, border: `1px solid ${G.line}`, background: 'none', cursor: 'pointer', color: G.muted, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
        </div>

        {saved ?
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
            <PetalMark size={40} color={ph.btnAccent} style={{ marginBottom: 16 }} />
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 22, fontWeight: 400, color: G.ink, marginBottom: 8 }}>Saved.</div>
            <button onClick={onClose} style={{ marginTop: 16, height: 46, padding: '0 36px', borderRadius: 10, border: 'none', background: ph.btnAccent, color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: '"DM Sans", sans-serif' }}>Done</button>
          </div> :
          <>
            <div style={{ flex: 1, overflow: 'auto', padding: '12px 14px 0' }}>
              <LogCard label="Period Flow">
                <ChipRow section="flow" single items={[['None',null],['Light',null],['Medium',null],['Heavy',null]]} />
              </LogCard>
              <LogCard label="Mood">
                <ChipRow section="mood" items={[['Calm','🌸'],['Happy','☀️'],['Energetic','⚡'],['Frisky','🔥'],['Mood swings','📊'],['Irritated','🤨'],['Sad','🌧️'],['Anxious','🌀'],['Feeling guilty','💔'],['Low energy','🪫'],['Apathetic','🩶'],['Confused','❓']]} />
              </LogCard>
              <LogCard label="Symptoms">
                <ChipRow section="symptoms" items={[['Cramps','🌀'],['Tender breasts','🌸'],['Headache','🤕'],['Acne','🙂'],['Backache','🪨'],['Fatigue','🪫'],['Hot flashes','🔥'],['Night sweats','💧'],['Brain fog','🩶'],['Bloating','🔘'],['Constipation','💩']]} />
              </LogCard>
              <LogCard label="Sex & Drive">
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: G.muted, marginBottom: 8 }}>Activity</div>
                <ChipRow section="activity" items={[['Sex','🍒'],['Masturbation','💗']]} />
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: G.muted, margin: '12px 0 8px' }}>Drive Level</div>
                <ChipRow section="drive" single items={[['Low',null],['Neutral',null],['High',null]]} />
              </LogCard>
              <LogCard label="Lifestyle">
                <ChipRow section="lifestyle" items={[['Eat out','🍽️'],['Alcohol','🥂'],['Travel','✈️']]} />
              </LogCard>
              <LogCard label="Movement">
                <ChipRow section="movement" items={[['Strength','🏋️'],['Pilates','🧘'],['Yoga','🪷'],['Barre','🦶'],['Walk','🚶'],['Run','🏃']]} />
              </LogCard>
              <div style={{ height: 10 }} />
            </div>
            <div style={{ padding: '12px 20px 4px', borderTop: `1px solid ${G.line}`, flexShrink: 0 }}>
              <PrimaryBtn phase={ph} onClick={() => setSaved(true)}>Save log</PrimaryBtn>
            </div>
          </>
        }
      </div>
    </>
  );
}

function InnoCalendar({ phase }) {
  const p = phase;
  const [drawer, setDrawer] = React.useState(null);
  const DOW = ['S', 'M', 'T', 'S', 'T', 'F', 'S'];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: G.stone, position: 'relative' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 80px' }}>
        <div style={{ padding: '28px 0 8px' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, fontWeight: 400, color: G.ink, margin: '0 0 4px', letterSpacing: '-.01em' }}>Journal</h2>
          <p style={{ fontSize: 12, color: G.muted, margin: '0 0 14px' }}>Your logged days across the cycle</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {Object.values(PHASES).map((ph) =>
              <div key={ph.key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: ph.accent, border: `1px solid ${ph.btnAccent}40` }} />
                <span style={{ fontSize: 11, color: G.muted }}>{ph.name}</span>
              </div>
            )}
          </div>
        </div>
        {MONTH_DATA.map((m, mi) =>
        <div key={m.name} style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '.10em', textTransform: 'uppercase', color: G.muted, marginBottom: 12 }}>{m.name} {m.year}</div>

            {/* DOW header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: 4 }}>
              {DOW.map((d, i) =>
            <div key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 500, letterSpacing: '.06em', color: G.muted, paddingBottom: 4 }}>{d}</div>
            )}
            </div>

            {/* Day grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3 }}>
              {Array.from({ length: m.startDow }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: m.days }, (_, i) => {
              const day = i + 1;
              const ph = dayPhase(m.offset, i);
              const isToday = m.year === 2026 && m.month === 3 && day === 27;
              const isPast = new Date(m.year, m.month, day) < new Date(2026, 3, 27);
              const isPeriod = (m.offset + i) % 28 + 1 <= 5;
              const isLogged = isPast && day % 3 !== 0; // demo: most past days logged

              return (
                <button key={day}
                onClick={() => setDrawer({ day, month: m.name, year: m.year, phase: ph, logged: isLogged })}
                aria-label={`${day} ${m.name}`}
                style={{
                  aspectRatio: '1', borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: isToday ? ph.btnAccent : isLogged ? ph.accent : 'transparent',
                  color: isToday ? '#fff' : G.ink,
                  fontSize: 12, fontWeight: isToday ? 600 : 400,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', fontFamily: '"DM Sans", sans-serif'
                }}>
                    <span style={{ lineHeight: 1 }}>{day}</span>
                    {isPeriod && !isToday &&
                  <div style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 3, height: 3, borderRadius: '50%', background: PHASES.menstrual.btnAccent }} />
                  }
                  </button>);

            })}
            </div>
          </div>
        )}


      </div>

      {/* Day log drawer */}
      {drawer && <DayLogDrawer drawer={drawer} phase={p} onClose={() => setDrawer(null)} />}
    </div>);

}

// ─── Profile ──────────────────────────────────────────────────────────────────

function InnoProfile({ phase }) {
  const p = phase;
  return (
    <div style={{ flex: 1, overflow: 'auto', background: G.stone }}>
      <div style={{ padding: '28px 24px 0' }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, fontWeight: 400, color: G.ink, margin: '0 0 20px', letterSpacing: '-.01em' }}>Account</h2>
      </div>
      <ProfileTab phase={p} />

    </div>);

}

// ─── Log drawer ───────────────────────────────────────────────────────────────

function InnoLogDrawer({ phase, onClose }) {
  const p = phase;
  const [sel, setSel] = React.useState({ flow: [], mood: [], symptoms: [], activity: [], drive: [], lifestyle: [], movement: [] });
  const [saved, setSaved] = React.useState(false);

  const toggle = (section, val, single = false) => setSel((prev) => {
    if (single) return { ...prev, [section]: prev[section].includes(val) ? [] : [val] };
    return { ...prev, [section]: prev[section].includes(val) ? prev[section].filter((v) => v !== val) : [...prev[section], val] };
  });

  const LogChip = ({ section, val, emoji, single }) => {
    const active = sel[section].includes(val);
    return (
      <button onClick={() => toggle(section, val, single)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '9px 16px', borderRadius: 50,
        border: `1.5px solid ${active ? p.btnAccent : '#d8d0e8'}`,
        background: active ? p.btnAccent : '#fff',
        color: active ? '#fff' : G.ink,
        fontSize: 14, fontWeight: active ? 500 : 400,
        cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
        transition: 'all .15s', whiteSpace: 'nowrap',
      }}>
        {emoji && <span style={{ fontSize: 16 }}>{emoji}</span>}{val}
      </button>
    );
  };

  const LogCard = ({ label, children }) => (
    <div style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #d8d0e8', padding: '18px 18px 16px', marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: G.ink, marginBottom: 14 }}>{label}</div>
      {children}
    </div>
  );

  const ChipRow = ({ section, items, single }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {items.map(([val, emoji]) => <LogChip key={val} section={section} val={val} emoji={emoji} single={single} />)}
    </div>
  );

  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(30,20,15,.3)', zIndex: 10 }} aria-hidden="true" />
      <div role="dialog" aria-modal="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, top: '10%',
        background: G.stone, borderRadius: '20px 20px 0 0',
        boxShadow: '0 -8px 40px rgba(0,0,0,.12)',
        zIndex: 20, display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '12px 20px 14px', borderBottom: `1px solid ${G.line}`, flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: G.line, margin: '0 auto 16px' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 22, fontWeight: 400, color: G.ink }}>Log today</div>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 16, border: `1px solid ${G.line}`, background: 'none', cursor: 'pointer', color: G.muted, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
        </div>

        {saved ?
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
            <PetalMark size={40} color={p.btnAccent} style={{ marginBottom: 16 }} />
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 22, fontWeight: 400, color: G.ink, marginBottom: 8 }}>Logged.</div>
            <div style={{ fontSize: 13, color: G.muted, marginBottom: 24 }}>You're building a clearer picture every day</div>
            <button onClick={onClose} style={{ height: 46, padding: '0 36px', borderRadius: 10, border: 'none', background: p.btnAccent, color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: '"DM Sans", sans-serif' }}>Done</button>
          </div> :
          <>
            <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px 0' }}>
              <LogCard label="Period Flow">
                <ChipRow section="flow" single items={[['None',null],['Light',null],['Medium',null],['Heavy',null]]} />
              </LogCard>
              <LogCard label="Mood">
                <ChipRow section="mood" items={[['Calm','🌸'],['Happy','☀️'],['Energetic','⚡'],['Frisky','🔥'],['Mood swings','📊'],['Irritated','🤨'],['Sad','🌧️'],['Anxious','🌀'],['Feeling guilty','💔'],['Low energy','🪫'],['Apathetic','🩶'],['Confused','❓'],['Very self-critical','🔍']]} />
              </LogCard>
              <LogCard label="Symptoms">
                <ChipRow section="symptoms" items={[['Cramps','🌀'],['Tender breasts','🌸'],['Headache','🤕'],['Acne','🙂'],['Backache','🪨'],['Fatigue','🪫'],['Hot flashes','🔥'],['Night sweats','💧'],['Brain fog','🩶'],['Bloating','🔘'],['Constipation','💩'],['Diarrhea','🗒️']]} />
              </LogCard>
              <LogCard label="Sex & Drive">
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: G.muted, marginBottom: 10 }}>Activity</div>
                <ChipRow section="activity" items={[['Sex','🍒'],['Masturbation','💗']]} />
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: G.muted, margin: '14px 0 10px' }}>Drive Level</div>
                <ChipRow section="drive" single items={[['Low',null],['Neutral',null],['High',null]]} />
              </LogCard>
              <LogCard label="Lifestyle">
                <ChipRow section="lifestyle" items={[['Eat out','🍽️'],['Alcohol','🥂'],['Travel','✈️']]} />
              </LogCard>
              <LogCard label="Movement">
                <ChipRow section="movement" items={[['Strength','🏋️'],['Pilates','🧘'],['Yoga','🪷'],['Barre','🦶'],['Walk','🚶'],['Run','🏃']]} />
              </LogCard>
              <div style={{ height: 12 }} />
            </div>
            <div style={{ padding: '12px 20px 4px', borderTop: `1px solid ${G.line}`, flexShrink: 0, background: G.stone }}>
              <PrimaryBtn phase={p} onClick={() => setSaved(true)}>Save log</PrimaryBtn>
            </div>
          </>
        }
      </div>
    </>
  );
}

// ─── App shell ────────────────────────────────────────────────────────────────

function CirénApp() {
  const [tab, setTab] = React.useState('home');
  const [logOpen, setLogOpen] = React.useState(false);
  const p = DEMO.phase;

  const handleTab = (t) => {
    if (t === 'log') { setLogOpen(true); }
    else setTab(t);
  };

  return (
    <PhoneShell phase={p}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        <PWANav active={tab} onTab={handleTab} phase={p} />
        {tab === 'home' && <InnoHome phase={p} onTab={handleTab} />}
        {tab === 'calendar' && <InnoCalendar phase={p} />}
        {tab === 'profile' && <InnoProfile phase={p} />}
        {logOpen && <InnoLogDrawer phase={p} onClose={() => setLogOpen(false)} />}
      </div>
    </PhoneShell>);

}

Object.assign(window, { CirénApp });