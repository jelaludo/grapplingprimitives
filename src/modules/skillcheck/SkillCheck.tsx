import React, { useMemo, useState } from 'react';
import data from './grappling_assessment_126q.json';
import { Box, Button, Typography, LinearProgress, Stack, Divider } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type QA = { id: string; text: string; level: 'basic'|'intermediate'|'advanced'; required?: boolean; categoryIndex?: number; categoryName?: string };

const weights = (data as any).assessment.scoring.weights;
const allCategories = (data as any).assessment.categories as Array<{ id: string; name: string; questions: QA[] }>;
// Use categories directly from JSON, but normalize the display name for the first one
const categories = allCategories.map((c) => ({
  ...c,
  name: c.name === 'Takedowns & Wrestling' ? 'Takedowns' : c.name,
}));

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
      const allQs = Array.isArray(cat.questions) ? cat.questions : [];
      if (allQs.length === 0) return; // skip empty categories safely

      if (type === 'all') {
        list.push(...allQs.map(q => ({ ...q, categoryIndex: catIdx, categoryName: cat.name })));
      } else {
        const requiredQs = allQs.filter(q => q.required);
        const optionalQs = allQs.filter(q => !q.required);
        const pick = <T,>(arr: T[], n: number) => {
          const a = [...arr];
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }
          return a.slice(0, n);
        };
        let chosen: QA[] = [];
        const target = Math.min(5, allQs.length);
        if (requiredQs.length >= target) {
          chosen = pick(requiredQs, target) as QA[];
        } else {
          const need = target - requiredQs.length;
          chosen = [...requiredQs, ...pick(optionalQs, need) as QA[]];
        }
        list.push(...chosen.map(q => ({ ...q, categoryIndex: catIdx, categoryName: cat.name })));
      }
    });
    return list;
  };

  const start = () => {
    localStorage.removeItem('skillcheck_answers');
    setAnswers({});
    const qs = buildQuestions(assessmentType);
    if (qs.length === 0) return;
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

  const catDone = useMemo(() => {
    const status: boolean[] = new Array(categories.length).fill(false);
    categories.forEach((_, catIdx) => {
      const qs = questions.filter(q => q.categoryIndex === catIdx);
      status[catIdx] = qs.length > 0 && qs.every(q => answers[q.id] != null);
    });
    return status;
  }, [answers, questions]);

  // Landing metrics and preview data
  const shortTotal = useMemo(() => categories.length * 5, []);
  const longTotal = useMemo(() => categories.reduce((sum, c) => sum + (Array.isArray(c.questions) ? c.questions.length : 0), 0), []);
  const previewData = useMemo(() => (
    categories.slice(0, 10).map(c => ({ subject: c.name, score: Math.floor(40 + Math.random() * 60), fullMark: 100 }))
  ), []);

  if (mode === 'setup') {
    return (
      <Box sx={{ p: 2, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h5" sx={{ mb: 1 }}>{(data as any).assessment.title}</Typography>
        <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>{(data as any).assessment.description}</Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mb: 3, alignItems: 'flex-start' }}>
          <Box>
            <Button variant="contained" color="primary" onClick={() => { setAssessmentType('sample'); const qs = buildQuestions('sample'); if (qs.length === 0) return; setAnswers({}); localStorage.removeItem('skillcheck_answers'); setQuestions(qs); setIdx(0); setMode('assessment'); }}>SHORT</Button>
            <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line', opacity: 0.8 }}>
              {`5 questions per category\n(${shortTotal} total)\napprox. 3–5 min`}
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined" onClick={() => { setAssessmentType('all'); const qs = buildQuestions('all'); if (qs.length === 0) return; setAnswers({}); localStorage.removeItem('skillcheck_answers'); setQuestions(qs); setIdx(0); setMode('assessment'); }}>LONG</Button>
            <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line', opacity: 0.8 }}>
              {`10+ questions per category\n${longTotal} questions\napprox. 7–10 min`}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ mb: 1 }}>Assessment Categories</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, alignItems: 'start', mb: 2 }}>
          <Stack spacing={0.5}>
            {categories.map((c, i) => (
              <Typography key={c.id} variant="body2">{i + 1}. {c.name}</Typography>
            ))}
          </Stack>
          <Box sx={{ display: 'block', height: { xs: 220, md: 300 }, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={previewData} outerRadius={window.innerWidth < 600 ? '70%' : '80%'}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: window.innerWidth < 600 ? 10 : 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: window.innerWidth < 600 ? 8 : 10 }} />
                <Radar name="Preview" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

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
              <Typography variant="body2">Question {inCatAnswered} of {inCatTotal}</Typography>
              <LinearProgress variant="determinate" value={(answered / total) * 100} />
          <Typography variant="caption" sx={{ textAlign: 'right' }}>{answered}/{total}</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 0.75, mt: 0.5 }}>
                {categories.map((cat, i) => (
                  <Box key={cat.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 18 }}>
                    {catDone[i] ? (
                      <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 16, color: 'success.main' }} />
                    ) : (
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', border: '1px solid', borderColor: 'divider', bgcolor: i === (current.categoryIndex || 0) ? 'primary.main' : 'transparent' }} />
                    )}
                  </Box>
                ))}
              </Box>
            </Stack>
          </Box>
          <Box sx={{ flex: '0 0 auto', display: 'flex', gap: 1 }}>
            <Button onClick={() => { localStorage.removeItem('skillcheck_answers'); setAnswers({}); setIdx(0); const qs = buildQuestions(assessmentType); setQuestions(qs); setMode('assessment'); }}>Reset</Button>
            <Button onClick={() => setMode('results')}>Finish</Button>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(5, 1fr)', sm: 'repeat(10, minmax(40px, 1fr))' }, gap: 1, mb: 2 }}>
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
                  fontSize: { xs: 16, sm: 18, md: 20 },
                  py: { xs: 0.75, sm: 1 },
                  minWidth: { xs: 40, sm: 48, md: 52 },
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
            sx={{ mb: 1, minHeight: { xs: '4.2em', sm: '4.2em' }, maxHeight: { xs: '4.2em', sm: '4.2em' }, overflow: 'hidden', lineHeight: 1.4, wordBreak: 'break-word' }}
          >
            {current.text}
          </Typography>
        </Box>

        {/* Numbered category list with completion status under the question; fixed position regardless of question length */}
        <Box sx={{ mt: 2, borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
          <Stack spacing={0.75}>
            {categories.map((cat, i) => (
              <Box key={cat.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box component="span" sx={{ width: 20, display: 'inline-block', textAlign: 'right', opacity: 0.8 }}>{i + 1}.</Box>
                  {cat.name}
                </Typography>
                {catDone[i] ? (
                  <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18, color: 'success.main' }} />
                ) : (
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', border: '1px solid', borderColor: 'divider', bgcolor: i === (current.categoryIndex || 0) ? 'primary.main' : 'transparent' }} />
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    );
  }

  if (mode === 'results' && results) {
    const radar = Object.values(results.cats).map((c: any) => ({ subject: c.name, score: Math.round(c.score), fullMark: 100 }));
    return (
        <Box sx={{ p: 2, width: '100%' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>Overall: {Math.round(results.overall)}%</Typography>
          <Box sx={{ height: { xs: 320, sm: 420, md: '70vh' }, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radar} outerRadius={typeof window !== 'undefined' && window.innerWidth < 600 ? '70%' : '85%'}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 600 ? 10 : 14 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 600 ? 9 : 12 }} />
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


