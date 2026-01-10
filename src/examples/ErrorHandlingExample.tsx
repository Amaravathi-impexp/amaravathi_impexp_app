/**
 * Error Handling Usage Examples
 * Demonstrates how to use the error handling system
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { NotFoundPage } from '../components/NotFoundPage';

/**
 * Example 1: API Error Handling
 */
function ApiErrorExample() {
  const { handleApiError, showSuccess } = useErrorHandler();
  const [loading, setLoading] = useState(false);

  const simulateApiError = async (errorType: number) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate different error types
      const mockError = {
        status: errorType,
        data: errorType === 422 
          ? { message: 'Email is already in use', errors: { email: 'Email is already in use' } }
          : { message: 'Server error' },
      };
      
      throw mockError;
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const simulateSuccess = async () => {
    setLoading(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showSuccess('Operation completed successfully!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        API Error Handling Examples
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Click buttons to simulate different error scenarios:
      </Typography>

      <Stack spacing={2}>
        <Button
          variant="outlined"
          onClick={() => simulateApiError(401)}
          disabled={loading}
        >
          Simulate 401 Unauthorized (Will logout)
        </Button>

        <Button
          variant="outlined"
          onClick={() => simulateApiError(403)}
          disabled={loading}
        >
          Simulate 403 Forbidden
        </Button>

        <Button
          variant="outlined"
          onClick={() => simulateApiError(404)}
          disabled={loading}
        >
          Simulate 404 Not Found
        </Button>

        <Button
          variant="outlined"
          onClick={() => simulateApiError(422)}
          disabled={loading}
        >
          Simulate 422 Validation Error
        </Button>

        <Button
          variant="outlined"
          onClick={() => simulateApiError(500)}
          disabled={loading}
        >
          Simulate 500 Server Error
        </Button>

        <Button
          variant="contained"
          onClick={simulateSuccess}
          disabled={loading}
        >
          Simulate Success
        </Button>
      </Stack>
    </Paper>
  );
}

/**
 * Example 2: Component That Throws Error
 */
function ErrorThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Example component error - This is caught by Error Boundary');
  }

  return (
    <Typography color="success.main">
      Component is working correctly!
    </Typography>
  );
}

/**
 * Example 3: Error Boundary Usage
 */
function ErrorBoundaryExample() {
  const [throwError, setThrowError] = useState(false);

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Error Boundary Example
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Error boundaries catch JavaScript errors in child components:
      </Typography>

      <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={throwError} />
        </ErrorBoundary>
      </Box>

      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setThrowError(true)}
        >
          Trigger Component Error
        </Button>

        <Button
          variant="outlined"
          onClick={() => setThrowError(false)}
        >
          Reset
        </Button>
      </Stack>
    </Paper>
  );
}

/**
 * Example 4: Network Status
 */
function NetworkStatusExample() {
  const { isOnline, isOffline } = useNetworkStatus();

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Network Status Monitor
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Current network status:
      </Typography>

      <Box
        sx={{
          p: 2,
          borderRadius: 1,
          bgcolor: isOnline ? 'success.light' : 'warning.light',
          color: isOnline ? 'success.dark' : 'warning.dark',
        }}
      >
        <Typography variant="h6">
          {isOnline ? '✓ Online' : '⚠ Offline'}
        </Typography>
        <Typography variant="body2">
          {isOnline
            ? 'All features are available'
            : 'Some features may be unavailable'}
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        Try turning off your network connection to test offline detection
      </Typography>
    </Paper>
  );
}

/**
 * Example 5: Form Error Handling
 */
function FormErrorExample() {
  const { handleApiError, showSuccess, showWarning } = useErrorHandler();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!email) {
      showWarning('Please enter an email address');
      return;
    }

    if (!email.includes('@')) {
      showWarning('Please enter a valid email address');
      return;
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate validation error from backend
      const mockError = {
        status: 422,
        data: {
          message: 'Validation failed',
          errors: {
            email: 'This email is already registered',
          },
        },
      };
      
      throw mockError;
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Form Error Handling
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '16px',
            }}
          />

          <Button type="submit" variant="contained">
            Submit (Will show validation error)
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

/**
 * Main Example Component
 */
export function ErrorHandlingExample() {
  const [showNotFound, setShowNotFound] = useState(false);

  if (showNotFound) {
    return (
      <NotFoundPage
        onGoHome={() => setShowNotFound(false)}
        onGoBack={() => setShowNotFound(false)}
      />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Error Handling System Examples
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Interactive examples demonstrating the error handling system.
        Open the browser console to see error logs in development mode.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <ApiErrorExample />
      <ErrorBoundaryExample />
      <NetworkStatusExample />
      <FormErrorExample />

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          404 Not Found Page
        </Typography>

        <Button
          variant="outlined"
          onClick={() => setShowNotFound(true)}
        >
          Show 404 Page
        </Button>
      </Paper>

      <Paper sx={{ p: 3, bgcolor: 'info.light' }}>
        <Typography variant="h6" gutterBottom>
          💡 Tips
        </Typography>

        <ul>
          <li>
            <Typography variant="body2">
              All errors are logged and ready for Sentry integration
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Network errors automatically retry up to 3 times with exponential backoff
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              401 errors automatically log out the user
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Sensitive data (passwords, tokens) is sanitized from error logs
            </Typography>
          </li>
        </ul>
      </Paper>
    </Container>
  );
}
