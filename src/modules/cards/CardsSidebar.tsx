import React from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
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
  // Use parent's unified search handlers
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.currentTarget as HTMLElement).blur();
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log('Search input changed to:', newValue);
    setQuery(newValue);
  };
  
  const handleClear = () => {
    console.log('Clearing search');
    setQuery('');
  };

  return (
    <Box sx={{ p: 0 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search concepts..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  sx={{ color: 'text.secondary' }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
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


