"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export interface PanZoomState {
  zoom: number;
  translateX: number;
  translateY: number;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.1;
const DEFAULT_ZOOM = 1;

export function usePanZoom(initialState?: Partial<PanZoomState>) {
  const [state, setState] = useState<PanZoomState>({
    zoom: initialState?.zoom ?? DEFAULT_ZOOM,
    translateX: initialState?.translateX ?? 0,
    translateY: initialState?.translateY ?? 0,
  });

  const isPanning = useRef(false);
  const lastPanPoint = useRef({ x: 0, y: 0 });

  const zoomBy = useCallback((delta: number, centerX?: number, centerY?: number, width?: number, height?: number) => {
    setState((prev) => {
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev.zoom + delta));
      const zoomRatio = newZoom / prev.zoom;

      // If center point is provided, zoom towards that point
      // centerX/Y are in screen pixel coordinates
      // The transform is: scale(z) translate(tx/z, ty/z)
      // SVG applies right-to-left: translate first, then scale
      // So: translate(tx/z, ty/z) then scale(z)
      // A data point at (dx, dy) becomes: ((dx + tx/z) * z, (dy + ty/z) * z) = (dx*z + tx, dy*z + ty)
      // 
      // To keep a screen point (sx, sy) fixed:
      // 1. Convert screen to viewBox coordinates (before transform): vx = (sx / width) * 4 - 2
      // 2. Find what data point is currently at this viewBox position: dx = (vx - tx) / z
      // 3. After zoom, we want the same data point at the same screen position
      // 4. So: vx' = dx * z' + tx' = vx
      // 5. Solving: tx' = vx - dx * z' = vx - (vx - tx) * z' / z = vx * (1 - z'/z) + tx * z'/z
      if (centerX !== undefined && centerY !== undefined && width && height) {
        // Convert screen pixel to data coordinate (in viewBox space -2 to 2)
        // Current viewBox: minX, minY, size (where size = 4/zoom)
        const currentViewBoxSize = 4 / prev.zoom;
        const currentMinX = -2 - prev.translateX - (currentViewBoxSize - 4) / 2;
        const currentMinY = -2 - prev.translateY - (currentViewBoxSize - 4) / 2;
        
        // Screen point in viewBox coordinates (where the dot actually is)
        const dataX = currentMinX + (centerX / width) * currentViewBoxSize;
        const dataY = currentMinY + (centerY / height) * currentViewBoxSize;
        
        // After zoom, we want this same data point to stay at the same screen position
        // New viewBox size
        const newViewBoxSize = 4 / newZoom;
        // Calculate new translate to keep dataX at the same screen position
        // dataX = newMinX + (centerX / width) * newViewBoxSize
        // So: newMinX = dataX - (centerX / width) * newViewBoxSize
        const newMinX = dataX - (centerX / width) * newViewBoxSize;
        const newMinY = dataY - (centerY / height) * newViewBoxSize;
        
        // Convert back to translate coordinates
        // newMinX = -2 - newTranslateX - (newViewBoxSize - 4) / 2
        // So: newTranslateX = -2 - newMinX - (newViewBoxSize - 4) / 2
        const newTranslateX = -2 - newMinX - (newViewBoxSize - 4) / 2;
        const newTranslateY = -2 - newMinY - (newViewBoxSize - 4) / 2;
        
        return {
          zoom: newZoom,
          translateX: newTranslateX,
          translateY: newTranslateY,
        };
      }

      // Zoom without center point - zoom around current center
      return {
        ...prev,
        zoom: newZoom,
      };
    });
  }, []);

  const panBy = useCallback((deltaX: number, deltaY: number) => {
    // deltaX and deltaY are in viewBox units
    // When panning, we move the viewBox, which means we adjust translate
    // Since viewBox moves in the opposite direction of the pan, we subtract
    setState((prev) => ({
      translateX: prev.translateX - deltaX,
      translateY: prev.translateY - deltaY,
      zoom: prev.zoom,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      zoom: DEFAULT_ZOOM,
      translateX: 0,
      translateY: 0,
    });
  }, []);

  const setZoom = useCallback((zoom: number) => {
    setState((prev) => ({
      ...prev,
      zoom: Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom)),
    }));
  }, []);

  const zoomIn = useCallback(() => {
    zoomBy(ZOOM_STEP);
  }, [zoomBy]);

  const zoomOut = useCallback(() => {
    zoomBy(-ZOOM_STEP);
  }, [zoomBy]);

  // Mouse pan handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      isPanning.current = true;
      lastPanPoint.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent, convertToViewBox?: (deltaX: number, deltaY: number) => { x: number; y: number }) => {
    if (isPanning.current) {
      const deltaX = e.clientX - lastPanPoint.current.x;
      const deltaY = e.clientY - lastPanPoint.current.y;
      // If conversion function provided, use it (for viewBox units)
      // Otherwise use screen pixels (legacy behavior)
      if (convertToViewBox) {
        const viewBoxDelta = convertToViewBox(deltaX, deltaY);
        panBy(viewBoxDelta.x, viewBoxDelta.y);
      } else {
        panBy(deltaX, deltaY);
      }
      lastPanPoint.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    }
  }, [panBy]);

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    const rect = e.currentTarget.getBoundingClientRect();
    // Get mouse position relative to the container (in screen pixels)
    const centerX = e.clientX - rect.left;
    const centerY = e.clientY - rect.top;
    // Zoom towards the mouse position
    zoomBy(delta, centerX, centerY);
  }, [zoomBy]);

  // Touch handlers
  const touchStartRef = useRef<{ x: number; y: number; distance: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        distance: 0,
      };
    } else if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      touchStartRef.current = {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
        distance,
      };
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent, convertToViewBox?: (deltaX: number, deltaY: number) => { x: number; y: number }, width?: number, height?: number) => {
    if (!touchStartRef.current) return;

    if (e.touches.length === 1 && touchStartRef.current.distance === 0) {
      // Single finger pan
      const deltaX = e.touches[0].clientX - touchStartRef.current.x;
      const deltaY = e.touches[0].clientY - touchStartRef.current.y;
      if (convertToViewBox) {
        const viewBoxDelta = convertToViewBox(deltaX, deltaY);
        panBy(viewBoxDelta.x, viewBoxDelta.y);
      } else {
        panBy(deltaX, deltaY);
      }
      touchStartRef.current.x = e.touches[0].clientX;
      touchStartRef.current.y = e.touches[0].clientY;
    } else if (e.touches.length === 2 && touchStartRef.current.distance > 0) {
      // Two finger pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      const scale = distance / touchStartRef.current.distance;
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = (touchStartRef.current.x - rect.left);
      const centerY = (touchStartRef.current.y - rect.top);
      zoomBy((scale - 1) * ZOOM_STEP * 2, centerX, centerY, width, height);
      touchStartRef.current.distance = distance;
    }
  }, [panBy, zoomBy]);

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  return {
    state,
    zoomBy,
    panBy,
    reset,
    setZoom,
    zoomIn,
    zoomOut,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
      onWheel: handleWheel,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}

