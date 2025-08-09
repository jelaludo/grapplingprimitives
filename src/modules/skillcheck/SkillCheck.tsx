import React, { useMemo, useState } from 'react';
import data from './grappling_assessment_126q.json';
import { Box, Button, Typography, LinearProgress, Stack, Divider } from '@mui/material';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type QA = { id: string; text: string; level: 'basic'|'intermediate'|'advanced'; required?: boolean; categoryIndex?: number; categoryName?: string };

const weights = (data as any).assessment.scoring.weights;
const categories = (data as any).assessment.categories as Array<{ id: string; name: string; questions: QA[] }>;

const ratingColor = (v: number): string => {
  if (v <= 1) return '#bdbdbd';
  if (v === 2) return '#c9c9c9';
  if (v === 3) return '#d6d6d6';
  if (v === 4) return '#d6c74a';
  if (v === 5) return '#e4d24a';
  if (v === 6) return '#f0db4a';
  if (v === 7) return '#81c784';
  if (v === 8) return '#66bb6a';
  if (v === 9) return '#43a047';
  return '#2e7d32';
};

const containedTextColor = (v: number): string => (v <= 6 ? '#000' : '#fff');

const SkillCheck: React.FC = () => {
  const [mode, setMode] = useState<'setup'|'assessment'|'results'>('setup');
  const [assessmentType, setAssessmentType] = useState<'sample'|'all'>('sample');
  const [questions, setQuestions] = useState<QA[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    try { return JSON.parse(localStorage.getItem('skillcheck_answers') || '{}'); } catch { return {}; }
  });
  const [idx, setIdx] = useState(0);
  const current = questions[idx];

  const buildQuestions = (type: 'sample'|'all') => {
    const list: QA[] = [];
    categories.forEach((cat, catIdx) => {
      if (type === 'all') {
        list.push(...cat.questions.map(q => ({ ...q, categoryIndex: catIdx, categoryName: cat.name })));
      } else {
        const req = cat.questions.filter(q => q.required);
        const non = cat.questions.filter(q => !q.required);
        const shuffled = [...non].sort(() => 0.5 - Math.random());
        const need = Math.max(0, 5 - req.length);
        list.push(...[...req, ...shuffled.slice(0, need)].map(q => ({ ...q, categoryIndex: catIdx, categoryName: cat.name })));
      }
    });
    return list;
  };

  const start = () => {
    const qs = buildQuestions(assessmentType);
    setQuestions(qs);
    setIdx(0);
    setMode('assessment');
  };

  const handle = (id: string, v: number) => {
    const next = { ...answers, [id]: v };
    setAnswers(next);
    localStorage.setItem('skillcheck_answers', JSON.stringify(next));
  };

  const results = useMemo(() => {
    if (mode !== 'results') return null;
    const catScores: Record<string, any> = {};
    let total = 0, max = 0;
    categories.forEach((cat, catIdx) => {
      const qs = questions.filter(q => q.categoryIndex === catIdx);
      let s = 0, m = 0;
      qs.forEach(q => { const a = answers[q.id] || 1; const w = (weights as any)[q.level]; s += a * w; m += 10 * w; });
      const pct = m ? (s / m) * 100 : 0;
      catScores[cat.id] = { name: cat.name, score: pct };
      total += s; max += m;
    });
    return { overall: max ? (total / max) * 100 : 0, cats: catScores };
  }, [mode, answers, questions]);

  if (mode === 'setup') {
    return (
      <Box sx={{ p: 2, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h5" sx={{ mb: 1 }}>{(data as any).assessment.title}</Typography>
        <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>{(data as any).assessment.description}</Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => { setAssessmentType('sample'); const qs = buildQuestions('sample'); setQuestions(qs); setIdx(0); setMode('assessment'); }}
          >
            Quick (3–5 min)
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>5 questions / category</Typography>
          </Button>
          <Button
            variant="outlined"
            onClick={() => { setAssessmentType('all'); const qs = buildQuestions('all'); setQuestions(qs); setIdx(0); setMode('assessment'); }}
          >
            Long (5–10 min)
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>(all questions)</Typography>
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ mb: 1 }}>Assessment Categories</Typography>
        <Typography variant="body2" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
          Takedowns
          {'\n'}Guard Passing
          {'\n'}Guard Retention
          {'\n'}Closed Guard
          {'\n'}Open Guard
          {'\n'}Half Guard
          {'\n'}Mount
          {'\n'}Back Control
          {'\n'}Leg Locks
          {'\n'}Escapes & Defense
        </Typography>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ mb: 1 }}>How to Use This Assessment</Typography>
        <ul style={{ marginTop: 0 }}>
          <li>Rate your confidence from 1 (no confidence) to 10 (complete confidence)</li>
          <li>Advanced questions carry more weight in your final score</li>
          <li>Be honest — this is for your personal development</li>
          <li>Focus on your current abilities, not future goals</li>
          <li>Results will highlight strengths and areas for improvement</li>
        </ul>
      </Box>
    );
  }

  if (mode === 'assessment' && current) {
    const currentAnswer = answers[current.id] || 0;
    const total = questions.length;
    const answered = questions.filter(q => answers[q.id] != null).length;
    const inCatTotal = questions.filter(q => q.categoryIndex === current.categoryIndex).length;
    const inCatAnswered = questions
      .slice(0, idx + 1)
      .filter(q => q.categoryIndex === current.categoryIndex).length;
    return (
      <Box sx={{ p: 2, maxWidth: 900, mx: 'auto' }}>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Stack spacing={1}>
              <Typography variant="body2">
                Category {((current.categoryIndex || 0) + 1)} of {categories.length} · {current.categoryName}
              </Typography>
              <Typography variant="body2">Question {inCatAnswered} of {inCatTotal} in this category</Typography>
              <LinearProgress variant="determinate" value={(answered / total) * 100} />
              <Typography variant="caption" sx={{ textAlign: 'right' }}>{answered}/{total}</Typography>
            </Stack>
          </Box>
          <Box sx={{ flex: '0 0 auto' }}>
            <Button onClick={() => setMode('results')}>Finish</Button>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(10, minmax(44px, 1fr))', gap: 1, mb: 2 }}>
            {[1,2,3,4,5,6,7,8,9,10].map(v => (
              <Button
                key={v}
                variant={currentAnswer === v ? 'contained' : 'outlined'}
                onClick={() => { handle(current.id, v); if (idx < questions.length - 1) setIdx(i => i + 1); else setMode('results'); }}
                sx={{
                  fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace',
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '0.05em',
                  textTransform: 'none',
                  fontSize: { xs: 18, sm: 20 },
                  py: { xs: 1, sm: 1.25 },
                  minWidth: { xs: 44, sm: 52 },
                  color: currentAnswer === v ? containedTextColor(v) : ratingColor(v),
                  borderColor: ratingColor(v),
                  '&:hover': { borderColor: ratingColor(v), color: ratingColor(v) },
                  ...(currentAnswer === v
                    ? { backgroundColor: ratingColor(v), '&:hover': { backgroundColor: ratingColor(v) } }
                    : {})
                }}
              >
                {v}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Button disabled={idx === 0} onClick={() => setIdx(i => Math.max(0, i - 1))}>Previous</Button>
            <Button onClick={() => { if (idx < questions.length - 1) setIdx(i => i + 1); else setMode('results'); }}>Next</Button>
          </Box>
          <Typography
            variant="h6"
            sx={{ mb: 1, minHeight: { xs: 72, sm: 84 }, lineHeight: 1.4, wordBreak: 'break-word' }}
          >
            {current.text}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (mode === 'results' && results) {
    const radar = Object.values(results.cats).map((c: any) => ({ subject: c.name, score: Math.round(c.score), fullMark: 100 }));
    return (
      <Box sx={{ p: 2, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>Overall: {Math.round(results.overall)}%</Typography>
        <Box sx={{ height: { xs: '60vh', md: '70vh' }, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radar} outerRadius="80%">
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 14 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Radar name="Score" dataKey="score" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button onClick={() => { setMode('setup'); }}>New Assessment</Button>
        </Box>
      </Box>
    );
  }

  return null;
};

export default SkillCheck;


