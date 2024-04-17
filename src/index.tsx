import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import Router from './router/Router';
import { ThemeProvider } from './context/theme/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
);
