"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onClear: () => void;
}

export const CategoryFilterModal: React.FC<CategoryFilterModalProps> = ({
  open,
  onOpenChange,
  categories,
  selectedCategories,
  onToggleCategory,
  onClear,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filter by Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-muted">
              {selectedCategories.length > 0
                ? `${selectedCategories.length} categor${selectedCategories.length === 1 ? 'y' : 'ies'} selected`
                : 'Select categories to filter concepts'}
            </p>
            {selectedCategories.length > 0 && (
              <Button variant="ghost" size="sm" onClick={onClear}>
                Clear All
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const isSelected = selectedCategories.includes(category);
              return (
                <Badge
                  key={category}
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all",
                    isSelected && "ring-2 ring-accent-primary"
                  )}
                  onClick={() => onToggleCategory(category)}
                >
                  {category}
                  {isSelected && <X className="w-3 h-3 ml-1" />}
                </Badge>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

