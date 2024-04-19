import React from 'react';
import { IconButton } from '@mui/material';
import DarkIcon from '@mui/icons-material/Brightness7';
import LightIcon from '@mui/icons-material/Brightness4';
import { useAppTheme } from '../../context/theme/ThemeContext';
import { styled } from '@mui/material/styles';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
  color: theme.palette.mode === 'dark' ? '#ffb74d' : '#607d8b',
  '&:hover': {
    transform: 'rotate(180deg)',
  },
}));

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <StyledIconButton onClick={toggleTheme} aria-label="Toggle theme" color="default">
      {theme === 'dark' ? <DarkIcon /> : <LightIcon />}
    </StyledIconButton>
  );
};

export default ThemeToggle;
