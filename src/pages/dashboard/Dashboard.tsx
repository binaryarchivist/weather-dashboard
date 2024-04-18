import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Toggle } from '../../components/toggle';

const Dashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: 4,
      }}
    >
      <Toggle />
      <h1>Dashboard</h1>
    </Box>
  );
};

export default Dashboard;
