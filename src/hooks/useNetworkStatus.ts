/**
 * Network Status Hook
 * Monitors online/offline status and notifies users
 */

import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [offlineSnackbarKey, setOfflineSnackbarKey] = useState<string | number | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      
      // Close offline notification if it exists
      if (offlineSnackbarKey) {
        closeSnackbar(offlineSnackbarKey);
        setOfflineSnackbarKey(null);
      }
      
      // Show online notification
      enqueueSnackbar('Connection restored', {
        variant: 'success',
        autoHideDuration: 3000,
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      
      // Show persistent offline notification
      const key = enqueueSnackbar('No internet connection. Some features may be unavailable.', {
        variant: 'warning',
        persist: true,
      });
      
      setOfflineSnackbarKey(key);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial state
    if (!navigator.onLine) {
      handleOffline();
    }

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (offlineSnackbarKey) {
        closeSnackbar(offlineSnackbarKey);
      }
    };
  }, [enqueueSnackbar, closeSnackbar, offlineSnackbarKey]);

  return {
    isOnline,
    isOffline: !isOnline,
  };
}
