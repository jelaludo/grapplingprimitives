"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { BJJConcept } from '@/types/concepts';

interface CardDetailDialogProps {
  open: boolean;
  concept: BJJConcept | null;
  onClose: () => void;
}

export const CardDetailDialog: React.FC<CardDetailDialogProps> = ({
  open,
  concept,
  onClose,
}) => {
  if (!concept) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{concept.concept}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: concept.color }}
            />
            <Badge variant="outline" className="text-xs">
              {concept.category}
            </Badge>
          </div>
          <p className="text-sm text-text-primary whitespace-pre-wrap">
            {concept.description || concept.short_description || 'No description available.'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

