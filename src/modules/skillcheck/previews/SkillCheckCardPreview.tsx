import React from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';

interface Props { onClick?: () => void }

const SkillCheckCardPreview: React.FC<Props> = ({ onClick }) => {
  const spokes = ['Standup', 'Guard', 'Passing', 'Submissions', 'Escapes'];
  const vals = [0.7, 0.5, 0.8, 0.6, 0.4];
  const toPoint = (r: number, i: number, cx = 50, cy = 50, rad = 40) => {
    const angle = -Math.PI / 2 + (i / spokes.length) * Math.PI * 2;
    return `${cx + Math.cos(angle) * rad * r},${cy + Math.sin(angle) * rad * r}`;
  };
  const polygon = vals.map((v,i)=> toPoint(v, i)).join(' ');

  return (
    <Card sx={{ height: 1, borderRadius: 2, overflow: 'hidden' }}>
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1,
          fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>
          <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>Skill Check</Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, fontFamily: 'inherit' }}>Self‑assessment</Typography>
          <Box sx={{ flex: 1, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 1 }}>
            <Box sx={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 0.5, alignContent:'start' }}>
              {spokes.map((s,i)=> (
                <Box key={i} sx={{ px: 1, py: 0.5, bgcolor:'#111', borderRadius: 1, textAlign:'center' }}>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>{s}</Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ position:'relative' }}>
              <svg viewBox="0 0 100 100" style={{ width:'100%', height:'100%' }}>
                <g fill="none" stroke="rgba(255,255,255,0.12)">
                  <circle cx="50" cy="50" r="40" />
                  <circle cx="50" cy="50" r="30" />
                  <circle cx="50" cy="50" r="20" />
                  {spokes.map((_,i)=> {
                    const a = -Math.PI/2 + (i/spokes.length)*Math.PI*2;
                    const x = 50 + Math.cos(a)*40; const y = 50 + Math.sin(a)*40;
                    return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="rgba(255,255,255,0.12)" />
                  })}
                </g>
                <polygon points={polygon} fill="rgba(100,181,246,0.35)" stroke="#64b5f6" />
              </svg>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SkillCheckCardPreview;



