import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/Menu.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        

        {/* FIAP */}
        <Text style={styles.fiap}>FIAP</Text>

        {/* APP NAME */}
        <Text style={styles.appName}>Gestor de Salas</Text>

        <Text style={styles.subtitle}>
          Controle simples de disponibilidade acadêmica
        </Text>

        {/* ENTRAR */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* REGISTRAR */}
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.link}>Criar conta</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 20,
  },

  logo: {
    width: 110,
    height: 110,
    marginBottom: 15,
  },

  fiap: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#ED145B',
    letterSpacing: 5,
  },

  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginVertical: 15,
  },

  button: {
    backgroundColor: '#ED145B',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  link: {
    color: '#fff',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});