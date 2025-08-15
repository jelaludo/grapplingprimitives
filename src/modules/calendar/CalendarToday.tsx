import React from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup, Slider, Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Chip, Autocomplete, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { getUserDay, setUserDay } from './storage/userDays';
import { addSession, getSessions } from './storage/sessions';
import { getExerciseLibrary, addExerciseToLibrary } from './storage/exercises';
import type { Session } from './types';

// Scaffold for Calendar & Today Panel module
// Phase 1: layout only with mock data; storage wiring to come per module-plan

const CalendarToday: React.FC = () => {
  const [mode, setMode] = React.useState<'week' | 'month'>('month');
  const [intensity, setIntensity] = React.useState<number>(5);
  const [selectedISO, setSelectedISO] = React.useState<string>(() => new Date().toISOString().slice(0,10));
  const [sessions, setSessions] = React.useState<Session[]>(() => getSessions(new Date().toISOString().slice(0,10)));
  const [addOpen, setAddOpen] = React.useState(false);
  const [exerciseName, setExerciseName] = React.useState('');
  const [exerciseLib, setExerciseLib] = React.useState(() => getExerciseLibrary());

  // Use the selected date's month for calendar rendering (not always "today")
  const selectedDate = React.useMemo(() => new Date(selectedISO), [selectedISO]);
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth(); // 0-11
  const weekMonday = React.useMemo(() => {
    const d = new Date(selectedDate);
    const dow = (d.getDay() + 6) % 7; // Monday = 0
    d.setDate(d.getDate() - dow);
    return d;
  }, [selectedDate]);
  const labelDate = mode === 'week' ? weekMonday : selectedDate;
  const monthLabel = React.useMemo(() => new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(labelDate), [labelDate]);

  // Compute cells based on mode
  const cells = React.useMemo(() => {
    if (mode === 'week') {
      // Find Monday of the selected week
      const dow = (selectedDate.getDay() + 6) % 7; // Monday = 0
      const monday = new Date(selectedDate);
      monday.setDate(selectedDate.getDate() - dow);
      return Array.from({ length: 7 }, (_, idx) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + idx);
        return { y: d.getFullYear(), m: d.getMonth(), d: d.getDate(), out: false };
      });
    }

    // Month grid: 6x7 including leading/trailing days
    const firstDay = new Date(year, month, 1);
    const startDayIndex = (firstDay.getDay() + 6) % 7; // make Monday=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    return Array.from({ length: 42 }, (_, idx) => {
      const dayNum = idx - startDayIndex + 1;
      if (dayNum < 1) {
        return { y: month === 0 ? year - 1 : year, m: (month + 11) % 12, d: prevMonthDays + dayNum, out: true };
      }
      if (dayNum > daysInMonth) {
        return { y: month === 11 ? year + 1 : year, m: (month + 1) % 12, d: dayNum - daysInMonth, out: true };
      }
      return { y: year, m: month, d: dayNum, out: false };
    });
  }, [mode, month, year, selectedDate]);

  // Build a quick lookup for intensity and session counts for visible cells
  const dayData = React.useMemo(() => {
    const map = new Map<string, { intensity: number | null; sessionCount: number }>();
    for (const c of cells) {
      const iso = new Date(c.y, c.m, c.d).toISOString().slice(0,10);
      const ud = getUserDay(iso);
      const sess = getSessions(iso);
      map.set(iso, { intensity: ud ? ud.intensity1to10 : null, sessionCount: sess.length });
    }
    return map;
  }, [cells]);

  const intensityToColor = (v: number) => {
    const clamped = Math.max(1, Math.min(10, v));
    const t = (clamped - 1) / 9; // 0..1
    const hue = 0 + t * 120; // 0 (red) -> 120 (green)
    return `hsl(${hue}, 80%, 50%)`;
  };

  React.useEffect(() => {
    const saved = getUserDay(selectedISO);
    if (saved) setIntensity(saved.intensity1to10);
    setSessions(getSessions(selectedISO));
  }, [selectedISO]);

  const handleDayClick = (cell: { y: number; m: number; d: number }) => {
    const iso = new Date(cell.y, cell.m, cell.d).toISOString().slice(0,10);
    setSelectedISO(iso);
  };

  const handleIntensityChange = (_: unknown, v: number | number[]) => {
    const value = Array.isArray(v) ? v[0] : v;
    setIntensity(value);
    setUserDay({ dateISO: selectedISO, intensity1to10: value });
    // Persist to server for validation/backups
    fetch('/api/calendar/effort', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dateISO: selectedISO, intensity: value })
    }).catch(() => {});
  };

  const handleAddSession = () => {
    const now = new Date();
    const s: Session = {
      id: `${now.getTime()}`,
      dateISO: selectedISO,
      startedAt: now.toISOString(),
      items: exerciseName ? [{ exerciseId: `ex-${now.getTime()}`, name: exerciseName }] : [],
    };
    const updated = addSession(selectedISO, s);
    // Also persist to server for backups
    fetch('/api/calendar/session', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dateISO: selectedISO, session: s })
    }).catch(() => {});
    setSessions(updated);
    setAddOpen(false);
    setExerciseName('');
  };

  const gridRows = mode === 'month' ? 'repeat(6, 1fr)' : 'repeat(1, 1fr)';
  const aspect = mode === 'month' ? '1 / 0.65' : '1 / 0.2';
  const weekdayLabels = ['M','T','W','T','F','S','S'];
  const shiftWeek = (delta: number) => {
    if (mode !== 'week') return;
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + delta * 7);
    setSelectedISO(d.toISOString().slice(0,10));
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 360px' }, gap: 2, height: '100%' }}>
      {/* Calendar side */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', mb: 1 }}>
          <Typography variant="h6">{monthLabel}</Typography>
          <Box sx={{ display:'flex', alignItems:'center', gap: 1 }}>
            {mode === 'week' && (
              <>
                <IconButton size="small" onClick={() => shiftWeek(-1)} aria-label="Previous week"><ChevronLeft fontSize="small" /></IconButton>
                <IconButton size="small" onClick={() => shiftWeek(1)} aria-label="Next week"><ChevronRight fontSize="small" /></IconButton>
              </>
            )}
            <ToggleButtonGroup size="small" exclusive value={mode} onChange={(_, v) => v && setMode(v)}>
              <ToggleButton value="week">Week</ToggleButton>
              <ToggleButton value="month">Month</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        {/* Weekday headers */}
        <Box sx={{ display:'grid', gridTemplateColumns:'repeat(7, 1fr)', px: 0.5, mb: 0.5 }}>
          {weekdayLabels.map((lbl, idx) => (
            <Typography key={idx} variant="caption" sx={{ textAlign:'center', opacity: 0.7 }}>
              {lbl}
            </Typography>
          ))}
        </Box>
        {mode === 'week' && (
          <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', gap: 2, mb: 0.5 }}>
            <Button size="small" variant="text" onClick={() => shiftWeek(-1)}>previous</Button>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>{'<  >'}</Typography>
            <Button size="small" variant="text" onClick={() => shiftWeek(1)}>next</Button>
          </Box>
        )}
        <Box sx={{ width: '100%', aspectRatio: aspect, bgcolor: 'background.default', borderRadius: 1, display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gridTemplateRows: gridRows, gap: 0.5 }}>
          {cells.map((cell, i) => (
            <Box
              key={i}
              onClick={() => handleDayClick(cell)}
              sx={{
                border:'1px solid rgba(255,255,255,0.06)',
                borderRadius: 1,
                position:'relative',
                overflow:'hidden',
                opacity: cell.out ? 0.45 : 1,
                cursor:'pointer',
                outline: new Date(cell.y, cell.m, cell.d).toISOString().slice(0,10) === selectedISO ? '2px solid rgba(100,181,246,0.8)' : 'none',
              }}
            >
              <Box sx={{ position:'absolute', top: 4, right: 6, fontSize: 11, opacity: 0.8 }}>
                {cell.d}
              </Box>
              {/* intensity bar (1-10) */}
              {(() => {
                const iso = new Date(cell.y, cell.m, cell.d).toISOString().slice(0,10);
                const info = dayData.get(iso);
                const val = info?.intensity ?? 0;
                const h = Math.max(0, Math.min(1, val / 10)) * 20; // 0..20px height in 24px viewport
                const y = 22 - h;
                return (
                  <svg viewBox="0 0 100 24" style={{ position:'absolute', left:0, right:0, top:0, width:'100%', height:24, opacity:0.8 }}>
                    <rect x={46} y={y} width={8} height={h} fill={val > 0 ? intensityToColor(val) : 'transparent'} rx={1} />
                  </svg>
                );
              })()}
              {/* session dots (count) */}
              {(() => {
                const iso = new Date(cell.y, cell.m, cell.d).toISOString().slice(0,10);
                const info = dayData.get(iso);
                const count = Math.min(3, info?.sessionCount ?? 0);
                return (
                  <Box sx={{ position:'absolute', bottom: 4, left: 4, display:'flex', gap: 0.5 }}>
                    {Array.from({ length: count }).map((_, idx) => (
                      <Box key={idx} sx={{ width:6, height:6, bgcolor:'#66bb6a', borderRadius:'50%' }} />
                    ))}
                  </Box>
                );
              })()}
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Today panel */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, display:'flex', flexDirection:'column', gap: 2 }}>
        <Typography variant="h6">{selectedISO}</Typography>
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>Effort</Typography>
          <Slider min={1} max={10} step={1} value={intensity} onChange={(_, v) => handleIntensityChange(_, v as number)} marks={[{value:1,label:'1'}, {value:10,label:'10'}]} />
        </Box>
        <Box sx={{ flex:1, minHeight: 0 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Sessions today</Typography>
          <Box sx={{ display:'flex', flexDirection:'column', gap: 1, overflow:'auto', maxHeight:'40vh' }}>
            {sessions.map((s) => (
              <Paper key={s.id} variant="outlined" sx={{ p:1.5, borderRadius:1.5 }}>
                <Typography variant="caption">{new Date(s.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · Session</Typography>
                <Box sx={{ mt: 0.5, display:'flex', gap: 1, flexWrap:'wrap' }}>
                  {s.items.length === 0 ? (
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>No items</Typography>
                  ) : (
                    s.items.map((it, idx) => <Chip key={idx} size="small" variant="outlined" label={it.name} />)
                  )}
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
        <Box>
          <Paper component="button" onClick={() => setAddOpen(true)} sx={{ p:1.25, width:'100%', textAlign:'center', bgcolor:'transparent', border:'1px solid rgba(255,255,255,0.2)', borderRadius:1.5, cursor:'pointer' as const }}>
            Add Session
          </Paper>
        </Box>
      </Paper>

      {/* Add Session Dialog (scaffold) */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
        <DialogTitle>New Session</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Autocomplete
            freeSolo
            options={exerciseLib.map(e => e.name)}
            onInputChange={(_, v) => setExerciseName(v)}
            renderInput={(params) => (
              <TextField {...params} label="Exercise name" placeholder="e.g., Knee flexion" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              // add to library if new
              if (exerciseName.trim()) {
                const def = addExerciseToLibrary(exerciseName.trim());
                setExerciseLib(getExerciseLibrary());
              }
              handleAddSession();
            }}
            disabled={!exerciseName.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarToday;


