const BASE = '/api';

export async function getSettings() {
  const r = await fetch(`${BASE}/settings`);
  return r.json();
}

export async function saveSettings(settings) {
  const r = await fetch(`${BASE}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  return r.json();
}

export async function getLogs() {
  const r = await fetch(`${BASE}/logs`);
  return r.json();
}

export async function getLog(date) {
  const r = await fetch(`${BASE}/logs/${date}`);
  return r.json();
}

export async function saveLog(date, data) {
  const r = await fetch(`${BASE}/logs/${date}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return r.json();
}
