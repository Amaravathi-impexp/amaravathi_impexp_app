/**
 * Snackbar Provider Configuration
 * Wraps the application with notistack for toast notifications
 */

import React, { ReactNode } from 'react';
import { SnackbarProvider as NotistackProvider } from 'notistack';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface SnackbarProviderProps {
  children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const notistackRef = React.useRef<any>(null);

  const onClickDismiss = (key: string | number) => () => {
    notistackRef.current?.closeSnackbar(key);
  };

  return (
    <NotistackProvider
      ref={notistackRef}
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={5000}
      action={(key) => (
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClickDismiss(key)}
        >
          <Close fontSize="small" />
        </IconButton>
      )}
    >
      {children}
    </NotistackProvider>
  );
}
