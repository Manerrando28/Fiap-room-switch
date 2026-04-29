import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false); // 🔥 NOVO

  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmar: ''
  });

  const router = useRouter();

  const validar = () => {
    let novosErros = {
      nome: '',
      email: '',
      senha: '',
      confirmar: ''
    };

    if (!nome) novosErros.nome = 'O nome é obrigatório';

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

    if (!confirmar) {
      novosErros.confirmar = 'Confirme a senha';
    } else if (senha !== confirmar) {
      novosErros.confirmar = 'As senhas não coincidem';
    }

    setErrors(novosErros);

    return (
      !novosErros.nome &&
      !novosErros.email &&
      !novosErros.senha &&
      !novosErros.confirmar
    );
  };

  const handleRegister = async () => {
    setSubmitted(true); // 🔥 ativa validação

    const valido = validar();
    if (!valido) return;

    try {
      setLoading(true);

      const existingUser = await AsyncStorage.getItem('user');

      if (existingUser) {
        const parsed = JSON.parse(existingUser);
        if (parsed.email === email.trim().toLowerCase()) {
          setErrors(prev => ({
            ...prev,
            email: 'Este e-mail já está cadastrado'
          }));
          return;
        }
      }

      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          nome,
          email: email.trim().toLowerCase(),
          senha: senha.trim()
        })
      );

      await AsyncStorage.setItem('logged', 'true');

      router.replace('/(tabs)/menu');

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasError = Boolean(
  errors.nome ||
  errors.email ||
  errors.senha ||
  errors.confirmar
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      {/* NOME */}
      <TextInput
        placeholder="Nome"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      {submitted && errors.nome ? <Text style={styles.error}>{errors.nome}</Text> : null}

      {/* EMAIL */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      {submitted && errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      {/* SENHA */}
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />
      {submitted && errors.senha ? <Text style={styles.error}>{errors.senha}</Text> : null}

      {/* CONFIRMAR */}
      <TextInput
        placeholder="Confirmar senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        value={confirmar}
        onChangeText={setConfirmar}
      />
      {submitted && errors.confirmar ? <Text style={styles.error}>{errors.confirmar}</Text> : null}

      {/* BOTÃO */}
      <TouchableOpacity
        style={[styles.button, submitted && hasError && { opacity: 0.5 }]}
        onPress={handleRegister}
        disabled={loading || (submitted && hasError)}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Cadastrar</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(tabs)/login')}>
        <Text style={styles.link}>Já tem conta? Login</Text>
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
    fontSize:26,
    textAlign:'center',
    marginBottom:20
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