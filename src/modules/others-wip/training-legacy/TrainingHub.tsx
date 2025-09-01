import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DrillGrid from '../../../components/DrillGrid';
import { BJJDrill } from '../../../types/concepts';
import { sampleDrills } from '../../../data/sampleDrills';

const TrainingContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const EditableField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const TrainingHub: React.FC = () => {
  const [drills, setDrills] = useState<BJJDrill[]>(sampleDrills);
  const [selectedDrill, setSelectedDrill] = useState<BJJDrill | null>(null);
  const [isDrillDialogOpen, setIsDrillDialogOpen] = useState(false);
  
  // Editable form state
  const [editForm, setEditForm] = useState<Partial<BJJDrill>>({});

  const handleDrillClick = (drill: BJJDrill) => {
    setSelectedDrill(drill);
    setEditForm({
      current_mastery: drill.current_mastery,
      target_mastery: drill.target_mastery,
      training_notes: drill.training_notes || '',
      difficulty: drill.difficulty,
      estimated_duration: drill.estimated_duration,
    });
    setIsDrillDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDrillDialogOpen(false);
    setSelectedDrill(null);
    setEditForm({});
  };

  const handleUpdateProgress = () => {
    if (selectedDrill && editForm.current_mastery !== undefined) {
      const updatedDrills = drills.map(drill => 
        drill.id === selectedDrill.id 
          ? { 
              ...drill, 
              current_mastery: editForm.current_mastery!,
              target_mastery: editForm.target_mastery || drill.target_mastery,
              training_notes: editForm.training_notes || drill.training_notes,
              difficulty: editForm.difficulty || drill.difficulty,
              estimated_duration: editForm.estimated_duration || drill.estimated_duration,
              last_practiced: new Date().toISOString().split('T')[0], // Today's date
            }
          : drill
      );
      setDrills(updatedDrills);
      handleCloseDialog();
    }
  };

  const handleFormChange = (field: keyof BJJDrill, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <TrainingContainer>
      <HeaderSection>
        <Typography variant="h3" gutterBottom sx={{ color: 'white' }}>
          S&C & Rehab Training Hub (Legacy)
        </Typography>
        <Typography variant="body1" sx={{ color: 'grey.400', mb: 2 }}>
          Track your progress through hexagon-based exercise visualization
        </Typography>
      </HeaderSection>

      <DrillGrid
        drills={drills}
        onDrillClick={handleDrillClick}
        selectedDrillId={selectedDrill?.id}
      />

      {/* Drill Detail Dialog */}
      <Dialog
        open={isDrillDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedDrill?.name}
        </DialogTitle>
        <DialogContent>
          {selectedDrill && (
            <Box>
              <Typography variant="body1" gutterBottom>
                {selectedDrill.description}
              </Typography>
              
              {/* Category and Tags */}
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Category: {selectedDrill.category}
                </Typography>
                {selectedDrill.tags && selectedDrill.tags.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                    {selectedDrill.tags.map(tag => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Box>
                )}
              </Box>

              {/* Progress Section */}
              <EditableField>
                <Typography variant="subtitle2" gutterBottom>
                  Current Progress: {editForm.current_mastery || 0}% / Target: {editForm.target_mastery || 100}%
                </Typography>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={editForm.current_mastery || 0}
                    onChange={(_, value) => handleFormChange('current_mastery', value)}
                    min={0}
                    max={editForm.target_mastery || 100}
                    step={5}
                    marks={[
                      { value: 0, label: '0%' },
                      { value: 25, label: '25%' },
                      { value: 50, label: '50%' },
                      { value: 75, label: '75%' },
                      { value: editForm.target_mastery || 100, label: `${editForm.target_mastery || 100}%` }
                    ]}
                    valueLabelDisplay="auto"
                    sx={{ mt: 2 }}
                  />
                </Box>
              </EditableField>

              {/* Target Mastery */}
              <EditableField>
                <TextField
                  fullWidth
                  label="Target Mastery (%)"
                  type="number"
                  value={editForm.target_mastery || 100}
                  onChange={(e) => handleFormChange('target_mastery', parseInt(e.target.value) || 100)}
                  inputProps={{ min: 1, max: 100 }}
                  size="small"
                />
              </EditableField>

              {/* Difficulty */}
              <EditableField>
                <FormControl fullWidth size="small">
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    value={editForm.difficulty || 1}
                    label="Difficulty"
                    onChange={(e) => handleFormChange('difficulty', e.target.value)}
                  >
                    <MenuItem value={1}>Beginner (1)</MenuItem>
                    <MenuItem value={2}>Novice (2)</MenuItem>
                    <MenuItem value={3}>Intermediate (3)</MenuItem>
                    <MenuItem value={4}>Advanced (4)</MenuItem>
                    <MenuItem value={5}>Expert (5)</MenuItem>
                  </Select>
                </FormControl>
              </EditableField>

              {/* Estimated Duration */}
              <EditableField>
                <TextField
                  fullWidth
                  label="Estimated Duration (minutes)"
                  type="number"
                  value={editForm.estimated_duration || 15}
                  onChange={(e) => handleFormChange('estimated_duration', parseInt(e.target.value) || 15)}
                  inputProps={{ min: 1 }}
                  size="small"
                />
              </EditableField>

              {/* Training Notes */}
              <EditableField>
                <TextField
                  fullWidth
                  label="Training Notes"
                  multiline
                  rows={3}
                  value={editForm.training_notes || ''}
                  onChange={(e) => handleFormChange('training_notes', e.target.value)}
                  placeholder="Add your training notes, tips, or observations..."
                />
              </EditableField>

              {/* Last Practiced and Next Review */}
              {selectedDrill.last_practiced && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Last Practiced: {new Date(selectedDrill.last_practiced).toLocaleDateString()}
                  </Typography>
                  {selectedDrill.next_review && (
                    <Typography variant="subtitle2">
                      Next Review: {new Date(selectedDrill.next_review).toLocaleDateString()}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleUpdateProgress}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </TrainingContainer>
  );
};

export default TrainingHub;

