import { Stack, useRouter, useSegments } from 'expo-router';
import Toast from 'react-native-toast-message';
import { SalaProvider } from './Context/SalaContext';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const router = useRouter();
  const segments = useSegments();

  // Revalida o login sempre que o usuário navegar
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
      // Pequeno delay apenas para garantir que a transição não seja brusca
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;

    // Obtém o caminho atual da navegação
    const currentRoute = segments.join('/');

    /**
     * DEFINIÇÃO DE ROTAS PÚBLICAS
     * '' ou 'index' -> Tela de Bem-vindo
     * 'login' -> Tela de Login
     * 'register' -> Tela de Cadastro
     */
    const isPublicRoute = 
      currentRoute === '' || 
      currentRoute === 'index' || 
      currentRoute.includes('login') || 
      currentRoute.includes('register');

    // 🚫 CASO 1: Usuário NÃO está logado e tenta acessar algo privado (dentro de tabs)
    if (!isLogged && !isPublicRoute) {
      // Enviamos ele para a tela inicial (index) ou Login. 
      // Como você quer a tela de boas-vindas primeiro, usamos o replace('/')
      router.replace('/'); 
    }

    // 🔐 CASO 2: Usuário ESTÁ logado e tenta voltar para Telas Públicas (Welcome/Login/Register)
    if (isLogged && isPublicRoute) {
      // Se ele já está logado, manda direto para o Menu principal
      router.replace('/(tabs)/menu');
    }
  }, [isLogged, segments, loading]);

  // Tela de carregamento enquanto verifica o AsyncStorage
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D0D0D' }}>
        <ActivityIndicator size="large" color="#ED145B" />
      </View>
    );
  }

  return (
    <SalaProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Removemos o header padrão para manter o estilo Cyberpunk
          contentStyle: { backgroundColor: '#0D0D0D' }, // Garante fundo preto em todas as transições
        }}
      >
        {/* Telas na raiz da pasta /app */}
        <Stack.Screen name="index" /> 
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />

        {/* Grupo de abas (a navegação interna delas é cuidada pelo (tabs)/_layout.tsx) */}
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
      </Stack>

      {/* Camada global de notificações */}
      <Toast />
    </SalaProvider>
  );
}