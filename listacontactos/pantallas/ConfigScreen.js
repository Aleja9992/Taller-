import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../contextos/AuthContexto';

export default function ConfigScreen() {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Configuración</Text>

        <View style={styles.userInfo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.valor}>{user?.email}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.label}>Información:</Text>
          <Text style={styles.valor}>Configuración disponible pronto</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 5,
  },
  valor: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
