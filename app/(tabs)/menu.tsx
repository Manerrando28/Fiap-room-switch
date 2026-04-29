import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Menu() {
  const router = useRouter();
  const [nome, setNome] = useState('');

  useEffect(() => {
    carregarUsuario();
  }, []);

  const carregarUsuario = async () => {
    try {
      const user = await AsyncStorage.getItem('user');

      if (user) {
        const parsed = JSON.parse(user);
        setNome(parsed.nome || '');
      }
    } catch (error) {
      console.log('Erro ao carregar usuário', error);
    }
  };

  // 🔥 LOGOUT CORRETO (SEM APAGAR USUÁRIO)
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('logged'); // ✅ CORRETO

      router.replace('/(tabs)/login');

    } catch (error) {
      console.log('Erro ao sair', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Menu.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        <Text style={styles.fiap}>FIAP</Text>

        <Text style={styles.welcome}>
          {nome ? `Bem-vindo, ${nome}` : 'Bem-vindo'}
        </Text>

        <Text style={styles.title}>Menu Principal</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/(tabs)/salas')}
        >
          <Ionicons name="business" size={28} color="#6200ee" />
          <Text style={styles.cardText}>Salas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/(tabs)/reportar')}
        >
          <Ionicons name="alert-circle" size={28} color="#e53935" />
          <Text style={styles.cardText}>Reportar Problema</Text>
        </TouchableOpacity>

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
  container: { flex: 1 },
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