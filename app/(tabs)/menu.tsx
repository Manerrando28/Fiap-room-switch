import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Menu() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/Menu.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        {/* NOVO TEXTO */}
        <Text style={styles.fiap}>FIAP</Text>

        <Text style={styles.title}>Menu Principal</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/salas')}
        >
          <Ionicons name="business" size={28} color="#6200ee" />
          <Text style={styles.cardText}>Salas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/reportar')}
        >
          <Ionicons name="alert-circle" size={28} color="#e53935" />
          <Text style={styles.cardText}>Reportar Problema</Text>
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

  // 🔥 NOVO ESTILO
  fiap: {
    fontSize: 100,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
    color: '#ffffff', // vermelho estilo FIAP
    marginBottom: 100,
    letterSpacing: 3,
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
  },
});