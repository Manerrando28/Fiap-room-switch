import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Platform, ImageBackground } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Welcome() {
  const { width, height } = useWindowDimensions(); // Adicionado height para garantir preenchimento total
  const isDesktop = width > 768;
  const router = useRouter();

  return (
    <ImageBackground 
      source={require('../assets/images/Menu.png')} 
      // Aplicando dimensões dinâmicas para cobrir toda a viewport
      style={[styles.container, { width, height }]} 
      resizeMode="cover"
    >
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.glowCircle}>
              <MaterialCommunityIcons name="server-network" size={80} color="#ED145B" />
            </View>
          </View>

          <View style={styles.textSection}>
            <Text style={styles.subTitle}>SISTEMA DE GESTÃO DE</Text>
            <Text style={styles.mainTitle}>INFRA{"\n"}ACADÊMICA</Text>
            <View style={styles.divider} />
            <Text style={styles.description}>
              Monitore laboratórios e gerencie ativos da FIAP com performance de última geração.
            </Text>
          </View>

          <View style={[styles.footer, { width: isDesktop ? 400 : width * 0.85 }]}>
            <Pressable
              onPress={() => router.push('/login')} 
              style={({ pressed }) => [
                styles.getStartedButton,
                pressed && styles.buttonPressed
              ]}
            >
              <Text style={styles.buttonText}>INICIAR GESTÃO</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#FFF" />
            </Pressable>

            <Text style={styles.versionText}>V 2.0.4 - SHIFTING THE FUTURE</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0D0D0D', 
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  content: { 
    alignItems: 'center', 
    padding: 20,
    width: '100%' 
  },
  logoContainer: { 
    marginBottom: 40 
  },
  glowCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(237, 20, 91, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(237, 20, 91, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: '#ED145B',
        shadowOpacity: 0.5,
        shadowRadius: 20,
      },
      android: {
        elevation: 15,
      },
      web: {
        boxShadow: '0 0 40px rgba(237, 20, 91, 0.3)'
      }
    })
  },
  textSection: { 
    alignItems: 'center', 
    marginBottom: 60 
  },
  subTitle: { 
    color: '#888', 
    fontSize: 13, 
    fontWeight: '700', 
    letterSpacing: 4, 
    marginBottom: 10 
  },
  mainTitle: { 
    color: '#FFF', 
    fontSize: 48, 
    fontWeight: '900', 
    textAlign: 'center', 
    lineHeight: 52 
  },
  divider: { 
    width: 50, 
    height: 4, 
    backgroundColor: '#ED145B', 
    marginVertical: 20, 
    borderRadius: 2 
  },
  description: { 
    color: '#CCC', 
    fontSize: 16, 
    textAlign: 'center', 
    maxWidth: 300, 
    lineHeight: 24 
  },
  footer: { 
    alignItems: 'center' 
  },
  getStartedButton: {
    width: '100%',
    height: 68,
    backgroundColor: '#ED145B',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#ED145B',
        shadowOpacity: 0.4,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      }
    })
  },
  buttonPressed: { 
    transform: [{ scale: 0.98 }], 
    backgroundColor: '#D1104A' 
  },
  buttonText: { 
    color: '#FFF', 
    fontSize: 17, 
    fontWeight: '800', 
    letterSpacing: 1.2, 
    marginRight: 10 
  },
  versionText: { 
    marginTop: 30, 
    color: '#444', 
    fontSize: 10, 
    letterSpacing: 2 
  },
});