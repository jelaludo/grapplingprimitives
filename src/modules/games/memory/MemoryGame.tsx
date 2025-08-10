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
  const [pairsCount, setPairsCount] = useState<number>(8);
  const [deck, setDeck] = useState<Card[]>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]); // at most 2
  const [matchedPairIds, setMatchedPairIds] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState<number>(0);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const timeoutsRef = useRef<number[]>([]);
  const [matchOverlay, setMatchOverlay] = useState<{ a: string; b: string } | null>(null);
  // Timer state
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  // Intro sequence
  const [phase, setPhase] = useState<'idle'|'introReveal'|'introGather'|'introShuffle'|'introDeal'|'playing'>('idle');
  const [introPairs, setIntroPairs] = useState<Array<{ a: string; b: string }>>([]);
  const [introIndex, setIntroIndex] = useState<number>(0);
  const [revealedThumbs, setRevealedThumbs] = useState<string[]>([]); // used as ordered reveal ids
  const [dealCards, setDealCards] = useState<Array<{ id: string; left: number; top: number; width: number }>>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [targetRects, setTargetRects] = useState<Array<{ left: number; top: number; width: number; height: number }>>([]);
  const [imageIndexMap, setImageIndexMap] = useState<Record<string, number>>({});
  const revealSlots = useMemo(() => {
    const arr = [...targetRects];
    arr.sort((a, b) => (a.top - b.top) || (a.left - b.left));
    return arr;
  }, [targetRects]);

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };
  const clearScheduled = () => {
    timeoutsRef.current.forEach(id => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

  const beginIntroAfterRects = (cards: Card[], ip: Array<{ a: string; b: string }>, attempt = 0) => {
    // Wait until targetRects are fully measured (count match and non-zero sizes)
    const ready = targetRects.length >= cards.length && targetRects.every(r => r.width > 0 && r.height > 0 && Number.isFinite(r.left) && Number.isFinite(r.top));
    if (!ready && attempt < 60) {
      schedule(() => beginIntroAfterRects(cards, ip, attempt + 1), 16);
      return;
    }
    // Start reveal sequence only when we have positions
    setIntroIndex(0);
    setRevealedThumbs([]);
    setPhase('introReveal');
    const perPairMs = 900; // as requested
    const gapMs = 150;
    ip.forEach((p, i) => {
      schedule(() => {
        setIntroIndex(i);
        setRevealedThumbs(prev => [...prev, p.a, p.b]);
      }, (perPairMs + gapMs) * i);
    });
    const totalReveal = (perPairMs + gapMs) * ip.length;
    schedule(() => setPhase('introGather'), totalReveal);
    schedule(() => setPhase('introShuffle'), totalReveal + 500);
    schedule(() => {
      const rects = targetRects.length ? [...targetRects] : [];
      shuffleInPlace(rects);
      const first = rects[0];
      const originW = first ? first.width : 80;
      const originH = first ? first.height : 120;
      const centerLeft = Math.round(window.innerWidth / 2 - originW / 2);
      const centerTop = Math.round(window.innerHeight * 0.35 - originH / 2);
      setDealCards(cards.map(() => ({ id: 'x', left: centerLeft, top: centerTop, width: originW })));
      setPhase('introDeal');
      rects.forEach((pos, i) => {
        schedule(() => {
          setDealCards(prev => {
            const next = [...prev];
            if (next[i]) next[i] = { id: 'x', left: pos.left, top: pos.top, width: pos.width };
            return next;
          });
        }, 80 * i);
      });
      const n = rects.length || cards.length;
      schedule(() => setPhase('playing'), 80 * n + 800);
    }, totalReveal + 500 + 1000);
  };

  // Fullscreen-like presentation (hide header like Centroid)
  useEffect(() => {
    document.body.classList.add('game-fullscreen');
    return () => {
      document.body.classList.remove('game-fullscreen');
      clearScheduled();
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  const allIds = useMemo(() => buildAllIds(), []);

  const startNewGame = (overridePairs?: number) => {
    clearScheduled();
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
    // Build intro pairs list
    const ip: Array<{ a: string; b: string }> = chosenPairs.map(pairId => {
      const aNum = 2 * pairId - 1; const bNum = 2 * pairId;
      return { a: padId(aNum), b: padId(bNum) };
    });
    setIntroPairs(ip);
    setRevealedThumbs([]);
    // Start intro only once rects are measured
    // Map imageId -> index in deck for positioning
    const map: Record<string, number> = {};
    cards.forEach((c, idx) => { map[c.imageId] = idx; });
    setImageIndexMap(map);
    // Compute target rects after layout paints hidden grid
    requestAnimationFrame(() => {
      const container = gridRef.current;
      if (!container) return;
      const children = Array.from(container.querySelectorAll('[data-card-idx]')) as HTMLElement[];
      const rects = children.map((el) => {
        const r = el.getBoundingClientRect();
        return { left: r.left, top: r.top, width: r.width, height: r.height };
      });
      setTargetRects(rects);
      // Force a second measurement pass on next frame to stabilize values
      requestAnimationFrame(() => {
        const children2 = Array.from(container.querySelectorAll('[data-card-idx]')) as HTMLElement[];
        const rects2 = children2.map((el) => {
          const r = el.getBoundingClientRect();
          return { left: r.left, top: r.top, width: r.width, height: r.height };
        });
        setTargetRects(rects2);
      });
    });
    beginIntroAfterRects(cards, ip);
  };

  useEffect(() => {
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = (card: Card) => {
    if (isBusy || phase !== 'playing') return;
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
        schedule(() => {
          // Phase 2: bring to foreground and pause 1s
          setMatchOverlay({ a: c1.imageId, b: c2.imageId });
          schedule(() => {
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
        schedule(() => {
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
      <Box ref={gridRef} sx={{ flex: 1, display: 'grid', visibility: phase === 'playing' ? 'visible' : 'hidden', gap: { xs: 0.5, sm: 1.2 }, gridTemplateColumns: {
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
              data-card-idx
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

      {/* Intro reveal overlay: show revealed cards at their grid slots */}
      {phase === 'introReveal' && introPairs[introIndex] && (
        <Box sx={{ position: 'fixed', inset: 0, zIndex: 1800, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          {/* Face-up cards on grid slots in reveal order */}
          <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {revealedThumbs.map((id, i) => {
              const slot = revealSlots[i];
              if (!slot) return null;
              return (
                <Box key={`${id}-${i}`} sx={{ position: 'absolute', left: slot.left, top: slot.top, width: slot.width, height: slot.height, borderRadius: 1, overflow: 'hidden', boxShadow: 3 }}>
                  {renderImage(id)}
                </Box>
              );
            })}
          </Box>
          <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, p: 1, zIndex: 2001,
            '@keyframes pairReveal': {
              '0%': { transform: 'rotateY(90deg) scale(0.9)', opacity: 0 },
              '60%': { transform: 'rotateY(0deg) scale(1.02)', opacity: 1 },
              '100%': { transform: 'rotateY(0deg) scale(1)', opacity: 1 }
            }
          }}>
            <Box sx={{ width: { xs: '40vw', sm: 260 }, maxWidth: 340, aspectRatio: '440 / 597', borderRadius: '14px', overflow: 'hidden', boxShadow: 8, animation: 'pairReveal 600ms ease-out' }}>
              {renderImage(introPairs[introIndex].a)}
            </Box>
            <Box sx={{ width: { xs: '40vw', sm: 260 }, maxWidth: 340, aspectRatio: '440 / 597', borderRadius: '14px', overflow: 'hidden', boxShadow: 8, animation: 'pairReveal 600ms ease-out' }}>
              {renderImage(introPairs[introIndex].b)}
            </Box>
          </Box>
        </Box>
      )}

      {/* Intro gather: flip revealed grid cards to backs and collapse to center */}
      {phase === 'introGather' && (
        <Box sx={{ position: 'fixed', inset: 0, zIndex: 1750, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.55)' }}>
          <Box sx={{ position: 'absolute', inset: 0 }}>
            {revealedThumbs.map((_, i) => {
              const slot = revealSlots[i];
              if (!slot) return null;
              return (
                <Box key={i} sx={{ position: 'absolute', left: slot.left, top: slot.top, width: slot.width, height: slot.height, borderRadius: 1, overflow: 'hidden',
                  '@keyframes collapse': {
                    '0%': { transform: 'translate(0,0) scale(1)', opacity: 1 },
                    '100%': { transform: `translate(${window.innerWidth/2 - (slot.left + slot.width/2)}px, ${window.innerHeight/2 - (slot.top + slot.height/2)}px) scale(0.4)`, opacity: 0.9 }
                  }, animation: 'collapse 500ms ease forwards' }}>
                  {renderBack()}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* Intro shuffle overlay */}
      {phase === 'introShuffle' && (
        <Box sx={{ position: 'fixed', inset: 0, zIndex: 1700, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.55)' }}>
          <Box sx={{ position: 'relative', width: 280, height: 200 }}>
            {[0,1,2,3,4,5,6].map(i => (
              <Box key={i} sx={{ position: 'absolute', top: 40, left: 80, width: 120, aspectRatio: '440 / 597', borderRadius: '12px', overflow: 'hidden', boxShadow: 6,
                '@keyframes riffle2': {
                  '0%': { transform: 'translate(-30px,0) rotate(-10deg)' },
                  '33%': { transform: 'translate(0px,-8px) rotate(0deg)' },
                  '66%': { transform: 'translate(30px,0) rotate(10deg)' },
                  '100%': { transform: 'translate(-30px,0) rotate(-10deg)' }
                },
                animation: `riffle2 700ms cubic-bezier(0.2,0.8,0.2,1) ${i*80}ms 2`
              }}>
                {renderBack()}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Intro deal overlay */}
      {phase === 'introDeal' && dealCards.length > 0 && (
        <Box sx={{ position: 'fixed', inset: 0, zIndex: 1650, pointerEvents: 'none' }}>
          {dealCards.map((c, i) => (
            <Box key={i} sx={{ position: 'absolute', left: c.left, top: c.top, width: c.width, aspectRatio: '440 / 597', borderRadius: 1, overflow: 'hidden', transition: 'left 600ms ease, top 600ms ease, transform 600ms ease, width 600ms ease', transform: 'translate3d(0,0,0)', boxShadow: 3 }}>
              {renderBack()}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MemoryGame;


