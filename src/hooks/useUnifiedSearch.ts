import { useState, useMemo, useCallback } from 'react';
import { BJJConcept } from '../types/concepts';

interface UseUnifiedSearchProps {
  concepts: BJJConcept[];
  initialQuery?: string;
  initialCategories?: string[];
}

export const useUnifiedSearch = ({ 
  concepts, 
  initialQuery = '', 
  initialCategories = [] 
}: UseUnifiedSearchProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);

  // Unified filtering logic
  const filteredConcepts = useMemo(() => {
    // First filter by categories
    let filtered = selectedCategories.length === 0
      ? concepts
      : concepts.filter(c => selectedCategories.includes(c.category));

    // Then filter by search query - empty search shows NO results
    const searchTerm = query.trim().toLowerCase();
    if (!searchTerm) {
      // Empty search field = no results
      return [];
    }

    // Only show results if there's a search term
    filtered = filtered.filter(c =>
      c.concept.toLowerCase().includes(searchTerm) ||
      c.short_description.toLowerCase().includes(searchTerm) ||
      c.description.toLowerCase().includes(searchTerm)
    );

    return filtered;
  }, [concepts, query, selectedCategories]);

  // Search handlers
  const handleSearchChange = useCallback((newQuery: string) => {
    console.log('Unified search changed:', newQuery);
    // Immediate update for live search
    setQuery(newQuery);
  }, []);

  const handleSearchClear = useCallback(() => {
    setQuery('');
  }, []);

  const handleSearchEnter = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Unified search Enter pressed:', query);
      
      // If there's a search term, keep it and blur (confirm search)
      // If search is empty, this could trigger a "show all" or other action
      if (query.trim()) {
        // Search has content - confirm it
        (e.currentTarget as HTMLElement).blur();
      } else {
        // Empty search - could trigger "show all" or clear
        console.log('Enter pressed with empty search - could show all results');
      }
    }
  }, [query]);

  // Category handlers
  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }, []);

  const clearCategories = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  const setCategories = useCallback((categories: string[]) => {
    setSelectedCategories(categories);
  }, []);

  // Debug logging
  console.log('useUnifiedSearch state:', {
    query,
    queryTrimmed: query.trim(),
    hasSearch: query.trim().length > 0,
    filteredConceptsLength: filteredConcepts.length
  });

  return {
    // State
    query,
    selectedCategories,
    filteredConcepts,
    
    // Search actions
    setQuery: handleSearchChange,
    clearSearch: handleSearchClear,
    handleSearchEnter,
    
    // Category actions
    toggleCategory,
    clearCategories,
    setCategories,
    
    // Computed values
    hasSearch: query.trim().length > 0,
    hasCategoryFilter: selectedCategories.length > 0,
    resultCount: filteredConcepts.length,
    totalCount: concepts.length
  };
};
