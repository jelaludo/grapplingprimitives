import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

// Simple, in-repo timer MVP. Audio placeholders use Web Audio beeps; we can later
// swap to imported sound files.

type HMS = { m: number; s: number };

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }
function toSeconds(t: HMS) { return t.m * 60 + t.s; }
function fmt(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function beep(freq = 880, dur = 120) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = freq; o.type = 'square';
    o.connect(g); g.connect(ctx.destination);
    o.start();
    setTimeout(() => { o.stop(); ctx.close(); }, dur);
  } catch {}
}

export const Timer: React.FC = () => {
  const [roundLen, setRoundLen] = useState<HMS>(() => {
    const raw = localStorage.getItem('coach_timer_round');
    return raw ? JSON.parse(raw) : { m: 5, s: 0 };
  });
  const [restLen, setRestLen] = useState<HMS>(() => {
    const raw = localStorage.getItem('coach_timer_rest');
    return raw ? JSON.parse(raw) : { m: 0, s: 20 };
  });
  const [totalRounds, setTotalRounds] = useState<number>(() => Number(localStorage.getItem('coach_timer_rounds')) || 5);
  const [phase, setPhase] = useState<'countdown'|'round'|'rest'|'paused'|'finished'>('paused');
  const [currentRound, setCurrentRound] = useState(1);
  const [remaining, setRemaining] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const nextPhaseRef = useRef<'round'|'rest'|null>(null);

  const roundSeconds = useMemo(() => toSeconds(roundLen), [roundLen]);
  const restSeconds = useMemo(() => toSeconds(restLen), [restLen]);

  useEffect(() => { localStorage.setItem('coach_timer_round', JSON.stringify(roundLen)); }, [roundLen]);
  useEffect(() => { localStorage.setItem('coach_timer_rest', JSON.stringify(restLen)); }, [restLen]);
  useEffect(() => { localStorage.setItem('coach_timer_rounds', String(totalRounds)); }, [totalRounds]);

  const clearTick = () => { if (intervalRef.current) { window.clearInterval(intervalRef.current); intervalRef.current = null; } };

  const startCountdown = (onDone: () => void) => {
    clearTick();
    setPhase('countdown');
    let count = 3;
    setRemaining(count);
    // Immediate beep for "3"
    beep(900, 120);
    intervalRef.current = window.setInterval(() => {
      count -= 1;
      setRemaining(count);
      if (count > 0) {
        const dur = count === 2 ? 240 : 360; // 2 then 1
        beep(900, dur);
      } else {
        // final long beep at zero then start
        beep(1200, 500);
        clearTick();
        onDone();
      }
    }, 1000);
  };

  const runRound = () => {
    clearTick();
    setPhase('round');
    setRemaining(roundSeconds);
    beep(1200, 400); // high long beep to start
    intervalRef.current = window.setInterval(() => {
      setRemaining(prev => {
        const next = prev - 1;
        if (next <= 0) {
          clearTick();
          beep(500, 800); // lower and slightly longer beep to end
          if (currentRound >= totalRounds) {
            setPhase('finished');
            return 0;
          }
          // go to rest immediately
          runRest();
          return 0;
        }
        return next;
      });
    }, 1000);
  };

  const runRest = () => {
    clearTick();
    setPhase('rest');
    setRemaining(restSeconds);
    intervalRef.current = window.setInterval(() => {
      setRemaining(prev => {
        const next = prev - 1;
        if (next <= 0) {
          clearTick();
          setCurrentRound(r => r + 1);
          // 3-2-1 then start round
          startCountdown(runRound);
          return 0;
        }
        return next;
      });
    }, 1000);
  };

  const start = () => {
    setCurrentRound(1);
    startCountdown(runRound);
  };

  const pause = () => { setPhase('paused'); clearTick(); };
  const resume = () => {
    if (phase !== 'paused') return;
    // Resume whichever phase we were in before pausing
    if (nextPhaseRef.current === 'rest') runRest();
    else runRound();
  };
  const reset = () => { clearTick(); setPhase('paused'); setCurrentRound(1); setRemaining(0); };

  const bigText = useMemo(() => fmt(Math.max(remaining, 0)), [remaining]);
  const title = phase === 'round' ? `Round ${currentRound}/${totalRounds}` : phase === 'rest' ? `Rest` : phase === 'countdown' ? 'Get Ready' : phase === 'finished' ? 'Finished' : 'Paused';
  const color = phase === 'round' ? '#4caf50' : phase === 'rest' || phase === 'countdown' ? '#fb8c00' : '#ffffff';

  const adjust = (setter: React.Dispatch<React.SetStateAction<HMS>>, key: 'm'|'s', delta: number) =>
    setter((v) => ({ ...v, [key]: clamp(v[key] + delta, 0, key === 'm' ? 99 : 59) }));

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ textAlign: 'center', color: '#bbb', fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>{title}</Typography>
      <Box sx={{ textAlign: 'center', my: 2 }}>
        <Typography
          component="div"
          sx={{
            fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace',
            fontFeatureSettings: 'tnum',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: { xs: 2, sm: 4 },
            fontSize: { xs: '18vw', sm: '18vw' },
            maxWidth: '100vw',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontWeight: 700,
            lineHeight: 1,
            color
          }}
        >
          {bigText}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <Box sx={{ bgcolor: '#222', p: 1, borderRadius: 1, color: '#ccc', display: 'flex', alignItems: 'center', gap: 1, fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace' }}>
          <span>Duration:</span>
          <IconButton size="small" onClick={() => adjust(setRoundLen, 'm', -1)}><RemoveIcon fontSize="small" /></IconButton>
          <span>{roundLen.m.toString().padStart(2,'0')}:{roundLen.s.toString().padStart(2,'0')}</span>
          <IconButton size="small" onClick={() => adjust(setRoundLen, 'm', +1)}><AddIcon fontSize="small" /></IconButton>
        </Box>
        <Box sx={{ bgcolor: '#222', p: 1, borderRadius: 1, color: '#ccc', display: 'flex', alignItems: 'center', gap: 1, fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace' }}>
          <span>Rest:</span>
          <IconButton size="small" onClick={() => adjust(setRestLen, 's', -5)}><RemoveIcon fontSize="small" /></IconButton>
          <span>{restLen.m.toString().padStart(2,'0')}:{restLen.s.toString().padStart(2,'0')}</span>
          <IconButton size="small" onClick={() => adjust(setRestLen, 's', +5)}><AddIcon fontSize="small" /></IconButton>
        </Box>
        <Box sx={{ bgcolor: '#222', p: 1, borderRadius: 1, color: '#ccc', display: 'flex', alignItems: 'center', gap: 1, fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace' }}>
          <span>Rounds:</span>
          <IconButton size="small" onClick={() => setTotalRounds(r => Math.max(1, r - 1))}><RemoveIcon fontSize="small" /></IconButton>
          <span>{totalRounds}</span>
          <IconButton size="small" onClick={() => setTotalRounds(r => r + 1)}><AddIcon fontSize="small" /></IconButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace' }}>
        {phase === 'paused' || phase === 'countdown' ? (
          <Button variant="contained" onClick={start} sx={{ fontFamily: 'inherit' }}>Start</Button>
        ) : (
          <Button variant="contained" onClick={pause} sx={{ fontFamily: 'inherit' }}>Pause</Button>
        )}
        <Button variant="outlined" onClick={reset} sx={{ fontFamily: 'inherit' }}>Reset</Button>
      </Box>
    </Box>
  );
};

export default Timer;


