export type ModuleCategory =
  | "Concept Map"
  | "Decision Tree"
  | "Games"
  | "Articles"
  | "Tools"
  | "Matrix"
  | "Training"
  | "Other";

export interface ModuleDefinition {
  id: string;
  slug: string;        // used in /modules/[slug]
  title: string;
  shortDescription: string;
  category: ModuleCategory;
  icon: string;        // lucide icon name
  featured?: boolean;
  order?: number;
}

export const MODULES: ModuleDefinition[] = [
  {
    id: "concept-matrix",
    slug: "concept-matrix",
    title: "2×2 Matrix",
    shortDescription: "Explore and compare grappling concepts across mental/physical and self/opponent axes.",
    category: "Matrix",
    icon: "grid-3x3",
    featured: true,
    order: 1,
  },
  {
    id: "cards",
    slug: "cards",
    title: "Flash Cards",
    shortDescription: "Study and review techniques with interactive flash cards.",
    category: "Training",
    icon: "credit-card",
    featured: true,
    order: 2,
  },
  {
    id: "games",
    slug: "games",
    title: "Games Hub",
    shortDescription: "Interactive games including memory, centroid, and pressure scenarios.",
    category: "Games",
    icon: "gamepad-2",
    featured: true,
    order: 3,
  },
  {
    id: "training",
    slug: "training",
    title: "Training Hub",
    shortDescription: "Plan sessions, track progress, and manage your training schedule.",
    category: "Training",
    icon: "dumbbell",
    featured: false,
    order: 4,
  },
  {
    id: "calendar",
    slug: "calendar",
    title: "Training Calendar",
    shortDescription: "Track your training sessions and progress over time.",
    category: "Tools",
    icon: "calendar",
    featured: false,
    order: 5,
  },
  {
    id: "coach-tools",
    slug: "coach-tools",
    title: "Coach Tools",
    shortDescription: "Tools for coaches to plan classes and manage training data.",
    category: "Tools",
    icon: "clipboard-list",
    featured: false,
    order: 6,
  },
  {
    id: "skill-check",
    slug: "skill-check",
    title: "Skill Assessment",
    shortDescription: "Assess your grappling knowledge with interactive quizzes.",
    category: "Tools",
    icon: "clipboard-check",
    featured: false,
    order: 7,
  },
  {
    id: "articles",
    slug: "articles",
    title: "Articles",
    shortDescription: "Read and explore curated articles on grappling techniques and concepts.",
    category: "Articles",
    icon: "book-open",
    featured: false,
    order: 8,
  },
  {
    id: "studies",
    slug: "studies",
    title: "Research Studies",
    shortDescription: "Access academic research papers and studies on grappling.",
    category: "Articles",
    icon: "graduation-cap",
    featured: false,
    order: 9,
  },
  {
    id: "weight-class",
    slug: "weight-class",
    title: "Weight Class Tool",
    shortDescription: "Calculate and explore BJJ weight class divisions.",
    category: "Tools",
    icon: "scale",
    featured: false,
    order: 10,
  },
  {
    id: "belt-dropout",
    slug: "belt-dropout",
    title: "Belt Dropout",
    shortDescription: "Visualize belt progression and dropout rates.",
    category: "Tools",
    icon: "award",
    featured: false,
    order: 11,
  },
  {
    id: "breathing",
    slug: "breathing",
    title: "Breathing Cycles",
    shortDescription: "Practice breathing techniques for grappling.",
    category: "Training",
    icon: "wind",
    featured: false,
    order: 12,
  },
  {
    id: "stories",
    slug: "stories",
    title: "Stories",
    shortDescription: "Explore visual stories and narratives.",
    category: "Other",
    icon: "book",
    featured: false,
    order: 13,
  },
];

