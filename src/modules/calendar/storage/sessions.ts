import { Session } from '../types';

const SESSIONS_KEY = (dateISO: string) => `@app/sessions:${dateISO}`;

export function getSessions(dateISO: string): Session[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY(dateISO));
    return raw ? (JSON.parse(raw) as Session[]) : [];
  } catch {
    return [];
  }
}

export function setSessions(dateISO: string, sessions: Session[]): void {
  try {
    localStorage.setItem(SESSIONS_KEY(dateISO), JSON.stringify(sessions));
  } catch {}
}

export function addSession(dateISO: string, session: Session): Session[] {
  const all = getSessions(dateISO);
  const updated = [...all, session];
  setSessions(dateISO, updated);
  return updated;
}


