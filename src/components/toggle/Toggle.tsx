import React from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '../../context/theme/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <Button variant="contained" color="primary" onClick={toggleTheme}>
      Toggle Theme
    </Button>
  );
};

export default ThemeToggle;
