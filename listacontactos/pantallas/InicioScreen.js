import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ContactoItem from '../componentes/ContactoItem';

export default function InicioScreen({ navigation }) {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <ContactoItem
      contacto={item}
      onPress={() => navigation.navigate('Detalle', { contacto: item })}
    />
  );

  return (
    <View style={styles.container}>
      <Button
        title="+ Agregar Contacto"
        onPress={() => navigation.navigate('Registrar')}
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
