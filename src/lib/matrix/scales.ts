/**
 * Scale helpers for converting between normalized coordinates (-1 to 1) and screen coordinates
 */

export interface Viewport {
  width: number;
  height: number;
  translateX: number;
  translateY: number;
  zoom: number;
}

/**
 * Convert normalized coordinate (-1 to 1) to screen coordinate
 */
export function normalizedToScreen(
  normalized: number,
  viewport: Viewport,
  axis: 'x' | 'y'
): number {
  const center = axis === 'x' ? viewport.width / 2 : viewport.height / 2;
  const range = axis === 'x' ? viewport.width : viewport.height;
  const scale = (range * viewport.zoom) / 2;
  
  return center + normalized * scale + (axis === 'x' ? viewport.translateX : viewport.translateY);
}

/**
 * Convert screen coordinate to normalized coordinate (-1 to 1)
 */
export function screenToNormalized(
  screen: number,
  viewport: Viewport,
  axis: 'x' | 'y'
): number {
  const center = axis === 'x' ? viewport.width / 2 : viewport.height / 2;
  const range = axis === 'x' ? viewport.width : viewport.height;
  const scale = (range * viewport.zoom) / 2;
  
  return (screen - center - (axis === 'x' ? viewport.translateX : viewport.translateY)) / scale;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Get the viewBox string for SVG
 * For our normalized coordinate system (-1 to 1), we use a dynamic viewBox
 * The viewBox controls what area we see - dots stay at fixed coordinates
 * Format: "minX minY width height"
 * 
 * To zoom: reduce width/height (smaller viewBox = more zoom)
 * To pan: change minX/minY (move the viewBox window)
 * 
 * Base viewBox: -2 to 2 (shows full coordinate space)
 * When zoom=1, translate=0: viewBox = "-2 -2 4 4"
 */
export function getViewBox(viewport: Viewport): string {
  // Base viewBox is -2 to 2 (width 4, height 4)
  // Zoom: viewBox size = 4 / zoom (zoom=2 means size=2, showing 2x zoom)
  const viewBoxSize = 4 / viewport.zoom;
  
  // Pan: translate moves the viewBox window
  // Base center is at (0, 0) in viewBox coordinates
  // translateX/Y moves the center of what we see
  const minX = -2 - viewport.translateX - (viewBoxSize - 4) / 2;
  const minY = -2 - viewport.translateY - (viewBoxSize - 4) / 2;
  
  return `${minX} ${minY} ${viewBoxSize} ${viewBoxSize}`;
}

