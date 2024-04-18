import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { getDesignTokens, Theme } from '../../utils/constants';
import { ThemeContextType } from './ThemeContext.types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  }, []);

  const muiTheme = createTheme(getDesignTokens(theme));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CssBaseline />
      <MUIThemeProvider theme={muiTheme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useAppTheme must be used within a ThemeProvider');
  return context;
};
