import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function RegistrarScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [loading, setLoading] = useState(false);

  const registrarContacto = async () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre es requerido');
      return;
    }
    if (!telefono.trim()) {
      Alert.alert('Error', 'El teléfono es requerido');
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, 'contactos'), {
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        ciudad: ciudad.trim(),
        fechaCreacion: new Date(),
      });
      Alert.alert('Éxito', 'Contacto registrado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudo registrar el contacto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Nuevo Contacto</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Teléfono *</Text>
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ciudad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ciudad"
          value={ciudad}
          onChangeText={setCiudad}
          keyboardType="default"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={registrarContacto}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Guardando...' : 'Registrar Contacto'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
