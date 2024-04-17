import React from 'react';
import Button from '@mui/material/Button';
import { useAppTheme } from '../../context/theme/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { toggleTheme } = useAppTheme();

  return (
    <Button variant="contained" color="primary" onClick={toggleTheme}>
      Toggle Theme
    </Button>
  );
};

export default ThemeToggle;
