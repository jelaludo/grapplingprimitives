"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import assessmentData from '@/data/grappling_assessment_126q.json';
import { cn } from '@/lib/utils';

type QA = {
  id: string;
  text: string;
  level: 'basic' | 'intermediate' | 'advanced';
  required?: boolean;
  categoryIndex?: number;
  categoryName?: string;
};

type AssessmentMode = 'setup' | 'assessment' | 'results';

const weights = assessmentData.assessment.scoring.weights;
const allCategories = assessmentData.assessment.categories as Array<{
  id: string;
  name: string;
  questions: QA[];
}>;

// Normalize category names
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

export const SkillCheck: React.FC = () => {
  const [mode, setMode] = useState<AssessmentMode>('setup');
  const [assessmentType, setAssessmentType] = useState<'sample' | 'all'>('sample');
  const [questions, setQuestions] = useState<QA[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      return JSON.parse(localStorage.getItem('skillcheck_answers') || '{}');
    } catch {
      return {};
    }
  });
  const [idx, setIdx] = useState(0);
  const current = questions[idx];

  const buildQuestions = (type: 'sample' | 'all'): QA[] => {
    const list: QA[] = [];
    categories.forEach((cat, catIdx) => {
      const allQs = Array.isArray(cat.questions) ? cat.questions : [];
      if (allQs.length === 0) return;

      if (type === 'all') {
        list.push(
          ...allQs.map((q) => ({
            ...q,
            categoryIndex: catIdx,
            categoryName: cat.name,
          }))
        );
      } else {
        const requiredQs = allQs.filter((q) => q.required);
        const optionalQs = allQs.filter((q) => !q.required);
        const pick = <T,>(arr: T[], n: number): T[] => {
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
        list.push(
          ...chosen.map((q) => ({
            ...q,
            categoryIndex: catIdx,
            categoryName: cat.name,
          }))
        );
      }
    });
    return list;
  };

  const start = (type: 'sample' | 'all') => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('skillcheck_answers');
    }
    setAnswers({});
    setAssessmentType(type);
    const qs = buildQuestions(type);
    if (qs.length === 0) return;
    setQuestions(qs);
    setIdx(0);
    setMode('assessment');
  };

  const handleAnswer = (id: string, v: number) => {
    const next = { ...answers, [id]: v };
    setAnswers(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('skillcheck_answers', JSON.stringify(next));
    }
    if (idx < questions.length - 1) {
      setIdx((i) => i + 1);
    } else {
      setMode('results');
    }
  };

  const results = useMemo(() => {
    if (mode !== 'results') return null;
    const catScores: Record<string, { name: string; score: number }> = {};
    let total = 0,
      max = 0;
    categories.forEach((cat, catIdx) => {
      const qs = questions.filter((q) => q.categoryIndex === catIdx);
      let s = 0,
        m = 0;
      qs.forEach((q) => {
        const a = answers[q.id] || 1;
        const w = (weights as any)[q.level];
        s += a * w;
        m += 10 * w;
      });
      const pct = m ? (s / m) * 100 : 0;
      catScores[cat.id] = { name: cat.name, score: pct };
      total += s;
      max += m;
    });
    return { overall: max ? (total / max) * 100 : 0, cats: catScores };
  }, [mode, answers, questions]);

  const catDone = useMemo(() => {
    const status: boolean[] = new Array(categories.length).fill(false);
    categories.forEach((_, catIdx) => {
      const qs = questions.filter((q) => q.categoryIndex === catIdx);
      status[catIdx] = qs.length > 0 && qs.every((q) => answers[q.id] != null);
    });
    return status;
  }, [answers, questions]);

  // Landing metrics
  const shortTotal = useMemo(() => categories.length * 5, []);
  const longTotal = useMemo(
    () =>
      categories.reduce(
        (sum, c) => sum + (Array.isArray(c.questions) ? c.questions.length : 0),
        0
      ),
    []
  );
  const previewData = useMemo(
    () =>
      categories.slice(0, 10).map((c) => ({
        subject: c.name,
        score: Math.floor(40 + Math.random() * 60),
        fullMark: 100,
      })),
    []
  );

  // Setup Mode
  if (mode === 'setup') {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6 p-4 sm:p-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {assessmentData.assessment.title}
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            {assessmentData.assessment.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Short Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => start('sample')}
                size="lg"
                className="w-full"
              >
                START SHORT
              </Button>
              <div className="text-sm text-text-muted space-y-1">
                <p>5 questions per category</p>
                <p>({shortTotal} total)</p>
                <p>approx. 3–5 min</p>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Complete Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => start('all')}
                variant="outline"
                size="lg"
                className="w-full"
              >
                START LONG
              </Button>
              <div className="text-sm text-text-muted space-y-1">
                <p>10+ questions per category</p>
                <p>{longTotal} questions</p>
                <p>approx. 7–10 min</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assessment Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                {categories.map((c, i) => (
                  <div key={c.id} className="text-sm text-text-primary">
                    {i + 1}. {c.name}
                  </div>
                ))}
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={previewData}
                    outerRadius={typeof window !== 'undefined' && window.innerWidth < 600 ? '70%' : '80%'}
                  >
                    <PolarGrid />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 600 ? 10 : 12 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fontSize: typeof window !== 'undefined' && window.innerWidth < 600 ? 8 : 10 }}
                    />
                    <Radar
                      name="Preview"
                      dataKey="score"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Use This Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-text-muted list-disc list-inside">
              <li>Rate your confidence from 1 (no confidence) to 10 (complete confidence)</li>
              <li>Advanced questions carry more weight in your final score</li>
              <li>Be honest — this is for your personal development</li>
              <li>Focus on your current abilities, not future goals</li>
              <li>Results will highlight strengths and areas for improvement</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Assessment Mode
  if (mode === 'assessment' && current) {
    const currentAnswer = answers[current.id] || 0;
    const total = questions.length;
    const answered = questions.filter((q) => answers[q.id] != null).length;
    const inCatTotal = questions.filter(
      (q) => q.categoryIndex === current.categoryIndex
    ).length;
    const inCatAnswered = questions
      .slice(0, idx + 1)
      .filter((q) => q.categoryIndex === current.categoryIndex).length;

    return (
      <div className="w-full max-w-4xl mx-auto space-y-6 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 space-y-2">
            <div className="text-sm text-text-muted">
              Category {((current.categoryIndex || 0) + 1)} of {categories.length} · {current.categoryName}
            </div>
            <div className="text-sm text-text-muted">
              Question {inCatAnswered} of {inCatTotal}
            </div>
            <Progress value={(answered / total) * 100} className="h-2" />
            <div className="text-xs text-text-muted text-right">
              {answered}/{total}
            </div>
            <div className="grid grid-cols-10 gap-1 mt-2">
              {categories.map((cat, i) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-center h-4"
                >
                  {catDone[i] ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <Circle
                      className={cn(
                        'w-3 h-3',
                        i === (current.categoryIndex || 0)
                          ? 'text-accent-primary fill-accent-primary'
                          : 'text-border-subtle'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('skillcheck_answers');
                }
                setAnswers({});
                setIdx(0);
                const qs = buildQuestions(assessmentType);
                setQuestions(qs);
                setMode('assessment');
              }}
            >
              Reset
            </Button>
            <Button onClick={() => setMode('results')}>Finish</Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
                <Button
                  key={v}
                  variant={currentAnswer === v ? 'default' : 'outline'}
                  onClick={() => handleAnswer(current.id, v)}
                  className={cn(
                    'font-mono tabular-nums text-base sm:text-lg md:text-xl',
                    'min-w-[40px] sm:min-w-[48px] md:min-w-[52px]',
                    currentAnswer === v
                      ? 'text-white'
                      : 'text-text-primary'
                  )}
                  style={
                    currentAnswer === v
                      ? { backgroundColor: ratingColor(v), borderColor: ratingColor(v) }
                      : { borderColor: ratingColor(v), color: ratingColor(v) }
                  }
                >
                  {v}
                </Button>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                disabled={idx === 0}
                onClick={() => setIdx((i) => Math.max(0, i - 1))}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  if (idx < questions.length - 1) {
                    setIdx((i) => i + 1);
                  } else {
                    setMode('results');
                  }
                }}
              >
                Next
              </Button>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold min-h-[4.2em] leading-relaxed break-words">
              {current.text}
            </h3>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categories.map((cat, i) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between py-1"
                >
                  <div className="text-sm text-text-primary flex items-center gap-2">
                    <span className="w-5 text-right text-text-muted">{i + 1}.</span>
                    {cat.name}
                  </div>
                  {catDone[i] ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <Circle
                      className={cn(
                        'w-3 h-3',
                        i === (current.categoryIndex || 0)
                          ? 'text-accent-primary fill-accent-primary'
                          : 'text-border-subtle'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results Mode
  if (mode === 'results' && results) {
    const radar = Object.values(results.cats).map((c: any) => ({
      subject: c.name,
      score: Math.round(c.score),
      fullMark: 100,
    }));

    return (
      <div className="w-full max-w-4xl mx-auto space-y-6 p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl sm:text-3xl">
              Overall: {Math.round(results.overall)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] sm:h-[420px] md:h-[70vh] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={radar}
                  outerRadius={
                    typeof window !== 'undefined' && window.innerWidth < 600 ? '70%' : '85%'
                  }
                >
                  <PolarGrid />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fontSize: typeof window !== 'undefined' && window.innerWidth < 600 ? 10 : 14,
                    }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{
                      fontSize: typeof window !== 'undefined' && window.innerWidth < 600 ? 9 : 12,
                    }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <Button onClick={() => setMode('setup')}>New Assessment</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

