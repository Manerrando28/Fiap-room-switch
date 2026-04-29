import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validarEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmar) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    if (!validarEmail(email)) {
      return Alert.alert('Email inválido');
    }

    if (senha.length < 6) {
      return Alert.alert('Senha deve ter no mínimo 6 caracteres');
    }

    if (senha !== confirmar) {
      return Alert.alert('As senhas não coincidem');
    }

    try {
      setLoading(true);

      const existingUser = await AsyncStorage.getItem('user');

      if (existingUser) {
        const parsed = JSON.parse(existingUser);
        if (parsed.email === email.trim().toLowerCase()) {
          return Alert.alert('Erro', 'E-mail já cadastrado');
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
      Alert.alert('Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput placeholder="Nome" style={styles.input} onChangeText={setNome} />
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry onChangeText={setSenha} />
      <TextInput placeholder="Confirmar senha" style={styles.input} secureTextEntry onChangeText={setConfirmar} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(tabs)/login')}>
        <Text style={styles.link}>Já tem conta? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20, backgroundColor:'#000' },
  title: { color:'#fff', fontSize:26, textAlign:'center', marginBottom:20 },
  input: { backgroundColor:'#111', color:'#fff', padding:12, marginBottom:12, borderRadius:10 },
  button: { backgroundColor:'#ED145B', padding:14, borderRadius:10 },
  buttonText: { color:'#fff', textAlign:'center', fontWeight:'bold' },
  link: { color:'#ED145B', textAlign:'center', marginTop:15 }
});