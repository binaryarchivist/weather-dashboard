import React, { createContext, useCallback, useContext, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { getDesignTokens, Theme } from '../../utils/constants';
import { IThemeContextProps, IThemeContextType } from './ThemeContext.types';

const ThemeContext = createContext<IThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<IThemeContextProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  const toggleTheme = useCallback((): void => {
    setTheme((prevTheme: Theme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  }, []);

  const muiTheme = createTheme(getDesignTokens(theme));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CssBaseline />
      <MUIThemeProvider theme={muiTheme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = (): IThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useAppTheme must be used within a ThemeProvider');
  return context;
};
