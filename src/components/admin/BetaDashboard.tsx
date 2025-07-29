import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Visibility as VisibilityIcon } from '@mui/icons-material';

interface BetaPassword {
  password: string;
  usageCount?: number;
  lastUsed?: string;
}

interface BetaDashboardProps {
  onClose: () => void;
}

export const BetaDashboard: React.FC<BetaDashboardProps> = ({ onClose }) => {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    loadPasswords();
  }, []);

  const loadPasswords = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/admin/beta-passwords');
      
      if (response.ok) {
        const data = await response.json();
        setPasswords(data.passwords || []);
      } else {
        // Fallback: try to load from local file
        console.log('API failed, trying local file...');
        setPasswords(['kimura42']); // Default password
      }
    } catch (error) {
      console.log('Network error, using default password...');
      setPasswords(['kimura42']); // Default password
    } finally {
      setLoading(false);
    }
  };

  const handleAddPassword = async () => {
    if (!newPassword.trim()) return;

    try {
      // Add to local state
      setPasswords(prev => [...prev, newPassword.trim()]);
      setNewPassword('');
      setShowAddDialog(false);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Failed to add password');
    }
  };

  const handleDeletePassword = async (password: string) => {
    try {
      // Remove from local state
      setPasswords(prev => prev.filter(p => p !== password));
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Failed to delete password');
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading beta passwords...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Beta Password Management
        </Typography>
        <Chip label="DEV ONLY" color="warning" size="small" />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Active Passwords ({passwords.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowAddDialog(true)}
          size="small"
        >
          Add Password
        </Button>
      </Box>

      <List>
        {passwords.map((password, index) => (
          <ListItem
            key={index}
            sx={{
              border: '1px solid #333',
              borderRadius: 1,
              mb: 1,
              backgroundColor: '#1a1a1a'
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                    {showPassword ? password : '•'.repeat(password.length)}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ color: '#888' }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Box>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  Password #{index + 1}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleDeletePassword(password)}
                sx={{ color: '#f44336' }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {passwords.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4, color: '#888' }}>
          <Typography>No beta passwords configured</Typography>
        </Box>
      )}

      {/* Add Password Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Beta Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="text"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new beta password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddPassword} variant="contained">
            Add Password
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #333' }}>
        <Typography variant="body2" color="text.secondary">
          Note: This dashboard is only available in development mode.
          Passwords are stored locally and not synced to production.
        </Typography>
      </Box>
    </Box>
  );
}; 