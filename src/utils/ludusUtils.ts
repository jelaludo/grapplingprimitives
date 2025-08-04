import { BJJConcept } from '../types/concepts';
import { LudusNode } from '../types/ludus';

export const convertBJJConceptToLudusNode = (concept: BJJConcept): LudusNode => {
  return {
    id: concept.id,
    concept: concept.concept,
    description: concept.description,
    short_description: concept.short_description,
    category: concept.category,
    color: concept.color,
    position: { x: Math.random() * 200 + 50, y: 50 },
    velocity: { x: 0, y: 0 },
    importance: 5, // Default importance
    mastery: 5, // Default mastery
    r: concept.r || 15,
    opacity: concept.opacity || 1,
    stroke: concept.stroke,
    strokeWidth: concept.strokeWidth
  };
};

export const convertLudusNodeToBJJConcept = (node: LudusNode): BJJConcept => {
  return {
    id: node.id,
    concept: node.concept,
    description: node.description,
    short_description: node.short_description,
    category: node.category,
    color: node.color,
    axis_self_opponent: 0.5, // Default position
    axis_mental_physical: 0.5, // Default position
    brightness: 1,
    size: 1,
    cx: node.position.x,
    cy: node.position.y,
    r: node.r,
    opacity: node.opacity,
    stroke: node.stroke,
    strokeWidth: node.strokeWidth
  };
}; 