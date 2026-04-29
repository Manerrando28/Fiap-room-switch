import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Menu() {
  const router = useRouter();
  const [nome, setNome] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const logged = await AsyncStorage.getItem('logged');

    if (logged !== 'true') {
      router.replace('/login');
      return;
    }

    const user = await AsyncStorage.getItem('user');

    if (user) {
      const parsed = JSON.parse(user);
      setNome(parsed.nome);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('logged');
    router.replace('/login');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Menu.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        {/* FIAP TITLE */}
        <Text style={styles.fiap}>FIAP</Text>

        {/* USER */}
        <Text style={styles.welcome}>Bem-vindo, {nome}</Text>

        <Text style={styles.title}>Menu Principal</Text>

        {/* SALAS */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/salas')}
        >
          <Ionicons name="business" size={28} color="#6200ee" />
          <Text style={styles.cardText}>Salas</Text>
        </TouchableOpacity>

        {/* REPORTAR */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/reportar')}
        >
          <Ionicons name="alert-circle" size={28} color="#e53935" />
          <Text style={styles.cardText}>Reportar Problema</Text>
        </TouchableOpacity>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.card}
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={28} color="#000" />
          <Text style={styles.cardText}>Sair</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    justifyContent: 'center',
  },

  fiap: {
    fontSize: 90,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 20,
    letterSpacing: 3,
  },

  welcome: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffcc',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },

  cardText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
    fontWeight: 'bold',
  },
});