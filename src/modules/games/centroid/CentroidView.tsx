import React, { useEffect } from 'react';
import CentroidFastGame from './CentroidFastGame';

const CentroidView: React.FC = () => {
  // Force GRIDFAST mode by simulating a click sequence after mount if needed
  // Simpler: the component defaults to GRIDFAST. We hide its top mode bar via CSS override.

  useEffect(() => {
    // Hide header while game is active by adding a class to body
    document.body.classList.add('game-fullscreen');
    return () => {
      document.body.classList.remove('game-fullscreen');
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <CentroidFastGame />
      </div>
    </div>
  );
};

export default CentroidView;


