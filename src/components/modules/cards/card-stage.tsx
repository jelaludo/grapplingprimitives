"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BJJConcept } from '@/types/concepts';

interface CardStageProps {
  concepts: BJJConcept[];
  stagedIds: string[];
  onToggleStage: (id: string) => void;
}

export const CardStage: React.FC<CardStageProps> = ({ concepts, stagedIds, onToggleStage }) => {
  if (stagedIds.length === 0) return null;

  const staged = concepts.filter(c => stagedIds.includes(c.id));

  return (
    <div className="border-t border-border-subtle bg-bg-raised p-4 rounded-lg mt-4">
      <h3 className="text-sm font-semibold mb-3 text-text-primary">
        Staged ({staged.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        {staged.map(c => (
          <div
            key={c.id}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg border border-border-subtle"
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: c.color }}
            />
            <span className="text-sm text-text-primary">{c.concept}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0"
              onClick={() => onToggleStage(c.id)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

