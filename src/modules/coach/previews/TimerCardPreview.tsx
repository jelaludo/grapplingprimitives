import React from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';

interface Props { onClick?: () => void }

const TimerCardPreview: React.FC<Props> = ({ onClick }) => {
  return (
    <Card sx={{ height: 1, borderRadius: 2, overflow: 'hidden' }}>
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1,
          fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>
          <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>Timer Tool</Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, fontFamily: 'inherit' }}>Rounds • Rest • Beeps</Typography>
          <Box sx={{ flex: 1, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Box sx={{ width: '90%', bgcolor: '#121212', borderRadius: 1.5, p: 1, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
              <Box sx={{ display:'flex', justifyContent:'space-between', color:'#bbb', mb: 1 }}>
                <Typography variant="caption">Round 1/5</Typography>
                <Typography variant="caption">Rest 00:30</Typography>
              </Box>
              <Box sx={{ textAlign:'center', color:'#e0e0e0', fontSize: 36, lineHeight: 1, fontFamily: 'inherit', letterSpacing: '0.06em' }}>05:00</Box>
              <Box sx={{ mt: 1, height: 6, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.08)' }}>
                <Box sx={{ width: '65%', height: '100%', bgcolor: 'primary.main', borderRadius: 1 }} />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TimerCardPreview;








