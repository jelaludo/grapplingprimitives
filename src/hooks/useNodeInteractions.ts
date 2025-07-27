import { useEffect, useState, useCallback } from 'react';
import { BJJConcept } from '../types/concepts';

interface UseNodeInteractionsProps {
  selected: BJJConcept | null;
  createMode: boolean;
  margin: number;
  size: { width: number; height: number };
}

export const useNodeInteractions = ({
  selected,
  createMode,
  margin,
  size,
}: UseNodeInteractionsProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [pingedNodeId, setPingedNodeId] = useState<string | null>(null);
  const [pingStep, setPingStep] = useState(0);
  const [createModal, setCreateModal] = useState<null | { x: number; y: number }>(null);

  // Ping animation when selected changes
  useEffect(() => {
    if (selected && selected.id) {
      setPingedNodeId(selected.id);
      setPingStep(0);
      let step = 0;
      const interval = setInterval(() => {
        setPingStep(s => s + 1);
        step++;
        if (step >= 6) {
          clearInterval(interval);
          setPingedNodeId(null);
          setPingStep(0);
        }
      }, 180);
      return () => clearInterval(interval);
    }
  }, [selected]);

  // Reset edit mode when selected changes
  useEffect(() => {
    setEditMode(false);
  }, [selected]);

  // Reset create modal when create mode changes
  useEffect(() => {
    if (!createMode) setCreateModal(null);
  }, [createMode]);

  // Handle SVG click for node creation
  const handleSvgClick = useCallback((event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!createMode) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Clamp to plot area and round to 2 decimal places
    const normX = Number(Math.max(0, Math.min(1, (x - margin) / (size.width - 2 * margin))).toFixed(2));
    const normY = Number(Math.max(0, Math.min(1, (size.height - margin - y) / (size.height - 2 * margin))).toFixed(2));
    
    setCreateModal({ x: normX, y: normY });
  }, [createMode, margin, size]);

  // Generate unique ID for new concepts
  const generateId = useCallback((concepts: BJJConcept[]): string => {
    const maxNum = concepts.reduce((max, c) => {
      const match = c.id && c.id.match(/^BJJ-(\d{3})$/);
      if (match) {
        const num = parseInt(match[1], 10);
        return Math.max(max, num);
      }
      return max;
    }, 0);
    return `BJJ-${String(maxNum + 1).padStart(3, '0')}`;
  }, []);

  return {
    hovered,
    setHovered,
    editMode,
    setEditMode,
    pingedNodeId,
    pingStep,
    createModal,
    setCreateModal,
    handleSvgClick,
    generateId,
  };
}; 