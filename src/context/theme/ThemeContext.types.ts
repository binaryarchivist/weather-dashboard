import React from 'react';
import { Theme } from '../../utils/constants';

export interface IThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface IThemeContextProps {
  children: React.ReactNode;
}
