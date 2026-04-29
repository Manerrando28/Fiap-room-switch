import { Stack, useFocusEffect } from 'expo-router';
import Toast from 'react-native-toast-message';
import { SalaProvider } from '../Context/SalaContext';
import { useCallback, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const checkLogin = async () => {
    try {
      const logged = await AsyncStorage.getItem('logged');
      setIsLogged(logged === 'true');
    } catch (error) {
      console.log('Erro ao verificar login:', error);
      setIsLogged(false);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Atualiza sempre que a tela ganha foco (resolve logout/login)
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      checkLogin();
    }, [])
  );

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000' }}>
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
        initialRouteName={isLogged ? 'menu' : 'login'}
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