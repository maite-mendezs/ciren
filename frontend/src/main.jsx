import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CirénApp } from './components/innovative';
import { OnboardingFlow } from './components/Onboarding';
import { AuthScreen } from './components/AuthScreen';

const SANS = '"DM Sans", sans-serif';

function Splash() {
  const [fadingOut, setFadingOut] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setFadingOut(true), 1800);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <style>{`
        @keyframes sp-pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.08); }
        }
        @keyframes sp-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{
        position: 'fixed', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 18,
        background: '#ECEAF3',
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity .4s ease',
        zIndex: 9999,
      }}>
        <img src="/logo.png" alt="cirén"
          style={{ width: 80, height: 80, objectFit: 'contain', animation: 'sp-pulse 2s ease-in-out infinite' }}
        />
        <div style={{
          fontSize: 26, fontWeight: 300, letterSpacing: '.08em', color: '#2E2248',
          fontFamily: SANS, opacity: 0,
          animation: 'sp-fade-up .5s ease forwards .3s',
        }}>cirén</div>
      </div>
    </>
  );
}

function Root() {
  const [state, setState] = React.useState('loading');
  const [splashDone, setSplashDone] = React.useState(false);

  const checkAuth = React.useCallback(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(user => {
        if (!user) { setState('auth'); return; }
        setState(user.isOnboarded ? 'app' : 'onboarding');
      })
      .catch(() => setState('auth'));
  }, []);

  React.useEffect(() => { checkAuth(); }, [checkAuth]);
  React.useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setState('auth');
  };

  if (!splashDone || state === 'loading') return <Splash />;
  if (state === 'auth')       return <AuthScreen />;
  if (state === 'onboarding') return <OnboardingFlow onComplete={checkAuth} />;
  return <CirénApp onSignOut={handleSignOut} />;
}

createRoot(document.getElementById('root')).render(
  <div className="app-shell">
    <Root />
  </div>
);
