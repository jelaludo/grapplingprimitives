import React from 'react';
import { Box } from '@mui/material';
import { HexExercise } from './HexExercise';
import { Favorite, DayExercise, Unit } from '../types';
import { exerciseCatalog } from '../data';

interface HexGridProps {
  favorites: Favorite[];
  exercises: DayExercise[];
  onProgressChange: (exerciseId: string, achieved: { value: number; unit: Unit }) => void;
  onEditTarget?: (exerciseId: string) => void;
  onUnfavorite?: (exerciseId: string) => void;
}

// Simple grid layout for better visual balance
function getGridPositions(count: number): Array<{row: number; col: number}> {
  const positions: Array<{row: number; col: number}> = [];
  
  if (count <= 3) {
    // Single row for 1-3 items
    for (let i = 0; i < count; i++) {
      positions.push({ row: 0, col: i });
    }
  } else if (count <= 6) {
    // 2 rows for 4-6 items
    const colsPerRow = Math.ceil(count / 2);
    for (let i = 0; i < count; i++) {
      positions.push({ row: Math.floor(i / colsPerRow), col: i % colsPerRow });
    }
  } else {
    // 3 rows for 7+ items
    const colsPerRow = Math.ceil(count / 3);
    for (let i = 0; i < count; i++) {
      positions.push({ row: Math.floor(i / colsPerRow), col: i % colsPerRow });
    }
  }
  
  return positions;
}

export const HexGrid: React.FC<HexGridProps> = ({
  favorites,
  exercises,
  onProgressChange,
  onEditTarget,
  onUnfavorite,
}) => {
  const hexSize = 120; // Size of each hexagon
  const spacing = 20; // Space between hexagons
  
  // Get grid positions
  const positions = getGridPositions(favorites.length);
  
  // Calculate grid dimensions
  const maxCols = Math.max(...positions.map(p => p.col)) + 1;
  const maxRows = Math.max(...positions.map(p => p.row)) + 1;
  
  // Hexagon dimensions (width = size, height = size * sqrt(3) / 2)
  const hexWidth = hexSize;
  const hexHeight = hexSize * Math.sqrt(3) / 2;
  
  // Grid dimensions
  const gridWidth = maxCols * (hexWidth + spacing) - spacing;
  const gridHeight = maxRows * (hexHeight + spacing * 0.866) - spacing * 0.866;

  const handleProgressChange = (exerciseId: string) => (achieved: { value: number; unit: Unit }) => {
    onProgressChange(exerciseId, achieved);
  };

  const handleEditTarget = (exerciseId: string) => () => {
    onEditTarget?.(exerciseId);
  };

  const handleUnfavorite = (exerciseId: string) => () => {
    onUnfavorite?.(exerciseId);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 400,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: gridWidth,
          height: gridHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {favorites.map((favorite, index) => {
          const position = positions[index];
          
          // Calculate position with proper hexagon offset
          const x = position.col * (hexWidth + spacing);
          const y = position.row * (hexHeight + spacing * 0.866);
          
          // Find exercise data for this favorite
          const exercise = exercises.find(e => e.id === favorite.id);
          const exerciseInfo = exerciseCatalog.find(e => e.id === favorite.id);
          
          if (!exerciseInfo) return null;

          return (
            <Box
              key={favorite.id}
              sx={{
                position: 'absolute',
                left: x,
                top: y,
              }}
            >
              <HexExercise
                name={exerciseInfo.name}
                target={favorite.target}
                achieved={exercise?.achieved}
                size={hexSize}
                colors={{
                  track: "#e5e7eb",
                  primary: "#3b82f6",
                  overflow: "#22c55e",
                  text: "#111827",
                  bg: "white",
                }}
                onProgressChange={handleProgressChange(favorite.id)}
                onEditTarget={handleEditTarget(favorite.id)}
                onUnfavorite={handleUnfavorite(favorite.id)}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
