export type Unit = "reps" | "min" | "h" | "sec" | "kg" | "lb" | "m" | "km";

export interface Favorite {
  id: string;                                   // exercise id
  target: { value: number; unit: Unit };
}

export interface DayExercise {
  id: string;                                   // exercise id
  achieved?: { value: number; unit: Unit };
  // derived: percent = clamp(0,300, round((achievedInTargetUnits/target.value)*100))
}

export interface DayRecord {
  date: string;                                 // YYYY-MM-DD
  satisfaction?: number;                        // 1..10
  rest?: boolean;
  exercises: DayExercise[];
}

export interface User {
  id: string;
  favorites: Favorite[];
  favoriteOrder?: string[];                     // pinned order for honeycomb
}

// Exercise catalog for picker
export interface Exercise {
  id: string;
  name: string;
  category: string;
  description?: string;
}

// Utility functions
export function toTargetUnits(value: number, from: Unit, to: Unit): number {
  if (from === to) return value;
  
  // Time conversions
  if (from === "sec" && to === "min") return value / 60;
  if (from === "min" && to === "sec") return value * 60;
  if (from === "h" && to === "min") return value * 60;
  if (from === "min" && to === "h") return value / 60;
  if (from === "sec" && to === "h") return value / 3600;
  if (from === "h" && to === "sec") return value * 3600;
  
  // Weight conversions
  if (from === "kg" && to === "lb") return value * 2.20462;
  if (from === "lb" && to === "kg") return value / 2.20462;
  
  // Distance conversions
  if (from === "m" && to === "km") return value / 1000;
  if (from === "km" && to === "m") return value * 1000;
  
  return value;
}

export function calculatePercent(achieved: { value: number; unit: Unit } | undefined, target: { value: number; unit: Unit }): number {
  if (!achieved || target.value <= 0) return 0;
  
  const achievedInTargetUnits = toTargetUnits(achieved.value, achieved.unit, target.unit);
  const rawPercent = (achievedInTargetUnits / target.value) * 100;
  return Math.max(0, Math.min(300, Math.round(rawPercent)));
}

