# 📱 Directorio de Contactos

Aplicación móvil desarrollada con **React Native y Expo** para gestionar un directorio de contactos utilizando **Cloud Firestore** como base de datos.

La aplicación permite consultar contactos, visualizar su información detallada y registrar nuevos contactos desde un dispositivo físico mediante **Expo Go** o desde un emulador.

---

## 📋 Descripción

El proyecto corresponde a la implementación de una aplicación móvil denominada **Directorio de Contactos**.

La aplicación permite:

- Visualizar una lista de contactos.
- Consultar los datos de un contacto.
- Registrar nuevos contactos.
- Guardar la información en Cloud Firestore.
- Actualizar la lista después de crear un contacto.
- Navegar entre las diferentes pantallas mediante Stack Navigation.
- Ejecutarse utilizando Expo Go o un emulador.

Cada contacto contiene tres datos principales:

- **Nombre**
- **Teléfono**
- **Ciudad**

---

# 🛠️ Tecnologías utilizadas

- React Native
- Expo
- Expo Go
- JavaScript
- React Navigation
- Firebase
- Cloud Firestore
- Node.js
- npm

---

# 📦 Instalación

## 1. Crear el proyecto

El proyecto se creó utilizando Expo con el template `blank`.

```bash
npx create-expo-app@latest listacontactos --template blank
```

Ingresar al proyecto:

```bash
cd listacontactos
```

---

## 2. Instalar React Navigation

Se instalaron las dependencias necesarias para utilizar navegación Stack y navegación por Tabs:

```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
```

También se instalaron las dependencias nativas compatibles con Expo:

```bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-worklets react-native-screens react-native-safe-area-context
```

---

## 3. Instalar Firebase

Para utilizar Firebase y Cloud Firestore:

```bash
npm install firebase
```

---

# 🔥 Configuración de Firebase

Se creó un proyecto en **Firebase Console** y dentro de este se registró una aplicación.

Posteriormente se habilitó el servicio:

**Cloud Firestore**

y se creó una colección llamada:

```text
contactos
```

Dentro de la colección se agregaron manualmente tres documentos de prueba desde la consola de Firebase.

Cada documento contiene los siguientes campos:

```text
nombre
teléfono
ciudad
```

Ejemplo:

```javascript
{
  nombre: "Juan Pérez",
  teléfono: "3001234567",
  ciudad: "Medellín"
}
```

---

# 🔐 Configuración de credenciales

Las credenciales de Firebase no deben quedar escritas directamente en archivos que sean versionados en Git.

Se utilizan variables de entorno mediante un archivo:

```text
.env
```

Ejemplo:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=tu_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

El archivo `.env` debe agregarse al archivo `.gitignore`:

```gitignore
.env
.env.local
```

De esta manera, las credenciales locales no se suben al repositorio.

---

# 🗂️ Estructura del proyecto

La estructura principal del proyecto es:

```text
listacontactos/
│
├── assets/
│
├── contextos/
│   └── AuthContexto.js
│
├── navegacion/
│   └── NavegacionStack.js
│
├── pantallas/
│   ├── ListaScreen.js
│   ├── DetalleScreen.js
│   └── NuevoScreen.js
│
├── firebase/
│   └── firebaseConfig.js
│
├── App.js
├── app.json
├── package.json
├── .gitignore
├── .env
└── README.md
```

---

# 🧭 Navegación

La aplicación utiliza un navegador de tipo **Stack** para controlar la navegación entre las tres pantallas principales.

Las pantallas son:

| Pantalla | Contenido | Navegación |
|---|---|---|
| Lista | Listado de contactos y botón para agregar uno nuevo | Lleva a Detalle o Nuevo |
| Detalle | Nombre, teléfono y ciudad del contacto | Permite regresar a Lista |
| Nuevo | Formulario para crear un contacto | Regresa automáticamente a Lista |

El flujo principal de navegación es:

```text
                 ┌───────────────┐
                 │     Lista     │
                 └───────┬───────┘
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
     ┌───────────────┐       ┌───────────────┐
     │    Detalle    │       │     Nuevo     │
     └───────┬───────┘       └───────┬───────┘
             │                       │
             └───────────┬───────────┘
                         ▼
                 ┌───────────────┐
                 │     Lista     │
                 └───────────────┘
```

---

# 🏠 Pantalla Lista

La pantalla **Lista** es la pantalla inicial de la aplicación.

Su función principal es consultar los contactos almacenados en Cloud Firestore y mostrarlos al usuario.

Incluye:

- Listado de contactos.
- Nombre del contacto.
- Información básica.
- Botón para crear un nuevo contacto.

Al seleccionar un contacto, la aplicación navega hacia la pantalla **Detalle**.

Al presionar el botón para agregar un contacto, la aplicación navega hacia la pantalla **Nuevo**.

Los datos mostrados en esta pantalla provienen directamente de Firestore y no de un arreglo de datos almacenado en el código.

---

# 👤 Pantalla Detalle

La pantalla **Detalle** muestra la información del contacto seleccionado.

Los datos mostrados son:

```text
Nombre
Teléfono
Ciudad
```

La pantalla recibe como parámetro el identificador del documento correspondiente al contacto seleccionado.

El identificador se utiliza para consultar el documento específico dentro de la colección:

```text
contactos
```

El título del encabezado corresponde al nombre del contacto seleccionado.

Por ejemplo:

```text
← Juan Pérez
```

La pantalla permite regresar a la pantalla **Lista**.

---

# ➕ Pantalla Nuevo

La pantalla **Nuevo** contiene un formulario para registrar un nuevo contacto.

El formulario tiene tres campos:

```text
Nombre
Teléfono
Ciudad
```

También contiene un botón:

```text
Guardar
```

Antes de guardar se verifica que ninguno de los campos esté vacío.

Si algún campo se encuentra vacío, el contacto no se registra y se muestra el mensaje correspondiente al usuario.

Cuando los tres campos contienen información válida, se crea un nuevo documento en Firestore dentro de la colección:

```text
contactos
```

Después de guardar correctamente, la aplicación regresa automáticamente a la pantalla **Lista**.

---

# ☁️ Cloud Firestore

La aplicación utiliza **Cloud Firestore** para almacenar y consultar la información de los contactos.

La colección utilizada es:

```text
contactos
```

Cada documento tiene la siguiente estructura:

```javascript
{
  nombre: "Juan Pérez",
  teléfono: "3001234567",
  ciudad: "Medellín"
}
```

La aplicación realiza las siguientes operaciones:

### Lectura

La pantalla Lista consulta los documentos existentes en la colección `contactos`.

Los resultados se muestran utilizando una lista eficiente de React Native.

### Consulta individual

La pantalla Detalle utiliza el identificador recibido como parámetro para consultar un contacto específico.

### Escritura

La pantalla Nuevo crea documentos nuevos dentro de la colección `contactos`.

---

# ⏳ Estado de carga

Mientras la aplicación obtiene los contactos desde Firestore se muestra un indicador de carga.

Ejemplo:

```text
Cargando contactos...
```

Esto permite informar al usuario que los datos todavía están siendo consultados.

Si la colección `contactos` se encuentra vacía, la aplicación muestra un mensaje indicando que no existen contactos registrados.

---

# 📱 Lista eficiente

Para mostrar los contactos se utiliza una lista optimizada de React Native, como `FlatList`.

No se utiliza un `ScrollView` simple para representar el listado principal.

Esto permite manejar de manera más eficiente una cantidad mayor de contactos.

---

# 🔥 Inicialización de Firebase

La configuración de Firebase se centraliza en un único archivo:

```text
firebase/firebaseConfig.js
```

Este archivo inicializa Firebase y exporta las referencias necesarias para utilizar Firestore.

Ejemplo:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```

El resto de la aplicación importa `db` desde este archivo para realizar las operaciones sobre Firestore.

---

# 🧩 Configuración de la aplicación

El archivo `App.js` contiene el contenedor principal de navegación y los componentes necesarios para ejecutar la aplicación.

Ejemplo:

```javascript
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './contextos/AuthContexto';
import { NavegacionStack } from './navegacion/NavegacionStack';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <NavegacionStack />
      </NavigationContainer>
    </AuthProvider>
  );
}
```

---

# 🧭 Configuración del Stack

La navegación principal utiliza `createNativeStackNavigator`.

Ejemplo:

```javascript
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaScreen from '../pantallas/ListaScreen';
import DetalleScreen from '../pantallas/DetalleScreen';
import NuevoScreen from '../pantallas/NuevoScreen';

const Stack = createNativeStackNavigator();

export const NavegacionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lista"
        component={ListaScreen}
        options={{
          title: 'Mis Contactos',
        }}
      />

      <Stack.Screen
        name="Detalle"
        component={DetalleScreen}
        options={({ route }) => ({
          title: route.params?.nombre || 'Detalle',
        })}
      />

      <Stack.Screen
        name="Nuevo"
        component={NuevoScreen}
        options={{
          title: 'Nuevo Contacto',
        }}
      />
    </Stack.Navigator>
  );
};
```

Los títulos de las pantallas se muestran en español.

En la pantalla Detalle, el título cambia de acuerdo con el nombre del contacto seleccionado.

---

# ▶️ Ejecución del proyecto

Para iniciar el proyecto se utiliza:

```bash
npx expo start
```

Después se puede ejecutar mediante:

- Expo Go en un dispositivo físico.
- Emulador Android.
- Simulador iOS en macOS.

Para utilizar Expo Go, se debe escanear el código QR generado por Expo.

---

# ⚡ Fast Refresh

Durante el desarrollo se modificó el texto de la pantalla inicial para comprobar el funcionamiento de **Fast Refresh**.

Los cambios realizados en el código se reflejan automáticamente en la aplicación sin necesidad de cerrar y volver a abrir la aplicación.

---

# 🔄 Flujo de creación de un contacto

El proceso para registrar un nuevo contacto es:

```text
Usuario
   │
   ▼
Pantalla Nuevo
   │
   ├── Nombre
   ├── Teléfono
   └── Ciudad
   │
   ▼
Validación
   │
   ├── Campo vacío → No guardar
   │
   └── Datos válidos
            │
            ▼
       Cloud Firestore
            │
            ▼
      Crear documento
            │
            ▼
      Regresar a Lista
            │
            ▼
    Mostrar nuevo contacto
```

---

# ✅ Verificación final

Se verificaron los siguientes requisitos:

- [x] Proyecto creado con Expo.
- [x] Proyecto creado utilizando el template `blank`.
- [x] Aplicación ejecutable mediante Expo Go.
- [x] Dependencias de navegación instaladas.
- [x] Dependencias nativas compatibles con Expo instaladas.
- [x] Firebase instalado y configurado.
- [x] Proyecto creado en Firebase.
- [x] Cloud Firestore habilitado.
- [x] Colección `contactos` creada.
- [x] Tres documentos de prueba registrados.
- [x] Pantalla Lista implementada.
- [x] Pantalla Detalle implementada.
- [x] Pantalla Nuevo implementada.
- [x] Navegación Stack configurada.
- [x] Navegación desde Lista hacia Detalle.
- [x] Navegación desde Lista hacia Nuevo.
- [x] Regreso desde Detalle hacia Lista.
- [x] Regreso automático desde Nuevo hacia Lista después de guardar.
- [x] Encabezados configurados en español.
- [x] El título de Detalle corresponde al contacto seleccionado.
- [x] Detalle recibe el identificador del contacto mediante parámetros.
- [x] Los datos se obtienen desde Cloud Firestore.
- [x] No se utiliza un arreglo quemado como fuente principal de contactos.
- [x] Los contactos se muestran mediante una lista eficiente.
- [x] Se muestra un indicador mientras los datos están cargando.
- [x] Se controla el caso de una colección vacía.
- [x] Se validan los campos del formulario Nuevo.
- [x] No se permite guardar campos vacíos.
- [x] Los nuevos contactos se almacenan en Firestore.
- [x] El nuevo contacto aparece en la lista sin cerrar la aplicación.
- [x] El contacto creado puede visualizarse desde la consola de Firebase.
- [x] Se probó Fast Refresh.
- [x] La aplicación funciona sin pantallas rojas de error.
- [x] Las credenciales no se encuentran directamente en el código versionado.
- [x] El archivo `.env` está incluido en `.gitignore`.

---

# 📁 Archivos principales

| Archivo | Función |
|---|---|
| `App.js` | Punto de entrada de la aplicación |
| `firebase/firebaseConfig.js` | Inicialización y configuración de Firebase |
| `navegacion/NavegacionStack.js` | Configuración de la navegación Stack |
| `pantallas/ListaScreen.js` | Listado de contactos |
| `pantallas/DetalleScreen.js` | Información del contacto seleccionado |
| `pantallas/NuevoScreen.js` | Formulario para crear contactos |
| `contextos/AuthContexto.js` | Contexto utilizado para manejar la autenticación |
| `.env` | Variables de configuración de Firebase |
| `.gitignore` | Archivos excluidos del control de versiones |

---

# 🚀 Comandos principales

Crear el proyecto:

```bash
npx create-expo-app@latest listacontactos --template blank
```

Ingresar al proyecto:

```bash
cd listacontactos
```

Instalar navegación:

```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
```

Instalar dependencias compatibles con Expo:

```bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-worklets react-native-screens react-native-safe-area-context
```

Instalar Firebase:

```bash
npm install firebase
```

Ejecutar el proyecto:

```bash
npx expo start
```

---

# 👩‍💻 Proyecto académico

**Proyecto:** Directorio de Contactos

**Tecnologías principales:** React Native, Expo, React Navigation y Firebase Cloud Firestore.

**Plataforma de ejecución:** Expo Go / Android Emulator.

---
