import { Stack, useRouter, useSegments } from 'expo-router';
import Toast from 'react-native-toast-message';
import { SalaProvider } from '../Context/SalaContext';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const router = useRouter();
  const segments = useSegments();

  // 🔥 AGORA REVALIDA SEMPRE QUE A ROTA MUDA
  useEffect(() => {
    checkLogin();
  }, [segments]);

  const checkLogin = async () => {
    try {
      const logged = await AsyncStorage.getItem('logged');
      setIsLogged(logged === 'true');
    } catch (error) {
      console.log('Erro ao verificar login', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;

    const currentRoute = segments.join('/');

    const inAuth =
      currentRoute.includes('login') ||
      currentRoute.includes('register');

    // 🚫 NÃO LOGADO
    if (!isLogged && !inAuth) {
      router.replace('/(tabs)/login');
    }

    // 🔐 LOGADO
    if (isLogged && inAuth) {
      router.replace('/(tabs)/menu');
    }
  }, [isLogged, segments, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#ED145B" />
      </View>
    );
  }

  return (
    <SalaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="menu" />
        <Stack.Screen name="salas" />
        <Stack.Screen name="reportar" />
      </Stack>

      <Toast />
    </SalaProvider>
  );
}