import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, IconButton, Stack, Typography, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useFullscreen } from '../../..//hooks/useFullscreen';

// Constants
const TOTAL_IMAGES = 160;
const PAIRS = 8; // fixed – 16 cards, 4x4 grid
const CARD_RATIO = 597 / 440; // height / width

// Helpers
function padId(n: number): string { return n.toString().padStart(3, '0'); }
function imageUrl(id: string, ext: 'avif' | 'webp') { return `/images/memory/${ext}/${id}.${ext}`; }
const BACK_URL = '/images/memory/Memory_JJJ_Back_440x.webp';

function shuffle<T>(arr: T[]): T[] { const a=[...arr]; for (let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }

// Types
type Card = { imageId: string; pairId: number; uid: string };

interface MemoryGameProps { onClose?: () => void }

const MemoryGame: React.FC<MemoryGameProps> = ({ onClose }) => {
  // Layout sizing
  const [cardWidth, setCardWidth] = useState<number>(100);

  // Game state
  const [deck, setDeck] = useState<Card[]>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState<number>(0);
  const busyRef = useRef(false);
  // Timer state (seconds only)
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  // Reveal/shuffle phase
  const [phase, setPhase] = useState<'play'|'reveal'|'hold'|'shuffle'>('play');
  const [revealFront, setRevealFront] = useState<Set<string>>(new Set());
  const [showShuffle, setShowShuffle] = useState<boolean>(false);
  const timeoutsRef = useRef<number[]>([]);
  const [showIntro, setShowIntro] = useState<boolean>(true);
  // Fly overlay for shuffle animation
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [flyVisible, setFlyVisible] = useState<boolean>(false);
  const [flyCards, setFlyCards] = useState<Array<{ uid: string; left: number; top: number }>>([]);

  // Fullscreen game mode: hide header, disable scroll
  useEffect(() => {
    document.body.classList.add('game-fullscreen');
    return () => document.body.classList.remove('game-fullscreen');
  }, []);

  // Compute 4x4 cell size to avoid scrollbars
  const computeSize = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cols = 4; const rows = 4; const gap = 10; const sidePad = 16; const topReserve = 72; // header row
    let w = Math.floor((vw - sidePad*2 - gap*(cols-1)) / cols);
    let h = Math.floor(w * CARD_RATIO);
    while (rows * h + gap * (rows - 1) > (vh - topReserve) && w > 60) {
      w -= 1; h = Math.floor(w * CARD_RATIO);
    }
    setCardWidth(w);
  };

  useEffect(() => { computeSize(); window.addEventListener('resize', computeSize); return () => window.removeEventListener('resize', computeSize); }, []);

  // Build a new deck of 8 random pairs
  const clearAllTimeouts = () => { timeoutsRef.current.forEach(id => window.clearTimeout(id)); timeoutsRef.current = []; };

  const newGame = () => {
    clearAllTimeouts();
    const pairs = shuffle(Array.from({ length: TOTAL_IMAGES / 2 }, (_, i) => i + 1)).slice(0, PAIRS);
    const cards: Card[] = [];
    for (const p of pairs) {
      const a = padId(2 * p - 1), b = padId(2 * p);
      cards.push({ imageId: a, pairId: p, uid: `${a}-A` });
      cards.push({ imageId: b, pairId: p, uid: `${b}-B` });
    }
    // For reveal: two-by-two side-by-side order
    const revealDeck: Card[] = [];
    for (let i = 0; i < cards.length; i += 2) { revealDeck.push(cards[i], cards[i+1]); }
    const finalDeck = shuffle(revealDeck);
    setDeck(revealDeck);
    setFlippedUids([]);
    setMatchedPairs(new Set());
    setMoves(0);
    busyRef.current = false;
    // Reset timer
    setElapsedSec(0);
    setTimerRunning(false);
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }

    // Run reveal animation (0.75s per pair)
    busyRef.current = true;
    setPhase('reveal');
    setRevealFront(new Set());
    const PER_PAIR_MS = 750;
    for (let k = 0; k < PAIRS; k++) {
      const id = window.setTimeout(() => {
        setRevealFront(prev => {
          const next = new Set(prev);
          const c1 = revealDeck[k*2];
          const c2 = revealDeck[k*2+1];
          if (c1) next.add(c1.uid); if (c2) next.add(c2.uid);
          return next;
        });
      }, PER_PAIR_MS * k);
      timeoutsRef.current.push(id);
    }
    const holdId = window.setTimeout(() => setPhase('hold'), PER_PAIR_MS * PAIRS);
    timeoutsRef.current.push(holdId);
    const shuffleStartId = window.setTimeout(() => {
      setRevealFront(new Set());
      setPhase('shuffle');
      // Step A: measure current positions
      const initialPositions = revealDeck.map(c => {
        const el = cardRefs.current[c.uid];
        const r = el ? el.getBoundingClientRect() : { left: window.innerWidth/2, top: window.innerHeight/2 } as any;
        return { uid: c.uid, left: r.left, top: r.top };
      });
      setFlyCards(initialPositions);
      setFlyVisible(true);
      // Step B: move all to center
      const centerLeft = Math.round(window.innerWidth / 2 - cardWidth / 2);
      const centerTop = Math.round(window.innerHeight * 0.35 - Math.floor(cardWidth*CARD_RATIO) / 2);
      const toCenterId = window.setTimeout(() => {
        setFlyCards(prev => prev.map(fc => ({ ...fc, left: centerLeft, top: centerTop })));
      }, 20);
      timeoutsRef.current.push(toCenterId);
      // Step C: apply shuffled deck and measure target positions
      const applyShuffleId = window.setTimeout(() => {
        setDeck(finalDeck);
        // wait next frame for DOM
        const measureTargetsId = window.setTimeout(() => {
          const targets = finalDeck.map(c => {
            const el = cardRefs.current[c.uid];
            const r = el ? el.getBoundingClientRect() : { left: centerLeft, top: centerTop } as any;
            return { uid: c.uid, left: r.left, top: r.top };
          });
          // Step D: fly from center to targets
          setFlyCards(prev => prev.map((fc, i) => ({ ...fc, left: targets[i].left, top: targets[i].top })));
          // Step E: end overlay
          const endId = window.setTimeout(() => {
            setFlyVisible(false);
            setPhase('play');
            busyRef.current = false;
          }, 650);
          timeoutsRef.current.push(endId);
        }, 40);
        timeoutsRef.current.push(measureTargetsId);
      }, 600);
      timeoutsRef.current.push(applyShuffleId);
    }, PER_PAIR_MS * PAIRS + 750);
    timeoutsRef.current.push(shuffleStartId);
  };

  useEffect(() => { newGame(); }, []);

  const onCardClick = (c: Card) => {
    if (busyRef.current) return;
    if (matchedPairs.has(c.pairId)) return;
    if (flippedUids.includes(c.uid)) return;

    // Start timer on first interaction
    if (!timerRunning) {
      setTimerRunning(true);
      if (!timerRef.current) {
        timerRef.current = window.setInterval(() => setElapsedSec(s => s + 1), 1000);
      }
    }

    const next = [...flippedUids, c.uid];
    setFlippedUids(next);

    if (next.length === 2) {
      busyRef.current = true;
      setMoves(m => m + 1);
      const [u1, u2] = next;
      const c1 = deck.find(d => d.uid === u1)!;
      const c2 = deck.find(d => d.uid === u2)!;
      const isMatch = c1.pairId === c2.pairId;
      setTimeout(() => {
        if (isMatch) { const s = new Set(matchedPairs); s.add(c1.pairId); setMatchedPairs(s); }
        setFlippedUids([]);
        busyRef.current = false;
        // Stop timer when all pairs matched
        setTimeout(() => {
          if (matchedPairs.size + (isMatch ? 1 : 0) === PAIRS) {
            setTimerRunning(false);
            if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
          }
        }, 0);
      }, isMatch ? 350 : 650);
    }
  };

  const cardHeight = Math.floor(cardWidth * CARD_RATIO);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);

  return (
    <Box ref={containerRef} sx={{ width: '100%', height: '100vh', p: 1, display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1, minHeight: 40 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title={isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}>
            <IconButton onClick={toggleFullscreen} aria-label="fullscreen" sx={{ bgcolor: 'rgba(0,0,0,0.35)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }, width: 32, height: 32 }}>
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Tooltip>
          <IconButton onClick={() => { document.body.classList.remove('game-fullscreen'); onClose?.(); }} aria-label="close" sx={{ bgcolor: 'rgba(0,0,0,0.35)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }, width: 32, height: 32 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'DS-Digital, ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>Jiu-Jitsu Jungle Memory Game</Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="caption" sx={{ fontFamily: 'DS-Digital, ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>Time: {String(Math.floor(elapsedSec/60)).padStart(2,'0')}:{String(elapsedSec%60).padStart(2,'0')}</Typography>
          <Typography variant="caption" sx={{ fontFamily: 'DS-Digital, ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>Moves: {moves}</Typography>
          <Button size="small" variant="outlined" onClick={newGame} sx={{ fontFamily: 'DS-Digital, ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>New Game</Button>
        </Stack>
      </Stack>

      <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', justifyItems: 'center', alignContent: 'start', position:'relative' }}>
        {deck.map(card => {
          let isFlipped = flippedUids.includes(card.uid) || matchedPairs.has(card.pairId);
          if (phase !== 'play') isFlipped = revealFront.has(card.uid);
          return (
            <Box key={card.uid} ref={(el: HTMLDivElement | null) => { cardRefs.current[card.uid] = el; }} data-uid={card.uid} onClick={() => onCardClick(card)} sx={{ width: cardWidth, height: cardHeight, borderRadius: '12px', overflow: 'hidden', boxShadow: 3, position: 'relative', cursor: 'pointer', backgroundColor: '#111' }}>
              <Box sx={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)', transition: 'transform 280ms ease' }}>
                <picture>
                  <source srcSet={imageUrl(card.imageId, 'avif')} type="image/avif" />
                  <source srcSet={imageUrl(card.imageId, 'webp')} type="image/webp" />
                  <img src={imageUrl(card.imageId, 'webp')} alt={card.imageId} width={440} height={597} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </picture>
              </Box>
              <Box sx={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 280ms ease' }}>
                <img src={BACK_URL} alt="back" width={440} height={597} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            </Box>
          );
        })}
        {(phase === 'shuffle' && flyVisible) && (
          <Box sx={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.85)', zIndex:30, pointerEvents:'none' }} />
        )}
        {flyVisible && (
          <Box sx={{ position:'fixed', inset:0, zIndex:40, pointerEvents:'none' }}>
            {flyCards.map(fc => (
              <Box key={`fly-${fc.uid}`} sx={{ position:'absolute', left: fc.left, top: fc.top, width: cardWidth, height: cardHeight, borderRadius:'12px', overflow:'hidden', boxShadow:3, transition:'left 600ms ease, top 600ms ease' }}>
                <img src={BACK_URL} alt="back" width={440} height={597} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {showIntro && (
        <Box onClick={() => setShowIntro(false)} sx={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: { xs: '70vw', sm: 360 }, maxWidth: 420, aspectRatio: '440 / 597', borderRadius: '14px', overflow: 'hidden', boxShadow: 8 }}>
            <img src={BACK_URL} alt="back" width={440} height={597} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MemoryGame;


