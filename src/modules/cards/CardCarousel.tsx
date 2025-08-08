import React, { useMemo, useRef, useState } from 'react';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { BJJConcept } from '../../types/concepts';
import CardFlip from './CardFlip';
import CardDetailDialog from './CardDetailDialog';

interface CardCarouselProps {
  concepts: BJJConcept[];
}

export const CardCarousel: React.FC<CardCarouselProps> = ({ concepts }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [index, setIndex] = useState(0);
  const startXRef = useRef<number | null>(null);
  const [openConcept, setOpenConcept] = useState<BJJConcept | null>(null);

  const cardWidth = isSmall ? 320 : 280;
  const gap = 16;

  const clampedIndex = (i: number) => Math.max(0, Math.min(concepts.length - 1, i));
  const visibleSlice = useMemo(() => {
    const start = Math.max(0, index - 3);
    const end = Math.min(concepts.length, index + 4);
    return concepts.slice(start, end).map((c, iLocal) => ({ c, globalIndex: start + iLocal }));
  }, [concepts, index]);

  const translate = useMemo(() => {
    const centerOffset = (window.innerWidth - cardWidth) / 2; // approximate centering
    return -(index * (cardWidth + gap)) + Math.max(0, centerOffset);
  }, [index, cardWidth, gap]);

  return (
    <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden', py: 3 }}
      onTouchStart={(e) => { startXRef.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (startXRef.current == null) return;
        const dx = e.changedTouches[0].clientX - startXRef.current;
        if (Math.abs(dx) > 40) setIndex((i) => clampedIndex(i + (dx < 0 ? 1 : -1)));
        startXRef.current = null;
      }}
    >
      <Box sx={{ position: 'absolute', top: 8, left: 16, color: 'text.secondary' }}>
        <Typography variant="caption">{index + 1} / {concepts.length}</Typography>
      </Box>

      <IconButton aria-label="prev" onClick={() => setIndex(i => clampedIndex(i - 1))}
        sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
        <ChevronLeftIcon />
      </IconButton>
      <IconButton aria-label="next" onClick={() => setIndex(i => clampedIndex(i + 1))}
        sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
        <ChevronRightIcon />
      </IconButton>

      <Box sx={{ height: isSmall ? 260 : 240 }}>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            gap: `${gap}px`,
            transform: `translateX(${translate}px)`,
            transition: 'transform 400ms ease',
            willChange: 'transform',
          }}
        >
          {visibleSlice.map(({ c, globalIndex }) => {
            const d = Math.abs(globalIndex - index);
            const scale = Math.max(0.8, 1 - d * 0.08);
            const opacity = Math.max(0.4, 1 - d * 0.2);
            return (
              <Box key={c.id} sx={{ width: cardWidth, flex: '0 0 auto', transform: `scale(${scale})`, opacity }}>
                <CardFlip concept={c} onStage={() => {}} onOpen={setOpenConcept} />
              </Box>
            );
          })}
        </Box>
      </Box>
      <CardDetailDialog open={Boolean(openConcept)} concept={openConcept} onClose={() => setOpenConcept(null)} />
    </Box>
  );
};

export default CardCarousel;


