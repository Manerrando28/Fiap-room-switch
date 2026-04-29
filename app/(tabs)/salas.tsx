import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useState, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { SalaContext } from '../Context/SalaContext';

type Sala = {
  id: number;
  nome: number;
  status: 'Livre' | 'Ocupada' | 'Problema';
  nomeUsuario?: string;
};

export default function Salas() {
  const context = useContext(SalaContext);

  const [salaSelecionada, setSalaSelecionada] = useState<Sala | null>(null);
  const [nome, setNome] = useState<string>('');
  const [busca, setBusca] = useState<string>('');
  const [andarSelecionado, setAndarSelecionado] = useState<number | null>(null);

  if (!context) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.neonText}>Carregando sistema...</Text>
      </View>
    );
  }

  const { salasDisponiveis, reservarSala, liberarSala } = context;

  const totalLivre = salasDisponiveis.filter(s => s.status === 'Livre').length;
  const totalOcupada = salasDisponiveis.filter(s => s.status === 'Ocupada').length;
  const totalProblema = salasDisponiveis.filter(s => s.status === 'Problema').length;

  const salasFiltradas = useMemo(() => {
    return salasDisponiveis
      .filter((sala: Sala) => {
        const matchBusca = sala.nome.toString().includes(busca.trim());
        const matchAndar = andarSelecionado !== null ? Math.floor(sala.nome / 100) === andarSelecionado : true;
        return matchBusca && matchAndar;
      })
      .sort((a: Sala, b: Sala) => a.nome - b.nome);
  }, [busca, andarSelecionado, salasDisponiveis]);

  function handleSelecionarSala(sala: Sala) {
    if (sala.status === 'Problema') {
      Alert.alert('SISTEMA: Erro Crítico', 'Esta sala requer manutenção técnica.');
      return;
    }
    setSalaSelecionada(salaSelecionada?.id === sala.id ? null : sala);
    setNome('');
  }

  function handleReservar() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Identificação necessária para reserva.');
      return;
    }
    if (!salaSelecionada) return;
    reservarSala(salaSelecionada.id, nome);
    Alert.alert('Sucesso', `Acesso autorizado à Sala ${salaSelecionada.nome}`);
    setSalaSelecionada(null);
    setNome('');
  }

  // 🎨 PALETA FUTURISTA
  const getStatusNeon = (status: Sala['status']) => {
    if (status === 'Livre') return '#00FF94'; // Verde Cyber
    if (status === 'Ocupada') return '#FF9F00'; // Laranja Âmbar
    return '#FF003C'; // Vermelho Alerta
  };

  return (
    <ScrollView style={{ backgroundColor: '#0D0D0D' }} contentContainerStyle={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>INFRA <Text style={styles.neonText}>GESTÃO</Text></Text>
        <Text style={styles.subtitle}>Monitoramento de Salas em Tempo Real</Text>
      </View>

      {/* 📊 PAINEL DE STATUS */}
      <View style={styles.stats}>
        <View style={[styles.statBox, { borderColor: '#00FF94' }]}>
          <Text style={[styles.statValue, { color: '#00FF94' }]}>{totalLivre}</Text>
          <Text style={styles.statLabel}>LIVRES</Text>
        </View>
        <View style={[styles.statBox, { borderColor: '#FF9F00' }]}>
          <Text style={[styles.statValue, { color: '#FF9F00' }]}>{totalOcupada}</Text>
          <Text style={styles.statLabel}>EM USO</Text>
        </View>
        <View style={[styles.statBox, { borderColor: '#FF003C' }]}>
          <Text style={[styles.statValue, { color: '#FF003C' }]}>{totalProblema}</Text>
          <Text style={styles.statLabel}>ALERTA</Text>
        </View>
      </View>

      {/* 🔍 SEARCHBAR CYBERPUNK */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#ED145B" />
        <TextInput
          placeholder="Rastrear sala pelo número..."
          placeholderTextColor="#444"
          value={busca}
          onChangeText={setBusca}
          style={styles.search}
        />
        {busca !== '' && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <MaterialIcons name="close" size={20} color="#ED145B" />
          </TouchableOpacity>
        )}
      </View>

      {/* 🏢 SELETOR DE NÍVEL */}
      <View style={styles.filtro}>
        {[1, 2, 3].map((andar) => (
          <TouchableOpacity
            key={andar}
            style={[styles.botaoAndar, andarSelecionado === andar && styles.ativo]}
            onPress={() => setAndarSelecionado(andarSelecionado === andar ? null : andar)}
          >
            <Text style={[styles.textAndar, andarSelecionado === andar && { color: '#FFF' }]}>
              NÍVEL 0{andar}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 📋 LISTAGEM DE CARDS */}
      {salasFiltradas.map((sala: Sala) => (
        <View key={sala.id}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => handleSelecionarSala(sala)}
            style={[
              styles.card,
              { borderLeftColor: getStatusNeon(sala.status) },
              salaSelecionada?.id === sala.id && styles.cardActive
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.statusIndicator, { backgroundColor: getStatusNeon(sala.status) }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.salaNome}>SALA {sala.nome}</Text>
                <Text style={styles.andarText}>ANDAR {Math.floor(sala.nome / 100)}</Text>
              </View>
              <MaterialCommunityIcons 
                name={sala.status === 'Livre' ? 'door-open' : 'door-closed'} 
                size={26} 
                color={getStatusNeon(sala.status)} 
              />
            </View>

            <View style={styles.cardFooter}>
              <Text style={[styles.statusText, { color: getStatusNeon(sala.status) }]}>
                {sala.status.toUpperCase()}
              </Text>
              {sala.nomeUsuario && (
                <Text style={styles.usuario}>USUÁRIO: {sala.nomeUsuario.toUpperCase()}</Text>
              )}
            </View>

            {sala.status === 'Ocupada' && (
              <TouchableOpacity
                style={styles.botaoLiberar}
                onPress={() => liberarSala(sala.id)}
              >
                <Text style={styles.btnText}>ENCERRAR SESSÃO</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          {/* 📝 FORM DE RESERVA */}
          {salaSelecionada?.id === sala.id && sala.status === 'Livre' && (
            <View style={styles.form}>
              <Text style={styles.formTitle}>REQUISITAR ACESSO</Text>
              <TextInput
                placeholder="Insira sua ID ou Nome"
                placeholderTextColor="#555"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
              />
              <TouchableOpacity style={styles.botaoReservar} onPress={handleReservar}>
                <Text style={styles.btnText}>CONFIRMAR RESERVA</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  headerSection: { marginBottom: 25 },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF', letterSpacing: 1 },
  neonText: { color: '#ED145B', textShadowColor: '#ED145B', textShadowRadius: 10 },
  subtitle: { color: '#666', fontSize: 12, fontWeight: '600', marginTop: 4, textTransform: 'uppercase' },

  stats: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  statBox: { 
    width: '31%', 
    padding: 10, 
    borderRadius: 12, 
    borderWidth: 1, 
    alignItems: 'center',
    backgroundColor: '#161616'
  },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 9, color: '#666', marginTop: 2, fontWeight: '800' },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161616',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 55,
    borderWidth: 1,
    borderColor: '#222',
  },
  search: { flex: 1, padding: 10, color: '#FFF', fontSize: 14 },

  filtro: { flexDirection: 'row', marginBottom: 20 },
  botaoAndar: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#161616',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  ativo: { backgroundColor: '#ED145B', borderColor: '#ED145B' },
  textAndar: { color: '#888', fontWeight: 'bold', fontSize: 12 },

  card: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    backgroundColor: '#161616',
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardActive: { borderColor: '#ED145B' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  statusIndicator: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  salaNome: { fontSize: 18, fontWeight: '900', color: '#FFF' },
  andarText: { fontSize: 10, color: '#555', fontWeight: 'bold' },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusText: { fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  usuario: { fontSize: 10, color: '#888', fontWeight: 'bold' },

  botaoLiberar: {
    marginTop: 15,
    backgroundColor: 'rgba(255, 0, 60, 0.1)',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF003C',
  },

  form: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ED145B',
  },
  formTitle: { color: '#ED145B', fontSize: 12, fontWeight: '900', marginBottom: 15, textAlign: 'center' },
  input: {
    backgroundColor: '#0D0D0D',
    color: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  botaoReservar: {
    backgroundColor: '#ED145B',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#ED145B',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  btnText: { color: '#FFF', fontWeight: '900', fontSize: 13, textAlign: 'center', letterSpacing: 1 },
});
