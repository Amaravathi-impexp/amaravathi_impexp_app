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
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { setCurrentView } from './store/slices/uiSlice';
import { logout } from './store/slices/authSlice';
import { useLogoutMutation } from './store/api/authApi';
import { baseApi } from './store/api/baseApi';
import { Box } from '@mui/material';
import { ThemeProvider } from './providers/ThemeProvider';
import { SnackbarProvider } from './providers/SnackbarProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useNetworkStatus } from './hooks/useNetworkStatus';

/**
 * TIMPEX.club Application
 * @version 2.2.2 - Clean paths, providers moved to /providers/
 */

function AppContent() {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector((state) => state.ui.currentView);
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const [logoutApi] = useLogoutMutation();
  
  // Monitor network status
  useNetworkStatus();

  useEffect(() => {
    document.title = 'TIMPEX.club - Telugu Import Export Club';
  }, []);

  const handleSignOut = async () => {
    try {
      if (refreshToken) {
        await logoutApi({
          refreshToken: refreshToken,
          allSessions: true,
        }).unwrap();
      }
    } catch (error) {
      // Continue with local logout even if API fails
    } finally {
      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
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
      <Hero 
        onGetStarted={() => dispatch(setCurrentView('signin'))} 
        onEnrollClick={() => dispatch(setCurrentView('signup'))}
      />
      <WhyTimpex />
      <IdealForNRTs />
      <WhoIsThisFor />
      <WhatWeOffer />
      <HowItWorks />
      <OutcomesForParticipants />
      <Footer onHomeClick={() => dispatch(setCurrentView('home'))} />
    </Box>
  );
}

function AppWrapper() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SnackbarProvider>
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default function App() {
  return <AppWrapper />;
}