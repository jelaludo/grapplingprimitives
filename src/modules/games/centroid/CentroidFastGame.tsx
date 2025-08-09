import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

export const CentroidFastGame: React.FC = () => {
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
  }, [difficulty]);

  const begin = () => {
    setPhase('count');
    setTimeout(() => setPhase('go'), 500);
    setTimeout(() => startRound(1), 1000);
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
    const optimal = nearestInt(actual);
    const dist = chebyshev(guess, optimal);
    const score = dist + penalty;
    setCurrentRoundScore(score);
    setTotalScore(s => s + score);
    setShowResult(true);
    setPhase('downtime');
    // flash points for ~1s then advance
    setPointsFlash(score === 0 ? '✨0✨' : String(score));
    setTimeout(() => {
      setPointsFlash(null);
      const next = round + 1;
      if (next <= MAX_ROUNDS) {
        setTimeout(() => startRound(next), 200); // tiny pause
      } else {
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
        if (isGuess) bg = showResult ? '#ef5350' : '#fb8c00';
        else if (isOptimal) bg = '#66bb6a';
        else if (isDot) bg = '#42a5f5';
        cells.push(
          <Box key={`${x}-${y}`} onClick={() => onCellClick(x, y)} sx={{ width: CELL_SIZE, height: CELL_SIZE, border: '1px solid rgba(255,255,255,0.08)', bgcolor: bg, cursor: 'pointer' }} />
        );
      }
    }
    return cells;
  };

  const vectorsOverlay = () => {
    if (!showResult || !actual) return null;
    const optimal = nearestInt(actual);
    return (
      <svg width={BOARD_PX} height={BOARD_PX} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        {dots.map((d, i) => (
          <line key={i} x1={d.x * CELL_SIZE + CELL_SIZE / 2} y1={d.y * CELL_SIZE + CELL_SIZE / 2}
                x2={optimal.x * CELL_SIZE + CELL_SIZE / 2} y2={optimal.y * CELL_SIZE + CELL_SIZE / 2}
                stroke="#66bb6a" strokeWidth={2} opacity={0.6} />
        ))}
      </svg>
    );
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2, color: 'white' }}>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 380 }}>
        {/* Back button to restore header */}
        <IconButton onClick={() => { document.body.classList.remove('game-fullscreen'); }} sx={{ position: 'absolute', top: 0, left: 0, color: 'white' }} aria-label="close">
          <CloseIcon />
        </IconButton>

        <Box sx={{ textAlign: 'center', mt: 4, mb: 1 }}>
          <Typography variant="h5" fontWeight={700}>Centroid (x̄, ȳ) – GRID FAST</Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>10 rounds – Lowest score wins</Typography>
        </Box>

        {/* Status row */}
        {phase !== 'idle' && phase !== 'recap' && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, mb: 1 }}>
            <Typography variant="caption">R{Math.min(round, MAX_ROUNDS)}/{MAX_ROUNDS}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="caption" sx={{ fontVariantNumeric: 'tabular-nums', color: timer <= TIMER_PENALTY_THRESHOLD ? 'success.main' : 'error.main' }}>{`0:${String(timer).padStart(2, '0')}`}</Typography>
              {penalty > 0 && <Typography variant="caption" color="error.main">+{penalty}</Typography>}
            </Box>
            <Typography variant="caption">{difficulty.name}</Typography>
          </Box>
        )}

        {/* Board */}
        <Box sx={{ width: BOARD_PX, height: BOARD_PX, mx: 'auto', position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(255,255,255,0.06) inset' }}>
          {/* countdown overlays */}
          {phase === 'count' && (
            <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
              <Typography variant="h3">Round 1</Typography>
            </Box>
          )}
          {phase === 'go' && (
            <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
              <Typography variant="h3">GO!</Typography>
            </Box>
          )}

          {/* grid */}
          <Box sx={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`, gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`, bgcolor: '#111' }}>
            {renderGridCells()}
          </Box>
          {vectorsOverlay()}
          {phase === 'downtime' && <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)' }} />}
          {pointsFlash && (
            <Box sx={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
              <Typography variant="h3" color="error.main" sx={{ textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}>{pointsFlash}</Typography>
            </Box>
          )}
        </Box>

        {/* Primary action */}
        <Box sx={{ mt: 1 }}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            color={phase === 'idle' ? 'primary' : guess && !showResult ? 'success' : 'primary'}
            startIcon={phase === 'idle' ? <GpsFixedIcon /> : guess && !showResult ? <CheckIcon /> : <GpsFixedIcon />}
            disabled={phase !== 'idle' && (phase !== 'playing' || showResult || !guess)}
            onClick={() => {
              if (phase === 'idle') begin();
              else if (phase === 'playing' && guess && !showResult) validate();
            }}
          >
            {phase === 'idle' ? 'START Game' : phase === 'playing' && guess && !showResult ? 'VALIDATE' : 'PLACE'}
          </Button>
        </Box>

        {/* Recap */}
        {phase === 'recap' && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="h6">Final Score: {totalScore}</Typography>
            <Button sx={{ mt: 1 }} variant="contained" onClick={() => { setTotalScore(0); setRound(0); setPhase('idle'); }}>Play Again</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CentroidFastGame;


