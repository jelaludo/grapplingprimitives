import React from 'react';
import { MenuItem, TextField } from '@mui/material';

interface SortMenuProps {
  value: 'alpha' | 'category';
  onChange: (v: 'alpha' | 'category') => void;
}

export const SortMenu: React.FC<SortMenuProps> = ({ value, onChange }) => {
  return (
    <TextField size="small" select value={value} onChange={(e) => onChange(e.target.value as any)}>
      <MenuItem value="alpha">Alphabetical</MenuItem>
      <MenuItem value="category">By Category</MenuItem>
    </TextField>
  );
};

export default SortMenu;


