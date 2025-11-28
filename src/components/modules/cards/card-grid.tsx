"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardFlip } from './card-flip';
import { CardStage } from './card-stage';
import { StudyMode } from './study-mode';
import { CardDetailDialog } from './card-detail-dialog';
import type { BJJConcept } from '@/types/concepts';

interface CardGridProps {
  concepts: BJJConcept[];
  selectedCategories: string[];
}

export const CardGrid: React.FC<CardGridProps> = ({ concepts, selectedCategories }) => {
  const [studyMode, setStudyMode] = useState(false);
  const [openConcept, setOpenConcept] = useState<BJJConcept | null>(null);
  const [staged, setStaged] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = window.localStorage.getItem('cardRatings');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const filtered = concepts;

  const toggleStage = (id: string) => {
    setStaged(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const setConceptRating = (id: string, rating: number) => {
    const newRatings = { ...ratings, [id]: rating };
    setRatings(newRatings);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cardRatings', JSON.stringify(newRatings));
    }
  };

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => setStudyMode(true)}
          disabled={filtered.length === 0}
        >
          Study {filtered.length}
        </Button>
      </div>

      {studyMode ? (
        <StudyMode
          concepts={filtered}
          onExit={() => setStudyMode(false)}
          onRate={setConceptRating}
        />
      ) : (
        <>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            }}
          >
            {filtered.map(c => (
              <div key={c.id}>
                <CardFlip compact concept={c} onStage={toggleStage} onOpen={setOpenConcept} />
              </div>
            ))}
          </div>
          <CardStage concepts={concepts} stagedIds={staged} onToggleStage={toggleStage} />
          <CardDetailDialog open={Boolean(openConcept)} concept={openConcept} onClose={() => setOpenConcept(null)} />
        </>
      )}
    </div>
  );
};

