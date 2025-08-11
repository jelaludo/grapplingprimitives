import React, { Suspense, useState } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';
const Timer = React.lazy(() => import('./Timer'));

const CoachTools: React.FC = () => {
  const [view, setView] = useState<'hub'|'timer'>(() => {
    // Allow direct deep-linking to timer by honoring a query/hash or default fragment
    if (typeof window !== 'undefined') {
      if (window.location.hash.includes('timer')) return 'timer';
    }
    return 'hub';
  });

  if (view === 'timer') {
    return (
      <Box sx={{ p: 2 }}>
        <Button variant="text" onClick={() => setView('hub')} sx={{ mb: 1 }}>
          ← Back to Coach
        </Button>
        <Suspense fallback={<div style={{ padding: 24 }}>Loading timer…</div>}>
          <Timer />
        </Suspense>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Coach</Typography>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
        <Card>
          <CardActionArea onClick={() => setView('timer')}>
            <CardContent>
              <Typography variant="h6">Timer</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>BJJ round/rest timer</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea disabled>
            <CardContent>
              <Typography variant="h6">Planner</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>TBD</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea disabled>
            <CardContent>
              <Typography variant="h6">Review Queue</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>TBD</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default CoachTools;


