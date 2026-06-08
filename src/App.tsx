import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import LoginScreen from './screens/LoginScreen';
import PersonalDetailsScreen from './screens/PersonalDetailsScreen';
import CourseSelectionScreen from './screens/CourseSelectionScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import { supabase } from './lib/supabaseClient';

function App() {
  const { currentScreen, setScreen } = useStore();

  useEffect(() => {
    // Check if user is already logged in on app load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && currentScreen === 'login') {
        setScreen('personal');
      }
    });

    // Listen for auth changes (logout etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setScreen('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'personal':
        return <PersonalDetailsScreen />;
      case 'courses':
        return <CourseSelectionScreen />;
      case 'confirmation':
        return <ConfirmationScreen />;
      default:
        return <LoginScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {currentScreen !== 'login' && <Navbar />}
      <div className="fade-enter-active">
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;
