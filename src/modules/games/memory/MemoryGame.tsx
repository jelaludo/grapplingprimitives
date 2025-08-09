import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

type Card = {
  imageId: string; // zero-padded 001..160
  pairId: number;  // 1..80 (001-002 share pairId 1, etc.)
  uid: string;     // unique key per card instance
};

const TOTAL_IMAGES = 160; // public/images/memory/{avif,webp}/001..160
const TOTAL_PAIRS = TOTAL_IMAGES / 2; // 80

function padId(n: number): string {
  return n.toString().padStart(3, '0');
}

function imageUrl(id: string, ext: 'avif' | 'webp'): string {
  return `/images/memory/${ext}/${id}.${ext}`;
}

const BACK_BASE = '/images/memory/Memory_JJJ_Back_440x';
function backUrl(ext: 'avif' | 'webp'): string {
  return `${BACK_BASE}.${ext}`;
}

function buildAllIds(): string[] {
  return Array.from({ length: TOTAL_IMAGES }, (_, i) => padId(i + 1));
}

function getPairIdFromImageId(paddedId: string): number {
  const n = parseInt(paddedId, 10);
  return Math.ceil(n / 2);
}

function shuffleInPlace<T>(arr: T[], rng: () => number = Math.random): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function formatMs(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  return `${mm}:${ss}`;
}

interface MemoryGameProps {
  onClose?: () => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Configurable pairs count (8/12/16)
  const [pairsCount, setPairsCount] = useState<number>(12);
  const [deck, setDeck] = useState<Card[]>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]); // at most 2
  const [matchedPairIds, setMatchedPairIds] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState<number>(0);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);
  const [matchOverlay, setMatchOverlay] = useState<{ a: string; b: string } | null>(null);
  // Timer state
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Fullscreen-like presentation (hide header like Centroid)
  useEffect(() => {
    document.body.classList.add('game-fullscreen');
    return () => {
      document.body.classList.remove('game-fullscreen');
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  const allIds = useMemo(() => buildAllIds(), []);

  const startNewGame = (overridePairs?: number) => {
    // Choose N pairs randomly from 1..80
    const availablePairIds = Array.from({ length: TOTAL_PAIRS }, (_, i) => i + 1);
    shuffleInPlace(availablePairIds);
    const requested = overridePairs ?? pairsCount;
    const mobileCapped = isMobile ? Math.min(requested, 10) : requested; // cap to 10 pairs (20 cards) on mobile to avoid scroll
    const count = Math.max(2, Math.min(mobileCapped, TOTAL_PAIRS));
    const chosenPairs = availablePairIds.slice(0, count);

    // For each pairId k, the two image ids are 2k-1 and 2k
    const cards: Card[] = [];
    for (const pairId of chosenPairs) {
      const aNum = 2 * pairId - 1;
      const bNum = 2 * pairId;
      const a = padId(aNum);
      const b = padId(bNum);
      cards.push({ imageId: a, pairId, uid: `${a}-A` });
      cards.push({ imageId: b, pairId, uid: `${b}-B` });
    }
    shuffleInPlace(cards);
    setDeck(cards);
    setFlippedUids([]);
    setMatchedPairIds(new Set());
    setMoves(0);
    setIsBusy(false);
    // Reset timer; start on first flip
    setElapsedMs(0);
    setTimerRunning(false);
  };

  useEffect(() => {
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = (card: Card) => {
    if (isBusy) return;
    if (matchedPairIds.has(card.pairId)) return; // already solved
    if (flippedUids.includes(card.uid)) return;  // already face up
    // Start timer on first interaction
    setTimerRunning(true);

    const nextFlipped = [...flippedUids, card.uid];
    setFlippedUids(nextFlipped);

    if (nextFlipped.length === 2) {
      setIsBusy(true);
      setMoves(m => m + 1);

      // Compare the two flipped
      const [u1, u2] = nextFlipped;
      const c1 = deck.find(c => c.uid === u1);
      const c2 = deck.find(c => c.uid === u2);
      const isMatch = !!c1 && !!c2 && c1.pairId === c2.pairId;

      if (isMatch && c1 && c2) {
        // Phase 1: pause 1s with the matched pair still in-place, face-up
        timeoutRef.current = window.setTimeout(() => {
          // Phase 2: bring to foreground and pause 1s
          setMatchOverlay({ a: c1.imageId, b: c2.imageId });
          timeoutRef.current = window.setTimeout(() => {
            const newSet = new Set(matchedPairIds);
            newSet.add(c1.pairId);
            setMatchedPairIds(newSet);
            setFlippedUids([]);
            setMatchOverlay(null);
            setIsBusy(false);
          }, 1000);
        }, 1000);
      } else {
        // Not a match: brief delay then flip back
        timeoutRef.current = window.setTimeout(() => {
          setFlippedUids([]);
          setIsBusy(false);
        }, 800);
      }
    }
  };

  const allSolved = matchedPairIds.size > 0 && matchedPairIds.size === deck.length / 2;

  // Timer effect
  useEffect(() => {
    if (timerRunning && !allSolved) {
      if (!timerRef.current) {
        const startedAt = performance.now() - elapsedMs;
        timerRef.current = window.setInterval(() => {
          setElapsedMs(performance.now() - startedAt);
        }, 50);
      }
    } else {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    if (allSolved) {
      // Stop timer when solved
      setTimerRunning(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerRunning, allSolved]);

  const handlePairsChange = (e: SelectChangeEvent<number>) => {
    const value = Number((e.target as any).value);
    setPairsCount(value);
    // Rebuild deck immediately with the new value
    startNewGame(value);
  };

  const renderImage = (id: string) => (
    <picture>
      <source srcSet={imageUrl(id, 'avif')} type="image/avif" />
      <source srcSet={imageUrl(id, 'webp')} type="image/webp" />
      <img
        src={imageUrl(id, 'webp')}
        alt={`Card ${id}`}
        width={440}
        height={597}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </picture>
  );

  // Back image: only WEBP is guaranteed; don't include AVIF source to avoid browsers
  // picking a missing AVIF and not falling back.
  const renderBack = () => (
    <img
      src={backUrl('webp')}
      alt={'Card Back'}
      width={440}
      height={597}
      loading="lazy"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', p: { xs: 1, sm: 2 } }}>
      <IconButton
        onClick={() => {
          document.body.classList.remove('game-fullscreen');
          onClose?.();
        }}
        aria-label="close"
        sx={{ position: 'fixed', top: 8, left: 8, zIndex: 2100, bgcolor: 'rgba(0,0,0,0.35)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}
      >
        <CloseIcon />
      </IconButton>
      {/* Top bar */}
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mb: 1, flexWrap: 'wrap', rowGap: 0.5 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Jiu-Jitsu Jungle Memory Game</Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap', rowGap: 0.5 }}>
          <Typography variant="caption" sx={{ fontVariantNumeric: 'tabular-nums' }}>{formatMs(elapsedMs)}</Typography>
          <Typography variant="caption">• Moves: {moves}</Typography>
          <Typography variant="caption">• Solved: {matchedPairIds.size}/{deck.length / 2}</Typography>
          <FormControl size="small" sx={{ minWidth: 110 }}>
            <InputLabel id="pairs-label">Pairs</InputLabel>
            <Select<number>
              labelId="pairs-label"
              label="Pairs"
              value={Math.min(pairsCount, isMobile ? 10 : pairsCount)}
              onChange={handlePairsChange}
            >
              <MenuItem value={8}>8 (16)</MenuItem>
              {(!isMobile) && <MenuItem value={12}>12 (24)</MenuItem>}
              {(!isMobile) && <MenuItem value={16}>16 (32)</MenuItem>}
              {isMobile && <MenuItem value={10}>10 (20)</MenuItem>}
            </Select>
          </FormControl>
          <Button variant="outlined" size="small" onClick={() => startNewGame()}>New Game</Button>
        </Stack>
      </Stack>

      {/* Score */}
      {allSolved && <Typography variant="caption" color="success.main" sx={{ mb: 1 }}>Completed!</Typography>}

      {/* Grid */}
      <Box sx={{ flex: 1, display: 'grid', gap: { xs: 0.5, sm: 1.2 }, gridTemplateColumns: {
        xs: 'repeat(4, 1fr)',
        sm: 'repeat(auto-fill, minmax(110px, 1fr))',
        md: 'repeat(auto-fill, minmax(120px, 1fr))',
        lg: 'repeat(auto-fill, minmax(130px, 1fr))'
      }, alignContent: 'start',
        height: { xs: 'calc(100vh - 120px)', sm: 'auto' }, overflow: 'hidden' }}>
        {deck.map(card => {
          const isFlipped = flippedUids.includes(card.uid) || matchedPairIds.has(card.pairId);
          return (
            <Box
              key={card.uid}
              onClick={() => handleCardClick(card)}
              sx={{
                position: 'relative',
                cursor: isBusy ? 'default' : 'pointer',
                userSelect: 'none',
                aspectRatio: '440 / 597',
                borderRadius: { xs: '8px', sm: '12px' },
                overflow: 'hidden',
                boxShadow: isFlipped ? 4 : 1,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.3s ease',
                willChange: 'transform',
                '&:active': { transform: isBusy ? 'none' : 'scale(0.98)' }
              }}
            >
              {/* Front (image) */}
              <Box sx={{
                position: 'absolute', inset: 0,
                backfaceVisibility: 'hidden',
                transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                transformOrigin: 'center'
              }}>
                {renderImage(card.imageId)}
              </Box>
              {/* Back */}
              <Box sx={{
                position: 'absolute', inset: 0,
                backfaceVisibility: 'hidden',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                transformOrigin: 'center'
              }}>
                {renderBack()}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Match overlay */}
      {matchOverlay && (
        <Box sx={{
          position: 'fixed', inset: 0, zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.35)'
        }}>
          <Box sx={{
            display: 'flex', gap: { xs: 1, sm: 2 }, p: 1,
            '@keyframes zoomIn': {
              '0%': { transform: 'scale(0.7)', opacity: 0 },
              '60%': { transform: 'scale(1.08)', opacity: 1 },
              '100%': { transform: 'scale(1)', opacity: 1 }
            }
          }}>
            <Box sx={{ width: { xs: '40vw', sm: 240 }, maxWidth: 340, aspectRatio: '440 / 597', borderRadius: '14px', overflow: 'hidden', boxShadow: 8, animation: 'zoomIn 600ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
              {renderImage(matchOverlay.a)}
            </Box>
            <Box sx={{ width: { xs: '40vw', sm: 240 }, maxWidth: 340, aspectRatio: '440 / 597', borderRadius: '14px', overflow: 'hidden', boxShadow: 8, animation: 'zoomIn 600ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
              {renderImage(matchOverlay.b)}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MemoryGame;


