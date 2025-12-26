import { Navigation } from './components/Navigation';
import { HeroCarousel } from './components/HeroCarousel';
import { Services } from './components/Services';
import { Solutions } from './components/Solutions';
import { Stats } from './components/Stats';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Verification } from './components/Verification';
import { MainLayout } from './components/MainLayout';
import { About } from './components/About';
import { Careers } from './components/Careers';
import { Contact } from './components/Contact';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { setCurrentView } from './store/slices/uiSlice';
import { logout } from './store/slices/authSlice';

function AppContent() {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector((state) => state.ui.currentView);
  const [verificationEmail, setVerificationEmail] = useState('');

  useEffect(() => {
    document.title = 'Amaravathi Imports & Exports';
  }, []);

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(setCurrentView('home'));
  };

  if (currentView === 'signin') {
    return (
      <SignIn 
        onClose={() => dispatch(setCurrentView('home'))} 
        onSwitchToSignUp={() => dispatch(setCurrentView('signup'))}
        onSignInSuccess={() => dispatch(setCurrentView('dashboard'))}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignUp 
        onClose={() => dispatch(setCurrentView('home'))} 
        onSwitchToSignIn={() => dispatch(setCurrentView('signin'))}
        onSignUpSuccess={(email) => {
          setVerificationEmail(email);
          dispatch(setCurrentView('verification'));
        }}
      />
    );
  }

  if (currentView === 'verification') {
    return (
      <Verification
        onClose={() => dispatch(setCurrentView('home'))}
        onSwitchToSignIn={() => dispatch(setCurrentView('signin'))}
        email={verificationEmail}
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
    <div className="min-h-screen bg-white">
      <Navigation 
        onSignInClick={() => dispatch(setCurrentView('signin'))}
        onHomeClick={() => dispatch(setCurrentView('home'))}
        onAboutClick={() => dispatch(setCurrentView('about'))}
        onCareersClick={() => dispatch(setCurrentView('careers'))}
        onContactClick={() => dispatch(setCurrentView('contact'))}
        currentView={currentView}
      />
      <HeroCarousel />
      <Services />
      <Solutions />
      <Stats />
      <CTASection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}