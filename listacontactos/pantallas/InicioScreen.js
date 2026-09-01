import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { AuthContext } from '../contextos/AuthContexto';

export default function InicioScreen({ navigation }) {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      cargarContactos();
    }, [])
  );

  const cargarContactos = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'contactos'));
      const lista = [];
      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setContactos(lista);
    } catch (error) {
      console.error('Error cargando contactos:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContacto = ({ item }) => (
    <TouchableOpacity
      style={styles.contactoItem}
      onPress={() => navigation.navigate('Detalle', { contacto: item })}
    >
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.telefono}>{item.telefono}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bienvenida}>Bienvenido {user?.email}</Text>
      </View>
      
      <Button
        title="+ Agregar Contacto"
        onPress={() => navigation.navigate('Detalle')}
        color="#007AFF"
      />
      
      {loading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : contactos.length === 0 ? (
        <Text style={styles.emptyText}>No hay contactos. ¡Crea uno!</Text>
      ) : (
        <FlatList
          data={contactos}
          renderItem={renderContacto}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  bienvenida: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
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
  listContent: {
    paddingTop: 10,
  },
  loadingText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    color: '#999',
  },
  emptyText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    color: '#999',
  },
});
