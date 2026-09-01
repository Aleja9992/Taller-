import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ContactoItem({ contacto, onPress }) {
  return (
    <TouchableOpacity style={styles.contactoItem} onPress={onPress}>
      <Text style={styles.nombre}>{contacto.nombre}</Text>
      <Text style={styles.telefono}>{contacto.telefono}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contactoItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  telefono: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
