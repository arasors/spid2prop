import React, { useState } from 'react';
import { 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert, 
  CircularProgress,
  InputAdornment,
  useTheme
} from '@mui/material';
import {Link as LinkIcon} from '@mui/icons-material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import useBackupStore from '../store/backupStore';

const BackupForm = () => {
  const [url, setUrl] = useState('');
  const { startBackup, isLoading, error, clearError } = useBackupStore();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    await startBackup(url);
    setUrl('');
  };

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, mt: 3, mb: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Start New Backup
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Enter the URL of the agent's page you want to backup. Example: 
        https://www.spitogatos.gr/en/find-agents/Greek-Living-Real-Estate/10301?portfolio=true
      </Typography>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2, 
            borderRadius: 2,
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(211, 47, 47, 0.1)' : 'rgba(211, 47, 47, 0.05)'
          }} 
          onClose={clearError}
        >
          {error}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Agent URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.spitogatos.gr/en/find-agents/..."
          disabled={isLoading}
          sx={{ 
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: 1.5
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isLoading || !url.trim()}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
            sx={{
              fontWeight: 600,
              height: 48,
              px: 4
            }}
          >
            {isLoading ? 'Starting Backup...' : 'Start Backup'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default BackupForm; 