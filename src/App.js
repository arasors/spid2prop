import React from 'react';
import { CssBaseline, Container, Box } from '@mui/material';
import ThemeProvider from './context/ThemeContext';
import Header from './components/Header';
import BackupForm from './components/BackupForm';
import BackupJobsList from './components/BackupJobsList';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Header />
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <BackupForm />
          <BackupJobsList />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
