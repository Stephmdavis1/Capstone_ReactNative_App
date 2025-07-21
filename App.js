import React, { useEffect, useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { loadFonts } from './constants/fonts';
import SplashScreen from './screens/SplashScreen';

const AppContent = () => {
  const { state, authActions } = useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [splashTimeElapsed, setSplashTimeElapsed] = useState(false);

  async function loadResourcesAndDataAsync() {
    try {
      await loadFonts();
    } catch (e) {
      console.warn(e);
    } finally {
      setFontsLoaded(true);
    }
  }

  useEffect(() => {
    loadResourcesAndDataAsync();
    authActions.setLoading(true);
    authActions.checkOnboard({});
  }, [authActions]);

  if (!splashTimeElapsed || !fontsLoaded || state.isLoading) {
    return <SplashScreen onReady={() => setSplashTimeElapsed(true)} />;
  }

  return <AppNavigator isOnboardingCompleted={state.isOnboardingCompleted} />;
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}


