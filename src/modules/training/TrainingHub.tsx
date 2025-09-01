import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { SatisfactionPicker } from './components/SatisfactionPicker';
import { HexGrid } from './components/HexGrid';
import { defaultFavorites, exampleDayRecord } from './data';
import { DayRecord, Favorite, Unit } from './types';

const TrainingHub: React.FC = () => {
  // State for today's record
  const [todayRecord, setTodayRecord] = useState<DayRecord>({
    date: new Date().toISOString().split('T')[0],
    exercises: [],
  });

  // State for user favorites (in a real app, this would come from user settings)
  const [favorites, setFavorites] = useState<Favorite[]>(defaultFavorites);

  // Load today's data on mount
  useEffect(() => {
    // For demo purposes, load example data
    // In a real app, this would load from localStorage or API
    setTodayRecord(exampleDayRecord);
  }, []);

  const handleSatisfactionChange = (satisfaction: number) => {
    setTodayRecord(prev => ({
      ...prev,
      satisfaction,
    }));
  };

  const handleRestChange = (rest: boolean) => {
    setTodayRecord(prev => ({
      ...prev,
      rest,
      satisfaction: rest ? undefined : prev.satisfaction,
    }));
  };

  const handleProgressChange = (exerciseId: string, achieved: { value: number; unit: Unit }) => {
    setTodayRecord(prev => {
      const existingIndex = prev.exercises.findIndex(e => e.id === exerciseId);
      const updatedExercises = [...prev.exercises];
      
      if (existingIndex >= 0) {
        updatedExercises[existingIndex] = { id: exerciseId, achieved };
      } else {
        updatedExercises.push({ id: exerciseId, achieved });
      }
      
      return {
        ...prev,
        exercises: updatedExercises,
      };
    });
  };

  const handleEditTarget = (exerciseId: string) => {
    // TODO: Implement target editing dialog
    console.log('Edit target for:', exerciseId);
  };

  const handleUnfavorite = (exerciseId: string) => {
    setFavorites(prev => prev.filter(f => f.id !== exerciseId));
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      p: { xs: 2, sm: 3, md: 4 },
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
          S&C & Rehab Training Hub
        </Typography>
        <Typography variant="body1" sx={{ color: 'grey.400' }}>
          Ultra-clean daily tracker for strength & rehab
        </Typography>
      </Box>

      {/* Daily Satisfaction Section */}
      <Box sx={{ 
        width: '100%', 
        maxWidth: { xs: '100%', sm: 800, md: 1000, lg: 1200 }, 
        mx: 'auto', 
        mb: 4 
      }}>
        <SatisfactionPicker
          satisfaction={todayRecord.satisfaction}
          rest={todayRecord.rest}
          onSatisfactionChange={handleSatisfactionChange}
          onRestChange={handleRestChange}
        />
      </Box>

      {/* Honeycomb of Today's Exercises */}
      {!todayRecord.rest && favorites.length > 0 && (
        <Box sx={{ textAlign: 'center', flex: 1, width: '100%' }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'white', mb: 3 }}>
            Today's Exercises
          </Typography>
          
          <Box sx={{ 
            bgcolor: 'background.paper', 
            borderRadius: 3, 
            p: { xs: 2, sm: 3, md: 4 }, 
            boxShadow: 2,
            minHeight: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            width: '100%',
            maxWidth: { xs: '100%', sm: 800, md: 1000, lg: 1200 },
            overflow: 'hidden'
          }}>
            <HexGrid
              favorites={favorites}
              exercises={todayRecord.exercises}
              onProgressChange={handleProgressChange}
              onEditTarget={handleEditTarget}
              onUnfavorite={handleUnfavorite}
            />
          </Box>
          
          <Typography variant="body2" sx={{ color: 'grey.400', mt: 2 }}>
            Tap hex to set progress • Right-click to edit target
          </Typography>
        </Box>
      )}

      {todayRecord.rest && (
        <Box sx={{ 
          textAlign: 'center', 
          bgcolor: 'background.paper', 
          borderRadius: 3, 
          p: 4, 
          boxShadow: 2,
          width: '100%',
          maxWidth: { xs: '100%', sm: 800, md: 1000, lg: 1200 },
          mx: 'auto'
        }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            Rest day - No exercises today
          </Typography>
        </Box>
      )}

      {!todayRecord.rest && favorites.length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          bgcolor: 'background.paper', 
          borderRadius: 3, 
          p: 4, 
          boxShadow: 2,
          width: '100%',
          maxWidth: { xs: '100%', sm: 800, md: 1000, lg: 1200 },
          mx: 'auto'
        }}>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            No favorite exercises set
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            Add exercises to your favorites to start tracking
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TrainingHub;
