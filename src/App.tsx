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
import { setCurrentView, setPendingScrollSection } from './store/slices/uiSlice';
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
  const pendingScrollSection = useAppSelector((state) => state.ui.pendingScrollSection);
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const [logoutApi] = useLogoutMutation();
  
  // Monitor network status
  useNetworkStatus();

  useEffect(() => {
    document.title = 'TIMPEX.club - Telugu Import Export Club';
  }, []);

  // Handle pending scroll section when returning to home
  useEffect(() => {
    if (currentView === 'home' && pendingScrollSection) {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        handleScrollToSection(pendingScrollSection);
        dispatch(setPendingScrollSection(null));
      }, 100);
    }
  }, [currentView, pendingScrollSection]);

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

  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -136; // Offset for fixed header (40px TopRibbon + 96px Toolbar)
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleNavigateToSectionFromAuth = (sectionId: string) => {
    dispatch(setPendingScrollSection(sectionId));
    dispatch(setCurrentView('home'));
  };

  if (currentView === 'signin') {
    return (
      <SignIn 
        onClose={() => dispatch(setCurrentView('home'))} 
        onSwitchToSignUp={() => dispatch(setCurrentView('signup'))}
        onSignInSuccess={() => dispatch(setCurrentView('dashboard'))}
        onAboutClick={() => dispatch(setCurrentView('about'))}
        onContactClick={() => dispatch(setCurrentView('contact'))}
        onScrollToSection={handleNavigateToSectionFromAuth}
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
        onScrollToSection={handleNavigateToSectionFromAuth}
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
        onScrollToSection={handleScrollToSection}
        currentView={currentView}
      />
      <Hero 
        onGetStarted={() => dispatch(setCurrentView('signin'))} 
        onEnrollClick={() => dispatch(setCurrentView('signup'))}
      />
      <Box id="why-timpex">
        <WhyTimpex />
      </Box>
      <IdealForNRTs />
      <Box id="who-is-this-for">
        <WhoIsThisFor />
      </Box>
      <Box id="what-we-offer">
        <WhatWeOffer />
      </Box>
      <Box id="how-it-works">
        <HowItWorks />
      </Box>
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