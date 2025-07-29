import React, { useState, useEffect } from 'react';
import productionPasswords from '../../data/productionPasswords.json';
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
  usageCount: number;
  lastUsed: string;
}

interface BetaDashboardProps {
  onClose: () => void;
}

export const BetaDashboard: React.FC<BetaDashboardProps> = ({ onClose }) => {
  const [passwords, setPasswords] = useState<BetaPassword[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  useEffect(() => {
    loadPasswords();
  }, []);

  const loadPasswords = async () => {
    try {
      setLoading(true);
      
      if (process.env.NODE_ENV === 'production') {
        // Production: show passwords from productionPasswords.json
        const prodPasswords = productionPasswords.passwords.map(pw => ({
          password: pw.password,
          usageCount: pw.usageCount || 0,
          lastUsed: pw.lastUsed || 'Never'
        }));
        setPasswords(prodPasswords);
      } else {
        // Development: try to load from local storage or use default
        const storedPasswords = localStorage.getItem('devBetaPasswords');
        if (storedPasswords) {
          setPasswords(JSON.parse(storedPasswords));
        } else {
          // Initialize with default password
          const defaultPasswords = [{ password: 'kimura42', usageCount: 0, lastUsed: 'Never' }];
          localStorage.setItem('devBetaPasswords', JSON.stringify(defaultPasswords));
          setPasswords(defaultPasswords);
        }
      }
    } catch (error) {
      console.log('Error loading passwords, using default...');
      setPasswords([{ password: 'kimura42', usageCount: 0, lastUsed: 'Never' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPassword = async () => {
    if (!newPassword.trim()) return;

    try {
      if (process.env.NODE_ENV === 'production') {
        setError('Cannot add passwords in production mode');
        return;
      }

      // Development: add to local storage
      const newPasswordObj = { password: newPassword.trim(), usageCount: 0, lastUsed: 'Never' };
      const updatedPasswords = [...passwords, newPasswordObj];
      localStorage.setItem('devBetaPasswords', JSON.stringify(updatedPasswords));
      setPasswords(updatedPasswords);
      setNewPassword('');
      setShowAddDialog(false);
      setError(null);
    } catch (error) {
      setError('Failed to add password');
    }
  };

  const handleDeletePassword = async (password: string) => {
    try {
      if (process.env.NODE_ENV === 'production') {
        setError('Cannot delete passwords in production mode');
        return;
      }

      // Development: remove from local storage
      const updatedPasswords = passwords.filter(p => p.password !== password);
      localStorage.setItem('devBetaPasswords', JSON.stringify(updatedPasswords));
      setPasswords(updatedPasswords);
      setError(null);
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
        <Box sx={{ display: 'flex', gap: 1 }}>
          {process.env.NODE_ENV === 'development' && (
            <Button
              variant="outlined"
              onClick={() => setShowExportDialog(true)}
              size="small"
            >
              Export to Production
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowAddDialog(true)}
            size="small"
          >
            Add Password
          </Button>
        </Box>
      </Box>

      <List>
        {passwords.map((passwordObj, index) => (
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
                    {showPassword ? passwordObj.password : '•'.repeat(passwordObj.password.length)}
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
                  Password #{index + 1} • Used {passwordObj.usageCount} times • Last: {passwordObj.lastUsed}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleDeletePassword(passwordObj.password)}
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

      {/* Export to Production Dialog */}
      <Dialog open={showExportDialog} onClose={() => setShowExportDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Export Passwords to Production</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            This will generate bcrypt hashes for all development passwords and create a new productionPasswords.json file.
          </Typography>
          <Typography variant="body2" color="warning.main">
            ⚠️ Warning: This will overwrite the current production passwords file.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowExportDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              // TODO: Implement export functionality
              setShowExportDialog(false);
            }} 
            variant="contained"
            color="warning"
          >
            Export
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #333' }}>
        <Typography variant="body2" color="text.secondary">
          {process.env.NODE_ENV === 'development' 
            ? 'Development mode: Passwords stored in localStorage. Use "Export to Production" to sync with production.'
            : 'Production mode: Passwords loaded from productionPasswords.json (read-only).'
          }
        </Typography>
      </Box>
    </Box>
  );
}; 