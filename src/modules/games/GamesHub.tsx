import React, { Suspense } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography, Button } from '@mui/material';

const Centroid = React.lazy(() => import('./centroid/CentroidView'));
const Memory = React.lazy(() => import('./memory/MemoryGame'));

interface GamesHubProps { onExit?: () => void }

const GamesHub: React.FC<GamesHubProps> = ({ onExit }) => {
  const [selected, setSelected] = React.useState<'none'|'centroid'|'memory'>('none');

  const renderCentroidPreview = () => {
    // Mini sample puzzle (responsive, fills width)
    const GRID = 11;
    const sampleDots = [ { x: 2, y: 2 }, { x: 3, y: 7 }, { x: 5, y: 4 }, { x: 7, y: 2 }, { x: 8, y: 8 }, { x: 2, y: 9 } ];
    const centroid = (pts: Array<{x:number;y:number}>) => {
      const sx = pts.reduce((s,p)=>s+p.x,0); const sy = pts.reduce((s,p)=>s+p.y,0);
      return { x: sx/pts.length, y: sy/pts.length };
    };
    const nearest = (p:{x:number;y:number}) => ({ x: Math.round(p.x), y: Math.round(p.y) });
    const actual = centroid(sampleDots);
    const optimal = nearest(actual);
    const guess = { x: Math.min(GRID-1, optimal.x+1), y: optimal.y };
    const cells: React.ReactElement[] = [];
    for (let y=0;y<GRID;y++) {
      for (let x=0;x<GRID;x++) {
        const isDot = sampleDots.some(d=>d.x===x && d.y===y);
        const isGuess = guess.x===x && guess.y===y;
        const isOptimal = Math.round(actual.x)===x && Math.round(actual.y)===y;
        let bg = 'transparent';
        if (isGuess) bg = '#ef5350'; else if (isOptimal) bg = '#66bb6a'; else if (isDot) bg = '#42a5f5';
        cells.push(<Box key={`${x}-${y}`} sx={{ border: '1px solid rgba(255,255,255,0.08)', bgcolor: bg }} />);
      }
    }
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', display: 'grid', gridTemplateColumns: `repeat(${GRID}, 1fr)`, gridTemplateRows: `repeat(${GRID}, 1fr)`, bgcolor: '#111', borderRadius: 1, overflow: 'hidden' }}>
          {cells}
          <svg viewBox={`0 0 ${GRID} ${GRID}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
            {sampleDots.map((d,i)=> (
              <line key={i} x1={d.x+0.5} y1={d.y+0.5} x2={optimal.x+0.5} y2={optimal.y+0.5} stroke="#66bb6a" strokeWidth={0.15} opacity={0.6} />
            ))}
          </svg>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" sx={{ display: 'block' }}>Blue = dots</Typography>
          <Typography variant="caption" sx={{ display: 'block' }} color="success.light">Green = true centroid</Typography>
          <Typography variant="caption" sx={{ display: 'block' }} color="error.light">Red = your guess</Typography>
        </Box>
      </Box>
    );
  };

  const renderMemoryPreview = () => {
    const COLS = 4, ROWS = 4, GAP = 6;
    const BACK_URL = '/images/memory/Memory_JJJ_Back_440x.webp';
    const frontSrc = (id: string, ext: 'avif'|'webp') => `/images/memory/${ext}/${id}.${ext}`;
    // choose two positions to be face-up and ensure they are a true pair: 001 and 002
    const faceMap: Record<number, string> = { 5: '001', 6: '002' };
    const grid: React.ReactElement[] = [];
    for (let i=0;i<COLS*ROWS;i++) {
      const faceId = faceMap[i];
      grid.push(
        <Box key={i} sx={{ borderRadius: '10px', overflow:'hidden', boxShadow:2, backgroundColor:'#111', aspectRatio: '440 / 597' }}>
          {faceId ? (
            <picture>
              <source srcSet={frontSrc(faceId, 'avif')} type="image/avif" />
              <source srcSet={frontSrc(faceId, 'webp')} type="image/webp" />
              <img src={frontSrc(faceId, 'webp')} alt={`front-${faceId}`} width={440} height={597} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </picture>
          ) : (
            <img src={BACK_URL} alt="back" width={440} height={597} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          )}
        </Box>
      );
    }
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display:'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: `${GAP}px`, justifyItems:'stretch', alignItems:'stretch', width: '100%' }}>
          {grid}
        </Box>
      </Box>
    );
  };

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
    <Box sx={{ p: 2, m: 'auto', width: '100%', maxWidth: 980,
      fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontFamily: 'inherit' }}>Games</Typography>
        <Button variant="outlined" size="small" sx={{ fontFamily: 'inherit', letterSpacing: 'inherit' }} onClick={onExit}>← Back to Matrix</Button>
      </Box>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
        <Card sx={{ aspectRatio: '2 / 3', maxHeight: { xs: 420, md: 520 }, borderRadius: 3, overflow: 'hidden', display: 'flex' }}>
          <CardActionArea onClick={() => setSelected('centroid')} sx={{ display: 'flex', flex: 1 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>
              <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>Centroid</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: 'inherit' }}>Intro + mock puzzle</Typography>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'stretch', justifyContent: 'center', width: '100%' }}>
                {renderCentroidPreview()}
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ aspectRatio: '2 / 3', maxHeight: { xs: 420, md: 520 }, borderRadius: 3, overflow: 'hidden', display: 'flex' }}>
          <CardActionArea onClick={() => setSelected('memory')} sx={{ display: 'flex', flex: 1 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>
              <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>JJJ Memory</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: 'inherit' }}>4×4 board preview (pair revealed)</Typography>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'stretch', justifyContent: 'center', width: '100%' }}>
                {renderMemoryPreview()}
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default GamesHub;


