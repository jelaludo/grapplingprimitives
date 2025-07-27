import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import {
  Storage as StorageIcon,
  Computer as ComputerIcon,
  CloudUpload as CloudUploadIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
  Backup as BackupIcon
} from '@mui/icons-material';

interface DevModeToggleProps {
  isDevelopment: boolean;
  dataSource: 'mongodb' | 'local' | 'production';
  setDataSource: (source: 'mongodb' | 'local' | 'production') => void;
  masterLists: Array<{ 
    name: string; 
    path: string; 
    lastModified: Date; 
    date: string; 
    nodeCount: number; 
    displayName: string; 
  }>;
  selectedMasterList: string;
  setSelectedMasterList: (file: string) => void;
  onConvertToMongo?: () => void;
  onSeedFromLocal?: () => void;
  onCreateBackup?: () => void;
  onRestoreFromBackup?: (backupFile: string) => void;
}

// Pre-computed styles
const DEV_BUTTON_STYLE = {
  position: 'fixed' as const,
  bottom: 20,
  right: 20,
  zIndex: 1000,
  borderRadius: 2,
  px: 2,
  py: 1,
  boxShadow: 3,
  '&:hover': { boxShadow: 6 }
} as const;

const DIALOG_PAPER_STYLE = {
  bgcolor: '#232323',
  color: '#fff',
  border: '2px solid #ff9800'
} as const;

const DIALOG_TITLE_STYLE = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #444'
} as const;

const BACKUP_LIST_STYLE = {
  maxHeight: 200,
  overflowY: 'auto' as const,
  border: '1px solid #444',
  borderRadius: 1,
  p: 1
} as const;

const BACKUP_ITEM_STYLE = {
  mb: 1,
  p: 1,
  border: '1px solid #333',
  borderRadius: 1
} as const;

export const DevModeToggle: React.FC<DevModeToggleProps> = ({
  isDevelopment,
  dataSource,
  setDataSource,
  masterLists,
  selectedMasterList,
  setSelectedMasterList,
  onConvertToMongo,
  onSeedFromLocal,
  onCreateBackup,
  onRestoreFromBackup
}) => {
  const [open, setOpen] = useState(false);
  const [backups, setBackups] = useState<Array<{
    name: string;
    path: string;
    lastModified: Date;
    size: number;
    type: 'json' | 'typescript';
    metadata?: {
      date: string;
      time: string;
      nodeCount: number;
      fullDate: Date;
    };
  }>>([]);
  const [showBackups, setShowBackups] = useState(false);

  if (!isDevelopment) return null;

  // Event handlers
  const handleOpen = () => {
    setOpen(true);
    loadBackups();
  };

  const handleClose = () => setOpen(false);

  const handleDataSourceChange = (newSource: 'mongodb' | 'local' | 'production') => {
    setDataSource(newSource);
  };

  const handleCreateBackup = () => {
    onCreateBackup?.();
    handleClose();
  };

  const handleRestoreBackup = (backupFile: string) => {
    onRestoreFromBackup?.(backupFile);
    handleClose();
  };

  const handleConvertToMongo = () => {
    onConvertToMongo?.();
    handleClose();
  };

  const handleSeedFromLocal = () => {
    onSeedFromLocal?.();
    handleClose();
  };

  const loadBackups = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/list-backups');
      if (response.ok) {
        const data = await response.json();
        setBackups(data.backups);
      }
    } catch (error) {
      console.error('Failed to load backups:', error);
    }
  };

  const selectedFile = masterLists.find(file => file.name === selectedMasterList);

  return (
    <>
      {/* Dev Mode Button */}
      <Button
        variant="contained"
        color="warning"
        startIcon={<WarningIcon />}
        onClick={handleOpen}
        sx={DEV_BUTTON_STYLE}
      >
        Dev MODE
      </Button>

      {/* Dev Mode Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: DIALOG_PAPER_STYLE }}
      >
        <DialogTitle sx={DIALOG_TITLE_STYLE}>
          <Box display="flex" alignItems="center">
            <WarningIcon sx={{ color: '#ff9800', mr: 1 }} />
            <Typography variant="h6" color="warning.main">
              Development Mode
            </Typography>
            <Chip 
              label="DEV ONLY" 
              size="small" 
              color="warning" 
              sx={{ ml: 1 }}
            />
          </Box>
          <IconButton onClick={handleClose} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            Choose your data source for development and testing.
            <br />
            <strong>Note:</strong> In local mode, changes are NOT automatically saved. Use "Create Backup" to save your work.
          </Alert>

          {/* Data Source Selection */}
          <Typography variant="subtitle2" gutterBottom>
            Data Source:
          </Typography>
          
          <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
            <Chip
              label="MongoDB"
              onClick={() => handleDataSourceChange('mongodb')}
              color={dataSource === 'mongodb' ? 'primary' : 'default'}
              variant={dataSource === 'mongodb' ? 'filled' : 'outlined'}
              icon={<StorageIcon />}
            />
            <Chip
              label="Local Files"
              onClick={() => handleDataSourceChange('local')}
              color={dataSource === 'local' ? 'primary' : 'default'}
              variant={dataSource === 'local' ? 'filled' : 'outlined'}
              icon={<ComputerIcon />}
            />
            <Chip
              label="Production Data"
              onClick={() => handleDataSourceChange('production')}
              color={dataSource === 'production' ? 'primary' : 'default'}
              variant={dataSource === 'production' ? 'filled' : 'outlined'}
              icon={<CloudUploadIcon />}
            />
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
            {dataSource === 'mongodb' && 'Connected to MongoDB database'}
            {dataSource === 'local' && 'Working with local TypeScript files'}
            {dataSource === 'production' && 'Using bundled production data'}
          </Typography>

          {/* Master List Selection (Local/Production) */}
          {(dataSource === 'local' || dataSource === 'production') && (
            <>
              {dataSource === 'local' && (
                <>
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Master List Selection:
                  </Typography>
                  
                  {masterLists.length === 0 ? (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        No master list files found. Loading...
                      </Typography>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        onClick={() => window.location.reload()}
                      >
                        Refresh Page
                      </Button>
                    </Box>
                  ) : (
                    <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                      {masterLists.map((file) => (
                        <Chip
                          key={file.name}
                          label={file.displayName}
                          onClick={() => setSelectedMasterList(file.name)}
                          color={selectedMasterList === file.name ? 'primary' : 'default'}
                          variant={selectedMasterList === file.name ? 'filled' : 'outlined'}
                          size="small"
                        />
                      ))}
                    </Box>
                  )}

                  {selectedFile && (
                    <Box mb={2}>
                      <Typography variant="caption" color="text.secondary">
                        Last modified: {new Date(selectedFile.lastModified).toLocaleString()}
                      </Typography>
                    </Box>
                  )}
                </>
              )}

              <Divider sx={{ my: 2 }} />

              {/* Backup Management */}
              <Typography variant="subtitle2" gutterBottom>
                Backup Management:
              </Typography>
              
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<BackupIcon />}
                  onClick={handleCreateBackup}
                  title="Create backup (.json) and push to production (.ts)"
                >
                  Create Backup & Push to Production
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                  onClick={() => setShowBackups(!showBackups)}
                  title="View available backups"
                >
                  {showBackups ? 'Hide Backups' : 'View Backups'} ({backups.length})
                </Button>

                {showBackups && backups.length > 0 && (
                  <Box sx={BACKUP_LIST_STYLE}>
                    {backups.map((backup) => (
                      <Box key={backup.name} sx={BACKUP_ITEM_STYLE}>
                        <Typography variant="caption" display="block" color="text.secondary">
                          {backup.metadata ? `${backup.metadata.date} ${backup.metadata.time} (${backup.metadata.nodeCount} nodes)` : backup.name}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {backup.name}
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleRestoreBackup(backup.name)}
                          title="Restore from this backup"
                        >
                          Restore
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}

                {showBackups && backups.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No backups found
                  </Typography>
                )}
              </Box>

              {/* Data Conversion (Local only) */}
              {dataSource === 'local' && (
                <>
                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    Data Conversion:
                  </Typography>
                  
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<CloudUploadIcon />}
                      onClick={handleConvertToMongo}
                      title="Convert current local data to MongoDB format"
                    >
                      Convert to MongoDB
                    </Button>
                    
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<StorageIcon />}
                      onClick={handleSeedFromLocal}
                      title="Seed MongoDB with current local data"
                    >
                      Seed MongoDB
                    </Button>
                  </Box>
                </>
              )}
            </>
          )}

          {/* MongoDB Info */}
          {dataSource === 'mongodb' && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Connected to MongoDB. Switch to local mode for development.
              </Typography>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: '1px solid #444' }}>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 
