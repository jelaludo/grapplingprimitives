import { useState, useCallback } from 'react';

export type View = 'matrix' | 'articles' | 'studies';

// Pre-computed constants
const DEFAULT_VIEW: View = 'matrix';

export const useViewManagement = () => {
  const [currentView, setCurrentView] = useState<View>(DEFAULT_VIEW);

  const switchToMatrix = useCallback(() => setCurrentView('matrix'), []);
  const switchToArticles = useCallback(() => setCurrentView('articles'), []);
  const switchToStudies = useCallback(() => setCurrentView('studies'), []);

  return {
    currentView,
    switchToMatrix,
    switchToArticles,
    switchToStudies
  };
}; 