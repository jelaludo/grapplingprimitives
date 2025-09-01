export interface BeltLevel {
  name: string;
  color: string;
  dropoutRate: number;
  y: number;
}

export interface Student {
  id: string;
  beltLevel: string;
  dropoutReason?: string;
  position: { x: number; y: number };
}

export interface DropoutReason {
  id: string;
  name: string;
  weight: number;
  description: string;
}

export interface SimulationStats {
  totalStarted: number;
  currentAtLevel: { [key: string]: number };
  totalDropouts: number;
  dropoutReasons: { [key: string]: number };
}
