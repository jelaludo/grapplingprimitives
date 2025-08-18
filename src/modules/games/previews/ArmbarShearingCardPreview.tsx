import React from 'react';
import { Box, Typography } from '@mui/material';

const ArmbarShearingCardPreview: React.FC = () => {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'rgba(255, 140, 0, 0.1)',
      borderRadius: 3,
      p: 2,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.1) 0%, transparent 50%)',
        zIndex: 1
      }} />
      
      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace',
            letterSpacing: '0.06em',
            mb: 1,
            color: 'rgba(255, 140, 0, 0.8)'
          }}
        >
          Armbar Shearing Sim
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace',
            letterSpacing: '0.06em',
            opacity: 0.7,
            fontSize: '0.75rem'
          }}
        >
          Interactive mechanics
        </Typography>
        
        {/* Simple Armbar Icon */}
        <Box sx={{
          mt: 2,
          width: 60,
          height: 40,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Arm representation */}
          <Box sx={{
            width: 50,
            height: 8,
            bgcolor: 'rgba(255, 140, 0, 0.3)',
            borderRadius: 4,
            position: 'relative',
            transform: 'rotate(-15deg)'
          }}>
            {/* Joint/break point */}
            <Box sx={{
              position: 'absolute',
              right: -2,
              top: -1,
              width: 4,
              height: 10,
              bgcolor: 'rgba(255, 0, 0, 0.4)',
              borderRadius: 2,
              transform: 'rotate(15deg)'
            }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ArmbarShearingCardPreview;
