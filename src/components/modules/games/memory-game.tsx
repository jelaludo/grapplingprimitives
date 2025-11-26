"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { useFullscreen } from '@/hooks/useFullscreen';

// Constants
const TOTAL_IMAGES = 160;
const PAIRS = 8; // fixed – 16 cards, 4x4 grid
const CARD_RATIO = 597 / 440; // height / width

// Helpers
function padId(n: number): string { return n.toString().padStart(3, '0'); }
function imageUrl(id: string, ext: 'avif' | 'webp') { return `/images/memory/${ext}/${id}.${ext}`; }
const BACK_URL = '/images/memory/Memory_JJJ_Back_440x.webp';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Types
type Card = { imageId: string; pairId: number; uid: string };

interface MemoryGameProps {
  onClose?: () => void;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ onClose }) => {
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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timeoutsRef.current.forEach(id => clearTimeout(id));
    };
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

  useEffect(() => {
    computeSize();
    window.addEventListener('resize', computeSize);
    return () => window.removeEventListener('resize', computeSize);
  }, []);

  // Build a new deck of 8 random pairs
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(id => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

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

  return (
    <div ref={containerRef} className="w-full min-h-[600px] p-1 flex flex-col bg-bg text-white rounded-lg">
      <div className="flex items-center justify-between mb-1 min-h-[40px]">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-black/35 hover:bg-black/50 rounded text-white"
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 bg-black/35 hover:bg-black/50 rounded text-white"
              aria-label="close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-xs text-text-muted font-mono tracking-wider">Jiu-Jitsu Jungle Memory Game</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono tracking-wider">
            Time: {String(Math.floor(elapsedSec/60)).padStart(2,'0')}:{String(elapsedSec%60).padStart(2,'0')}
          </span>
          <span className="text-xs font-mono tracking-wider">Moves: {moves}</span>
          <Button size="sm" variant="outline" onClick={newGame} className="font-mono tracking-wider">
            <RotateCcw className="w-4 h-4 mr-1" />
            New Game
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-4 gap-2.5 justify-items-center content-start relative">
        {deck.map(card => {
          let isFlipped = flippedUids.includes(card.uid) || matchedPairs.has(card.pairId);
          if (phase !== 'play') isFlipped = revealFront.has(card.uid);
          return (
            <div
              key={card.uid}
              ref={(el: HTMLDivElement | null) => { cardRefs.current[card.uid] = el; }}
              data-uid={card.uid}
              onClick={() => onCardClick(card)}
              className="rounded-xl overflow-hidden shadow-lg relative cursor-pointer bg-bg"
              style={{ width: cardWidth, height: cardHeight }}
            >
              <div
                className="absolute inset-0 transition-transform duration-280 ease-in-out"
                style={{ transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <picture>
                  <source srcSet={imageUrl(card.imageId, 'avif')} type="image/avif" />
                  <source srcSet={imageUrl(card.imageId, 'webp')} type="image/webp" />
                  <img
                    src={imageUrl(card.imageId, 'webp')}
                    alt={card.imageId}
                    width={440}
                    height={597}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
              <div
                className="absolute inset-0 transition-transform duration-280 ease-in-out"
                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', backfaceVisibility: 'hidden' }}
              >
                <img
                  src={BACK_URL}
                  alt="back"
                  width={440}
                  height={597}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          );
        })}
        {(phase === 'shuffle' && flyVisible) && (
          <div className="fixed inset-0 bg-black/85 z-30 pointer-events-none" />
        )}
        {flyVisible && (
          <div className="fixed inset-0 z-40 pointer-events-none">
            {flyCards.map(fc => (
              <div
                key={`fly-${fc.uid}`}
                className="absolute rounded-xl overflow-hidden shadow-lg transition-all duration-600 ease-in-out"
                style={{ left: fc.left, top: fc.top, width: cardWidth, height: cardHeight }}
              >
                <img
                  src={BACK_URL}
                  alt="back"
                  width={440}
                  height={597}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showIntro && (
        <div
          onClick={() => setShowIntro(false)}
          className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center"
        >
          <div className="w-[70vw] sm:w-[360px] max-w-[420px] aspect-[440/597] rounded-xl overflow-hidden shadow-2xl">
            <img
              src={BACK_URL}
              alt="back"
              width={440}
              height={597}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

