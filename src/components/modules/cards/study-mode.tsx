"use client";

import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BJJConcept } from '@/types/concepts';

interface StudyModeProps {
  concepts: BJJConcept[];
  onExit: () => void;
  onRate: (id: string, rating: number) => void;
}

export const StudyMode: React.FC<StudyModeProps> = ({ concepts, onExit, onRate }) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [value, setValue] = useState<number>(5);

  const current = useMemo(() => concepts[index], [concepts, index]);
  const atEnd = index >= concepts.length - 1;

  if (!current) {
    return (
      <div className="p-6 space-y-4">
        <p className="text-text-muted">No concepts selected.</p>
        <Button onClick={onExit}>Back</Button>
      </div>
    );
  }

  const handleNext = () => {
    onRate(current.id, value);
    setFlipped(false);
    setValue(5);
    setIndex(i => Math.min(i + 1, concepts.length - 1));
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-muted">
          {index + 1} / {concepts.length}
        </span>
        <Button variant="ghost" size="sm" onClick={onExit}>
          Exit
        </Button>
      </div>

      <div
        className="relative h-[240px] cursor-pointer"
        onClick={() => setFlipped(v => !v)}
      >
        <div
          className={cn(
            "absolute inset-0 transition-transform duration-[400ms]",
            flipped && "[transform:rotateY(180deg)]"
          )}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className={cn(
              "absolute inset-0 p-6 rounded-xl flex items-center justify-center",
              "bg-bg-raised border border-border-subtle shadow-card"
            )}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <h3 className="text-2xl font-bold text-center">{current.concept}</h3>
          </div>

          {/* Back */}
          <div
            className={cn(
              "absolute inset-0 p-6 rounded-xl flex items-center justify-center",
              "bg-bg-raised border border-border-subtle shadow-card"
            )}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <p className="text-base text-center text-text-primary">
              {current.short_description || current.description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm text-text-muted">
          How confident are you with this concept?
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full h-2 bg-bg-raised rounded-lg appearance-none cursor-pointer accent-accent-primary"
          />
          <div className="flex justify-between text-xs text-text-muted">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <span key={n} className={n % 2 === 1 ? 'font-medium' : ''}>
                {n % 2 === 1 ? n : ''}
              </span>
            ))}
          </div>
          <div className="text-center text-sm font-semibold text-accent-primary">
            {value} / 10
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button onClick={handleNext}>
          {atEnd ? 'Finish' : 'Next'}
          {!atEnd && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
};

