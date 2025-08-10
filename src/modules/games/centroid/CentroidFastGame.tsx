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

  // Messages copied from original game
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

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: { xs: 'flex-start', md: 'center' }, minHeight: '100vh', color: 'white', pt: { xs: 2, md: 0 } }}>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 380,
        fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace',
        letterSpacing: '0.06em',
        '& .MuiTypography-root': {
          fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace',
          letterSpacing: '0.06em'
        }
      }}>
        {/* Back button to restore header */}
        <IconButton onClick={() => { document.body.classList.remove('game-fullscreen'); }} sx={{ position: 'absolute', top: 0, left: 0, color: 'white' }} aria-label="close">
          <CloseIcon />
        </IconButton>

        <Box sx={{ textAlign: 'center', mt: { xs: 1, md: 4 }, mb: 1 }}>
          <Typography variant="h5" fontWeight={700} sx={{ fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>Centroid (x̄, ȳ) – GRID FAST</Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>10 rounds – Lowest score wins</Typography>
        </Box>

        {/* Status row */}
        {phase !== 'idle' && phase !== 'recap' && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, mb: 1 }}>
            <Typography variant="caption" sx={{ fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>R{Math.min(round, MAX_ROUNDS)}/{MAX_ROUNDS}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon fontSize="small" />
              <Typography
                variant="caption"
                sx={{
                  fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace',
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '0.06em',
                  color: timer <= TIMER_PENALTY_THRESHOLD ? 'success.main' : 'error.main'
                }}
              >
                {`0:${String(timer).padStart(2, '0')}`}
              </Typography>
              {penalty > 0 && <Typography variant="caption" color="error.main">+{penalty}</Typography>}
            </Box>
            <Typography variant="caption" sx={{ fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>{difficulty.name}</Typography>
          </Box>
        )}

        {/* Board or Landing */}
        {phase === 'idle' ? (
          <Box sx={{ mx: 'auto', p: 2, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>How it works</Typography>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.85 }}>
              Estimate the centroid (center of mass) of the blue squares. Click a cell to place your guess, then press VALIDATE (or double-click). lower total is better.  Perfect Guess = 0
            </Typography>
            {/* Sample solved puzzle */}
            {(() => {
              const SAMPLE_GRID = 11; const SAMPLE_CELL = 14; const SAMPLE_PX = SAMPLE_GRID * SAMPLE_CELL;
              const sampleDots: Point[] = [
                { x: 2, y: 2 }, { x: 3, y: 7 }, { x: 5, y: 4 }, { x: 7, y: 2 }, { x: 8, y: 8 }, { x: 2, y: 9 }
              ];
              const sActual = centroid(sampleDots);
              const sOptimal = nearestInt(sActual);
              const sGuess = { x: Math.min(SAMPLE_GRID - 1, sOptimal.x + 1), y: sOptimal.y }; // slightly off to illustrate
              const renderSampleCells = () => {
                const cells: React.ReactElement[] = [];
                for (let y = 0; y < SAMPLE_GRID; y++) {
                  for (let x = 0; x < SAMPLE_GRID; x++) {
                    const isDot = sampleDots.some(d => d.x === x && d.y === y);
                    const isGuess = sGuess && sGuess.x === x && sGuess.y === y;
                    const isOptimal = Math.round(sActual.x) === x && Math.round(sActual.y) === y;
                    let bg = 'transparent';
                    if (isGuess) bg = '#ef5350'; else if (isOptimal) bg = '#66bb6a'; else if (isDot) bg = '#42a5f5';
                    cells.push(<Box key={`${x}-${y}`} sx={{ width: SAMPLE_CELL, height: SAMPLE_CELL, border: '1px solid rgba(255,255,255,0.08)', bgcolor: bg }} />);
                  }
                }
                return cells;
              };
              return (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box sx={{ position: 'relative', width: SAMPLE_PX, height: SAMPLE_PX, display: 'grid', gridTemplateColumns: `repeat(${SAMPLE_GRID}, ${SAMPLE_CELL}px)`, gridTemplateRows: `repeat(${SAMPLE_GRID}, ${SAMPLE_CELL}px)`, bgcolor: '#111', borderRadius: 1, overflow: 'hidden' }}>
                    {renderSampleCells()}
                    <svg width={SAMPLE_PX} height={SAMPLE_PX} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                      {sampleDots.map((d, i) => (
                        <line key={i}
                          x1={d.x * SAMPLE_CELL + SAMPLE_CELL / 2} y1={d.y * SAMPLE_CELL + SAMPLE_CELL / 2}
                          x2={sOptimal.x * SAMPLE_CELL + SAMPLE_CELL / 2} y2={sOptimal.y * SAMPLE_CELL + SAMPLE_CELL / 2}
                          stroke="#66bb6a" strokeWidth={2} opacity={0.6}
                        />
                      ))}
                    </svg>
                  </Box>
                  <Box>
                    <Typography variant="caption">Blue = dots</Typography><br />
                    <Typography variant="caption" color="success.light">Green = true centroid</Typography><br />
                    <Typography variant="caption" color="error.light">Red = your guess</Typography>
                  </Box>
                </Box>
              );
            })()}
          </Box>
        ) : (
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
        )}

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
            <Box sx={{ textAlign: 'left', fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace' }}>
              <div style={{ letterSpacing: '0.06em' }}>{phase === 'idle' ? 'START Game' : phase === 'playing' && guess && !showResult ? 'VALIDATE' : 'PLACE'}</div>
              <Typography variant="caption" sx={{ opacity: 0.8, lineHeight: 1, fontFamily: 'inherit', letterSpacing: '0.06em' }}>
                x̄ = (1/n) Σ xᵢ &nbsp;&nbsp; ȳ = (1/n) Σ yᵢ
              </Typography>
            </Box>
          </Button>
        </Box>

        {/* Recap */}
        {phase === 'recap' && (
          <Box sx={{ position: 'fixed', inset: 0, zIndex: 20 }}>
            <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.55)' }} />
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(92vw, 420px)', maxHeight: '80vh', overflowY: 'auto', textAlign: 'center', bgcolor: 'background.paper', color: 'text.primary', p: 2, borderRadius: 2, boxShadow: 6, 
              '& .MuiTypography-root': { fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }
            }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, justifyContent: 'center' }}>
                <Button variant="contained" sx={{ fontFamily: 'inherit', letterSpacing: 'inherit' }} onClick={() => { hardReset(); setPhase('idle'); }}>Play Again</Button>
                <Button variant="outlined" sx={{ fontFamily: 'inherit', letterSpacing: 'inherit' }} onClick={() => { setPhase('idle'); document.body.classList.remove('game-fullscreen'); }}>Close</Button>
              </Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>{recapMessage}</Typography>
              <Typography variant="h6" sx={{ mb: 1, fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>Final Score: {totalScore} points</Typography>
              <Box sx={{ textAlign: 'left', mx: 'auto', maxWidth: 360, fontFamily: 'inherit', letterSpacing: 'inherit' }}>
                {roundHistory.map((r, idx) => (
                  <Box key={`${r.round}-${idx}`} sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, py: 0.3, fontFamily: 'inherit', letterSpacing: 'inherit' }}>
                    <span>Round {r.round}:</span>
                    <span>{r.score} pts {r.perfect ? '✨' : ''}</span>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, fontSize: 12, color: 'text.secondary', fontFamily: 'inherit', letterSpacing: 'inherit' }}>
                <span>Perfect rounds: <strong>{perfectCount}</strong></span>
                <span>Average score: <strong>{averageScore}</strong></span>
              </Box>
              <Box sx={{ mt: 1, fontSize: 12, color: 'text.secondary', fontFamily: 'inherit', letterSpacing: 'inherit' }}>Avg time per round: <strong>{averageTime}s</strong></Box>
              {/* Histogram 0..9+ */}
              <Box sx={{ mt: 1, height: 96, display: 'flex', alignItems: 'end', gap: 0.5, mx: 'auto', maxWidth: 360 }}>
                {Array.from({ length: 10 }, (_, i) => {
                  const count = roundHistory.filter(r => (i < 9 ? r.score === i : r.score >= 9)).length;
                  return (
                    <Box key={i} sx={{ flex: 1, display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: 0.25 }}>
                      <Box sx={{ width: 8, height: count * 10, bgcolor: 'primary.main', borderRadius: 0.5 }} />
                      <Typography variant="caption" sx={{ mt: 0.5 }}>{i === 9 ? '9+' : i}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CentroidFastGame;


