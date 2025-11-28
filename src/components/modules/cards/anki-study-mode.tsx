"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BJJConcept } from '@/types/concepts';

interface AnkiStudyModeProps {
  concepts: BJJConcept[];
  onExit: () => void;
  onRate: (id: string, rating: number) => void;
}

type StudyPhase = 'question' | 'answer' | 'rating';

// Self-assessment ratings: Again, Hard, Good, Easy
const RATINGS = [
  { value: 1, label: 'Again', icon: XCircle, color: 'text-red-400' },
  { value: 2, label: 'Hard', icon: HelpCircle, color: 'text-orange-400' },
  { value: 3, label: 'Good', icon: CheckCircle, color: 'text-green-400' },
  { value: 4, label: 'Easy', icon: CheckCircle, color: 'text-blue-400' },
];

export const AnkiStudyMode: React.FC<AnkiStudyModeProps> = ({
  concepts,
  onExit,
  onRate,
}) => {
  const [shuffledConcepts, setShuffledConcepts] = useState<BJJConcept[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<StudyPhase>('question');
  const [flipped, setFlipped] = useState(false);

  // Shuffle concepts on mount
  useEffect(() => {
    const shuffled = [...concepts].sort(() => Math.random() - 0.5);
    setShuffledConcepts(shuffled);
  }, [concepts]);

  // Reset card state when moving to a new card
  useEffect(() => {
    setFlipped(false);
    setPhase('question');
  }, [currentIndex]);

  const current = shuffledConcepts[currentIndex];
  const progress = shuffledConcepts.length > 0 
    ? ((currentIndex + (phase === 'answer' ? 1 : 0)) / shuffledConcepts.length) * 100 
    : 0;
  const isLast = currentIndex >= shuffledConcepts.length - 1 && phase === 'answer';

  const handleFlip = () => {
    if (phase === 'question') {
      setFlipped(true);
      setPhase('answer');
    }
  };

  const handleRating = (rating: number) => {
    if (current) {
      onRate(current.id, rating);
    }
    
    if (isLast) {
      // Finished all cards
      onExit();
    } else {
      // Move to next card - useEffect will reset the state
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (shuffledConcepts.length === 0) {
    return (
      <div className="p-6 text-center text-text-muted">
        No concepts to study.
        <Button onClick={onExit} className="mt-4">Back</Button>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg font-semibold mb-4">Study session complete!</p>
        <Button onClick={onExit}>Return to Cards</Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-text-muted">
          <span>Card {currentIndex + 1} of {shuffledConcepts.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-bg-raised rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="relative min-h-[400px]">
        <div
          className="relative w-full h-full"
          style={{
            perspective: '1000px',
          }}
        >
          <div
            className={cn(
              "relative w-full h-full transition-transform duration-500",
              "transform-style-preserve-3d"
            )}
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front (Question) */}
            <Card
              className={cn(
                "absolute inset-0 cursor-pointer",
                phase === 'question' && "hover:border-accent-primary"
              )}
              onClick={phase === 'question' ? handleFlip : undefined}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <CardContent className="p-8 h-full flex items-center justify-center min-h-[400px]">
                <div className="w-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="mb-2">
                    <div
                      className="w-3 h-3 rounded-full inline-block mr-2"
                      style={{ backgroundColor: current.color }}
                    />
                    <span className="text-sm text-text-muted">{current.category}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold px-4 break-words">{current.concept}</h2>
                  <p className="text-text-muted text-sm">Click to reveal answer</p>
                </div>
              </CardContent>
            </Card>

            {/* Back (Answer) */}
            <Card
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <CardContent className="p-8 h-full flex items-center justify-center min-h-[400px] overflow-y-auto">
                <div className="w-full flex flex-col items-center justify-center text-center space-y-4 max-w-3xl">
                  <div className="mb-2">
                    <div
                      className="w-3 h-3 rounded-full inline-block mr-2"
                      style={{ backgroundColor: current.color }}
                    />
                    <span className="text-sm text-text-muted">{current.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold px-4 break-words">{current.concept}</h2>
                  <div className="w-full px-4">
                    <p className="text-base sm:text-lg text-text-primary whitespace-pre-wrap break-words overflow-wrap-anywhere">
                      {current.description || current.short_description || 'No description available.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Controls */}
      {phase === 'answer' && (
        <div className="space-y-4">
          <div className="text-center text-sm text-text-muted mb-4">
            How well did you know this?
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {RATINGS.map(({ value, label, icon: Icon, color }) => (
              <Button
                key={value}
                variant="outline"
                className={cn(
                  "flex flex-col items-center gap-2 h-auto py-4",
                  "hover:border-accent-primary hover:bg-accent-primary/10"
                )}
                onClick={() => handleRating(value)}
              >
                <Icon className={cn("w-6 h-6", color)} />
                <span className="text-xs font-medium">{label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-border-subtle">
        <Button variant="ghost" onClick={onExit}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Exit Study
        </Button>
        {phase === 'answer' && (
          <Button
            variant="outline"
            onClick={() => {
              setFlipped(false);
              setPhase('question');
            }}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Back to Question
          </Button>
        )}
      </div>
    </div>
  );
};

