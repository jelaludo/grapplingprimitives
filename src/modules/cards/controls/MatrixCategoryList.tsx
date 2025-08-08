import React from 'react';
import { Box } from '@mui/material';
import { BJJConcept, Category } from '../../../types/concepts';

interface MatrixCategoryListProps {
  concepts: BJJConcept[];
  categories: Category[];
  selected: string[];
  onToggle: (name: string) => void;
  onClear: () => void;
}

export const MatrixCategoryList: React.FC<MatrixCategoryListProps> = ({ concepts, categories, selected, onToggle, onClear }) => {
  const countFor = (name: string) => concepts.filter(c => c.category === name).length;

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <button
        onClick={onClear}
        style={{
          background: selected.length === 0 ? '#1976d2' : 'transparent',
          color: selected.length === 0 ? '#fff' : '#aaa',
          border: `1px solid ${selected.length === 0 ? '#1976d2' : '#444'}`,
          padding: '6px 10px',
          borderRadius: 6,
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'all 0.2s',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 12,
          minWidth: 56,
        }}
      >
        <span>All</span>
        <span style={{ fontSize: '9px', opacity: 0.7, marginLeft: 8 }}>{concepts.length}</span>
      </button>
      {categories.map(cat => (
        <button
          key={cat._id || cat.name}
          onClick={() => onToggle(cat.name)}
          style={{
            background: selected.includes(cat.name) ? cat.color : 'transparent',
            color: selected.includes(cat.name) ? '#fff' : '#aaa',
            border: `1px solid ${cat.color}`,
            padding: '6px 10px',
            borderRadius: 6,
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 12,
          }}
        >
          <span>{cat.name}</span>
          <span style={{ fontSize: '9px', opacity: 0.7, marginLeft: 8 }}>{countFor(cat.name)}</span>
        </button>
      ))}
    </Box>
  );
};

export default MatrixCategoryList;


