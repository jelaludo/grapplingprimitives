import React, { Suspense } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography, Button } from '@mui/material';

const Centroid = React.lazy(() => import('./centroid/CentroidView'));
const Memory = React.lazy(() => import('./memory/MemoryGame'));

interface GamesHubProps { onExit?: () => void }

const GamesHub: React.FC<GamesHubProps> = ({ onExit }) => {
  const [selected, setSelected] = React.useState<'none'|'centroid'|'memory'>('none');

  if (selected === 'centroid') {
    return (
      <Suspense fallback={<div style={{ padding: 24 }}>Loading game…</div>}>
        <Centroid onClose={() => setSelected('none')} />
      </Suspense>
    );
  }
  if (selected === 'memory') {
    return (
      <Suspense fallback={<div style={{ padding: 24 }}>Loading game…</div>}>
        <Memory onClose={() => setSelected('none')} />
      </Suspense>
    );
  }

  return (
    <Box sx={{ p: 2, m: 'auto', width: '100%', maxWidth: 900 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Games</Typography>
        <Button variant="outlined" size="small" onClick={onExit}>← Back to Matrix</Button>
      </Box>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}>
        <Card>
          <CardActionArea onClick={() => setSelected('centroid')}>
            <CardContent>
              <Typography variant="h6">Centroid</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Estimate the centroid quickly (GRID FAST)</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea onClick={() => setSelected('memory')}>
            <CardContent>
              <Typography variant="h6">JJJ Memory Game</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Find matching pairs (AVIF/WEBP)</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default GamesHub;


