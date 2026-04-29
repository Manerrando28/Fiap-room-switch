import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable, View, ScrollView, useWindowDimensions, Platform } from 'react-native';

export default function Menu() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('logged');
      router.replace('/'); 
    } catch (error) {
      console.log('Erro ao sair', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header de Boas-vindas */}
        <View style={styles.header}>
          <View>
            <Text style={styles.fiapText}>FIAP</Text>
            <Text style={styles.welcomeText}>
              {nome ? `Olá, ${nome.split(' ')[0]}` : 'Bem-vindo'}
            </Text>
          </View>
          <Pressable onPress={handleLogout} style={styles.logoutCircle}>
            <MaterialCommunityIcons name="power" size={24} color="#ED145B" />
          </Pressable>
        </View>

        <View style={styles.statusBanner}>
          <Text style={styles.statusTitle}>SISTEMA ATIVO</Text>
          <Text style={styles.statusSub}>Monitoramento de infraestrutura em tempo real</Text>
        </View>

        <Text style={styles.sectionLabel}>OPÇÕES DE GESTÃO</Text>

        {/* Grid de Cartões */}
        <View style={[styles.grid, { flexDirection: isDesktop ? 'row' : 'column' }]}>
          
          <Pressable 
            style={({ pressed }) => [styles.menuCard, pressed && styles.cardPressed]}
            onPress={() => router.push('/(tabs)/salas')}
          >
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name="office-building-cog" size={32} color="#ED145B" />
            </View>
            <Text style={styles.cardTitle}>Gerenciar Salas</Text>
            <Text style={styles.cardDesc}>Acesse laboratórios e salas de aula</Text>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [styles.menuCard, pressed && styles.cardPressed]}
            onPress={() => router.push('/(tabs)/reportar')}
          >
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name="alert-octagon" size={32} color="#ED145B" />
            </View>
            <Text style={styles.cardTitle}>Reportar Incidente</Text>
            <Text style={styles.cardDesc}>Notifique problemas técnicos</Text>
          </Pressable>

        </View>

        <Text style={styles.footerBranding}>© 2026 INFRASTRUCTURE UNIT</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  scrollContent: {
    padding: 25,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  fiapText: {
    color: '#ED145B',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
  },
  welcomeText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 5,
  },
  logoutCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#161616',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  statusBanner: {
    backgroundColor: 'rgba(237, 20, 91, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#ED145B',
    padding: 15,
    borderRadius: 12,
    marginBottom: 40,
  },
  statusTitle: {
    color: '#ED145B',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  statusSub: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  sectionLabel: {
    color: '#555',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 20,
  },
  grid: {
    gap: 20,
  },
  menuCard: {
    flex: 1,
    backgroundColor: '#161616',
    borderRadius: 22,
    padding: 25,
    borderWidth: 1,
    borderColor: '#222',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  cardPressed: {
    borderColor: '#ED145B',
    transform: [{ scale: 0.98 }],
  },
  iconBox: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(237, 20, 91, 0.05)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  cardDesc: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  footerBranding: {
    textAlign: 'center',
    color: '#222',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 60,
    letterSpacing: 3,
  },
});
