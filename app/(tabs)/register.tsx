import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const router = useRouter();

  // ✅ valida email correto
  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    // ❌ campos vazios
    if (!nome || !email || !senha || !confirmar) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    // ❌ email inválido
    if (!validarEmail(email)) {
      return Alert.alert(
        'Email inválido',
        'Use o formato correto: usuario@dominio.com'
      );
    }

    // ❌ senha fraca
    if (senha.length < 6) {
      return Alert.alert(
        'Senha inválida',
        'A senha deve ter no mínimo 6 caracteres'
      );
    }

    // ❌ senhas diferentes
    if (senha !== confirmar) {
      return Alert.alert('Erro', 'As senhas não coincidem');
    }

    // 💾 salva usuário
    await AsyncStorage.setItem(
      'user',
      JSON.stringify({ nome, email, senha })
    );

    Alert.alert('Sucesso', 'Conta criada com sucesso!');

    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        placeholder="Nome completo"
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        onChangeText={setSenha}
      />

      <TextInput
        placeholder="Confirmar senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        onChangeText={setConfirmar}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
  },

  title: {
    color: '#fff',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#111',
    color: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },

  button: {
    backgroundColor: '#ED145B',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});