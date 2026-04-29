import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
    senha: ''
  });

  const router = useRouter();

  // 🔥 VALIDAÇÃO EM TEMPO REAL
  useEffect(() => {
    validar();
  }, [email, senha]);

  const validar = () => {
    let novosErros = { email: '', senha: '' };

    if (!email) {
      novosErros.email = 'O e-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      novosErros.email = 'E-mail inválido';
    }

    if (!senha) {
      novosErros.senha = 'A senha é obrigatória';
    } else if (senha.length < 6) {
      novosErros.senha = 'Mínimo 6 caracteres';
    }

    setErrors(novosErros);

    return !novosErros.email && !novosErros.senha;
  };

  const handleLogin = async () => {
    const valido = validar();

    if (!valido) return;

    try {
      setLoading(true);

      const user = await AsyncStorage.getItem('user');

      if (!user) {
        setErrors(prev => ({ ...prev, email: 'Usuário não encontrado' }));
        return;
      }

      const parsed = JSON.parse(user);

      if (
        parsed.email === email.trim().toLowerCase() &&
        parsed.senha === senha.trim()
      ) {
        await AsyncStorage.setItem('logged', 'true');
        router.replace('/(tabs)/menu');
      } else {
        setErrors(prev => ({ ...prev, senha: 'E-mail ou senha inválidos' }));
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasError = errors.email || errors.senha;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* EMAIL */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      {/* SENHA */}
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />
      {errors.senha ? <Text style={styles.error}>{errors.senha}</Text> : null}

      {/* BOTÃO */}
      <TouchableOpacity
        style={[styles.button, hasError && { opacity: 0.5 }]}
        onPress={handleLogin}
        disabled={!!hasError || loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Entrar</Text>
        }
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
    marginBottom:5,
    borderRadius:10
  },

  error: {
    color:'red',
    marginBottom:10,
    marginLeft:5
  },

  button: {
    backgroundColor:'#ED145B',
    padding:14,
    borderRadius:10,
    marginTop:10
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