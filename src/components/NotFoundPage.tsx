/**
 * 404 Not Found Page Component
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
import { SearchOff, Home, ArrowBack } from '@mui/icons-material';

interface NotFoundPageProps {
  onGoHome?: () => void;
  onGoBack?: () => void;
}

export function NotFoundPage({ onGoHome, onGoBack }: NotFoundPageProps) {
  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = '/';
    }
  };

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      window.history.back();
    }
  };

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
          <SearchOff
            sx={{
              fontSize: 80,
              color: 'warning.main',
              mb: 3,
            }}
          />

          <Typography variant="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
            404
          </Typography>

          <Typography variant="h4" gutterBottom>
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Sorry, we couldn't find the page you're looking for.
            <br />
            The page may have been moved or deleted.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Home />}
              onClick={handleGoHome}
              size="large"
            >
              Go to Homepage
            </Button>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBack />}
              onClick={handleGoBack}
              size="large"
            >
              Go Back
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
