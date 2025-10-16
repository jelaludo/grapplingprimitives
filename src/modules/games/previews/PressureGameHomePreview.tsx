import React from 'react';
import { Box, Typography } from '@mui/material';

const PressureGameHomePreview: React.FC = () => {
  // Create a mini heatmap visualization similar to the one in GamesHub but optimized for home card
  const gridSize = 10;
  const cells: React.ReactElement[] = [];
  
  // Simple radial gradient pattern for preview
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const centerX = gridSize / 2 - 0.5;
      const centerY = gridSize / 2 - 0.5;
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) / (gridSize / 2);
      
      // Create a heat-like pattern with more dramatic red peaks
      const noise = Math.sin(x * 0.6) * Math.cos(y * 0.6) * 0.4 + 0.6;
      let value = (1 - dist) * noise;
      value = Math.max(0, Math.min(1, value));
      
      // Color mapping similar to the game
      let color;
      if (value < 0.25) {
        const t = value / 0.25;
        const r = 0;
        const g = Math.floor(100 + t * 155);
        const b = Math.floor(255 - t * 55);
        color = `rgb(${r}, ${g}, ${b})`;
      } else if (value < 0.5) {
        const t = (value - 0.25) / 0.25;
        const r = Math.floor(t * 200);
        const g = 255;
        const b = Math.floor(200 - t * 200);
        color = `rgb(${r}, ${g}, ${b})`;
      } else if (value < 0.75) {
        const t = (value - 0.5) / 0.25;
        const r = Math.floor(200 + t * 55);
        const g = Math.floor(255 - t * 100);
        const b = 0;
        color = `rgb(${r}, ${g}, ${b})`;
      } else {
        const t = (value - 0.75) / 0.25;
        const r = 255;
        const g = Math.floor(155 - t * 155);
        const b = 0;
        color = `rgb(${r}, ${g}, ${b})`;
      }
      
      cells.push(
        <Box
          key={`${x}-${y}`}
          sx={{
            backgroundColor: dist > 1 ? '#000' : color,
            opacity: dist > 1 ? 1 : 0.9,
          }}
        />
      );
    }
  }

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      p: 2
    }}>
      <Box sx={{ 
        position: 'relative', 
        width: '80%', 
        aspectRatio: '1 / 1',
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        bgcolor: '#000',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}>
        {cells}
        {/* White dot in center with pulse animation */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '10%',
          height: '10%',
          borderRadius: '50%',
          bgcolor: 'white',
          boxShadow: '0 0 12px rgba(255,255,255,0.8)',
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              transform: 'translate(-50%, -50%) scale(1)',
              opacity: 1
            },
            '50%': {
              transform: 'translate(-50%, -50%) scale(1.2)',
              opacity: 0.8
            }
          }
        }} />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
          Timing & Pressure
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', opacity: 0.6, fontSize: '0.7rem' }}>
          Guide to RED zone
        </Typography>
      </Box>
    </Box>
  );
};

export default PressureGameHomePreview;

