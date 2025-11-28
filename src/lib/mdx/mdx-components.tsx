import type { MDXComponents } from 'mdx/types';
import { ConceptMatrix } from '@/components/modules/concept-matrix/concept-matrix';
import { GamesHub } from '@/components/modules/games/games-hub';
import { CoachToolsHub } from '@/components/modules/coach-tools/coach-tools-hub';
import { CardsView } from '@/components/modules/cards/cards-view';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ConceptMatrix,
    GamesHub,
    CoachToolsHub,
    CardsView,
  };
}

