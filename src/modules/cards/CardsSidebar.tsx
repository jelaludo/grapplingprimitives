import React from 'react';
import { Box, TextField } from '@mui/material';
import { BJJConcept, Category } from '../../types/concepts';
import MatrixCategoryList from './controls/MatrixCategoryList';

interface CardsSidebarProps {
  concepts: BJJConcept[];
  categories: Category[];
  query: string;
  setQuery: (v: string) => void;
  selectedCategories: string[];
  toggleCategory: (name: string) => void;
  clearCategories: () => void;
}

export const CardsSidebar: React.FC<CardsSidebarProps> = ({
  concepts,
  categories,
  query,
  setQuery,
  selectedCategories,
  toggleCategory,
  clearCategories,
}) => {
  return (
    <Box sx={{ p: 0 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search concepts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Box>
      <MatrixCategoryList
        concepts={concepts}
        categories={categories}
        selected={selectedCategories}
        onToggle={toggleCategory}
        onClear={clearCategories}
      />
    </Box>
  );
};

export default CardsSidebar;


