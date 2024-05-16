import { ThemeOptions } from '@mui/material/styles';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ColorPalette {
  LIGHT_BACKGROUND = '#e0f7fa',
  DARK_BACKGROUND = '#263238',
  LIGHT_PAPER = '#ffffff',
  DARK_PAPER = '#37474f',
  LIGHT_TEXT_PRIMARY = '#424242',
  DARK_TEXT_PRIMARY = '#e0e0e0',
  LIGHT_PRIMARY_MAIN = '#1976d2',
  DARK_PRIMARY_MAIN = '#90caf9',
  LIGHT_SECONDARY_MAIN = '#f9a825',
  DARK_SECONDARY_MAIN = '#ffd95a',
  LIGHT_ERROR_MAIN = '#d32f2f',
  DARK_ERROR_MAIN = '#ef5350',
}

export const getDesignTokens = (mode: Theme): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === Theme.LIGHT ? ColorPalette.LIGHT_PRIMARY_MAIN : ColorPalette.DARK_PRIMARY_MAIN,
    },
    secondary: {
      main:
        mode === Theme.LIGHT ? ColorPalette.LIGHT_SECONDARY_MAIN : ColorPalette.DARK_SECONDARY_MAIN,
    },
    error: {
      main: mode === Theme.LIGHT ? ColorPalette.LIGHT_ERROR_MAIN : ColorPalette.DARK_ERROR_MAIN,
    },
    background: {
      default: mode === Theme.LIGHT ? ColorPalette.LIGHT_BACKGROUND : ColorPalette.DARK_BACKGROUND,
      paper: mode === Theme.LIGHT ? ColorPalette.LIGHT_PAPER : ColorPalette.DARK_PAPER,
    },
    text: {
      primary:
        mode === Theme.LIGHT ? ColorPalette.LIGHT_TEXT_PRIMARY : ColorPalette.DARK_TEXT_PRIMARY,
    },
  },
});

export enum Endpoint {
  CURRENT_WEATHER = 'current.json',
  FORECAST = 'weather',
}
