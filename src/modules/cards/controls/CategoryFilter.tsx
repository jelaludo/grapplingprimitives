import React from 'react';
import { Chip, Stack } from '@mui/material';

interface CategoryFilterProps {
  categories: { name: string; color: string }[];
  selected: string[];
  onToggle: (name: string) => void;
  onClear: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selected, onToggle, onClear }) => {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
      <Chip size="small" label="All" onClick={onClear} color={selected.length === 0 ? 'primary' : 'default'} variant={selected.length === 0 ? 'filled' : 'outlined'} />
      {categories.map(c => (
        <Chip
          key={c.name}
          size="small"
          label={c.name}
          onClick={() => onToggle(c.name)}
          sx={{ borderColor: c.color, color: selected.includes(c.name) ? '#fff' : 'text.secondary', bgcolor: selected.includes(c.name) ? c.color : 'transparent' }}
          variant={selected.includes(c.name) ? 'filled' : 'outlined'}
        />
      ))}
    </Stack>
  );
};

export default CategoryFilter;


