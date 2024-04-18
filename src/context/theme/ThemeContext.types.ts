import { Theme } from '../../utils/constants';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
