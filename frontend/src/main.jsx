import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CirénApp } from './components/innovative';
import { OnboardingFlow } from './components/Onboarding';
import { AuthScreen } from './components/AuthScreen';
import { getSettings } from './api';

function Root() {
  const [state, setState] = React.useState('loading');

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

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setState('auth');
  };

  if (state === 'loading')    return null;
  if (state === 'auth')       return <AuthScreen />;
  if (state === 'onboarding') return <OnboardingFlow onComplete={checkAuth} />;
  return <CirénApp onSignOut={handleSignOut} />;
}

createRoot(document.getElementById('root')).render(
  <div className="app-shell">
    <Root />
  </div>
);
