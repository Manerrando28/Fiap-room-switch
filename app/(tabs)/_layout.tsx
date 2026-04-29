import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { SalaProvider } from '../Context/SalaContext';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const logged = await AsyncStorage.getItem('logged');

    setIsLogged(logged === 'true');
    setLoading(false);
  };

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