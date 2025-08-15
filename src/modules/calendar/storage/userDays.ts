import { UserDay } from '../types';

const DAY_KEY = (dateISO: string) => `@app/day:${dateISO}`;

export function getUserDay(dateISO: string): UserDay | null {
  try {
    const raw = localStorage.getItem(DAY_KEY(dateISO));
    return raw ? (JSON.parse(raw) as UserDay) : null;
  } catch {
    return null;
  }
}

export function setUserDay(value: UserDay): void {
  try {
    localStorage.setItem(DAY_KEY(value.dateISO), JSON.stringify(value));
  } catch {}
}


