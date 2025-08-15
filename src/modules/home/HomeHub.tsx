import React from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import CentroidCardPreview from '../games/previews/CentroidCardPreview';
import MemoryCardPreview from '../games/previews/MemoryCardPreview';
import TimerCardPreview from '../coach/previews/TimerCardPreview';
import SkillCheckCardPreview from '../skillcheck/previews/SkillCheckCardPreview';
import TrainingCardPreview from '../training/TrainingCardPreview';

interface HomeHubProps {
  goMatrix: () => void;
  goCards: () => void;
  goGraphs: () => void;
  goGames: (initial?: 'none' | 'centroid' | 'memory') => void;
  goCoach: () => void;
  goSkillCheck: () => void;
  goArticles: () => void;
  goStudies: () => void;
  goLudus: () => void;
  goOthers?: () => void;
  goCalendar: () => void;
  goTraining: () => void;
}

const HomeHub: React.FC<HomeHubProps> = (props) => {
  const CardShell: React.FC<{ title?: string; subtitle?: string; onClick?: () => void; preview?: React.ReactNode; disabled?: boolean; hideTitle?: boolean }>
    = ({ title, subtitle, onClick, preview, disabled, hideTitle }) => (
    <Card sx={{ aspectRatio: '1 / 1', borderRadius: 3, overflow: 'hidden', display: 'flex' }}>
      {disabled ? (
        <Box sx={{ display: 'flex', flex: 1 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1,
            fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>
            {!hideTitle && title && <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>{title}</Typography>}
            {!hideTitle && subtitle && <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: 'inherit' }}>{subtitle}</Typography>}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {preview}
            </Box>
          </CardContent>
        </Box>
      ) : (
        <CardActionArea onClick={onClick} sx={{ display: 'flex', flex: 1 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1,
            fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>
            {!hideTitle && title && <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>{title}</Typography>}
            {!hideTitle && subtitle && <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: 'inherit' }}>{subtitle}</Typography>}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {preview}
            </Box>
          </CardContent>
        </CardActionArea>
      )}
    </Card>
  );

  const PreviewMatrix = () => {
    // 2x2 quadrant representation with random dots, computed once per mount
    const DOTS = React.useMemo(() => {
      const pts: Array<{ x: number; y: number; c: string }> = [];
      const colors = ['#29b6f6', '#ab47bc', '#ff7043', '#66bb6a'];
      for (let q = 0; q < 4; q++) {
        const cx = q % 2; // 0 or 1
        const cy = Math.floor(q / 2); // 0 or 1
        const baseX = cx * 50; // percent
        const baseY = cy * 50; // percent
        for (let i = 0; i < 6; i++) {
          pts.push({
            x: baseX + 10 + Math.random() * 30,
            y: baseY + 10 + Math.random() * 30,
            // Mix colors within each quadrant; cycle with offset for variety
            c: colors[(i + q) % colors.length]
          });
        }
      }
      return pts;
    }, []);
    return (
      <Box sx={{ width: '90%', aspectRatio: '1', position: 'relative', borderRadius: 1, overflow: 'hidden', bgcolor: '#0f0f0f', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
        {/* Quadrants */}
        <Box sx={{ position:'absolute', left:'50%', top:0, bottom:0, width:1, bgcolor:'rgba(255,255,255,0.1)' }} />
        <Box sx={{ position:'absolute', top:'50%', left:0, right:0, height:1, bgcolor:'rgba(255,255,255,0.1)' }} />
        {/* Dots */}
        {DOTS.map((p, i) => (
          <Box key={i} sx={{ position:'absolute', left: `${p.x}%`, top: `${p.y}%`, width: 6, height: 6, bgcolor: p.c, borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
        ))}
      </Box>
    );
  };

  const PreviewCards = () => (
    <Box sx={{ width: '85%', height: '70%', display:'flex', alignItems:'center', justifyContent:'center', color:'#888' }}>
      <Typography variant="h4" sx={{ opacity: 0.85 }}>W.I.P</Typography>
    </Box>
  );

  const PreviewGraphs = () => (
    <Box sx={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 1, width:'90%' }}>
      {/* Sparkline */}
      <svg viewBox="0 0 100 60" style={{ width:'100%' }}>
        <polyline points="0,50 15,42 30,47 45,35 60,25 75,28 90,18 100,22" fill="none" stroke="#64b5f6" strokeWidth="2" />
        {Array.from({length:8}).map((_,i)=> <circle key={i} cx={i*12.5} cy={[50,42,47,35,25,28,18,22][i]} r="2" fill="#90caf9" />)}
      </svg>
      {/* Mini radar */}
      <svg viewBox="0 0 100 100" style={{ width:'100%' }}>
        <g fill="none" stroke="rgba(255,255,255,0.15)">
          <polygon points="50,10 90,50 50,90 10,50" />
          <polygon points="50,20 80,50 50,80 20,50" />
          <polygon points="50,30 70,50 50,70 30,50" />
        </g>
        <polygon points="50,22 70,50 50,75 28,50" fill="rgba(102,187,106,0.35)" stroke="#66bb6a" />
      </svg>
    </Box>
  );

  // Separate cards for Centroid and Memory will use dedicated previews below

  return (
    <Box sx={{ p: { xs: 1, md: 2 }, m: 'auto', width: '100%', height: '100vh', maxWidth: 1200, display: 'flex', flexDirection: 'column',
      fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>
      <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', mb: 1 }}>
        <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>Welcome</Typography>
        <Box sx={{ display:'flex', gap:1, alignItems:'center' }}>
          {/* Small inline help button */}
          <Box onClick={() => window.dispatchEvent(new CustomEvent('gp:open-help'))} sx={{ cursor:'pointer', width: 28, height: 28, borderRadius: '50%', bgcolor:'rgba(255,255,255,0.12)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>?</Box>
        </Box>
      </Box>
      <Box sx={{ display: 'grid', gap: { xs: 1, sm: 1.5, md: 2 }, gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gridAutoRows: '1fr', flex: 1 }}>
        <CardShell title="GRAPPLING PRIMITIVES MATRIX" subtitle="Explore the concept map" onClick={props.goMatrix} preview={<PreviewMatrix />} />
        <CardShell title="BJJ Visualizations" onClick={props.goGraphs} preview={<PreviewGraphs />} />
        <CardShell title="Centroid" onClick={() => props.goGames('centroid')} preview={<CentroidCardPreview />} />
        <CardShell title="JJJ Memory" onClick={() => props.goGames('memory')} preview={<MemoryCardPreview />} />
        <CardShell title="Calendar" onClick={props.goCalendar} preview={<Box sx={{ width:'80%', height:'60%', display:'flex', alignItems:'center', justifyContent:'center', color:'#999' }}><Typography variant="h6" sx={{ fontFamily: 'inherit' }}>Calendar</Typography></Box>} />
        <CardShell hideTitle onClick={() => { props.goCoach(); setTimeout(() => { if (typeof window !== 'undefined') window.location.hash = 'timer'; }, 0); }} preview={<TimerCardPreview />} />
        <CardShell hideTitle onClick={props.goSkillCheck} preview={<SkillCheckCardPreview />} />
        <CardShell title="Training" onClick={props.goTraining} preview={<TrainingCardPreview />} />
        <CardShell title="Others" onClick={props.goOthers} preview={<PreviewCards />} />
      </Box>
    </Box>
  );
};

export default HomeHub;


