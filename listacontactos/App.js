import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { NavegacionStack } from './navegacion/NavegacionStack';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <NavegacionStack />
    </NavigationContainer>
  );
}
