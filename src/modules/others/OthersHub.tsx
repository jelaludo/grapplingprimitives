import React from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';

interface OthersHubProps {
  onBack: () => void;
  gotoArticles: () => void;
  gotoCoach: () => void;
  gotoStudies?: () => void;
  gotoCalendar?: () => void;
}

const OthersHub: React.FC<OthersHubProps> = ({ onBack, gotoArticles, gotoCoach, gotoStudies, gotoCalendar }) => {
  return (
    <Box sx={{ p: 2, m: 'auto', width: '100%', maxWidth: 980 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Others (WIP)</Typography>
        <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer' }} onClick={onBack}>← Back to Home</Typography>
      </Box>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
        <Card>
          <CardActionArea disabled>
            <CardContent>
              <Typography variant="h6">Self‑Study Space (WIP)</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Decks, stages, confidence sliders</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea onClick={gotoArticles}>
            <CardContent>
              <Typography variant="h6">Articles</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Reading and notes</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea onClick={gotoStudies} disabled={!gotoStudies}>
            <CardContent>
              <Typography variant="h6">Studies</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Research notes, experiments</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea onClick={gotoCoach}>
            <CardContent>
              <Typography variant="h6">Other Coach Tools (WIP)</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Planner, Review Queue</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea onClick={gotoCalendar} disabled={!gotoCalendar}>
            <CardContent>
              <Typography variant="h6">Calendar</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Training sessions and progress</Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* Experimental visualizations removed */}
      </Box>
    </Box>
  );
};

export default OthersHub;


