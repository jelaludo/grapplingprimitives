import { useState, useCallback } from 'react';

export type View = 'matrix' | 'articles' | 'studies' | 'graphs' | 'ludus' | 'cards' | 'games';

// Pre-computed constants
const DEFAULT_VIEW: View = 'matrix';

export const useViewManagement = () => {
  const [currentView, setCurrentView] = useState<View>(DEFAULT_VIEW);

  const switchToMatrix = useCallback(() => setCurrentView('matrix'), []);
  const switchToArticles = useCallback(() => setCurrentView('articles'), []);
  const switchToStudies = useCallback(() => setCurrentView('studies'), []);
  const switchToGraphs = useCallback(() => setCurrentView('graphs'), []);
  const switchToLudus = useCallback(() => setCurrentView('ludus'), []);
  const switchToCards = useCallback(() => setCurrentView('cards'), []);
  const switchToGames = useCallback(() => setCurrentView('games'), []);

  return {
    currentView,
    switchToMatrix,
    switchToArticles,
    switchToStudies,
    switchToGraphs,
    switchToLudus,
    switchToCards
    ,switchToGames
  };
}; 