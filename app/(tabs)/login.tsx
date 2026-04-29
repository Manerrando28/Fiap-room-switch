import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const user = await AsyncStorage.getItem('user');

    if (!user) return Alert.alert('Erro', 'Nenhum usuário cadastrado');

    const parsed = JSON.parse(user);

    if (parsed.email === email && parsed.senha === senha) {
      await AsyncStorage.setItem('logged', 'true');
      router.replace('/menu');
    } else {
      Alert.alert('Erro', 'Credenciais inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} onChangeText={setSenha} />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20, backgroundColor:'#000' },
  title: { color:'#fff', fontSize:24, textAlign:'center', marginBottom:20 },
  input: { backgroundColor:'#111', color:'#fff', padding:10, marginBottom:10, borderRadius:8 },
  button: { backgroundColor:'#ED145B', padding:12, borderRadius:8 },
  buttonText: { color:'#fff', textAlign:'center' },
  link: { color:'#ED145B', textAlign:'center', marginTop:15 }
});