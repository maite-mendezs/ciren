// innovative.jsx — Cirén app
// Migrated from mellow-innovative.jsx: ES module imports, DEMO replaced with live API data
import React from 'react';
import {
  PHASES, G, BRAND,
  PetalMark, PhoneShell, BottomTabBar, CycleBar,
  PrimaryBtn, SuccessState, ProfileTab, Toast, LegalDrawer,
} from './shared';
import * as api from '../api';

// ─── Cycle state computation ──────────────────────────────────────────────────

function getPhaseForDay(cycleDay, cycleLength, periodLength) {
  if (cycleDay <= periodLength) return PHASES.menstrual;
  const follEnd = Math.round(cycleLength * 0.464); // ~day 13 of 28
  const ovuEnd  = Math.round(cycleLength * 0.571); // ~day 16 of 28
  if (cycleDay <= follEnd) return PHASES.follicular;
  if (cycleDay <= ovuEnd)  return PHASES.ovulatory;
  return PHASES.luteal;
}

function computeCycleState(settings) {
  const { name, cycleLength, periodLength, lastPeriodStart } = settings;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(lastPeriodStart + 'T00:00:00');
  const diffDays = Math.round((today - start) / 86400000);
  const cycleDay = (diffDays % cycleLength) + 1;
  const daysToPeriod = cycleLength - cycleDay + 1;
  const phase = getPhaseForDay(cycleDay, cycleLength, periodLength);
  return { name, cycleLength, periodLength, lastPeriodStart, cycleDay, daysToPeriod, phase };
}

// ─── Daily insights per phase × position ─────────────────────────────────────

const PHASE_INSIGHTS = {
  menstrual: {
    early: {
      headline: 'Your body needs more rest than usual today',
      sub: 'Rest is the most useful thing you can do today. Your body is working harder than it looks.',
      guidance: [
        { k:'Food',  v:'Iron helps replace what your body is losing. Think red meat, lentils, spinach, or fortified cereals.' },
        { k:'Move',  v:'Rest is valid. If you want to move, a short walk is enough.' },
        { k:'Mood',  v:'Feeling flat or emotional today is hormonal, not personal. It will pass.' },
        { k:'Mind',  v:'Protect your energy. Say no to anything that isn\'t essential.' },
        { k:'Sleep', v:'You may need more sleep than usual right now. Going to bed earlier is a valid response to what your body is doing.' },
      ],
    },
    mid: {
      headline: 'The heaviest days are behind you',
      sub: 'Flow is easing. What you eat today makes a real difference to how you feel.',
      guidance: [
        { k:'Food',  v:'Magnesium helps with cramps and low mood. Dark chocolate, pumpkin seeds, and bananas are good sources.' },
        { k:'Move',  v:'Gentle movement is fine if you feel up to it. Yin yoga or a slow walk works well.' },
        { k:'Mood',  v:'If you still feel sensitive or tearful, that\'s normal for this point in your cycle.' },
        { k:'Mind',  v:'This is a good time to close things out, not start new ones.' },
        { k:'Sleep', v:'Fatigue is still common at this point. An earlier bedtime or a short rest during the day helps recovery.' },
      ],
    },
    late: {
      headline: 'Energy is starting to return today',
      sub: 'Your hormones are shifting in your favour. A little movement today will help your body recover faster.',
      guidance: [
        { k:'Food',  v:'Your appetite and digestion are improving. Fresh, lighter meals will feel more appealing now.' },
        { k:'Move',  v:'Your body is ready for a little more. A walk or light stretch is a good reintroduction.' },
        { k:'Mood',  v:'That lighter feeling is real. Your body is done with the hardest part.' },
        { k:'Mind',  v:'A good day to think about what you want to focus on in the week ahead.' },
        { k:'Sleep', v:'Sleep typically improves as your period ends. If you\'re still tired, your body is finishing its recovery.' },
      ],
    },
  },
  follicular: {
    early: {
      headline: 'Mood and energy are picking back up today',
      sub: 'Estrogen is rising. The mood shift you may be feeling is a sign your cycle is turning.',
      guidance: [
        { k:'Food',  v:'Your digestion is at its best right now. Fermented foods like yogurt, kefir, or kimchi support that.' },
        { k:'Move',  v:'A good time to ease back into regular exercise. Your body responds well to movement now.' },
        { k:'Mood',  v:'Feeling more optimistic or social than last week is a hormonal shift, not a coincidence.' },
        { k:'Mind',  v:'Revisit anything you put on hold during your period. Your brain is ready to engage again.' },
        { k:'Sleep', v:'Sleep quality improves in this phase. A consistent sleep and wake time helps you make the most of the energy boost that\'s coming.' },
      ],
    },
    mid: {
      headline: 'Focus and mental clarity are at their best right now',
      sub: 'Your ability to focus is at its best this month. This is the right time for your most demanding work.',
      guidance: [
        { k:'Food',  v:'Protein helps your body build on the energy you have right now. Eggs, fish, legumes, and nuts are good options.' },
        { k:'Move',  v:'Strength training works especially well in this phase. Your muscles recover faster than usual.' },
        { k:'Mood',  v:'Confidence and motivation feel more natural now. That\'s your hormones working for you.' },
        { k:'Mind',  v:'Start the project you\'ve been putting off. Timing doesn\'t get much better than this.' },
        { k:'Sleep', v:'You\'re likely sleeping well right now. Protect that by avoiding late screens and keeping a regular bedtime.' },
      ],
    },
    late: {
      headline: 'Confidence and energy are close to their peak today',
      sub: 'Energy is close to its peak. Physical movement is where you\'ll feel that most clearly today.',
      guidance: [
        { k:'Food',  v:'Oily fish, leafy greens, and berries help your body perform at this level.' },
        { k:'Move',  v:'High-intensity exercise feels easier and more rewarding in this phase.' },
        { k:'Mood',  v:'If socialising feels effortless right now, that\'s not a fluke. Lean into it.' },
        { k:'Mind',  v:'Pitch the idea, have the conversation, take up space. Your communication is at its clearest.' },
        { k:'Sleep', v:'Sleep is generally good in this phase. Going to bed at a consistent time helps sustain the energy levels you have right now.' },
      ],
    },
  },
  ovulatory: {
    early: {
      headline: 'Confidence, energy, and presence are at their highest today',
      sub: 'Estrogen and testosterone peak together today. It\'s a good day for important conversations and decisions.',
      guidance: [
        { k:'Food',  v:'Your body is working hard today. Salmon, avocado, and nuts give it what it needs.' },
        { k:'Move',  v:'Peak strength and coordination. A good day to push yourself if you want to.' },
        { k:'Mood',  v:'Feeling more magnetic or expressive than usual is a real hormonal effect. Use it.' },
        { k:'Mind',  v:'A good day for presentations, negotiations, or any conversation that matters.' },
        { k:'Sleep', v:'Sleep tends to be at its best around ovulation. You\'re likely falling asleep easily and waking refreshed.' },
      ],
    },
    mid: {
      headline: 'Connection and communication come easily today',
      sub: 'You\'re at your most expressive and connected. Being around people today will feel unusually easy.',
      guidance: [
        { k:'Food',  v:'Fibre-rich foods like wholegrains, vegetables, and legumes support your body through the hormonal peak.' },
        { k:'Move',  v:'Group classes or outdoor activity suit the outward energy of this phase.' },
        { k:'Mood',  v:'Warmth and generosity feel natural right now. Let yourself enjoy that.' },
        { k:'Mind',  v:'Collaborate, share ideas, and follow up on things that need a personal touch.' },
        { k:'Sleep', v:'You\'re in the best sleep window of your cycle. A regular bedtime helps you hold on to that.' },
      ],
    },
    late: {
      headline: 'Peak energy is still with you today',
      sub: 'A subtle inward shift may be starting. Physical energy is still on your side today.',
      guidance: [
        { k:'Food',  v:'A nourishing meal now helps set you up for the phase ahead. Think wholegrains, vegetables, and good protein.' },
        { k:'Move',  v:'Make the most of movement while it still feels this easy.' },
        { k:'Mood',  v:'A slight dip in mood or energy is normal at this point. Nothing is wrong.' },
        { k:'Mind',  v:'Wrap up anything that benefits from your outward, communicative energy.' },
        { k:'Sleep', v:'Sleep may start to feel slightly less deep as progesterone begins to rise. Nothing dramatic yet, but worth noting.' },
      ],
    },
  },
  luteal: {
    early: {
      headline: 'Social energy is lower and focus turns inward today',
      sub: 'Progesterone is rising. Your focus and attention to detail are sharper than they seem right now.',
      guidance: [
        { k:'Food',  v:'Complex carbs help stabilise mood as progesterone rises. Oats, sweet potato, and brown rice are good options.' },
        { k:'Move',  v:'Backing off intensity is the right call, not a failure. Pilates or a moderate walk works well.' },
        { k:'Mood',  v:'You may feel more sensitive to criticism or conflict right now. That\'s a known effect of this phase.' },
        { k:'Mind',  v:'Focused, detail-oriented work suits this phase. A good time to edit, review, and finish things.' },
        { k:'Sleep', v:'Progesterone has a mild sedative effect early in this phase. You may feel sleepier than usual, especially in the afternoon.' },
      ],
    },
    mid: {
      headline: 'Mood and patience are more fragile than usual today',
      sub: 'Progesterone peaks here and mood is affected. What you eat today has a direct effect on how you feel.',
      guidance: [
        { k:'Food',  v:'Magnesium helps with mood and reduces cravings. Dark chocolate, spinach, and pumpkin seeds are good sources.' },
        { k:'Move',  v:'Consistent moderate movement is one of the most effective mood regulators in this phase.' },
        { k:'Mood',  v:'The things that are bothering you may feel bigger than they are right now. Worth knowing before reacting.' },
        { k:'Mind',  v:'Lower the bar on output today. Finishing one thing well is enough.' },
        { k:'Sleep', v:'Sleep can become more disrupted as progesterone starts to drop. Waking in the night is a common pattern at this point.' },
      ],
    },
    late: {
      headline: 'Your body is at its most tired point in the cycle today',
      sub: 'Your body is preparing for menstruation. Sleep is the most important thing you can protect right now.',
      guidance: [
        { k:'Food',  v:'Warm, easy meals reduce the load on your system. Soups, stews, and cooked vegetables work well.' },
        { k:'Move',  v:'Gentle movement over intensity. Even a short walk helps more than staying completely still.' },
        { k:'Mood',  v:'Emotions are louder before your period. You\'re not overreacting. Your cycle is doing its job.' },
        { k:'Mind',  v:'Clear your schedule where you can. This is the right time to protect your energy, not push through.' },
        { k:'Sleep', v:'Disrupted sleep before your period is hormonal, not a habit problem. Keeping a consistent bedtime helps more than anything else.' },
      ],
    },
  },
};

// Returns 'early' | 'mid' | 'late' based on where the user sits within their current phase.
// First 20% of phase = early, middle 60% = mid, final 20% = late.
// Ovulatory is always 3 days: day 1 = early, day 2 = mid, day 3 = late.
function getPhasePosition(userData) {
  const { cycleDay, cycleLength, periodLength } = userData;
  const follEnd = Math.round(cycleLength * 0.464);
  const ovuEnd  = Math.round(cycleLength * 0.571);
  const key     = userData.phase.key;

  let phaseStart, phaseLength;
  if      (key === 'menstrual')  { phaseStart = 1;                phaseLength = periodLength; }
  else if (key === 'follicular') { phaseStart = periodLength + 1; phaseLength = follEnd - periodLength; }
  else if (key === 'ovulatory')  { phaseStart = follEnd + 1;      phaseLength = ovuEnd - follEnd; }
  else                           { phaseStart = ovuEnd + 1;       phaseLength = cycleLength - ovuEnd; }

  const dayInPhase = Math.max(1, cycleDay - phaseStart + 1);

  if (key === 'ovulatory') {
    if (dayInPhase === 1) return 'early';
    if (dayInPhase === 2) return 'mid';
    return 'late';
  }

  const earlyEnd  = Math.max(1, Math.round(phaseLength * 0.2));
  const lateStart = Math.max(earlyEnd + 1, phaseLength - Math.round(phaseLength * 0.2) + 1);
  if (dayInPhase <= earlyEnd)  return 'early';
  if (dayInPhase >= lateStart) return 'late';
  return 'mid';
}

// ─── Home ─────────────────────────────────────────────────────────────────────

const PILL = {
  menstrual:  { bg:'#F2E8EA', accent:'#9B5B6A', text:'#5C2D3A' },
  follicular: { bg:'#E8EFE6', accent:'#4A7259', text:'#1E3D2A' },
  ovulatory:  { bg:'#EDE8DF', accent:'#8A6A30', text:'#5A4010' },
  luteal:     { bg:'#E8E6F0', accent:'#6B5A8A', text:'#2E2248' },
};

const BAND_BG = {
  menstrual:  '#F5D6DB',
  follicular: '#C8DFC4',
  ovulatory:  '#F5E0B0',
  luteal:     '#D8D0F0',
};

const FOOD_TIPS = {
  'Chocolate':          'Your body may be craving magnesium. Dark chocolate, nuts, or seeds can help.',
  'Sweet':              'Blood sugar dips can drive sweet cravings. Try fruit with protein to stabilise.',
  'Salty':              'Mineral needs rise in the luteal phase. Try mineral-rich snacks like olives or miso.',
  'Carbs':              'Complex carbs support serotonin. Opt for oats, sweet potato, or brown rice.',
  'Comfort food':       'Emotional eating can signal a need for warmth. Warm soups or stews nourish deeply.',
  'No appetite':        'Lowered appetite is normal mid-cycle. Focus on nutrient-dense small meals.',
  'Increased appetite': 'Elevated appetite is common before your period. Prioritise protein and healthy fats.',
};
const MOOD_TIPS = {
  'Anxious':     'Anxiety can peak premenstrually. Magnesium-rich foods and slow breathing may help.',
  'Irritated':   'Irritability often signals hormonal flux. Reduce sugar and prioritise rest.',
  'Sad':         'Sadness can reflect progesterone shifts. Gentle movement and sunlight support mood.',
  'Low energy':  'Low energy is normal in the luteal or menstrual phase. Rest is productive too.',
  'Mood swings': 'Mood swings reflect hormonal changes. Blood sugar stability helps — eat regularly.',
  'Calm':        'Calm days are worth savouring. Your nervous system is in a good place.',
  'Happy':       'Elevated mood often reflects rising oestrogen. A great time to connect with others.',
  'Energetic':   'High energy likely reflects oestrogen or testosterone peaks. Channel it well.',
  'Apathetic':   'Apathy can signal depletion. Check in on sleep, food, and what you actually want.',
  'Frisky':      'Libido tends to peak around ovulation. A natural and healthy signal.',
};
const MIND_TIPS = {
  'Foggy':       'Brain fog often reflects progesterone or low iron. Hydrate and consider an iron-rich meal.',
  'Overwhelmed': 'Overwhelm can peak before your period. Break tasks into small steps.',
  'Scattered':   'Scattered thinking is common in the luteal phase. A short list helps anchor focus.',
  'Indecisive':  'Indecision often spikes premenstrually. Trust your gut over analysis.',
  'Focused':     'Your focus is sharp today. Good day for deep, complex work.',
  'Clear':       'Mental clarity is on your side. Tackle anything that requires precision.',
  'Creative':    "Creative flow often rises with oestrogen. Capture ideas while they're fresh.",
  'Sharp':       'Sharp thinking is a gift today. Lean into anything requiring strategy or quick decisions.',
};
const MOVE_TIPS = {
  'Rest':     'Rest is recovery. Your body is doing important hormonal work.',
  'Light':    'Gentle movement supports circulation and mood without overtaxing the body.',
  'Moderate': 'Moderate movement is well-matched to where you are in your cycle right now.',
  'Intense': {
    menstrual:  'Intense movement during your period can be more taxing. Listen to your body carefully.',
    follicular: 'Great phase for intense training — oestrogen supports strength and recovery.',
    ovulatory:  'Peak energy phase. High-intensity movement is well-timed now.',
    luteal:     'Intense exercise in the luteal phase can increase cortisol. Consider moderating.',
  },
};
const SLEEP_TIPS = {
  'Poor':      'Poor sleep disrupts hormone balance. Keep a consistent wind-down routine.',
  'Disrupted': 'Disrupted sleep often reflects progesterone fluctuations. Magnesium before bed may help.',
  'Good':      "Good sleep is doing more than you know — it's when hormones reset.",
  'Great':     'Great sleep is a foundation for everything else. Note what you did differently.',
};

function getPersonalizedTip(k, todayLog, phaseKey) {
  if (!todayLog) return null;
  if (k === 'Food') {
    const found = todayLog.cravings?.find(c => FOOD_TIPS[c]);
    return found ? FOOD_TIPS[found] : null;
  }
  if (k === 'Mood') {
    const found = todayLog.mood?.find(m => MOOD_TIPS[m]);
    return found ? MOOD_TIPS[found] : null;
  }
  if (k === 'Mind') {
    const found = todayLog.mind?.find(m => MIND_TIPS[m]);
    return found ? MIND_TIPS[found] : null;
  }
  if (k === 'Move') {
    const found = todayLog.movement?.find(m => MOVE_TIPS[m]);
    if (!found) return null;
    const tip = MOVE_TIPS[found];
    return typeof tip === 'object' ? tip[phaseKey] ?? null : tip;
  }
  if (k === 'Sleep') {
    return todayLog.sleep ? SLEEP_TIPS[todayLog.sleep] ?? null : null;
  }
  return null;
}


function InnoHome({ phase, userData, onTab, onLogSymptoms, todayLog }) {
  const p = phase;
  const pill = PILL[p.key];

  // Empty state — no period date set
  if (!userData.lastPeriodStart) {
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#FAFAF8', padding:'0 32px', textAlign:'center' }}>
        <PetalMark size={48} style={{ marginBottom:20 }}/>
        <h2 style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:26, fontWeight:400, color:G.ink, margin:'0 0 12px', lineHeight:1.2 }}>Set up your cycle to get started</h2>
        <p style={{ fontSize:14, color:G.muted, margin:'0 0 28px', lineHeight:1.65, fontFamily:'"DM Sans", sans-serif' }}>Add your last period date in Account to see your daily insights.</p>
        <button onClick={() => onTab('profile')} style={{ height:50, padding:'0 32px', borderRadius:50, border:'none', background:BRAND, color:'#fff', fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'"DM Sans", sans-serif' }}>Go to Account</button>
      </div>
    );
  }

  const insight = PHASE_INSIGHTS[p.key][getPhasePosition(userData)];
  const loggedSymptoms = todayLog?.symptoms?.length > 0 ? todayLog.symptoms : null;
  const getTip = (k) => getPersonalizedTip(k, todayLog, p.key);

  // Stale date banner — last period > 180 days ago
  const daysSinceLastPeriod = Math.floor((Date.now() - new Date(userData.lastPeriodStart + 'T00:00:00')) / 86400000);
  const showStaleBanner = daysSinceLastPeriod > 180;
  const [bannerDismissed, setBannerDismissed] = React.useState(false);

  return (
    <div ref={el => { if (el) el.scrollTop = 0; }} style={{ flex:1, overflowX:'hidden', overflowY:'auto', background:'#FAFAF8' }}>

      {/* Hero */}
      <div style={{ padding:'32px 28px 28px' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'0 12px 0 10px', height:28, borderRadius:14, background:pill.bg, border:`1px solid ${pill.accent}55`, marginBottom:20 }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:pill.accent, flexShrink:0 }}/>
          <span style={{ fontSize:11, fontWeight:500, letterSpacing:'.10em', textTransform:'uppercase', color:pill.text, fontFamily:'"DM Sans", sans-serif' }}>
            {p.name} · Day {userData.cycleDay}
          </span>
        </div>
        {showStaleBanner && !bannerDismissed && (
          <button onClick={() => onTab('profile')} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', marginBottom:16, padding:'9px 12px', borderRadius:10, border:'none', background:'#F5EDD8', cursor:'pointer', textAlign:'left' }}>
            <span style={{ fontSize:12, color:'#5A4010', fontFamily:'"DM Sans", sans-serif', lineHeight:1.45, flex:1 }}>Your period date may be outdated. Update it in Account for accurate insights.</span>
            <span onClick={e => { e.stopPropagation(); setBannerDismissed(true); }} style={{ fontSize:16, color:'#8A6620', marginLeft:10, flexShrink:0, lineHeight:1 }}>×</span>
          </button>
        )}
        <h1 style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:38, fontWeight:400, lineHeight:1.12, color:G.ink, margin:'0 0 14px', letterSpacing:'-.02em' }}>
          {insight.headline}
        </h1>
        <p style={{ fontSize:14, color:G.muted, margin:'0 0 28px', lineHeight:1.7, maxWidth:280, fontFamily:'"DM Sans", sans-serif' }}>
          {insight.sub}
        </p>
        <button onClick={onLogSymptoms} style={{
          width:'100%', height:50, borderRadius:50,
          border:'none', background:BRAND, color:'#fff',
          fontSize:14, fontWeight:500, letterSpacing:'.02em',
          cursor:'pointer', fontFamily:'"DM Sans", sans-serif',
        }}>
          Log today
        </button>
      </div>

      {/* Guidance card — plain div, scrolls with the page */}
      <div style={{ background:'#fff', borderRadius:'36px 36px 0 0', padding:'28px 28px 32px', boxShadow:'0 -2px 8px rgba(0,0,0,0.05)' }}>
        {loggedSymptoms && (
          <div style={{ fontSize:11, color:'#6C6C70', marginBottom:16, fontFamily:'"DM Sans", sans-serif' }}>
            Logged today: {loggedSymptoms.map(s => s.toLowerCase()).join(', ')}
          </div>
        )}
        <div style={{ fontSize:10, fontWeight:500, letterSpacing:'.14em', textTransform:'uppercase', color:G.muted, marginBottom:20 }}>Today</div>
        {insight.guidance.map((row, i, arr) => {
          const tip = getTip(row.k);
          return (
          <div key={row.k} style={{ display:'flex', gap:20, paddingBottom:18, marginBottom:18, borderBottom: i < arr.length-1 ? `1px solid ${G.line}` : 'none', alignItems:'flex-start' }}>
            <span style={{ fontSize:10, fontWeight:500, letterSpacing:'.12em', textTransform:'uppercase', color:G.muted, minWidth:44, paddingTop:3, fontFamily:'"DM Sans", sans-serif' }}>{row.k}</span>
            <div>
              <span style={{ fontSize:14, color:G.ink, lineHeight:1.65, fontFamily:'"DM Sans", sans-serif' }}>{row.v}</span>
              {tip && (
                <div style={{ fontSize:12, color:'#6C6C70', marginTop:6, lineHeight:1.55, fontFamily:'"DM Sans", sans-serif' }}>{tip}</div>
              )}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Shared log form helpers ──────────────────────────────────────────────────

function useLogForm(phase, dateStr) {
  const [sel, setSel] = React.useState({ flow:'', cravings:[], mood:[], mind:[], symptoms:[], movement:[], sleep:'' });

  React.useEffect(() => {
    if (!dateStr) return;
    api.getLog(dateStr).then(log => {
      if (!log) return;
      setSel({
        flow:      log.flow      || '',
        cravings:  Array.isArray(log.cravings)  ? log.cravings  : [],
        mood:      Array.isArray(log.mood)       ? log.mood      : [],
        mind:      Array.isArray(log.mind)       ? log.mind      : [],
        symptoms:  Array.isArray(log.symptoms)   ? log.symptoms  : [],
        movement:  Array.isArray(log.movement)   ? log.movement  : [],
        sleep:     log.sleep     || '',
      });
    });
  }, [dateStr]);

  const toggle = (section, val, single=false) => setSel(prev => {
    if (single) return { ...prev, [section]: prev[section] === val ? '' : val };
    return { ...prev, [section]: prev[section].includes(val) ? prev[section].filter(v=>v!==val) : [...prev[section], val] };
  });

  return [sel, toggle];
}

function LogChipBase({ phase, section, val, emoji, single, sel, toggle, chipStyle }) {
  const p = phase;
  const active = single ? sel[section] === val : Array.isArray(sel[section]) && sel[section].includes(val);
  return (
    <button onClick={()=>toggle(section, val, single)} style={{
      display:'inline-flex', alignItems:'center', gap:6,
      padding:'9px 16px', borderRadius:50,
      border:`1.5px solid ${active ? BRAND : '#d8d0e8'}`,
      background: active ? BRAND : '#fff',
      color: active ? '#fff' : G.ink,
      fontSize:14, fontWeight: active ? 500 : 400,
      cursor:'pointer', fontFamily:'"DM Sans", sans-serif',
      transition:'all .15s', whiteSpace:'nowrap',
      ...chipStyle,
    }}>
      {emoji && <span style={{ fontSize:'inherit' }}>{emoji}</span>}
      {val}
    </button>
  );
}

function LogCardBase({ label, children }) {
  return (
    <div style={{ background:'#fff', borderRadius:20, border:'1.5px solid #EFEFEF', padding:'18px 18px 16px', marginBottom:12 }}>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:G.ink, marginBottom:14 }}>{label}</div>
      {children}
    </div>
  );
}

// ─── Log — full page ──────────────────────────────────────────────────────────

function InnoLog({ phase, today, onTab, onLogSaved }) {
  const p = phase;
  const [sel, toggle] = useLogForm(p, today);
  const [saved, setSaved] = React.useState(false);

  const handleSave = async () => {
    await api.saveLog(today, sel);
    onLogSaved?.();
    setSaved(true);
  };

  const LogChip = ({ section, val, emoji, single }) => (
    <LogChipBase phase={p} section={section} val={val} emoji={emoji} single={single} sel={sel} toggle={toggle}/>
  );
  const ChipRow = ({ section, items, single }) => (
    <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
      {items.map(([val, emoji])=><LogChip key={val} section={section} val={val} emoji={emoji} single={single}/>)}
    </div>
  );

  const todayLabel = new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' });

  if (saved) return (
    <SuccessState phase={p} message="Logged." sub="You're building a clearer picture every day" onDone={()=>{ setSaved(false); onTab('home'); }}/>
  );

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:G.stone }}>
      <div style={{ padding:'28px 20px 8px', flexShrink:0 }}>
        <h2 style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:28, fontWeight:400, color:G.ink, margin:'0 0 2px', letterSpacing:'-.01em' }}>Log today</h2>
        <p style={{ fontSize:12, color:G.muted, margin:'0 0 0' }}>{todayLabel}</p>
      </div>
      <div style={{ flex:1, overflowX:'hidden', overflowY:'auto', padding:'12px 16px 0' }}>
        <LogCardBase label="Period Flow">
          <ChipRow section="flow" single items={[['None',null],['Light',null],['Medium',null],['Heavy',null]]}/>
        </LogCardBase>
        <LogCardBase label="Cravings">
          <ChipRow section="cravings" items={[['Sweet','🍬'],['Salty','🧂'],['Carbs','🍞'],['Chocolate','🍫'],['Comfort food','🍲'],['No appetite','😶'],['Increased appetite','🍽️']]}/>
        </LogCardBase>
        <LogCardBase label="Mood">
          <ChipRow section="mood" items={[['Calm','🌸'],['Happy','☀️'],['Energetic','⚡'],['Irritated','😤'],['Sad','🌧️'],['Anxious','🌀'],['Low energy','🪫'],['Apathetic','🩶'],['Frisky','🔥'],['Mood swings','🎢']]}/>
        </LogCardBase>
        <LogCardBase label="Mind">
          <ChipRow section="mind" items={[['Focused','🎯'],['Clear','💎'],['Creative','💡'],['Foggy','🌫️'],['Overwhelmed','🌊'],['Scattered','🌪️'],['Indecisive','🤔'],['Sharp','⚡']]}/>
        </LogCardBase>
        <LogCardBase label="Symptoms">
          <ChipRow section="symptoms" items={[['Cramps','🌀'],['Tender breasts','🍒'],['Headache','🤕'],['Backache','🪨'],['Fatigue','😴'],['Hot flashes','🔥'],['Night sweats','💧'],['Bloating','🫧']]}/>
        </LogCardBase>
        <LogCardBase label="Movement">
          <ChipRow section="movement" items={[['Rest','🧖'],['Light','🚶'],['Moderate','🧘'],['Intense','🏋️']]}/>
        </LogCardBase>
        <LogCardBase label="Sleep">
          <ChipRow section="sleep" single items={[['Great','⭐'],['Good','✅'],['Disrupted','😵'],['Poor','😔']]}/>
        </LogCardBase>
        <div style={{ height:12 }}/>
      </div>
      <div style={{ padding:'12px 20px 4px', borderTop:`1px solid ${G.line}`, flexShrink:0, background:G.stone }}>
        <PrimaryBtn phase={p} onClick={handleSave}>Save log</PrimaryBtn>
      </div>
    </div>
  );
}

// ─── Calendar month data ──────────────────────────────────────────────────────

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function buildMonthData(count, startOffset, lastPeriodStart, cycleLength) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastPeriod = new Date(lastPeriodStart + 'T00:00:00');
  const result = [];

  for (let i = startOffset; i < startOffset + count; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const year  = d.getFullYear();
    const month = d.getMonth();
    const days  = new Date(year, month + 1, 0).getDate();
    const startDow = d.getDay();
    const diffDays = Math.round((d - lastPeriod) / 86400000);
    const offset = ((diffDays % cycleLength) + cycleLength) % cycleLength;
    result.push({ name:MONTH_NAMES[month], year, month, days, startDow, offset });
  }
  return result;
}

// ─── Day log drawer (calendar) ────────────────────────────────────────────────

function DayLogDrawer({ drawer, phase, onClose, onLogSaved }) {
  const p = phase;
  const ph = drawer.phase;
  const [sel, toggle] = useLogForm(ph, drawer.dateStr);
  const [saved, setSaved] = React.useState(false);

  const handleSave = async () => {
    await api.saveLog(drawer.dateStr, sel);
    onLogSaved?.();
    setSaved(true);
  };

  const LogChip = ({ section, val, emoji, single }) => (
    <LogChipBase phase={ph} section={section} val={val} emoji={emoji} single={single} sel={sel} toggle={toggle}
      chipStyle={{ padding:'8px 14px', fontSize:13 }}/>
  );
  const ChipRow = ({ section, items, single }) => (
    <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
      {items.map(([val, emoji])=><LogChip key={val} section={section} val={val} emoji={emoji} single={single}/>)}
    </div>
  );
  const LogCard = ({ label, children }) => (
    <div style={{ background:'#fff', borderRadius:20, border:'1.5px solid #EFEFEF', padding:'16px 16px 14px', marginBottom:10 }}>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:G.ink, marginBottom:12 }}>{label}</div>
      {children}
    </div>
  );

  return (
    <>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(30,20,15,.3)', zIndex:10 }} aria-hidden="true"/>
      <div role="dialog" aria-modal="true" style={{ position:'absolute', bottom:0, left:0, right:0, top:'15%', background:G.stone, borderRadius:'20px 20px 0 0', boxShadow:'0 -8px 40px rgba(0,0,0,.12)', zIndex:20, display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'12px 0 0', flexShrink:0 }}>
          <div style={{ width:36, height:4, borderRadius:2, background:G.line, margin:'0 auto' }}/>
        </div>
        <div style={{ padding:'12px 20px 14px', borderBottom:`1px solid ${G.line}`, flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:ph.btnAccent }}/>
                <span style={{ fontSize:10, fontWeight:500, letterSpacing:'.10em', textTransform:'uppercase', color:G.muted }}>{ph.name}</span>
              </div>
              <div style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:20, fontWeight:400, color:G.ink }}>{drawer.day} {drawer.month} {drawer.year}</div>
            </div>
            <button onClick={onClose} style={{ width:32, height:32, borderRadius:16, border:`1px solid ${G.line}`, background:'none', cursor:'pointer', color:G.muted, fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
          </div>
        </div>

        {saved
          ? <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 28px', textAlign:'center' }}>
              <PetalMark size={40} style={{ marginBottom:16 }}/>
              <div style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:22, fontWeight:400, color:G.ink, marginBottom:8 }}>Saved.</div>
              <button onClick={onClose} style={{ marginTop:16, height:46, padding:'0 36px', borderRadius:50, border:'none', background:BRAND, color:'#fff', fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'"DM Sans", sans-serif' }}>Done</button>
            </div>
          : <>
              <div style={{ flex:1, overflowX:'hidden', overflowY:'auto', padding:'12px 14px 0' }}>
                <LogCard label="Period Flow"><ChipRow section="flow" single items={[['None',null],['Light',null],['Medium',null],['Heavy',null]]}/></LogCard>
                <LogCard label="Cravings"><ChipRow section="cravings" items={[['Sweet','🍬'],['Salty','🧂'],['Carbs','🍞'],['Chocolate','🍫'],['Comfort food','🍲'],['No appetite','😶'],['Increased appetite','🍽️']]}/></LogCard>
                <LogCard label="Mood"><ChipRow section="mood" items={[['Calm','🌸'],['Happy','☀️'],['Energetic','⚡'],['Irritated','😤'],['Sad','🌧️'],['Anxious','🌀'],['Low energy','🪫'],['Apathetic','🩶'],['Frisky','🔥'],['Mood swings','🎢']]}/></LogCard>
                <LogCard label="Mind"><ChipRow section="mind" items={[['Focused','🎯'],['Clear','💎'],['Creative','💡'],['Foggy','🌫️'],['Overwhelmed','🌊'],['Scattered','🌪️'],['Indecisive','🤔'],['Sharp','⚡']]}/></LogCard>
                <LogCard label="Symptoms"><ChipRow section="symptoms" items={[['Cramps','🌀'],['Tender breasts','🍒'],['Headache','🤕'],['Backache','🪨'],['Fatigue','😴'],['Hot flashes','🔥'],['Night sweats','💧'],['Bloating','🫧']]}/></LogCard>
                <LogCard label="Movement"><ChipRow section="movement" items={[['Rest','🧖'],['Light','🚶'],['Moderate','🧘'],['Intense','🏋️']]}/></LogCard>
                <LogCard label="Sleep"><ChipRow section="sleep" single items={[['Great','⭐'],['Good','✅'],['Disrupted','😵'],['Poor','😔']]}/></LogCard>
                <div style={{ height:10 }}/>
              </div>
              <div style={{ padding:'12px 20px 4px', borderTop:`1px solid ${G.line}`, flexShrink:0 }}>
                <PrimaryBtn phase={ph} onClick={handleSave}>Save log</PrimaryBtn>
              </div>
            </>
        }
      </div>
    </>
  );
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

function InnoCalendar({ phase, userData, loggedDates, onLogSaved }) {
  const p = phase;
  const [drawer, setDrawer] = React.useState(null);
  const DOW = ['S','M','T','W','T','F','S'];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const MONTH_DATA = React.useMemo(
    () => buildMonthData(12, 0, userData.lastPeriodStart, userData.cycleLength),
    [userData.lastPeriodStart, userData.cycleLength],
  );

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:G.stone, position:'relative' }}>
      <div style={{ flex:1, overflowX:'hidden', overflowY:'auto', padding:'0 24px 80px' }}>
        <div style={{ padding:'28px 0 8px' }}>
          <h2 style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:28, fontWeight:400, color:G.ink, margin:'0 0 4px', letterSpacing:'-.01em' }}>Journal</h2>
          <p style={{ fontSize:12, color:G.muted, margin:'0 0 14px' }}>Your logged days across the cycle</p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            {Object.values(PHASES).map(ph=>(
              <div key={ph.key} style={{ display:'flex', alignItems:'center', gap:5 }}>
                <div style={{ width:20, height:10, borderRadius:5, background:BAND_BG[ph.key] }}/>
                <span style={{ fontSize:11, color:G.muted }}>{ph.name}</span>
              </div>
            ))}
          </div>
        </div>

        {MONTH_DATA.map((m) => (
          <div key={`${m.year}-${m.month}`} style={{ marginBottom:32 }}>
            <div style={{ fontSize:11, fontWeight:500, letterSpacing:'.10em', textTransform:'uppercase', color:G.muted, marginBottom:12 }}>{m.name} {m.year}</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', marginBottom:4 }}>
              {DOW.map((d,i)=><div key={i} style={{ textAlign:'center', fontSize:10, fontWeight:500, letterSpacing:'.06em', color:G.muted, paddingBottom:4 }}>{d}</div>)}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)' }}>
              {Array.from({ length:m.startDow }).map((_,i)=><div key={`e${i}`} style={{ height:32 }}/>)}
              {Array.from({ length:m.days }, (_,i) => {
                const day = i + 1;
                const cycleDay = (m.offset + i) % userData.cycleLength + 1;
                const ph = getPhaseForDay(cycleDay, userData.cycleLength, userData.periodLength);
                const dayDate = new Date(m.year, m.month, day);
                const isToday  = dayDate.getTime() === today.getTime();
                const isPast   = dayDate < today;
                const dateStr  = `${m.year}-${String(m.month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                const isLogged = loggedDates.has(dateStr);

                // Band cap logic — breaks at row boundaries (week wrap) and month edges
                const dayOfWeek    = (m.startDow + i) % 7;
                const isFirstInRow = dayOfWeek === 0 || i === 0;
                const isLastInRow  = dayOfWeek === 6 || i === m.days - 1;

                const prevCycleDay = i > 0 ? (m.offset + i - 1) % userData.cycleLength + 1 : null;
                const nextCycleDay = i < m.days - 1 ? (m.offset + i + 1) % userData.cycleLength + 1 : null;
                const prevPh = prevCycleDay != null ? getPhaseForDay(prevCycleDay, userData.cycleLength, userData.periodLength) : null;
                const nextPh = nextCycleDay != null ? getPhaseForDay(nextCycleDay, userData.cycleLength, userData.periodLength) : null;

                const connectLeft  = !isFirstInRow && prevPh?.key === ph.key;
                const connectRight = !isLastInRow  && nextPh?.key === ph.key;

                const R = 14;
                const bandRadius = connectLeft && connectRight ? '0'
                  : connectLeft  ? `0 ${R}px ${R}px 0`
                  : connectRight ? `${R}px 0 0 ${R}px`
                  : `${R}px`;

                return (
                  <button key={day}
                    onClick={()=>setDrawer({ day, month:m.name, year:m.year, phase:ph, logged:isLogged, dateStr })}
                    aria-label={`${day} ${m.name}`}
                    style={{
                      height:32, border:'none', cursor:'pointer', padding:0,
                      background:'transparent',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      position:'relative', fontFamily:'"DM Sans", sans-serif',
                    }}
                  >
                    {/* Phase band */}
                    <div style={{
                      position:'absolute', inset:0,
                      background: BAND_BG[ph.key],
                      borderRadius: bandRadius,
                      opacity: isPast && !isToday ? 0.6 : 1,
                    }}/>
                    {/* Today circle — solid #6B5A8A over the band */}
                    {isToday && (
                      <div style={{
                        position:'absolute', width:28, height:28, borderRadius:'50%',
                        background:'#6B5A8A', zIndex:1,
                      }}/>
                    )}
                    {/* Day number */}
                    <span style={{
                      position:'relative', zIndex:2,
                      fontSize:12, lineHeight:1,
                      fontWeight: isToday ? 600 : 400,
                      color: isToday ? '#fff' : G.ink,
                    }}>
                      {day}
                    </span>
                    {/* Logged dot */}
                    {isLogged && !isToday && (
                      <div style={{
                        position:'absolute', bottom:3, left:'50%',
                        transform:'translateX(-50%)',
                        width:3, height:3, borderRadius:'50%',
                        background: ph.btnAccent, zIndex:2,
                      }}/>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {drawer && <DayLogDrawer drawer={drawer} phase={p} onClose={()=>setDrawer(null)} onLogSaved={onLogSaved}/>}
    </div>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────────

function InnoProfile({ phase, userData, onSave, onLegal, onSignOut }) {
  const p = phase;
  return (
    <div style={{ flex:1, overflowX:'hidden', overflowY:'auto', background:G.stone }}>
      <div style={{ padding:'28px 24px 0' }}>
        <h2 style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:28, fontWeight:400, color:G.ink, margin:'0 0 20px', letterSpacing:'-.01em' }}>Account</h2>
      </div>
      <ProfileTab phase={p} userData={userData} onSave={onSave} onLegal={onLegal} onSignOut={onSignOut}/>
      {/* DEV ONLY — remove before production */}
      {import.meta.env.DEV && (
        <div style={{ padding:'16px 20px 32px' }}>
          <button
            onClick={async () => { await fetch('/api/reset-onboarding', { method:'DELETE' }); window.location.reload(); }}
            style={{ width:'100%', padding:'12px 0', borderRadius:10, border:'1.5px dashed #EFEFEF', background:'transparent', color:G.muted, fontSize:13, cursor:'pointer', fontFamily:'"DM Sans", sans-serif' }}>
            Reset onboarding
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Log drawer (from nav) ────────────────────────────────────────────────────

function InnoLogDrawer({ phase, today, onClose, onLogSaved, onShowToast }) {
  const p = phase;
  const [sel, toggle] = useLogForm(p, today);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  const handleSave = async () => {
    await api.saveLog(today, sel);
    onLogSaved?.();
    onClose();
    onShowToast?.('Logged ✓');
  };

  const LogChip = ({ section, val, emoji, single }) => (
    <LogChipBase phase={p} section={section} val={val} emoji={emoji} single={single} sel={sel} toggle={toggle}/>
  );
  const ChipRow = ({ section, items, single }) => (
    <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
      {items.map(([val, emoji])=><LogChip key={val} section={section} val={val} emoji={emoji} single={single}/>)}
    </div>
  );
  const LogCard = ({ label, children }) => (
    <div style={{ background:'#fff', borderRadius:20, border:'1.5px solid #EFEFEF', padding:'18px 18px 16px', marginBottom:12 }}>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:G.ink, marginBottom:14 }}>{label}</div>
      {children}
    </div>
  );

  return (
    <>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(30,20,15,.3)', zIndex:10 }} aria-hidden="true"/>
      <div role="dialog" aria-modal="true" style={{ position:'absolute', bottom:0, left:0, right:0, top:'10%', background:G.stone, borderRadius:'20px 20px 0 0', boxShadow:'0 -8px 40px rgba(0,0,0,.12)', zIndex:20, display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'12px 20px 14px', borderBottom:`1px solid ${G.line}`, flexShrink:0 }}>
          <div style={{ width:36, height:4, borderRadius:2, background:G.line, margin:'0 auto 16px' }}/>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ fontFamily:'"Cormorant Garamond", serif', fontSize:22, fontWeight:400, color:G.ink }}>Log today</div>
            <button onClick={onClose} style={{ width:32, height:32, borderRadius:16, border:`1px solid ${G.line}`, background:'none', cursor:'pointer', color:G.muted, fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
          </div>
        </div>

        <div ref={scrollRef} style={{ flex:1, overflowX:'hidden', overflowY:'auto', padding:'12px 16px 0' }}>
            <LogCard label="Period Flow"><ChipRow section="flow" single items={[['None',null],['Light',null],['Medium',null],['Heavy',null]]}/></LogCard>
            <LogCard label="Cravings"><ChipRow section="cravings" items={[['Sweet','🍬'],['Salty','🧂'],['Carbs','🍞'],['Chocolate','🍫'],['Comfort food','🍲'],['No appetite','😶'],['Increased appetite','🍽️']]}/></LogCard>
            <LogCard label="Mood"><ChipRow section="mood" items={[['Calm','🌸'],['Happy','☀️'],['Energetic','⚡'],['Irritated','😤'],['Sad','🌧️'],['Anxious','🌀'],['Low energy','🪫'],['Apathetic','🩶'],['Frisky','🔥'],['Mood swings','🎢']]}/></LogCard>
            <LogCard label="Mind"><ChipRow section="mind" items={[['Focused','🎯'],['Clear','💎'],['Creative','💡'],['Foggy','🌫️'],['Overwhelmed','🌊'],['Scattered','🌪️'],['Indecisive','🤔'],['Sharp','⚡']]}/></LogCard>
            <LogCard label="Symptoms"><ChipRow section="symptoms" items={[['Cramps','🌀'],['Tender breasts','🍒'],['Headache','🤕'],['Backache','🪨'],['Fatigue','😴'],['Hot flashes','🔥'],['Night sweats','💧'],['Bloating','🫧']]}/></LogCard>
            <LogCard label="Movement"><ChipRow section="movement" items={[['Rest','🧖'],['Light','🚶'],['Moderate','🧘'],['Intense','🏋️']]}/></LogCard>
            <LogCard label="Sleep"><ChipRow section="sleep" single items={[['Great','⭐'],['Good','✅'],['Disrupted','😵'],['Poor','😔']]}/></LogCard>
            <div style={{ height:12 }}/>
          </div>
          <div style={{ padding:'12px 20px 4px', borderTop:`1px solid ${G.line}`, flexShrink:0, background:G.stone }}>
            <PrimaryBtn phase={p} onClick={handleSave}>Save log</PrimaryBtn>
          </div>
      </div>
    </>
  );
}

// ─── App shell ────────────────────────────────────────────────────────────────

export function CirénApp({ onSignOut }) {
  const [tab, setTab] = React.useState('home');
  const [logOpen, setLogOpen] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [loggedDates, setLoggedDates] = React.useState(new Set());
  const [todayLog, setTodayLog] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [legalModal, setLegalModal] = React.useState(null);
  const today = React.useMemo(() => new Date().toISOString().slice(0, 10), []);

  const showToast = React.useCallback((msg) => setToast(msg), []);

  const loadData = React.useCallback(() => {
    Promise.all([
      api.getSettings(),
      api.getLogs(),
      api.getLog(new Date().toISOString().slice(0, 10)),
    ]).then(([settings, logs, todayLogData]) => {
      setUserData(computeCycleState(settings));
      setLoggedDates(new Set(logs.map(l => l.date)));
      setTodayLog(todayLogData);
    });
  }, []);

  React.useEffect(() => { loadData(); }, [loadData]);

  if (!userData) {
    return (
      <PhoneShell>
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <PetalMark size={40} color={G.muted}/>
        </div>
      </PhoneShell>
    );
  }

  const p = userData.phase;

  const handleTab = (t) => {
    if (t === 'log') setLogOpen(true);
    else setTab(t);
  };

  const handleLogSymptoms = () => setLogOpen(true);

  const handleSaveSettings = async (s) => {
    await api.saveSettings(s);
    loadData();
    showToast('Settings saved');
  };

  return (
    <PhoneShell phase={p}>
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', position:'relative' }}>
        {tab === 'home'     && <InnoHome     phase={p} userData={userData} onTab={handleTab} onLogSymptoms={handleLogSymptoms} todayLog={todayLog}/>}
        {tab === 'calendar' && <InnoCalendar phase={p} userData={userData} loggedDates={loggedDates} onLogSaved={loadData}/>}
        {tab === 'profile'  && <InnoProfile  phase={p} userData={userData} onSave={handleSaveSettings} onLegal={setLegalModal} onSignOut={onSignOut}/>}
        {logOpen && <InnoLogDrawer phase={p} today={today} onClose={() => setLogOpen(false)} onLogSaved={loadData} onShowToast={showToast}/>}
        <LegalDrawer modal={legalModal} onClose={() => setLegalModal(null)}/>
        {toast && <Toast message={toast} onDone={() => setToast(null)}/>}
        <BottomTabBar active={tab} onTab={handleTab} phase={p}/>
      </div>
    </PhoneShell>
  );
}
