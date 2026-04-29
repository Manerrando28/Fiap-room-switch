import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Digite um e-mail válido');
      return;
    }

    try {
      setLoading(true);

      const user = await AsyncStorage.getItem('user');

      if (!user) {
        Alert.alert('Erro', 'Nenhum usuário cadastrado');
        return;
      }

      const parsed = JSON.parse(user);

      if (parsed.email === email && parsed.senha === senha) {
        await AsyncStorage.setItem('logged', 'true');

        // 🔥 pequeno delay evita bug de navegação
        setTimeout(() => {
          router.replace('/menu');
        }, 100);
      } else {
        Alert.alert('Erro', 'E-mail ou senha inválidos');
      }
    } catch (error) {
      console.log('Erro no login:', error);
      Alert.alert('Erro', 'Falha ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.input}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    padding:20,
    backgroundColor:'#000'
  },

  title: {
    color:'#fff',
    fontSize:24,
    textAlign:'center',
    marginBottom:20,
    fontWeight:'bold'
  },

  input: {
    backgroundColor:'#111',
    color:'#fff',
    padding:12,
    marginBottom:12,
    borderRadius:10
  },

  button: {
    backgroundColor:'#ED145B',
    padding:14,
    borderRadius:10,
    marginTop:5
  },

  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold'
  },

  link: {
    color:'#ED145B',
    textAlign:'center',
    marginTop:15
  }
});