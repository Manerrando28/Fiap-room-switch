import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/Menu.png')}
      style={styles.container}
    >
      {/* overlay escuro */}
      <View style={styles.overlay}>

        {/* LOGO + GLOW */}
        <View style={styles.logoWrapper}>
          <View style={styles.glow} />
          <Ionicons name="business" size={80} color="#ED145B" />
        </View>

        {/* TEXTOS */}
        <View style={styles.textGroup}>
          <Text style={styles.title}>Gestor de Salas</Text>
          <Text style={styles.subtitle}>
            Smart Campus FIAP: Infraestrutura conectada e inteligente.
          </Text>
        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>INICIAR SESSÃO</Text>

          <View style={styles.arrowCircle}>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* FOOTER */}
        <Text style={styles.footer}>FIAP © 2026</Text>
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
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  /* LOGO */
  logoWrapper: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  glow: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(237,20,91,0.4)',
    opacity: 0.7,
  },

  /* TEXTOS */
  textGroup: {
    marginBottom: 50,
    alignItems: 'center',
  },

  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },

  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 10,
    textAlign: 'center',
  },

  /* BOTÃO */
  button: {
    width: '100%',
    height: 65,
    backgroundColor: '#ED145B',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },

  arrowCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* FOOTER */
  footer: {
    position: 'absolute',
    bottom: 40,
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});