export interface BJJConcept {
  _id?: string;
  id: string;
  concept: string;
  description: string;
  short_description: string;
  category: string;
  color: string;
  axis_self_opponent: number;
  axis_mental_physical: number;
  brightness: number;
  size: number;
}

export interface Category {
  name: string;
  color: string;
  _id?: string;
  xAxis?: { left: string; right: string };
  yAxis?: { bottom: string; top: string };
}

export interface LabelItem {
  d: BJJConcept;
  x: number;
  y: number;
  fontSize: number;
  priority: number;
  width: number;
  height: number;
}

export interface LabelMode {
  type: 'hover' | 'all';
  description: string;
}

export interface ModalPosition {
  side: 'left' | 'right' | 'center';
  vertical: 'top' | 'bottom' | 'center';
}

export interface ContainerSize {
  width: number;
  height: number;
}

export interface AxisLabel {
  x: number;
  y: number;
  text: string;
  anchor: 'start' | 'middle' | 'end';
  rotation?: number;
} 