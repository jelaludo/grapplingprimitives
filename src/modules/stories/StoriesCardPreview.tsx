import React from 'react';
import { Box, Typography } from '@mui/material';

const StoriesCardPreview: React.FC = () => {
  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 1,
      fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', 
      letterSpacing: '0.06em' 
    }}>
      <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>Stories</Typography>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1 }}>
        <Box sx={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          borderRadius: 1,
          overflow: 'hidden',
          bgcolor: '#111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Sample manga page preview */}
          <img
            src="/images/stories/ExplainEverything/001Hobbit.avif"
            alt="Story preview"
            style={{
              width: '90%',
              height: '90%',
              objectFit: 'cover',
              borderRadius: 4,
              opacity: 0.9
            }}
          />
          {/* Overlay with reading indicator */}
          <Box sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            bgcolor: 'rgba(0,0,0,0.7)',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem'
          }}>
            2 stories
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StoriesCardPreview;
