import { ThemeOptions } from '@mui/material/styles';

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    background: {
      default: mode === 'light' ? '#ffffff' : '#121212',
      paper: mode === 'light' ? '#f7f6f3' : '#1d1d1d',
    },
    text: {
      primary: mode === 'light' ? '#1a1a1a' : '#e0e0e0',
    },
  },
});
