import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Solutions } from './components/Solutions';
import { Stats } from './components/Stats';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Dashboard } from './components/Dashboard';
import { About } from './components/About';
import { Careers } from './components/Careers';
import { Contact } from './components/Contact';
import { useState, useEffect } from 'react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'signin' | 'signup' | 'dashboard' | 'about' | 'careers' | 'contact'>('home');

  useEffect(() => {
    document.title = 'Amaravathi Imports & Exports';
  }, []);

  if (currentView === 'signin') {
    return (
      <SignIn 
        onClose={() => setCurrentView('home')} 
        onSwitchToSignUp={() => setCurrentView('signup')}
        onSignInSuccess={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignUp 
        onClose={() => setCurrentView('home')} 
        onSwitchToSignIn={() => setCurrentView('signin')}
      />
    );
  }

  if (currentView === 'dashboard') {
    return <Dashboard onSignOut={() => setCurrentView('home')} />;
  }

  if (currentView === 'about') {
    return <About 
      onClose={() => setCurrentView('home')}
      onSignInClick={() => setCurrentView('signin')}
      onHomeClick={() => setCurrentView('home')}
      onAboutClick={() => setCurrentView('about')}
      onCareersClick={() => setCurrentView('careers')}
      onContactClick={() => setCurrentView('contact')}
    />;
  }

  if (currentView === 'careers') {
    return <Careers 
      onClose={() => setCurrentView('home')}
      onSignInClick={() => setCurrentView('signin')}
      onHomeClick={() => setCurrentView('home')}
      onAboutClick={() => setCurrentView('about')}
      onCareersClick={() => setCurrentView('careers')}
      onContactClick={() => setCurrentView('contact')}
    />;
  }

  if (currentView === 'contact') {
    return <Contact 
      onClose={() => setCurrentView('home')}
      onSignInClick={() => setCurrentView('signin')}
      onHomeClick={() => setCurrentView('home')}
      onAboutClick={() => setCurrentView('about')}
      onCareersClick={() => setCurrentView('careers')}
      onContactClick={() => setCurrentView('contact')}
    />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        onSignInClick={() => setCurrentView('signin')}
        onHomeClick={() => setCurrentView('home')}
        onAboutClick={() => setCurrentView('about')}
        onCareersClick={() => setCurrentView('careers')}
        onContactClick={() => setCurrentView('contact')}
      />
      <Hero />
      <Services />
      <Solutions />
      <Stats />
      <CTASection />
      <Footer />
    </div>
  );
}