"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, Play } from 'lucide-react';
import { loadConcepts } from '@/lib/data/load-concepts';
import { CategoryFilterModal } from './category-filter-modal';
import { AnkiStudyMode } from './anki-study-mode';
import type { BJJConcept } from '@/types/concepts';

export const CardsView: React.FC = () => {
  const [concepts, setConcepts] = useState<BJJConcept[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = window.localStorage.getItem('cardRatings');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    loadConcepts()
      .then((data) => {
        // Convert ConceptPoint back to BJJConcept format for cards
        const bjjConcepts: BJJConcept[] = data.concepts.map((cp) => {
          // Reverse the coordinate conversion to get back to 0-1 range
          const axis_mental_physical = (cp.x + 1) / 2;
          const axis_self_opponent = (-cp.y + 1) / 2;
          
          return {
            id: cp.id,
            concept: cp.label,
            description: cp.description || '',
            short_description: cp.description || '',
            category: cp.category,
            color: cp.color || '#6B7280',
            axis_self_opponent,
            axis_mental_physical,
            brightness: 0.5,
            size: 1,
          };
        });
        setConcepts(bjjConcepts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load concepts:', error);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = concepts.filter(c => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(c.category)) return false;
      if (!q) return true;
      return (
        c.concept.toLowerCase().includes(q) ||
        c.short_description.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    });
    // Return filtered list - will be shuffled in AnkiStudyMode
    return list;
  }, [concepts, query, selectedCategories]);

  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    concepts.forEach(c => cats.add(c.category));
    return Array.from(cats).sort();
  }, [concepts]);

  const toggleCategory = (name: string) => {
    setSelectedCategories(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  const handleRate = (id: string, rating: number) => {
    const newRatings = { ...ratings, [id]: rating };
    setRatings(newRatings);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cardRatings', JSON.stringify(newRatings));
    }
  };

  if (loading) {
    return (
      <div className="w-full p-8 text-center text-text-muted">
        Loading concepts...
      </div>
    );
  }

  if (studyMode && filtered.length > 0) {
    return (
      <AnkiStudyMode
        concepts={filtered}
        onExit={() => setStudyMode(false)}
        onRate={handleRate}
      />
    );
  }

  const hasFilters = query.trim().length > 0 || selectedCategories.length > 0;

  return (
    <div className="w-full space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              type="text"
              placeholder="Search concepts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowCategoryModal(true)}
            className="relative"
          >
            <Filter className="w-4 h-4 mr-2" />
            Categories
            {selectedCategories.length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-accent-primary text-white rounded-full">
                {selectedCategories.length}
              </span>
            )}
          </Button>
        </div>

        {/* Selected categories display */}
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-text-muted font-medium">Active filters:</span>
            {selectedCategories.map(category => (
              <Badge
                key={category}
                variant="default"
                className="cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      {hasFilters ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-muted">
              {filtered.length} concept{filtered.length !== 1 ? 's' : ''} found
            </div>
            {filtered.length > 0 && (
              <Button
                onClick={() => setStudyMode(true)}
                size="lg"
                className="gap-2"
              >
                <Play className="w-4 h-4" />
                Study {filtered.length} Cards
              </Button>
            )}
          </div>
          {filtered.length === 0 && (
            <div className="text-center text-text-muted py-12">
              No concepts found. Try adjusting your search or filters.
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-text-muted py-12 space-y-4">
          <p>Search for concepts or select categories to get started.</p>
          <p className="text-sm">Then click "Study Cards" to begin an ANKI-style study session.</p>
        </div>
      )}

      {/* Category Filter Modal */}
      <CategoryFilterModal
        open={showCategoryModal}
        onOpenChange={setShowCategoryModal}
        categories={availableCategories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        onClear={() => setSelectedCategories([])}
      />
    </div>
  );
};

