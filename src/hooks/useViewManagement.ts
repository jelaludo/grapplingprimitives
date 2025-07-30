import { useState, useCallback } from 'react';

export type View = 'matrix' | 'articles' | 'studies' | 'graphs';

// Pre-computed constants
const DEFAULT_VIEW: View = 'matrix';

export const useViewManagement = () => {
  const [currentView, setCurrentView] = useState<View>(DEFAULT_VIEW);

  const switchToMatrix = useCallback(() => setCurrentView('matrix'), []);
  const switchToArticles = useCallback(() => setCurrentView('articles'), []);
  const switchToStudies = useCallback(() => setCurrentView('studies'), []);
  const switchToGraphs = useCallback(() => setCurrentView('graphs'), []);

  return {
    currentView,
    switchToMatrix,
    switchToArticles,
    switchToStudies,
    switchToGraphs
  };
}; 