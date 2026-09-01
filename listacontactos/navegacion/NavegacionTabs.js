import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavegacionStack } from './NavegacionStack';
import ConfigScreen from '../pantallas/ConfigScreen';

const Tab = createBottomTabNavigator();

export const NavegacionTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen
        name="ContactosStack"
        component={NavegacionStack}
        options={{
          title: 'Contactos',
          tabBarLabel: 'Contactos',
          tabBarIcon: ({ color, size }) => (
            // Puedes usar react-native-vector-icons aquí
            <Text style={{ fontSize: size, color }}>👥</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Configuracion"
        component={ConfigScreen}
        options={{
          title: 'Configuración',
          tabBarLabel: 'Configuración',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>⚙️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
