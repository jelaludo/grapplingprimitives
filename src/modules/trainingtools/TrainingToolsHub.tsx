import React, { Suspense, useState } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';

const Timer = React.lazy(() => import('../coach/Timer'));
const BreathingApp = React.lazy(() => import('../Breathing/breathing-cycles'));

interface TrainingToolsHubProps {
  onBack?: () => void;
}

const TrainingToolsHub: React.FC<TrainingToolsHubProps> = ({ onBack }) => {
  const [view, setView] = useState<'hub' | 'timer' | 'breathing'>('hub');

  if (view === 'timer') {
    return (
      <Box sx={{ p: 2 }}>
        <Button variant="text" onClick={() => setView('hub')} sx={{ mb: 1 }}>
          ← Back to Training Tools
        </Button>
        <Suspense fallback={<div style={{ padding: 24 }}>Loading timer…</div>}>
          <Timer />
        </Suspense>
      </Box>
    );
  }

  if (view === 'breathing') {
    return (
      <Box sx={{ p: 2 }}>
        <Button variant="text" onClick={() => setView('hub')} sx={{ mb: 1 }}>
          ← Back to Training Tools
        </Button>
        <Suspense fallback={<div style={{ padding: 24 }}>Loading breathing…</div>}>
          <BreathingApp />
        </Suspense>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 1, md: 2 }, 
      m: 'auto', 
      width: '100%', 
      maxWidth: 980,
      fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', 
      letterSpacing: '0.06em' 
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 1, md: 2 } }}>
        <Typography variant="h5" sx={{ fontFamily: 'inherit' }}>Training Tools</Typography>
        {onBack && (
          <Button 
            variant="outlined" 
            size="small" 
            sx={{ fontFamily: 'inherit', letterSpacing: 'inherit' }} 
            onClick={onBack}
          >
            ← Back to Home
          </Button>
        )}
      </Box>
      
      <Box sx={{ 
        display: 'grid', 
        gap: { xs: 1, md: 2 }, 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } 
      }}>
        {/* Timer Tool Card */}
        <Card sx={{ 
          aspectRatio: { xs: '1 / 1.2', md: '2 / 3' }, 
          maxHeight: { xs: 380, md: 520 }, 
          borderRadius: 3, 
          overflow: 'hidden', 
          display: 'flex' 
        }}>
          <CardActionArea onClick={() => setView('timer')} sx={{ display: 'flex', flex: 1 }}>
            <CardContent sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: { xs: 0.5, md: 1 }, 
              flex: 1, 
              fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', 
              letterSpacing: '0.06em', 
              p: { xs: 1, md: 2 } 
            }}>
              <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>Timer</Typography>
              <Box sx={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%' 
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontFamily: 'inherit', 
                      fontSize: { xs: '3rem', md: '5rem' }, 
                      color: '#66bb6a',
                      lineHeight: 1
                    }}
                  >
                    05:00
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 2, 
                      opacity: 0.7,
                      fontFamily: 'inherit'
                    }}
                  >
                    Round Timer
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* Breathing Card */}
        <Card sx={{ 
          aspectRatio: { xs: '1 / 1.2', md: '2 / 3' }, 
          maxHeight: { xs: 380, md: 520 }, 
          borderRadius: 3, 
          overflow: 'hidden', 
          display: 'flex' 
        }}>
          <CardActionArea onClick={() => setView('breathing')} sx={{ display: 'flex', flex: 1 }}>
            <CardContent sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: { xs: 0.5, md: 1 }, 
              flex: 1, 
              fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', 
              letterSpacing: '0.06em', 
              p: { xs: 1, md: 2 } 
            }}>
              <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>Breathing & Exercises</Typography>
              <Box sx={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%' 
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontFamily: 'inherit', 
                      fontSize: { xs: '4rem', md: '6rem' }, 
                      color: '#42a5f5',
                      lineHeight: 1
                    }}
                  >
                    ○
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 2, 
                      opacity: 0.7,
                      fontFamily: 'inherit'
                    }}
                  >
                    Vagus • Box • Calf Raises
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default TrainingToolsHub;

