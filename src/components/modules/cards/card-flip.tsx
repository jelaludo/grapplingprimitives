"use client";

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BJJConcept } from '@/types/concepts';

interface CardFlipProps {
  concept: BJJConcept;
  onStage: (id: string) => void;
  onOpen?: (concept: BJJConcept) => void;
  compact?: boolean;
}

export const CardFlip: React.FC<CardFlipProps> = ({ concept, onStage, onOpen, compact = false }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    if (onOpen) {
      onOpen(concept);
    } else {
      setFlipped(v => !v);
    }
  };

  return (
    <div
      className={cn(
        "relative cursor-pointer transition-transform duration-200",
        compact && "hover:scale-105 hover:z-10"
      )}
      onClick={handleClick}
      role="button"
      aria-pressed={flipped}
      tabIndex={0}
    >
      <div
        className={cn(
          "relative w-full h-[180px] transition-transform duration-[450ms]",
          flipped && "[transform:rotateY(180deg)]"
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-between p-4 rounded-xl",
            "bg-bg-raised border border-border-subtle shadow-card"
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={cn(
            "text-xs text-text-muted transition-opacity duration-200",
            compact && "opacity-0 group-hover:opacity-100"
          )}>
            {concept.category}
          </div>
          <div className={cn(
            "text-lg font-bold transition-opacity duration-200",
            compact && "opacity-0 group-hover:opacity-100"
          )}>
            {concept.concept}
          </div>
          <div className="flex justify-between items-center">
            <Badge
              variant="outline"
              className="text-xs cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onStage(concept.id);
              }}
            >
              Stage
            </Badge>
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: concept.color }}
            />
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 p-4 rounded-xl flex flex-col gap-2",
            "bg-bg-raised border border-border-subtle shadow-card"
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-xs text-text-muted">{concept.concept}</div>
          <div className="text-sm text-text-primary overflow-hidden flex-1">
            {concept.short_description || concept.description || 'No description available.'}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="self-start"
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
          >
            <X className="w-3 h-3 mr-1" />
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

