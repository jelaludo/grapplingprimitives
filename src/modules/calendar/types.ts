export interface UserDay {
  dateISO: string; // YYYY-MM-DD
  intensity1to10: number;
}

export interface SessionItem {
  exerciseId: string; // references exercise library id or free-text id
  name: string; // human-readable name
  preset?: string;
  value?: number | string | null;
}

export interface Session {
  id: string;
  dateISO: string; // YYYY-MM-DD
  startedAt: string; // ISO timestamp
  workoutId?: string;
  items: SessionItem[];
}

export interface Exercise {
  id: string;
  name: string;
}


