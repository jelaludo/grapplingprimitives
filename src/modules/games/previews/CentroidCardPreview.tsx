import React from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';

interface Props { onClick?: () => void }

const CentroidCardPreview: React.FC<Props> = ({ onClick }) => {
  const GRID = 11;
  const CELL = 14;
  const PX = GRID * CELL;
  const sampleDots: Array<{ x: number; y: number }> = [
    { x: 2, y: 2 }, { x: 3, y: 7 }, { x: 5, y: 4 }, { x: 7, y: 2 }, { x: 8, y: 8 }, { x: 2, y: 9 }
  ];
  const centroid = (pts: Array<{ x: number; y: number }>) => {
    const sx = pts.reduce((s, p) => s + p.x, 0);
    const sy = pts.reduce((s, p) => s + p.y, 0);
    return { x: sx / pts.length, y: sy / pts.length };
  };
  const nearest = (p: { x: number; y: number }) => ({ x: Math.round(p.x), y: Math.round(p.y) });
  const actual = centroid(sampleDots);
  const optimal = nearest(actual);
  const guess = { x: Math.min(GRID - 1, optimal.x + 1), y: optimal.y };

  const cells: React.ReactElement[] = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const isDot = sampleDots.some(d => d.x === x && d.y === y);
      const isGuess = guess.x === x && guess.y === y;
      const isOptimal = Math.round(actual.x) === x && Math.round(actual.y) === y;
      let bg = 'transparent';
      if (isGuess) bg = '#ef5350'; else if (isOptimal) bg = '#66bb6a'; else if (isDot) bg = '#42a5f5';
      cells.push(<Box key={`${x}-${y}`} sx={{ width: CELL, height: CELL, border: '1px solid rgba(255,255,255,0.08)', bgcolor: bg }} />);
    }
  }

  return (
    <Card sx={{ height: 1, borderRadius: 2, overflow: 'hidden' }}>
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1,
          fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>
          <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>Centroid</Typography>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative', width: PX, height: PX, display: 'grid', gridTemplateColumns: `repeat(${GRID}, ${CELL}px)`, gridTemplateRows: `repeat(${GRID}, ${CELL}px)`, bgcolor: '#111', borderRadius: 1, overflow: 'hidden' }}>
              {cells}
              <svg width={PX} height={PX} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {sampleDots.map((d, i) => (
                  <line key={i}
                    x1={d.x * CELL + CELL / 2} y1={d.y * CELL + CELL / 2}
                    x2={optimal.x * CELL + CELL / 2} y2={optimal.y * CELL + CELL / 2}
                    stroke="#66bb6a" strokeWidth={2} opacity={0.6}
                  />
                ))}
              </svg>
            </Box>
          </Box>
          <Box sx={{ width: '100%', color: 'text.secondary' }}>
            <Typography variant="caption" sx={{ display: 'block' }}>Blue = dots</Typography>
            <Typography variant="caption" sx={{ display: 'block' }} color="success.light">Green = true centroid</Typography>
            <Typography variant="caption" sx={{ display: 'block' }} color="error.light">Red = your guess</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CentroidCardPreview;








