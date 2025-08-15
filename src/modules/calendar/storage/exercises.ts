export interface ExerciseDef { id: string; name: string }

const KEY = '@app/exerciseLibrary';

export function getExerciseLibrary(): ExerciseDef[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const defaults: ExerciseDef[] = [
        { id: 'ex-knee-flexion', name: 'Knee flexion' },
        { id: 'ex-quad-set', name: 'Quad set' },
        { id: 'ex-hamstring-curl', name: 'Hamstring curl' },
      ];
      localStorage.setItem(KEY, JSON.stringify(defaults));
      return defaults;
    }
    return JSON.parse(raw) as ExerciseDef[];
  } catch {
    return [];
  }
}

export function addExerciseToLibrary(name: string): ExerciseDef {
  const lib = getExerciseLibrary();
  const exists = lib.find(e => e.name.toLowerCase() === name.toLowerCase());
  if (exists) return exists;
  const def: ExerciseDef = { id: `ex-${Date.now()}`, name };
  try {
    localStorage.setItem(KEY, JSON.stringify([...lib, def]));
  } catch {}
  return def;
}


