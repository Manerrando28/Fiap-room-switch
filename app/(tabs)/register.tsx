import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Register() {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [confirmar, setConfirmar] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // ✅ tipado corretamente
  const validarEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async (): Promise<void> => {
    if (!nome || !email || !senha || !confirmar) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    if (!validarEmail(email)) {
      return Alert.alert(
        'Email inválido',
        'Use o formato correto: usuario@dominio.com'
      );
    }

    if (senha.length < 6) {
      return Alert.alert(
        'Senha inválida',
        'A senha deve ter no mínimo 6 caracteres'
      );
    }

    if (senha !== confirmar) {
      return Alert.alert('Erro', 'As senhas não coincidem');
    }

    try {
      setLoading(true);

      const existingUser = await AsyncStorage.getItem('user');

      if (existingUser) {
        const parsed = JSON.parse(existingUser);

        if (parsed.email === email) {
          return Alert.alert('Erro', 'Este e-mail já está cadastrado');
        }
      }

      await AsyncStorage.setItem(
        'user',
        JSON.stringify({ nome, email, senha })
      );

      await AsyncStorage.setItem('logged', 'true');

      Alert.alert('Sucesso', 'Conta criada com sucesso!');

      setTimeout(() => {
        router.replace('/menu');
      }, 100);

    } catch (error) {
      console.log('Erro ao cadastrar:', error);
      Alert.alert('Erro', 'Falha ao criar conta');
    } finally {
      setLoading(false);
    }
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

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>Já tem conta? Fazer login</Text>
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
    marginBottom: 12,
    borderRadius: 10,
  },

  button: {
    backgroundColor: '#ED145B',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  link: {
    color: '#ED145B',
    textAlign: 'center',
    marginTop: 15,
  },
});