import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  LinearProgress, 
  Chip, 
  Button, 
  Stack,
  Link,
  useTheme
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ImageIcon from '@mui/icons-material/Image';
import useBackupStore from '../store/backupStore';

const statusColors = {
  started: 'primary',
  running: 'warning',
  completed: 'success',
  failed: 'error'
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const BackupJob = ({ job }) => {
  const getDownloadUrl = useBackupStore(state => state.getDownloadUrl);
  const theme = useTheme();
  
  const isCompleted = job.status === 'completed';
  const isFailed = job.status === 'failed';
  
  return (
    <Paper 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        mb: 2,
        borderLeft: (theme) => `4px solid ${
          theme.palette.mode === 'dark' 
            ? theme.palette[statusColors[job.status] || 'default'].dark
            : theme.palette[statusColors[job.status] || 'default'].main
        }`
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
        <Box>
          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600 }}>
            {new URL(job.url).hostname}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Started: {formatDate(job.createdAt)}
          </Typography>
        </Box>
        <Chip 
          label={job.status.toUpperCase()} 
          color={statusColors[job.status] || 'default'} 
          size="small" 
          sx={{ 
            fontWeight: 600, 
            letterSpacing: '0.02em',
            bgcolor: theme.palette.mode === 'dark' 
              ? `${theme.palette[statusColors[job.status] || 'default'].dark}20`
              : `${theme.palette[statusColors[job.status] || 'default'].light}50`,
            color: theme.palette[statusColors[job.status] || 'default'].main
          }}
        />
      </Box>
      
      <Typography 
        variant="body2" 
        noWrap 
        sx={{ 
          mb: 1.5,
          color: 'text.secondary',
          fontFamily: 'monospace'
        }}
      >
        {job.url}
      </Typography>
      
      {!isFailed && !isCompleted && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {job.progress > 0 ? `Extracted ${job.progress} properties` : 'Processing...'}
          </Typography>
          <Box sx={{ mb: 1.5 }}>
            <LinearProgress 
              variant="determinate" 
              value={job.progress > 0 ? (job.progress / 100) * 100 : 0} 
              sx={{
                '& .MuiLinearProgress-bar': {
                  bgcolor: theme.palette[statusColors[job.status] || 'primary'].main
                }
              }}
            />
          </Box>
        </>
      )}
      
      {isCompleted && (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
          <Button 
            size="medium" 
            variant="outlined"
            component={Link}
            href={getDownloadUrl(job.taskId, 'excel')}
            target="_blank"
            rel="noopener"
            startIcon={<DownloadIcon />}
            sx={{ 
              flex: { xs: '1 1 auto', sm: '0 1 auto' },
              textAlign: 'center'
            }}
          >
            Download Excel
          </Button>
          <Button 
            size="medium" 
            variant="outlined"
            component={Link}
            href={getDownloadUrl(job.taskId, 'images')}
            target="_blank"
            rel="noopener"
            startIcon={<ImageIcon />}
            sx={{ 
              flex: { xs: '1 1 auto', sm: '0 1 auto' },
              textAlign: 'center'
            }}
          >
            Download Images
          </Button>
        </Stack>
      )}
    </Paper>
  );
};

const BackupJobsList = () => {
  const backupJobs = useBackupStore(state => state.backupJobs);
  
  return (
    <Paper sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Backup Jobs
      </Typography>
      
      {backupJobs.length === 0 ? (
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
          }}
        >
          No backup jobs started yet. Use the form above to start a new backup.
        </Typography>
      ) : (
        <List sx={{ width: '100%', p: 0 }}>
          {backupJobs.map((job) => (
            <ListItem key={job.taskId} disablePadding sx={{ display: 'block', mb: 2 }}>
              <BackupJob job={job} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default BackupJobsList; 