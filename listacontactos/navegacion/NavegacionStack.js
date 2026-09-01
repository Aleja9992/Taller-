import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from '../pantallas/InicioScreen';
import DetalleScreen from '../pantallas/DetalleScreen';
import RegistrarScreen from '../pantallas/RegistrarScreen';

const Stack = createStackNavigator();

export const NavegacionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#007AFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Inicio"
        component={InicioScreen}
        options={{ title: 'Mis Contactos' }}
      />
      <Stack.Screen
        name="Detalle"
        component={DetalleScreen}
        options={({ route }) => ({
          title: route.params?.contacto?.nombre || 'Detalle Contacto',
        })}
      />
      <Stack.Screen
        name="Registrar"
        component={RegistrarScreen}
        options={{ title: 'Nuevo Contacto' }}
      />
    </Stack.Navigator>
  );
};
