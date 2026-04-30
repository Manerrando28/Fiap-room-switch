import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Pressable,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, 
  ScrollView, useWindowDimensions, ImageBackground
} from 'react-native';
import { useRouter, Stack } from 'expo-router'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from './Context/AuthContext'; // ✅ Importa o contexto

export default function Login() {
  const { width, height } = useWindowDimensions();
  const isDesktop = width > 768;

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ email: '', senha: '', auth: '' });

  const router = useRouter();
  const { login } = useAuth(); // ✅ Usa login do contexto

  useEffect(() => {
    if (submitted) validar();
  }, [email, senha]);

  const validar = () => {
    let novosErros = { email: '', senha: '', auth: '' };
    let valido = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      novosErros.email = 'E-mail inválido';
      valido = false;
    }
    if (!senha) {
      novosErros.senha = 'Senha obrigatória';
      valido = false;
    }
    setErrors(novosErros);
    return valido;
  };

  const handleLogin = async () => {
    setSubmitted(true);
    if (!validar()) return;
    try {
      setLoading(true);
      await login(email.trim().toLowerCase(), senha.trim()); // ✅ chama login do contexto
      setTimeout(() => router.replace('/(tabs)/menu'), 1200);
    } catch (error) {
      setErrors(prev => ({ ...prev, auth: 'Falha na autenticação.' }));
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
          <View style={styles.overlay}>
            
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
            </Pressable>

            <View style={[styles.loginCard, { width: isDesktop ? 420 : width * 0.88 }]}>
              <View style={styles.header}>
                <Text style={styles.neonTitle}>Login</Text>
                <Text style={styles.quote}>Acesse o painel de controle</Text>
              </View>

              {errors.auth && (
                <View style={styles.authErrorBanner}>
                  <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#fff" />
                  <Text style={styles.authErrorText}>{errors.auth}</Text>
                </View>
              )}

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
                  />
                </View>
                {submitted && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Senha</Text>
                <View style={[styles.inputContainer, submitted && !!errors.senha && styles.inputError]}>
                  <MaterialCommunityIcons name="lock-outline" size={22} color="#ED145B" />
                  <TextInput
                    placeholder="........"
                    placeholderTextColor="#555"
                    secureTextEntry
                    style={styles.input}
                    value={senha}
                    onChangeText={setSenha}
                  />
                </View>
                {submitted && errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}
              </View>

              <Pressable onPress={() => router.push('/register')} style={styles.rowLink}>
                <Text style={styles.linkGray}>Novo por aqui? </Text>
                <Text style={styles.linkWhite}>Criar conta</Text>
              </Pressable>

              <Pressable 
                onPress={handleLogin} 
                disabled={loading || !email || !senha || !!errors.email || !!errors.senha}
                style={[styles.mainButton, (loading || !!errors.email || !!errors.senha) && { opacity: 0.7 }]}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>ENTRAR</Text>}
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
  overlay: { flex: 1, alignItems: 'center', paddingVertical: 40, backgroundColor: 'rgba(0,0,0,0.65)' },
  backButton: { position: 'absolute', top: 20, left: 25, zIndex: 10, padding: 10 },
  loginCard: { alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 30 },
  neonTitle: { fontSize: 62, fontWeight: '900', color: '#ED145B', textShadowColor: 'rgba(237, 20, 91, 0.6)', textShadowRadius: 25 },
  quote: { color: '#AAA', fontSize: 15, marginTop: 8 },
  authErrorBanner: { backgroundColor: 'rgba(237, 20, 91, 0.15)', flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 14, width: '100%', marginBottom: 20, borderWidth: 1, borderColor: '#ED145B' },
  authErrorText: { color: '#FFF', fontSize: 13, marginLeft: 10, fontWeight: '600' },
  inputWrapper: { width: '100%', marginBottom: 16 },
  label: { color: '#BBB', fontSize: 13, fontWeight: '700', marginBottom: 8, marginLeft: 4 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(22, 22, 22, 0.8)', borderRadius: 18, borderWidth: 1.5, borderColor: '#333', paddingHorizontal: 16, height: 62 },
  inputError: { borderColor: '#ED145B' },
  input: { flex: 1, color: '#FFF', fontSize: 16, marginLeft: 12 },
  errorText: { color: '#ED145B', fontSize: 12, marginTop: 4, marginLeft: 8 },
  rowLink: { flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 25, padding: 5 },
  linkGray: { color: '#999', fontSize: 14 },
  linkWhite: { color: '#ED145B', fontSize: 14, fontWeight: '800' },
  mainButton: { width: '100%', height: 68, backgroundColor: '#ED145B', borderRadius: 22, alignItems: 'center', justifyContent: 'center', elevation: 10 },
  buttonText: { color: '#FFF', fontSize: 17, fontWeight: '900', letterSpacing: 1.2 },
  footerText: { marginTop: 45, color: '#555', fontSize: 11, letterSpacing: 2, fontWeight: '700' },
});
