import React from 'react';
import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/landing/Hero';
import { WhyTimpex } from './components/landing/WhyTimpex';
import { IdealForNRTs } from './components/landing/IdealForNRTs';
import { WhoIsThisFor } from './components/landing/WhoIsThisFor';
import { WhatWeOffer } from './components/landing/WhatWeOffer';
import { HowItWorks } from './components/landing/HowItWorks';
import { OutcomesForParticipants } from './components/landing/OutcomesForParticipants';
import { Footer } from './components/layout/Footer';
import { SignIn } from './screens/auth/SignIn';
import { SignUp } from './screens/auth/SignUp';
import { MainLayout } from './screens/dashboard/MainLayout';
import { About } from './screens/landing/About';
import { Careers } from './screens/landing/Careers';
import { Contact } from './screens/landing/Contact';
import { useEffect } from 'react';
import { logger } from './utils/logger';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { setCurrentView } from './store/slices/uiSlice';
import { logout } from './store/slices/authSlice';
import { useLogoutMutation } from './store/api/authApi';
import { baseApi } from './store/api/baseApi';
import { Box } from '@mui/material';
import { ThemeProvider } from './src/providers/ThemeProvider';
import { SnackbarProvider } from './src/providers/SnackbarProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useNetworkStatus } from './hooks/useNetworkStatus';

// Export store and RootState for Figma preview system
export { store } from './store';
export type { RootState } from './store';

function AppContent() {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector((state) => state.ui.currentView);
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const [logoutApi] = useLogoutMutation();
  
  // Monitor network status
  useNetworkStatus();

  // Preload reference data on app initialization for better performance
  // Countries and Roles are small datasets used frequently across the app
  // Skip preloading to prevent initialization errors
  // These will load on-demand when dropdowns are first used
  // ProductTypes are loaded on-demand when the dropdown is first used

  useEffect(() => {
    document.title = 'TIMPEX.club - Telugu Import Export Club';
  }, []);

  const handleSignOut = async () => {
    try {
      // Call logout API if we have a refresh token
      if (refreshToken) {
        await logoutApi({
          refreshToken: refreshToken,
          allSessions: true,
        }).unwrap();
      }
    } catch (error) {
      // Continue with local logout even if API fails
      // Error details not logged to prevent exposing sensitive data
    } finally {
      // Clear Redux auth state
      dispatch(logout());
      
      // Clear all RTK Query cache
      dispatch(baseApi.util.resetApiState());
      
      // Navigate to home
      dispatch(setCurrentView('home'));
    }
  };

  if (currentView === 'signin') {
    return (
      <SignIn 
        onClose={() => dispatch(setCurrentView('home'))} 
        onSwitchToSignUp={() => dispatch(setCurrentView('signup'))}
        onSignInSuccess={() => dispatch(setCurrentView('dashboard'))}
        onAboutClick={() => dispatch(setCurrentView('about'))}
        onContactClick={() => dispatch(setCurrentView('contact'))}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignUp 
        onClose={() => dispatch(setCurrentView('home'))} 
        onSwitchToSignIn={() => dispatch(setCurrentView('signin'))}
        onSignUpSuccess={() => dispatch(setCurrentView('dashboard'))}
        onAboutClick={() => dispatch(setCurrentView('about'))}
        onContactClick={() => dispatch(setCurrentView('contact'))}
      />
    );
  }

  if (currentView === 'dashboard') {
    return <MainLayout onSignOut={handleSignOut} />;
  }

  if (currentView === 'about') {
    return <About 
      onClose={() => dispatch(setCurrentView('home'))}
      onSignInClick={() => dispatch(setCurrentView('signin'))}
      onHomeClick={() => dispatch(setCurrentView('home'))}
      onAboutClick={() => dispatch(setCurrentView('about'))}
      onCareersClick={() => dispatch(setCurrentView('careers'))}
      onContactClick={() => dispatch(setCurrentView('contact'))}
      currentView={currentView}
    />;
  }

  if (currentView === 'careers') {
    return <Careers 
      onClose={() => dispatch(setCurrentView('home'))}
      onSignInClick={() => dispatch(setCurrentView('signin'))}
      onHomeClick={() => dispatch(setCurrentView('home'))}
      onAboutClick={() => dispatch(setCurrentView('about'))}
      onCareersClick={() => dispatch(setCurrentView('careers'))}
      onContactClick={() => dispatch(setCurrentView('contact'))}
      currentView={currentView}
    />;
  }

  if (currentView === 'contact') {
    return <Contact 
      onClose={() => dispatch(setCurrentView('home'))}
      onSignInClick={() => dispatch(setCurrentView('signin'))}
      onHomeClick={() => dispatch(setCurrentView('home'))}
      onAboutClick={() => dispatch(setCurrentView('about'))}
      onCareersClick={() => dispatch(setCurrentView('careers'))}
      onContactClick={() => dispatch(setCurrentView('contact'))}
      currentView={currentView}
    />;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navigation 
        onSignInClick={() => dispatch(setCurrentView('signin'))}
        onHomeClick={() => dispatch(setCurrentView('home'))}
        onAboutClick={() => dispatch(setCurrentView('about'))}
        onCareersClick={() => dispatch(setCurrentView('careers'))}
        onContactClick={() => dispatch(setCurrentView('contact'))}
        currentView={currentView}
      />
      <Hero onGetStarted={() => dispatch(setCurrentView('signup'))} />
      <WhyTimpex />
      <IdealForNRTs />
      <WhoIsThisFor />
      <WhatWeOffer />
      <HowItWorks />
      <OutcomesForParticipants />
      <Footer />
    </Box>
  );
}

// Wrapper to isolate App from Figma-specific props
function AppWrapper(props: any) {
  // Filter out all Figma-specific props before rendering
  // Don't pass any props down to children
  return (
    <Provider store={store}>
      <ThemeProviderWrapper />
    </Provider>
  );
}

// Additional wrapper to ensure no props leak to ThemeProvider
function ThemeProviderWrapper() {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default function App(props: any) {
  // Filter out all Figma-specific data attributes to prevent MUI warnings
  // Figma adds data-fg-* attributes that are not valid React/MUI props
  // By not passing props down, we stop them from reaching MUI components
  return <AppWrapper />;
}

// Attach reduxState to App component for Figma preview system
// This allows the preview system to access the Redux state
if (typeof window !== 'undefined') {
  // Expose as a function that returns the current state
  (App as any).reduxState = () => {
    try {
      return store.getState();
    } catch (error) {
      console.warn('Failed to get Redux state:', error);
      return null;
    }
  };
  
  // Also expose the store itself
  (App as any).store = store;
  
  // Add a safety check for Figma's preview logging (development only)
  if (!(window as any).logPreviewError) {
    (window as any).logPreviewError = (error: any, reduxState?: any) => {
      // Only log in development to avoid console clutter
      if (import.meta.env.DEV) {
        logger.error('Preview Error', { error, reduxState });
      }
    };
  } else {
    // Wrap existing logPreviewError to provide default reduxState if missing
    const originalLogPreviewError = (window as any).logPreviewError;
    (window as any).logPreviewError = (error: any, reduxState?: any) => {
      // If reduxState is not provided, try to get it from the store
      const state = reduxState || (App as any).reduxState?.();
      originalLogPreviewError(error, state);
    };
  }
}