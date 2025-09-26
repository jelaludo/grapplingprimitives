import { useState, useCallback } from 'react';

export type View = 'home' | 'others' | 'matrix' | 'articles' | 'studies' | 'graphs' | 'ludus' | 'cards' | 'games' | 'coach' | 'skillcheck' | 'calendar' | 'training' | 'stories' | 'beltdropout' | 'weight' | 'breathing' | 'screhab';

// Pre-computed constants
const DEFAULT_VIEW: View = 'home';

export const useViewManagement = () => {
  const [currentView, setCurrentView] = useState<View>(DEFAULT_VIEW);
  const [gamesInitial, setGamesInitial] = useState<'none' | 'centroid' | 'memory'>('none');

  const switchToHome = useCallback(() => setCurrentView('home'), []);
  const switchToOthers = useCallback(() => setCurrentView('others'), []);
  const switchToMatrix = useCallback(() => setCurrentView('matrix'), []);
  const switchToArticles = useCallback(() => setCurrentView('articles'), []);
  const switchToStudies = useCallback(() => setCurrentView('studies'), []);
  const switchToGraphs = useCallback(() => setCurrentView('graphs'), []);
  const switchToLudus = useCallback(() => setCurrentView('ludus'), []);
  const switchToCards = useCallback(() => setCurrentView('cards'), []);
  const switchToGames = useCallback(() => { setGamesInitial('none'); setCurrentView('games'); }, []);
  const switchToGamesWithInitial = useCallback((initial: 'none' | 'centroid' | 'memory') => { setGamesInitial(initial); setCurrentView('games'); }, []);
  const switchToCoach = useCallback(() => setCurrentView('coach'), []);
  const switchToSkillCheck = useCallback(() => setCurrentView('skillcheck'), []);
  const switchToCalendar = useCallback(() => setCurrentView('calendar'), []);
  const switchToTraining = useCallback(() => setCurrentView('training'), []);
  const switchToStories = useCallback(() => setCurrentView('stories'), []);
  const switchToBeltDropout = useCallback(() => setCurrentView('beltdropout'), []);
  const switchToWeight = useCallback(() => setCurrentView('weight'), []);
  const switchToBreathing = useCallback(() => {
    console.log('switchToBreathing called, setting view to breathing');
    setCurrentView('breathing');
  }, []);
  const switchToScRehab = useCallback(() => {
    console.log('switchToScRehab called, setting view to screhab');
    setCurrentView('screhab');
  }, []);

  return {
    currentView,
    switchToHome,
    switchToOthers,
    switchToMatrix,
    switchToArticles,
    switchToStudies,
    switchToGraphs,
    switchToLudus,
    switchToCards
    ,switchToGames,
    switchToGamesWithInitial,
    switchToCoach,
    switchToSkillCheck,
    switchToCalendar,
    switchToTraining,
    switchToStories,
    switchToBeltDropout,
    switchToWeight,
    switchToBreathing,
    switchToScRehab,
    gamesInitial
  };
}; 