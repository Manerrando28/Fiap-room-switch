import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo do app */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />


      {/* Nome e subtítulo */}
      <Text style={styles.appName}>Gestor de Salas</Text>
      <Text style={styles.subtitle}>Controle simples de disponibilidade</Text>

      {/* Botão Entrar */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/menu')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  logo: { width: 120, height: 120, marginBottom: 20 },
  appName: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 30 },
  button: { backgroundColor: '#1976d2', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
