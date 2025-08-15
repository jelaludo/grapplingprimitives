import React, { useState, useMemo } from 'react';
import { Box, Typography, Chip, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import HexagonDrill from './HexagonDrill';
import { BJJDrill } from '../types/concepts';

interface DrillGridProps {
  drills: BJJDrill[];
  onDrillClick?: (drill: BJJDrill) => void;
  selectedDrillId?: string;
}

const GridContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const StatsSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  flexWrap: 'wrap',
}));

const FilterGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(2),
  alignItems: 'center',
}));

const DrillGridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
  gap: theme.spacing(3),
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const DrillGrid: React.FC<DrillGridProps> = ({
  drills,
  onDrillClick,
  selectedDrillId,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Get unique categories (including tags)
  const categories = useMemo(() => {
    const allCategories = new Set<string>();
    drills.forEach(drill => {
      allCategories.add(drill.category);
      if (drill.tags) {
        drill.tags.forEach(tag => allCategories.add(tag));
      }
    });
    return Array.from(allCategories).sort();
  }, [drills]);

  // Filter drills based on criteria
  const filteredDrills = useMemo(() => {
    return drills.filter(drill => {
      const matchesCategory = categoryFilter === 'all' || 
                             drill.category === categoryFilter ||
                             (drill.tags && drill.tags.includes(categoryFilter));
      const matchesDifficulty = difficultyFilter === 'all' || drill.difficulty.toString() === difficultyFilter;
      const matchesSearch = drill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           drill.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [drills, categoryFilter, difficultyFilter, searchTerm]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = drills.length;
    const completed = drills.filter(d => d.current_mastery >= d.target_mastery).length;
    const inProgress = drills.filter(d => d.current_mastery > 0 && d.current_mastery < d.target_mastery).length;
    const notStarted = drills.filter(d => d.current_mastery === 0).length;
    const averageProgress = total > 0 ? drills.reduce((sum, d) => sum + (d.current_mastery / d.target_mastery), 0) / total * 100 : 0;

    return { total, completed, inProgress, notStarted, averageProgress };
  }, [drills]);

  const handleDrillClick = (drill: BJJDrill) => {
    if (onDrillClick) {
      onDrillClick(drill);
    }
  };

  return (
    <GridContainer>
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ color: 'white', mb: 3 }}>
        S&C & Rehab Training
      </Typography>

      {/* Statistics */}
      <StatsSection>
        <Chip 
          label={`Total: ${stats.total}`} 
          color="primary" 
          variant="outlined"
        />
        <Chip 
          label={`Completed: ${stats.completed}`} 
          color="success" 
          variant="outlined"
        />
        <Chip 
          label={`In Progress: ${stats.inProgress}`} 
          color="warning" 
          variant="outlined"
        />
        <Chip 
          label={`Not Started: ${stats.notStarted}`} 
          color="default" 
          variant="outlined"
        />
        <Chip 
          label={`Avg Progress: ${Math.round(stats.averageProgress)}%`} 
          color="info" 
          variant="outlined"
        />
      </StatsSection>

      {/* Filters */}
      <FilterSection>
        <FilterGrid>
          <TextField
            fullWidth
            label="Search Exercises"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={difficultyFilter}
              label="Difficulty"
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <MenuItem value="all">All Difficulties</MenuItem>
              <MenuItem value="1">Beginner (1)</MenuItem>
              <MenuItem value="2">Novice (2)</MenuItem>
              <MenuItem value="3">Intermediate (3)</MenuItem>
              <MenuItem value="4">Advanced (4)</MenuItem>
              <MenuItem value="5">Expert (5)</MenuItem>
            </Select>
          </FormControl>
        </FilterGrid>
      </FilterSection>

      {/* Results count */}
      <Typography variant="body2" sx={{ color: 'grey.400', mb: 2 }}>
        Showing {filteredDrills.length} of {drills.length} exercises
      </Typography>

      {/* Drill Grid */}
      <DrillGridContainer>
        {filteredDrills.map((drill) => (
          <Box key={drill.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <HexagonDrill
              drill={drill}
              size={140}
              onClick={() => handleDrillClick(drill)}
              isActive={selectedDrillId === drill.id}
            />
          </Box>
        ))}
      </DrillGridContainer>

      {/* Empty state */}
      {filteredDrills.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
            color: 'grey.500',
          }}
        >
          <Typography variant="h6" gutterBottom>
            No exercises found
          </Typography>
          <Typography variant="body2">
            Try adjusting your filters or search terms
          </Typography>
        </Box>
      )}
    </GridContainer>
  );
};

export default DrillGrid;
