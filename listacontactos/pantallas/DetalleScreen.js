import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { db } from '../firebase';
import { doc, deleteDoc, updateDoc, addDoc, collection } from 'firebase/firestore';

export default function DetalleScreen({ route, navigation }) {
  const contacto = route.params?.contacto;
  const [nombre, setNombre] = useState(contacto?.nombre || '');
  const [telefono, setTelefono] = useState(contacto?.telefono || '');
  const [email, setEmail] = useState(contacto?.email || '');
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(!contacto);

  const guardarContacto = async () => {
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
      if (contacto?.id) {
        // Actualizar
        await updateDoc(doc(db, 'contactos', contacto.id), {
          nombre: nombre.trim(),
          telefono: telefono.trim(),
          email: email.trim(),
        });
        Alert.alert('Éxito', 'Contacto actualizado correctamente');
        setEditando(false);
      } else {
        // Crear nuevo
        await addDoc(collection(db, 'contactos'), {
          nombre: nombre.trim(),
          telefono: telefono.trim(),
          email: email.trim(),
          fechaCreacion: new Date(),
        });
        Alert.alert('Éxito', 'Contacto creado correctamente');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudo guardar el contacto');
    } finally {
      setLoading(false);
    }
  };

  const eliminarContacto = async () => {
    if (!contacto?.id) return;

    Alert.alert(
      'Eliminar Contacto',
      '¿Estás seguro?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              setLoading(true);
              await deleteDoc(doc(db, 'contactos', contacto.id));
              Alert.alert('Éxito', 'Contacto eliminado');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar');
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>
        {editando ? 'Editar Contacto' : contacto?.nombre}
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          editable={editando && !loading}
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
          editable={editando && !loading}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={editando && !loading}
        />
      </View>

      {editando ? (
        <>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary, loading && styles.buttonDisabled]}
            onPress={guardarContacto}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => setEditando(false)}
            disabled={loading}
          >
            <Text style={styles.buttonTextSecondary}>Cancelar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={[styles.button, styles.buttonEdit]}
            onPress={() => setEditando(true)}
            disabled={loading}
          >
            <Text style={styles.buttonText}>✎ Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonDelete]}
            onPress={eliminarContacto}
            disabled={loading}
          >
            <Text style={styles.buttonText}>🗑 Eliminar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonBack]}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.buttonTextSecondary}>Volver</Text>
          </TouchableOpacity>
        </>
      )}
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
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
  },
  buttonEdit: {
    backgroundColor: '#34C759',
  },
  buttonDelete: {
    backgroundColor: '#FF3B30',
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonBack: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});
