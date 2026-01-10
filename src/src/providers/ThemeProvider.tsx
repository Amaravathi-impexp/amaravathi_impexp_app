import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { muiTheme } from '../theme/muiTheme';
import React from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Wrapper component to filter out Figma-specific data attributes
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Use React.createElement to ensure no extra props are passed
  return React.createElement(
    MuiThemeProvider,
    { theme: muiTheme },
    React.createElement(React.Fragment, null, 
      React.createElement(CssBaseline, null),
      children
    )
  );
}