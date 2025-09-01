import React, { useState } from 'react';
import { Box, Typography, Slider, Switch, FormControlLabel } from '@mui/material';

interface SatisfactionPickerProps {
  satisfaction?: number;
  rest?: boolean;
  onSatisfactionChange?: (satisfaction: number) => void;
  onRestChange?: (rest: boolean) => void;
}

export const SatisfactionPicker: React.FC<SatisfactionPickerProps> = ({
  satisfaction,
  rest = false,
  onSatisfactionChange,
  onRestChange,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(satisfaction || 5);
  const [isRestDay, setIsRestDay] = useState(rest);

  const handleSliderChange = (value: number) => {
    setSelectedRating(value);
    onSatisfactionChange?.(value);
  };

  const handleRestToggle = (checked: boolean) => {
    setIsRestDay(checked);
    onRestChange?.(checked);
    if (checked) {
      onSatisfactionChange?.(0);
    }
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        mb: 3,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
        Rate today's training
      </Typography>
      
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        How was your training today?
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={isRestDay}
            onChange={(e) => handleRestToggle(e.target.checked)}
            color="primary"
          />
        }
        label="Rest day"
        sx={{ mb: 2 }}
      />

      {!isRestDay && (
        <Box sx={{ px: 2 }}>
          <Slider
            value={selectedRating}
            onChange={(_, value) => handleSliderChange(value as number)}
            min={1}
            max={10}
            step={1}
            marks={[
              { value: 1, label: '1' },
              { value: 5, label: '5' },
              { value: 10, label: '10' }
            ]}
            valueLabelDisplay="auto"
            sx={{ 
              mt: 2,
              '& .MuiSlider-markLabel': {
                color: 'text.secondary',
                fontSize: '0.875rem'
              }
            }}
          />
          <Typography variant="body1" sx={{ color: 'success.main', mt: 1, fontWeight: 'bold' }}>
            Rating: {selectedRating}/10
          </Typography>
        </Box>
      )}

      {isRestDay && (
        <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          Rest day selected
        </Typography>
      )}
    </Box>
  );
};
