import { useMemo } from 'react';
import { BJJConcept, LabelItem, LabelMode } from '../types/concepts';

interface UseLabelManagementProps {
  concepts: BJJConcept[];
  labelMode: LabelMode;
  hovered: string | null;
  selected: BJJConcept | null;
  size: { width: number; height: number };
  margin: number;
}

export const useLabelManagement = ({
  concepts,
  labelMode,
  hovered,
  selected,
  size,
  margin,
}: UseLabelManagementProps) => {
  const calculateLabelDimensions = (text: string, fontSize: number): { width: number; height: number } => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return { width: 0, height: 0 };
    
    ctx.font = `bold ${fontSize}px Arial`;
    const metrics = ctx.measureText(text);
    return {
      width: metrics.width + 8,
      height: fontSize + 4
    };
  };

  const detectCollision = (label1: LabelItem, label2: LabelItem): boolean => {
    return !(
      label1.x + label1.width < label2.x ||
      label1.x > label2.x + label2.width ||
      label1.y + label1.height < label2.y ||
      label1.y > label2.y + label2.height
    );
  };

  const getLabelPriority = (concept: BJJConcept): number => {
    if (hovered === concept.id) return 1000;
    if (selected && selected.id === concept.id) return 900;
    return concept.brightness + concept.size;
  };

  const labelItems = useMemo((): LabelItem[] => {
    const { width, height } = size;
    const labelItems: LabelItem[] = [];

    // Determine which concepts should have labels based on mode
    let conceptsToLabel: BJJConcept[] = [];
    
    switch (labelMode.type) {
      case 'hover':
        if (hovered) {
          const hoveredConcept = concepts.find(c => c.id === hovered);
          if (hoveredConcept) conceptsToLabel = [hoveredConcept];
        }
        break;
      case 'all':
        conceptsToLabel = concepts;
        break;
    }

    // Create label items with positioning
    conceptsToLabel.forEach(concept => {
      const x = margin + concept.axis_mental_physical * (width - 2 * margin);
      const y = height - margin - concept.axis_self_opponent * (height - 2 * margin) - 20;
      const fontSize = hovered === concept.id ? 16 : 12;
      const priority = getLabelPriority(concept);
      const dimensions = calculateLabelDimensions(concept.concept, fontSize);
      
      labelItems.push({
        d: concept,
        x,
        y,
        fontSize,
        priority,
        width: dimensions.width,
        height: dimensions.height
      });
    });

    // Sort by priority (highest first)
    labelItems.sort((a, b) => b.priority - a.priority);

    // Apply collision detection
    const visibleLabels: LabelItem[] = [];
    labelItems.forEach(label => {
      const hasCollision = visibleLabels.some(existing => detectCollision(label, existing));
      if (!hasCollision) {
        visibleLabels.push(label);
      }
    });

    return visibleLabels;
  }, [concepts, labelMode, hovered, selected, size, margin]);

  return { labelItems };
}; 