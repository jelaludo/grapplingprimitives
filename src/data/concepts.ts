export interface ConceptPoint {
  id: string;
  label: string;
  x: number;            // normalized -1 to 1
  y: number;            // same scale
  category: string;     // category name
  description?: string;
  color?: string;       // optional color override
}

// Initial concepts - this will be populated from the existing BJJConcept data
// For now, we'll create a few example concepts
export const CONCEPTS: ConceptPoint[] = [
  {
    id: "empathy",
    label: "Empathy",
    x: 0.72,
    y: 0.41,
    category: "Grappling Primitives",
    description: "Understanding your opponent's position and intentions",
  },
  {
    id: "pressure",
    label: "Pressure",
    x: -0.35,
    y: -0.62,
    category: "Physical Techniques",
    description: "Applying controlled pressure to control your opponent",
  },
  {
    id: "timing",
    label: "Timing",
    x: 0.58,
    y: 0.73,
    category: "Mental Skills",
    description: "Recognizing and executing techniques at the right moment",
  },
  {
    id: "balance",
    label: "Balance",
    x: -0.12,
    y: 0.25,
    category: "Physical Techniques",
    description: "Maintaining your own balance while disrupting your opponent's",
  },
];

// Helper function to convert BJJConcept to ConceptPoint
// The data uses 0-1 range, we need to convert to -1 to 1 for our coordinate system
// IMPORTANT: The old D3 code used:
//   X axis = axis_mental_physical (0=Mental/left, 1=Physical/right)
//   Y axis = axis_self_opponent (0=Opponent/bottom, 1=Self/top, inverted)
// We need to match this mapping for consistency
export function convertBJJConceptToConceptPoint(
  concept: {
    id: string;
    concept: string;
    description?: string;
    category: string;
    axis_self_opponent: number; // 0-1 range: 0=Opponent, 1=Self
    axis_mental_physical: number; // 0-1 range: 0=Mental, 1=Physical
    color?: string;
  }
): ConceptPoint {
  // Convert 0-1 range to -1 to 1 range
  // X axis: axis_mental_physical (0=Mental/left, 1=Physical/right)
  // Y axis: axis_self_opponent (0=Opponent/bottom, 1=Self/top)
  // In our coordinate system: -1 to 1, where center is 0
  // SVG Y increases downward, so we invert: Self (1) should be at top (-1)
  const x = (concept.axis_mental_physical - 0.5) * 2; // 0->-1 (Mental/left), 0.5->0, 1->1 (Physical/right)
  const y = -((concept.axis_self_opponent - 0.5) * 2); // 0->1 (Opponent/bottom), 0.5->0, 1->-1 (Self/top)
  
  return {
    id: concept.id,
    label: concept.concept,
    x: x, // Now in -1 to 1 range
    y: y, // Now in -1 to 1 range, inverted so Self is at top
    category: concept.category,
    description: concept.description,
    color: concept.color,
  };
}

