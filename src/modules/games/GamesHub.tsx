import React, { Suspense } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';

const Centroid = React.lazy(() => import('./centroid/CentroidView'));

const GamesHub: React.FC = () => {
  const [selected, setSelected] = React.useState<'none'|'centroid'>('none');
  if (selected === 'centroid') {
    return (
      <Suspense fallback={<div style={{ padding: 24 }}>Loading game…</div>}>
        <Centroid />
      </Suspense>
    );
  }
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Games</Typography>
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
          <CardActionArea disabled>
            <CardContent>
              <Typography variant="h6">JJJ Memory Game</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Coming soon!</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default GamesHub;


