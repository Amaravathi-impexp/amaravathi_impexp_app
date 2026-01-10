/**
 * Error Fallback Component
 * Displays user-friendly error message when component crashes
 */

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import { ErrorOutline, Refresh, Home } from '@mui/icons-material';

interface ErrorFallbackProps {
  error: Error | null;
  onReset?: () => void;
}

export function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const isDevelopment = import.meta.env.MODE === 'development';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: 'center',
          }}
        >
          <ErrorOutline
            sx={{
              fontSize: 80,
              color: 'error.main',
              mb: 3,
            }}
          />

          <Typography variant="h4" gutterBottom>
            Oops! Something went wrong
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            We're sorry for the inconvenience. An unexpected error has occurred.
            <br />
            Please try refreshing the page or return to the homepage.
          </Typography>

          {isDevelopment && error && (
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 4,
                textAlign: 'left',
                bgcolor: 'grey.50',
                maxHeight: 200,
                overflow: 'auto',
              }}
            >
              <Typography
                variant="caption"
                component="pre"
                sx={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                }}
              >
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </Typography>
            </Paper>
          )}

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Refresh />}
              onClick={onReset || handleReload}
              size="large"
            >
              Refresh Page
            </Button>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<Home />}
              onClick={handleGoHome}
              size="large"
            >
              Go to Homepage
            </Button>
          </Stack>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 4, display: 'block' }}
          >
            If this problem persists, please contact support.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
