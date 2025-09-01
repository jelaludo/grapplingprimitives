import React from 'react';
import { Box } from '@mui/material';

const BeltDropoutCardPreview: React.FC = () => {
  return (
    <Box sx={{ 
      width: '90%', 
      height: '70%', 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      py: 1
    }}>
      {/* Belt levels visualization */}
      <Box sx={{ 
        width: '100%', 
        height: '60%', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 0.5,
        justifyContent: 'space-between'
      }}>
        {/* White belt */}
        <Box sx={{ 
          width: '100%', 
          height: '15%', 
          bgcolor: '#FFFFFF', 
          borderRadius: 1,
          border: '1px solid #ccc',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Falling dots */}
          <Box sx={{ 
            position: 'absolute', 
            top: '20%', 
            left: '20%', 
            width: 4, 
            height: 4, 
            bgcolor: '#FF6B6B', 
            borderRadius: '50%',
            animation: 'fall 2s infinite'
          }} />
          <Box sx={{ 
            position: 'absolute', 
            top: '40%', 
            left: '60%', 
            width: 3, 
            height: 3, 
            bgcolor: '#FF6B6B', 
            borderRadius: '50%',
            animation: 'fall 2.5s infinite'
          }} />
        </Box>
        
        {/* Blue belt */}
        <Box sx={{ 
          width: '100%', 
          height: '15%', 
          bgcolor: '#0066CC', 
          borderRadius: 1,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            position: 'absolute', 
            top: '30%', 
            left: '40%', 
            width: 4, 
            height: 4, 
            bgcolor: '#FF6B6B', 
            borderRadius: '50%',
            animation: 'fall 1.8s infinite'
          }} />
        </Box>
        
        {/* Purple belt */}
        <Box sx={{ 
          width: '100%', 
          height: '15%', 
          bgcolor: '#660099', 
          borderRadius: 1,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            position: 'absolute', 
            top: '25%', 
            left: '70%', 
            width: 3, 
            height: 3, 
            bgcolor: '#FF6B6B', 
            borderRadius: '50%',
            animation: 'fall 2.2s infinite'
          }} />
        </Box>
        
        {/* Brown belt */}
        <Box sx={{ 
          width: '100%', 
          height: '15%', 
          bgcolor: '#663300', 
          borderRadius: 1,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            position: 'absolute', 
            top: '35%', 
            left: '30%', 
            width: 4, 
            height: 4, 
            bgcolor: '#FF6B6B', 
            borderRadius: '50%',
            animation: 'fall 1.5s infinite'
          }} />
        </Box>
        
        {/* Black belt */}
        <Box sx={{ 
          width: '100%', 
          height: '15%', 
          bgcolor: '#000000', 
          borderRadius: 1,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            position: 'absolute', 
            top: '20%', 
            left: '50%', 
            width: 3, 
            height: 3, 
            bgcolor: '#FF6B6B', 
            borderRadius: '50%',
            animation: 'fall 1.9s infinite'
          }} />
        </Box>
      </Box>
      
      {/* Bottom accumulation area */}
      <Box sx={{ 
        width: '80%', 
        height: '25%', 
        bgcolor: 'rgba(255,255,255,0.1)', 
        borderRadius: 2,
        border: '1px solid rgba(255,255,255,0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Accumulated dots */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: '20%', 
          left: '20%', 
          width: 3, 
          height: 3, 
          bgcolor: '#FF6B6B', 
          borderRadius: '50%'
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: '30%', 
          left: '40%', 
          width: 4, 
          height: 4, 
          bgcolor: '#FF6B6B', 
          borderRadius: '50%'
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: '25%', 
          left: '60%', 
          width: 3, 
          height: 3, 
          bgcolor: '#FF6B6B', 
          borderRadius: '50%'
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: '35%', 
          left: '80%', 
          width: 4, 
          height: 4, 
          bgcolor: '#FF6B6B', 
          borderRadius: '50%'
        }} />
      </Box>
      
      {/* CSS Animation */}
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(-100%); opacity: 1; }
            100% { transform: translateY(200%); opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
};

export default BeltDropoutCardPreview;
