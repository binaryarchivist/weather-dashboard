import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// src/theme.ts
import { createTheme, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // light theme colors
          background: {
            default: '#ffffff',
            paper: '#f7f6f3',
          },
          text: {
            primary: '#1a1a1a',
          },
        }
      : {
          // dark theme colors
          background: {
            default: '#121212',
            paper: '#1d1d1d',
          },
          text: {
            primary: '#e0e0e0',
          },
        }),
  },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const muiTheme = createTheme(getDesignTokens(theme as 'light' | 'dark'));

  return <MUIThemeProvider theme={muiTheme}>{children}</MUIThemeProvider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
