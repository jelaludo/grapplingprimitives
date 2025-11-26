"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Target, Check, ArrowForward, Clock } from 'lucide-react';

type Point = { x: number; y: number };

const GRID_SIZE = 17; // cells per axis
const CELL_SIZE = 20; // px per cell → 340px board
const BOARD_PX = GRID_SIZE * CELL_SIZE; // 340
const MAX_ROUNDS = 10;
const TIMER_PENALTY_THRESHOLD = 3; // seconds

function chebyshev(a: Point, b: Point): number {
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

function nearestInt(p: Point): Point {
  return { x: Math.round(p.x), y: Math.round(p.y) };
}

function centroid(dots: Point[]): Point {
  if (dots.length === 0) return { x: 0, y: 0 };
  const sx = dots.reduce((s, d) => s + d.x, 0);
  const sy = dots.reduce((s, d) => s + d.y, 0);
  return { x: sx / dots.length, y: sy / dots.length };
}

function useInterval(callback: () => void, delayMs: number | null) {
  const savedRef = useRef(callback);
  useEffect(() => { savedRef.current = callback; }, [callback]);
  useEffect(() => {
    if (delayMs == null) return;
    const id = setInterval(() => savedRef.current(), delayMs);
    return () => clearInterval(id);
  }, [delayMs]);
}

interface CentroidGameProps {
  onClose?: () => void;
}

export const CentroidGame: React.FC<CentroidGameProps> = ({ onClose }) => {
  const [round, setRound] = useState(0); // 0..MAX_ROUNDS
  const [dots, setDots] = useState<Point[]>([]);
  const [actual, setActual] = useState<Point | null>(null);
  const [guess, setGuess] = useState<Point | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [currentRoundScore, setCurrentRoundScore] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [phase, setPhase] = useState<'idle'|'count'|'go'|'playing'|'downtime'|'recap'>('idle');
  const [pointsFlash, setPointsFlash] = useState<string | null>(null);
  const [roundHistory, setRoundHistory] = useState<{ round: number; score: number; timer: number; perfect: boolean }[]>([]);
  const [recapMessage, setRecapMessage] = useState<string | null>(null);
  const validatedRef = useRef(false);
  const timeoutsRef = useRef<number[]>([]);

  const difficulty = useMemo(() => {
    if (round <= 3) return { name: 'EASY', min: 3, max: 8 };
    if (round <= 7) return { name: 'MEDIUM', min: 5, max: 10 };
    return { name: 'HARD', min: 7, max: 12 };
  }, [round]);

  const startRound = useCallback((nextRound: number) => {
    // generate dots
    const n = Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) + difficulty.min;
    const used = new Set<string>();
    const nd: Point[] = [];
    while (nd.length < n) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      const key = `${x},${y}`;
      if (!used.has(key)) { used.add(key); nd.push({ x, y }); }
    }
    const c = centroid(nd);
    setDots(nd);
    setActual(c);
    setGuess(null);
    setShowResult(false);
    setCurrentRoundScore(null);
    setTimer(0);
    setPenalty(0);
    setRound(nextRound);
    setPhase('playing');
    validatedRef.current = false;
  }, [difficulty]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  const hardReset = () => {
    clearAllTimeouts();
    setRound(0);
    setDots([]);
    setActual(null);
    setGuess(null);
    setShowResult(false);
    setTotalScore(0);
    setCurrentRoundScore(null);
    setTimer(0);
    setPenalty(0);
    setRoundHistory([]);
    setRecapMessage(null);
    validatedRef.current = false;
  };

  const begin = () => {
    hardReset();
    setPhase('count');
    schedule(() => setPhase('go'), 500);
    schedule(() => startRound(1), 1000);
  };

  // timer + penalty
  useInterval(() => {
    if (phase === 'playing' && !showResult) {
      setTimer(t => {
        const nt = t + 1;
        if (nt > TIMER_PENALTY_THRESHOLD) setPenalty(p => p + 1);
        return nt;
      });
    }
  }, phase === 'playing' && !showResult ? 1000 : null);

  const onCellClick = (x: number, y: number) => {
    if (phase !== 'playing' || showResult) return;
    const ng = { x, y };
    if (guess && ng.x === guess.x && ng.y === guess.y) {
      validate();
    } else {
      setGuess(ng);
    }
  };

  const validate = () => {
    if (!guess || !actual) return;
    if (validatedRef.current) return; // guard double-submit
    validatedRef.current = true;
    const optimal = nearestInt(actual);
    const dist = chebyshev(guess, optimal);
    const score = dist + penalty;
    setCurrentRoundScore(score);
    setTotalScore(s => s + score);
    const perfect = dist === 0;
    setRoundHistory(h => [...h, { round, score, timer, perfect }]);
    setShowResult(true);
    setPhase('downtime');
    // flash points for ~1s then advance
    setPointsFlash(score === 0 ? '✨0✨' : String(score));
    schedule(() => {
      setPointsFlash(null);
      const next = round + 1;
      if (next <= MAX_ROUNDS) {
        schedule(() => startRound(next), 200); // tiny pause
      } else {
        const final = (roundHistory.reduce((s, r) => s + r.score, 0) + score);
        const msg = getRecapMessage(final);
        setTotalScore(final);
        setRecapMessage(msg);
        setPhase('recap');
      }
    }, 1000);
  };

  // rendering helpers
  const renderGridCells = () => {
    const cells: React.ReactElement[] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isDot = dots.some(d => d.x === x && d.y === y);
        const isGuess = guess && guess.x === x && guess.y === y;
        const isOptimal = showResult && actual && Math.round(actual.x) === x && Math.round(actual.y) === y;
        let bg = 'transparent';
        if (isGuess) bg = showResult ? 'bg-red-500' : 'bg-orange-500';
        else if (isOptimal) bg = 'bg-green-500';
        else if (isDot) bg = 'bg-blue-500';
        cells.push(
          <div
            key={`${x}-${y}`}
            onClick={() => onCellClick(x, y)}
            className={`w-5 h-5 border border-white/10 ${bg} ${phase === 'playing' && !showResult ? 'cursor-pointer hover:opacity-80' : ''}`}
          />
        );
      }
    }
    return cells;
  };

  const vectorsOverlay = () => {
    if (!showResult || !actual) return null;
    const optimal = nearestInt(actual);
    return (
      <svg width={BOARD_PX} height={BOARD_PX} className="absolute top-0 left-0 pointer-events-none">
        {dots.map((d, i) => (
          <line
            key={i}
            x1={d.x * CELL_SIZE + CELL_SIZE / 2}
            y1={d.y * CELL_SIZE + CELL_SIZE / 2}
            x2={optimal.x * CELL_SIZE + CELL_SIZE / 2}
            y2={optimal.y * CELL_SIZE + CELL_SIZE / 2}
            stroke="#66bb6a"
            strokeWidth={2}
            opacity={0.6}
          />
        ))}
      </svg>
    );
  };

  // Messages
  const messagesAbove25 = useMemo(() => [
    "Nice try, but you've got more in you! Push it!",
    "Not bad, champ—now show us your best!",
    "Solid effort, but you're just warming up! Go harder!",
    "That's a start, now crank it up a notch!",
    "Pretty good, but you're capable of greatness! Dig in!",
    "Decent move, but you've got bigger plays to make!",
    "Not too shabby, but let's see your A-game!",
    "You're getting there—now unleash the beast!",
    "Good hustle, but you're not at your peak yet!",
    "That's the spirit, now take it to the next level!"
  ], []);
  const messages10to25 = useMemo(() => [
    'Amazing work! You\'ve mastered the centroid challenge!',
    'Outstanding performance! Your spatial reasoning is top-notch!',
    'Brilliant! You\'ve conquered the centroid matrix!',
    'Fantastic! You\'ve aced the centroid game!',
    'Spectacular! Your geometric intuition is incredible!'
  ], []);
  const messages8to9 = useMemo(() => [
    'Single digit! Impressive!',
    'So close to perfection—keep pushing!',
    'Excellent intuition.'
  ], []);
  const messages7andBelow = useMemo(() => [
    'Unreal! You beat the creator!','Legendary performance!','Phenomenal accuracy!'
  ], []);

  const getRecapMessage = (finalScore: number) => {
    if (finalScore > 25) return messagesAbove25[Math.floor(Math.random() * messagesAbove25.length)];
    if (finalScore >= 10) return messages10to25[Math.floor(Math.random() * messages10to25.length)];
    if (finalScore >= 8) return messages8to9[Math.floor(Math.random() * messages8to9.length)];
    return messages7andBelow[Math.floor(Math.random() * messages7andBelow.length)];
  };

  const averageScore = useMemo(() => (
    roundHistory.length ? (roundHistory.reduce((s, r) => s + r.score, 0) / roundHistory.length).toFixed(1) : '0.0'
  ), [roundHistory]);
  const averageTime = useMemo(() => (
    roundHistory.length ? (roundHistory.reduce((s, r) => s + r.timer, 0) / roundHistory.length).toFixed(1) : '0.0'
  ), [roundHistory]);
  const perfectCount = useMemo(() => roundHistory.filter(r => r.perfect).length, [roundHistory]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center text-white py-4 px-4 font-mono">
      <div className="relative w-full max-w-[380px]">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-0 left-0 z-50 p-2 bg-black/35 hover:bg-black/50 rounded text-white"
            aria-label="close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="text-center mt-4 mb-2">
          <h2 className="text-xl font-bold tracking-wider">Centroid (x̄, ȳ) – GRID FAST</h2>
          <p className="text-sm opacity-70 tracking-wider">10 rounds – Lowest score wins</p>
        </div>

        {/* Status row */}
        {phase !== 'idle' && phase !== 'recap' && (
          <div className="flex justify-between items-center px-1 mb-2 text-sm tracking-wider">
            <span>R{Math.min(round, MAX_ROUNDS)}/{MAX_ROUNDS}</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className={timer <= TIMER_PENALTY_THRESHOLD ? 'text-green-500' : 'text-red-500'}>
                {`0:${String(timer).padStart(2, '0')}`}
              </span>
              {penalty > 0 && <span className="text-red-500">+{penalty}</span>}
            </div>
            <span>{difficulty.name}</span>
          </div>
        )}

        {/* Board or Landing */}
        {phase === 'idle' ? (
          <div className="mx-auto p-4 rounded-lg bg-black/35 border border-white/10">
            <h3 className="text-lg mb-2">How it works</h3>
            <p className="text-sm mb-2 opacity-85">
              Estimate the centroid (center of mass) of the blue squares. Click a cell to place your guess, then press VALIDATE (or double-click). Lower total is better. Perfect Guess = 0
            </p>
            {/* Sample solved puzzle */}
            {(() => {
              const SAMPLE_GRID = 11; const SAMPLE_CELL = 14; const SAMPLE_PX = SAMPLE_GRID * SAMPLE_CELL;
              const sampleDots: Point[] = [
                { x: 2, y: 2 }, { x: 3, y: 7 }, { x: 5, y: 4 }, { x: 7, y: 2 }, { x: 8, y: 8 }, { x: 2, y: 9 }
              ];
              const sActual = centroid(sampleDots);
              const sOptimal = nearestInt(sActual);
              const sGuess = { x: Math.min(SAMPLE_GRID - 1, sOptimal.x + 1), y: sOptimal.y };
              const renderSampleCells = () => {
                const cells: React.ReactElement[] = [];
                for (let y = 0; y < SAMPLE_GRID; y++) {
                  for (let x = 0; x < SAMPLE_GRID; x++) {
                    const isDot = sampleDots.some(d => d.x === x && d.y === y);
                    const isGuess = sGuess && sGuess.x === x && sGuess.y === y;
                    const isOptimal = Math.round(sActual.x) === x && Math.round(sActual.y) === y;
                    let bg = 'transparent';
                    if (isGuess) bg = 'bg-red-500';
                    else if (isOptimal) bg = 'bg-green-500';
                    else if (isDot) bg = 'bg-blue-500';
                    cells.push(
                      <div key={`${x}-${y}`} className={`w-3.5 h-3.5 border border-white/10 ${bg}`} />
                    );
                  }
                }
                return cells;
              };
              return (
                <div className="flex gap-4 items-center">
                  <div className="relative w-[154px] h-[154px] grid grid-cols-11 grid-rows-11 bg-bg rounded overflow-hidden">
                    {renderSampleCells()}
                    <svg width={SAMPLE_PX} height={SAMPLE_PX} className="absolute inset-0 pointer-events-none">
                      {sampleDots.map((d, i) => (
                        <line
                          key={i}
                          x1={d.x * SAMPLE_CELL + SAMPLE_CELL / 2}
                          y1={d.y * SAMPLE_CELL + SAMPLE_CELL / 2}
                          x2={sOptimal.x * SAMPLE_CELL + SAMPLE_CELL / 2}
                          y2={sOptimal.y * SAMPLE_CELL + SAMPLE_CELL / 2}
                          stroke="#66bb6a"
                          strokeWidth={2}
                          opacity={0.6}
                        />
                      ))}
                    </svg>
                  </div>
                  <div className="text-xs">
                    <div>Blue = dots</div>
                    <div className="text-green-400">Green = true centroid</div>
                    <div className="text-red-400">Red = your guess</div>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="w-[340px] h-[340px] mx-auto relative rounded-lg overflow-hidden border border-white/10">
            {/* countdown overlays */}
            {phase === 'count' && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <h3 className="text-3xl">Round 1</h3>
              </div>
            )}
            {phase === 'go' && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <h3 className="text-3xl">GO!</h3>
              </div>
            )}

            {/* grid */}
            <div className="absolute inset-0 bg-bg" style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`, gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)` }}>
              {renderGridCells()}
            </div>
            {vectorsOverlay()}
            {phase === 'downtime' && <div className="absolute inset-0 bg-black/40" />}
            {pointsFlash && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
                <div className="text-3xl text-red-500 drop-shadow-lg">{pointsFlash}</div>
              </div>
            )}
          </div>
        )}

        {/* Primary action */}
        <div className="mt-2">
          <Button
            className="w-full"
            size="lg"
            variant={phase === 'idle' ? 'default' : guess && !showResult ? 'default' : 'outline'}
            disabled={phase !== 'idle' && (phase !== 'playing' || showResult || !guess)}
            onClick={() => {
              if (phase === 'idle') begin();
              else if (phase === 'playing' && guess && !showResult) validate();
            }}
          >
            <div className="flex items-center gap-2">
              {phase === 'idle' ? <Target className="w-5 h-5" /> : guess && !showResult ? <Check className="w-5 h-5" /> : <Target className="w-5 h-5" />}
              <div className="text-left">
                <div className="tracking-wider">
                  {phase === 'idle' ? 'START Game' : phase === 'playing' && guess && !showResult ? 'VALIDATE' : 'PLACE'}
                </div>
                <div className="text-xs opacity-80 leading-none tracking-wider">
                  x̄ = (1/n) Σ xᵢ &nbsp;&nbsp; ȳ = (1/n) Σ yᵢ
                </div>
              </div>
            </div>
          </Button>
        </div>

        {/* Recap */}
        {phase === 'recap' && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,420px)] max-h-[80vh] overflow-y-auto text-center bg-bg text-text-primary p-4 rounded-lg shadow-xl font-mono tracking-wider">
              <div className="flex gap-2 mb-2 justify-center">
                <Button variant="default" onClick={() => { hardReset(); setPhase('idle'); }}>Play Again</Button>
                <Button variant="outline" onClick={() => { setPhase('idle'); onClose?.(); }}>Close</Button>
              </div>
              <p className="text-sm mb-2">{recapMessage}</p>
              <h3 className="text-lg mb-2">Final Score: {totalScore} points</h3>
              <div className="text-left mx-auto max-w-[360px] text-xs py-1">
                {roundHistory.map((r, idx) => (
                  <div key={`${r.round}-${idx}`} className="flex justify-between py-1">
                    <span>Round {r.round}:</span>
                    <span>{r.score} pts {r.perfect ? '✨' : ''}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-text-muted">
                <span>Perfect rounds: <strong>{perfectCount}</strong></span>
                <span>Average score: <strong>{averageScore}</strong></span>
              </div>
              <div className="mt-2 text-xs text-text-muted">Avg time per round: <strong>{averageTime}s</strong></div>
              {/* Histogram 0..9+ */}
              <div className="mt-2 h-24 flex items-end gap-1 mx-auto max-w-[360px]">
                {Array.from({ length: 10 }, (_, i) => {
                  const count = roundHistory.filter(r => (i < 9 ? r.score === i : r.score >= 9)).length;
                  return (
                    <div key={i} className="flex-1 flex flex-col-reverse items-center gap-1">
                      <div className="w-2 bg-accent rounded-sm" style={{ height: count * 10 }} />
                      <span className="text-xs mt-1">{i === 9 ? '9+' : i}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

