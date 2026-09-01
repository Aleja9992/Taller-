import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './contextos/AuthContexto';
import { NavegacionTabs } from './navegacion/NavegacionTabs';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <NavegacionTabs />
      </NavigationContainer>
    </AuthProvider>
  );
}
