import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    try {
      setLoading(true);

      const emailFormatado = email.trim().toLowerCase();
      const senhaFormatada = senha.trim();

      const user = await AsyncStorage.getItem('user');

      if (!user) {
        return Alert.alert('Erro', 'Nenhum usuário cadastrado');
      }

      let parsed;
      try {
        parsed = JSON.parse(user);
      } catch {
        return Alert.alert('Erro', 'Dados do usuário corrompidos');
      }

      if (!parsed?.email || !parsed?.senha) {
        return Alert.alert('Erro', 'Usuário inválido');
      }

      if (
        parsed.email === emailFormatado &&
        parsed.senha === senhaFormatada
      ) {
        await AsyncStorage.setItem('logged', 'true');

        // pequeno delay evita conflito com layout
        setTimeout(() => {
          router.replace('/(tabs)/menu');
        }, 50);

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
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.input}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(tabs)/register')}>
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