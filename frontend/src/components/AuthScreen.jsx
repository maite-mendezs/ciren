import React, { useState } from 'react';
import { G } from './shared';

const SERIF = '"Cormorant Garamond", serif';
const SANS  = '"DM Sans", sans-serif';
const PURPLE = '#2E2248';

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

const inputStyle = {
  width: '100%', height: 50, borderRadius: 12,
  border: '1.5px solid #E5E5EA', background: '#fff',
  padding: '0 16px', fontSize: 14, color: '#1a1a1a',
  fontFamily: SANS, outline: 'none', boxSizing: 'border-box',
};

const btnPrimary = {
  width: '100%', height: 50, borderRadius: 50,
  border: 'none', background: PURPLE,
  fontSize: 14, fontWeight: 500, color: '#fff',
  fontFamily: SANS, cursor: 'pointer',
};

const btnSecondary = {
  width: '100%', height: 50, borderRadius: 50,
  border: '1.5px solid #E5E5EA', background: '#fff',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
  fontSize: 14, fontWeight: 500, color: '#1a1a1a',
  fontFamily: SANS, cursor: 'pointer',
};

export function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogle = () => { window.location.href = '/api/auth/google'; };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
      const body = { email, password };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong'); return; }
      if (onAuth) onAuth();
      else window.location.reload();
    } catch {
      setError('Network error, please try again');
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'home') return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:G.stone }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:64, gap:12 }}>
        <img src="/logo.png" alt="ciren" style={{ width:52, height:52, objectFit:'contain' }}/>
        <span style={{ fontSize:20, fontWeight:300, letterSpacing:'.10em', color:PURPLE, fontFamily:SANS }}>ciren</span>
      </div>
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 32px', textAlign:'center' }}>
        <h1 style={{ fontFamily:SERIF, fontSize:36, fontWeight:300, color:G.ink, lineHeight:1.15, letterSpacing:'-.01em', margin:'0 0 14px' }}>
          Your cycle,<br/>understood.
        </h1>
        <p style={{ fontSize:14, color:G.muted, margin:0, lineHeight:1.7, fontFamily:SANS, maxWidth:240 }}>
          Track how your cycle shapes your energy, mood, and mind, every day.
        </p>
      </div>
      <div style={{ padding:'0 24px 48px', display:'flex', flexDirection:'column', gap:12 }}>
        <button onClick={() => setMode('signup')} style={btnPrimary}>Create account</button>
        <button onClick={handleGoogle} style={btnSecondary}><GoogleLogo/> Continue with Google</button>
        <p style={{ textAlign:'center', fontSize:13, color:G.muted, margin:'4px 0 0', fontFamily:SANS }}>
          Already have an account?{' '}
          <span onClick={() => setMode('login')} style={{ color:PURPLE, cursor:'pointer', fontWeight:500 }}>Log in</span>
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:G.stone }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:56, gap:12 }}>
        <img src="/logo.png" alt="ciren" style={{ width:40, height:40, objectFit:'contain' }}/>
        <span style={{ fontSize:18, fontWeight:300, letterSpacing:'.10em', color:PURPLE, fontFamily:SANS }}>ciren</span>
      </div>
      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'32px 24px 0' }}>
        <h2 style={{ fontFamily:SERIF, fontSize:28, fontWeight:300, color:G.ink, margin:'0 0 24px', textAlign:'center' }}>
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </h2>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
<input style={inputStyle} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
          <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()}/>
          {error && <p style={{ color:'#c0392b', fontSize:13, margin:0, fontFamily:SANS, textAlign:'center' }}>{error}</p>}
          <button onClick={handleSubmit} disabled={loading} style={{ ...btnPrimary, opacity: loading ? 0.7 : 1, marginTop:4 }}>
            {loading ? '...' : mode === 'signup' ? 'Create account' : 'Log in'}
          </button>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12, margin:'20px 0' }}>
          <div style={{ flex:1, height:1, background:'#E5E5EA' }}/>
          <span style={{ fontSize:12, color:G.muted, fontFamily:SANS }}>or</span>
          <div style={{ flex:1, height:1, background:'#E5E5EA' }}/>
        </div>
        <button onClick={handleGoogle} style={btnSecondary}><GoogleLogo/> Continue with Google</button>
        <p style={{ textAlign:'center', fontSize:13, color:G.muted, margin:'20px 0 0', fontFamily:SANS }}>
          {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }} style={{ color:PURPLE, cursor:'pointer', fontWeight:500 }}>
            {mode === 'signup' ? 'Log in' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  );
}
