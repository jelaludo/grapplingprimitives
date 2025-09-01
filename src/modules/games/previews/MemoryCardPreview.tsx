import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface Props {}

const MemoryCardPreview: React.FC<Props> = () => {
  const COLS = 4, ROWS = 4, GAP = 6;
  const BACK_URL = '/images/memory/Memory_JJJ_Back_440x.webp';
  const frontSrc = (id: string, ext: 'avif'|'webp') => `/images/memory/${ext}/${id}.${ext}`;
  const faceMap: Record<number, string> = { 5: '001', 6: '002' };
  const grid: React.ReactElement[] = [];
  for (let i=0;i<COLS*ROWS;i++) {
    const faceId = faceMap[i];
    grid.push(
      <Box key={i} sx={{ aspectRatio:'440/597', borderRadius:1, overflow:'hidden', boxShadow:2, bgcolor:'#111' }}>
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
    <Card sx={{ height: 1, borderRadius: 2, overflow: 'hidden' }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1,
        fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>
          <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>JJJ Memory</Typography>
          <Box sx={{ flex: 1, display:'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: `${GAP}px`, alignItems:'stretch' }}>
            {grid}
          </Box>
        </CardContent>
    </Card>
  );
};

export default MemoryCardPreview;
