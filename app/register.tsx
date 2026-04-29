import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView, Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  useWindowDimensions,
  View
} from 'react-native';

export default function Register() {
  const { width, height } = useWindowDimensions();
  const isDesktop = width > 768;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmar: ''
  });

  const router = useRouter();

  useEffect(() => {
    if (submitted) validar();
  }, [nome, email, senha, confirmar]);

  const validar = () => {
    let novosErros = { nome: '', email: '', senha: '', confirmar: '' };
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
    return !Object.values(novosErros).some(err => err !== '');
  };

  const handleRegister = async () => {
    setSubmitted(true);
    if (!validar()) return;

    try {
      setLoading(true);
      const userObj = {
        nome,
        email: email.trim().toLowerCase(),
        senha: senha.trim()
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(userObj));
      await AsyncStorage.setItem('logged', 'true');
      
      setTimeout(() => {
        router.replace('/(tabs)/menu');
      }, 1200);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/images/fundo-tela-bar.jpeg')} 
      style={[styles.landingContainer, { width, height }]} 
      resizeMode="cover"
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Stack.Screen options={{ headerShown: false }} />

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Overlay semitransparente para garantir leitura sobre a imagem do bar */}
          <View style={styles.overlay}>
            
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={26} color="#FFF" />
            </Pressable>

            <View style={[styles.loginCard, { width: isDesktop ? 420 : width * 0.88 }]}>
              
              <View style={styles.header}>
                <Text style={styles.neonTitle}>Criar Conta</Text>
                <Text style={styles.quote}>Junte-se à gestão do futuro</Text>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Nome completo</Text>
                <View style={[styles.inputContainer, submitted && !!errors.nome && styles.inputError]}>
                  <MaterialCommunityIcons name="account-outline" size={22} color="#ED145B" />
                  <TextInput
                    placeholder="Seu nome aqui"
                    placeholderTextColor="#555"
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                  />
                </View>
                {submitted && errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>E-mail</Text>
                <View style={[styles.inputContainer, submitted && !!errors.email && styles.inputError]}>
                  <MaterialCommunityIcons name="email-outline" size={22} color="#ED145B" />
                  <TextInput
                    placeholder="exemplo@fiap.com.br"
                    placeholderTextColor="#555"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
                {submitted && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Senha</Text>
                <View style={[styles.inputContainer, submitted && !!errors.senha && styles.inputError]}>
                  <MaterialCommunityIcons name="lock-outline" size={22} color="#ED145B" />
                  <TextInput
                    placeholder="Mínimo 6 caracteres"
                    placeholderTextColor="#555"
                    secureTextEntry
                    style={styles.input}
                    value={senha}
                    onChangeText={setSenha}
                  />
                </View>
                {submitted && errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Confirmar Senha</Text>
                <View style={[styles.inputContainer, submitted && !!errors.confirmar && styles.inputError]}>
                  <MaterialCommunityIcons name="lock-check-outline" size={22} color="#ED145B" />
                  <TextInput
                    placeholder="Repita sua senha"
                    placeholderTextColor="#555"
                    secureTextEntry
                    style={styles.input}
                    value={confirmar}
                    onChangeText={setConfirmar}
                  />
                </View>
                {submitted && errors.confirmar ? <Text style={styles.errorText}>{errors.confirmar}</Text> : null}
              </View>

              <Pressable 
                onPress={() => router.push('/login')}
                style={styles.rowLink}
              >
                <Text style={styles.linkGray}>Já tem uma conta? </Text>
                <Text style={styles.linkWhite}>Entrar</Text>
              </Pressable>

              <Pressable
                onPress={handleRegister}
                disabled={loading}
                style={({ pressed }) => [
                  styles.mainButton,
                  pressed && styles.buttonPressed,
                  loading && { opacity: 0.7 }
                ]}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>CADASTRAR</Text>
                )}
              </Pressable>

              <Text style={styles.footerText}>© 2026 FIAP - INFRA GESTÃO</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  landingContainer: { flex: 1, backgroundColor: '#0D0D0D' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  overlay: { 
    flex: 1, 
    alignItems: 'center', 
    paddingVertical: 40, 
    backgroundColor: 'rgba(0,0,0,0.65)' 
  },
  backButton: { position: 'absolute', top: 20, left: 20, zIndex: 10, padding: 10 },
  loginCard: { alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 35 },
  neonTitle: {
    fontSize: 56,
    fontWeight: '900',
    color: '#ED145B',
    textShadowColor: 'rgba(237, 20, 91, 0.6)',
    textShadowRadius: 25,
    letterSpacing: -1,
  },
  quote: { color: '#AAA', fontSize: 15, marginTop: 8, fontStyle: 'italic', fontWeight: '500' },
  inputWrapper: { width: '100%', marginBottom: 16 },
  label: { color: '#BBB', fontSize: 13, fontWeight: '700', marginBottom: 8, marginLeft: 4 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 22, 22, 0.9)',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#333',
    paddingHorizontal: 16,
    height: 62,
  },
  inputError: { borderColor: '#ED145B' },
  input: { 
    flex: 1, 
    color: '#FFF', 
    fontSize: 16, 
    marginLeft: 12,
    ...Platform.select({
      web: { outlineWidth: 0 } as any,
      default: {}
    })
  },
  errorText: { color: '#ED145B', fontSize: 12, marginTop: 6, marginLeft: 8, fontWeight: '600' },
  rowLink: { flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 25, padding: 5 },
  linkGray: { color: '#999', fontSize: 14 },
  linkWhite: { color: '#ED145B', fontSize: 14, fontWeight: '800' },
  mainButton: {
    width: '100%',
    height: 68,
    backgroundColor: '#ED145B',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    backgroundColor: '#D1104A',
  },
  buttonText: { 
    color: '#FFF', 
    fontSize: 17, 
    fontWeight: '900', 
    letterSpacing: 1.2 
  },
  footerText: { marginTop: 45, color: '#555', fontSize: 11, letterSpacing: 2, fontWeight: '700' },
});