import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { SalaContext } from '../Context/SalaContext';

type Sala = {
  id: number;
  nome: number;
  status: 'Livre' | 'Ocupada' | 'Problema';
};

export default function Reportar() {
  const context = useContext(SalaContext);

  const [busca, setBusca] = useState<string>('');
  const [andarSelecionado, setAndarSelecionado] = useState<number | null>(null);

  if (!context) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.neonText}>Acessando Banco de Dados...</Text>
      </View>
    );
  }

  const { salasDisponiveis, reportarProblema, resolverProblema } = context;

  const salasFiltradas = useMemo(() => {
    return salasDisponiveis
      .filter((sala: Sala) => {
        const matchBusca = sala.nome.toString().includes(busca.trim());
        const matchAndar = andarSelecionado !== null ? Math.floor(sala.nome / 100) === andarSelecionado : true;
        return matchBusca && matchAndar;
      })
      .sort((a: Sala, b: Sala) => a.nome - b.nome);
  }, [busca, andarSelecionado, salasDisponiveis]);

  const getStatusNeon = (status: Sala['status']) => {
    if (status === 'Livre') return '#00FF94';
    if (status === 'Ocupada') return '#FF9F00';
    return '#FF003C';
  };

  const handleReportar = (id: number, nome: number) => {
    reportarProblema(id);
    Toast.show({
      type: 'error',
      text1: 'ALERTA DE INCIDENTE',
      text2: `Sala ${nome} marcada para manutenção técnica.`,
      visibilityTime: 3000,
    });
  };

  const handleResolver = (id: number, nome: number) => {
    resolverProblema(id);
    Toast.show({
      type: 'success',
      text1: 'PROTOCOLO CONCLUÍDO',
      text2: `A Sala ${nome} foi reativada no sistema.`,
      visibilityTime: 3000,
    });
  };

  return (
    <ScrollView style={{ backgroundColor: '#0D0D0D' }} contentContainerStyle={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>CENTRAL DE <Text style={styles.neonText}>INCIDENTES</Text></Text>
        <Text style={styles.subtitle}>Relatório de integridade da infraestrutura</Text>
      </View>

      {/* 🔍 BUSCA TÉCNICA */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="qr-code-scanner" size={20} color="#ED145B" />
        <TextInput
          placeholder="Filtrar por ID da sala..."
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

      {/* 🧭 SELETOR DE NÍVEL */}
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

      {/* 📋 LISTA DE DIAGNÓSTICO */}
      {salasFiltradas.map((sala: Sala) => (
        <View
          key={sala.id}
          style={[
            styles.card,
            { borderLeftColor: getStatusNeon(sala.status) },
            sala.status === 'Problema' && styles.cardAlert
          ]}
        >
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name={sala.status === 'Problema' ? 'alert-octagon' : 'shield-check-outline'}
              size={24}
              color={getStatusNeon(sala.status)}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.salaNome}>SALA {sala.nome}</Text>
              <Text style={styles.statusLabel}>STATUS: {sala.status.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.actionArea}>
            {sala.status !== 'Problema' ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.mainButton, { backgroundColor: 'rgba(255, 0, 60, 0.15)', borderColor: '#FF003C' }]}
                onPress={() => handleReportar(sala.id, sala.nome)}
              >
                <MaterialIcons name="report-problem" size={18} color="#FF003C" />
                <Text style={[styles.buttonText, { color: '#FF003C' }]}>REPORTAR FALHA</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.mainButton, { backgroundColor: 'rgba(0, 255, 148, 0.15)', borderColor: '#00FF94' }]}
                onPress={() => handleResolver(sala.id, sala.nome)}
              >
                <MaterialIcons name="build" size={18} color="#00FF94" />
                <Text style={[styles.buttonText, { color: '#00FF94' }]}>EXECUTAR REPARO</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  headerSection: { marginBottom: 25 },
  title: { fontSize: 24, fontWeight: '900', color: '#FFF', letterSpacing: 1 },
  neonText: { color: '#ED145B', textShadowColor: '#ED145B', textShadowRadius: 10 },
  subtitle: { color: '#666', fontSize: 11, fontWeight: '700', marginTop: 4, textTransform: 'uppercase' },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161616',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
    borderWidth: 1,
    borderColor: '#222',
  },
  search: { flex: 1, padding: 10, color: '#FFF', fontSize: 14 },

  filtro: { flexDirection: 'row', marginBottom: 20 },
  botaoAndar: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#161616',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  ativo: { backgroundColor: '#ED145B', borderColor: '#ED145B' },
  textAndar: { color: '#888', fontWeight: 'bold', fontSize: 11 },

  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    backgroundColor: '#161616',
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardAlert: {
    borderColor: 'rgba(255, 0, 60, 0.3)',
    backgroundColor: '#1A0D0F',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  salaNome: { fontSize: 18, fontWeight: '900', color: '#FFF' },
  statusLabel: { fontSize: 10, color: '#555', fontWeight: 'bold', marginTop: 2 },

  actionArea: { borderTopWidth: 1, borderTopColor: '#222', paddingTop: 15 },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: { marginLeft: 8, fontWeight: '900', fontSize: 12, letterSpacing: 1 },
});
