import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { SalaProvider } from '../Context/SalaContext';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <SalaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#6200ee' }, // cor do header
          headerTintColor: '#fff', // cor do texto/ícones
          headerTitleStyle: { fontWeight: 'bold' }, // título em negrito
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />

        <Stack.Screen
          name="menu"
          options={{
            title: 'Menu',
            headerRight: () => (
              <Ionicons name="home" size={24} color="#fff" />
            ),
          }}
        />

        <Stack.Screen
          name="salas"
          options={{
            title: 'Salas',
            headerRight: () => (
              <Ionicons name="business" size={24} color="#fff" />
            ),
          }}
        />

        <Stack.Screen
          name="reportar"
          options={{
            title: 'Reportar',
            headerRight: () => (
              <Ionicons name="alert-circle" size={24} color="#fff" />
            ),
          }}
        />
      </Stack>
      <Toast /> {/* componente global */}
    </SalaProvider>
  );
}
