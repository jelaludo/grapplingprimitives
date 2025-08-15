import React from 'react';
import { Box } from '@mui/material';

const TrainingCardPreview: React.FC = () => {
  return (
    <Box sx={{ 
      width: '90%', 
      height: '80%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Hexagon grid preview */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: 0.5, 
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Sample hexagons with different progress levels */}
        {[
          { progress: 90, color: '#4caf50' }, // HIIT Conditioning
          { progress: 75, color: '#ff9800' }, // Turkish Get-Up
          { progress: 60, color: '#2196f3' }, // Deadlift Progression
          { progress: 40, color: '#9c27b0' }, // Shoulder Prehab
          { progress: 25, color: '#f44336' }, // Hip Mobility
          { progress: 10, color: '#666' }     // Core Stability
        ].map((hex, index) => (
          <Box
            key={index}
            sx={{
              width: '20px',
              height: '17px', // Hexagon height ratio
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: 'white',
              fontWeight: 'bold',
              textShadow: '1px 1px 1px rgba(0,0,0,0.8)',
            }}
          >
            {/* Hexagon shape */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                backgroundColor: hex.color,
                opacity: 0.8,
              }}
            />
            
            {/* Progress fill */}
            {hex.progress > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  clipPath: `polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`,
                  background: `conic-gradient(from 0deg, #4caf50 0deg, #4caf50 ${hex.progress * 3.6}deg, transparent ${hex.progress * 3.6}deg)`,
                  opacity: 0.9,
                }}
              />
            )}
            
            {/* Letter indicator */}
            <Box sx={{ position: 'relative', zIndex: 2, fontSize: '6px' }}>
              {String.fromCharCode(65 + index)}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TrainingCardPreview;
