import React, { useEffect } from 'react';
import HomeHub from './HomeHub';

interface Props {
  goMatrix: () => void;
  goCards: () => void;
  goGraphs: () => void;
  goGames: (initial?: 'none' | 'centroid' | 'memory') => void;
  goCoach: () => void;
  goSkillCheck: () => void;
  goArticles: () => void;
  goStudies: () => void;
  goLudus: () => void;
  goOthers?: () => void;
  goCalendar: () => void;
  goTraining: () => void;
}

const HomeHubMount: React.FC<Props> = (props) => {
  useEffect(() => {
    document.body.classList.add('immersive');
    return () => { document.body.classList.remove('immersive'); };
  }, []);
  return <HomeHub {...props} />;
};

export default HomeHubMount;


