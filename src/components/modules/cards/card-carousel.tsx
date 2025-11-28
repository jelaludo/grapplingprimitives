"use client";

import React, { useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CardFlip } from './card-flip';
import { CardDetailDialog } from './card-detail-dialog';
import { cn } from '@/lib/utils';
import type { BJJConcept } from '@/types/concepts';

interface CardCarouselProps {
  concepts: BJJConcept[];
}

export const CardCarousel: React.FC<CardCarouselProps> = ({ concepts }) => {
  const [index, setIndex] = useState(0);
  const startXRef = useRef<number | null>(null);
  const [openConcept, setOpenConcept] = useState<BJJConcept | null>(null);

  const cardWidth = 280;
  const gap = 16;

  const clampedIndex = (i: number) => Math.max(0, Math.min(concepts.length - 1, i));
  const visibleSlice = useMemo(() => {
    const start = Math.max(0, index - 3);
    const end = Math.min(concepts.length, index + 4);
    return concepts.slice(start, end).map((c, iLocal) => ({ c, globalIndex: start + iLocal }));
  }, [concepts, index]);

  const translate = useMemo(() => {
    const centerOffset = (typeof window !== 'undefined' ? window.innerWidth : 1024 - cardWidth) / 2;
    return -(index * (cardWidth + gap)) + Math.max(0, centerOffset);
  }, [index, cardWidth, gap]);

  return (
    <div
      className="relative w-full overflow-hidden py-6"
      onTouchStart={(e) => { startXRef.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (startXRef.current == null) return;
        const dx = e.changedTouches[0].clientX - startXRef.current;
        if (Math.abs(dx) > 40) setIndex((i) => clampedIndex(i + (dx < 0 ? 1 : -1)));
        startXRef.current = null;
      }}
    >
      <div className="absolute top-2 left-4 text-xs text-text-muted">
        {index + 1} / {concepts.length}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-bg-raised/80 hover:bg-bg-raised"
        onClick={() => setIndex(i => clampedIndex(i - 1))}
        aria-label="Previous card"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-bg-raised/80 hover:bg-bg-raised"
        onClick={() => setIndex(i => clampedIndex(i + 1))}
        aria-label="Next card"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      <div className="h-[240px] relative">
        <div
          className="flex gap-4 transition-transform duration-400 ease-out"
          style={{
            transform: `translateX(${translate}px)`,
            willChange: 'transform',
          }}
        >
          {visibleSlice.map(({ c, globalIndex }) => {
            const d = Math.abs(globalIndex - index);
            const scale = Math.max(0.8, 1 - d * 0.08);
            const opacity = Math.max(0.4, 1 - d * 0.2);
            return (
              <div
                key={c.id}
                className="flex-shrink-0"
                style={{
                  width: cardWidth,
                  transform: `scale(${scale})`,
                  opacity,
                }}
              >
                <CardFlip concept={c} onStage={() => {}} onOpen={setOpenConcept} />
              </div>
            );
          })}
        </div>
      </div>
      <CardDetailDialog open={Boolean(openConcept)} concept={openConcept} onClose={() => setOpenConcept(null)} />
    </div>
  );
};

