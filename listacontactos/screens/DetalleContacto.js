import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { db } from '../firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default function DetalleContacto({ route, navigation }) {
  const { contacto } = route.params;
  const [loading, setLoading] = useState(false);

  const eliminarContacto = async () => {
    Alert.alert(
      'Eliminar Contacto',
      '¿Estás seguro de que deseas eliminar este contacto?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              setLoading(true);
              await deleteDoc(doc(db, 'contactos', contacto.id));
              Alert.alert('Éxito', 'Contacto eliminado correctamente');
              navigation.goBack();
            } catch (error) {
              console.error('Error al eliminar contacto:', error);
              Alert.alert('Error', 'No se pudo eliminar el contacto');
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    const date = fecha.toDate ? fecha.toDate() : new Date(fecha);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{contacto.nombre}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.valor}>{contacto.telefono}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.valor}>{contacto.email || 'No especificado'}</Text>
        </View>

        {contacto.fechaCreacion && (
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Creado:</Text>
            <Text style={styles.valor}>{formatearFecha(contacto.fechaCreacion)}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, styles.buttonEdit]}
        onPress={() => navigation.navigate('Crear', { contacto })}
        disabled={loading}
      >
        <Text style={styles.buttonText}>✎ Editar Contacto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonDelete]}
        onPress={eliminarContacto}
        disabled={loading}
      >
        <Text style={styles.buttonTextDelete}>{loading ? 'Eliminando...' : '🗑 Eliminar Contacto'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonBack]}
        onPress={() => navigation.goBack()}
        disabled={loading}
      >
        <Text style={styles.buttonTextSecondary}>Volver</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 5,
  },
  valor: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonEdit: {
    backgroundColor: '#34C759',
  },
  buttonDelete: {
    backgroundColor: '#FF3B30',
  },
  buttonBack: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDelete: {
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
