import { MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useState, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SalaContext } from '../Context/SalaContext';

// 🔥 TIPAGEM
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
    return <Text>Carregando...</Text>;
  }

  const { salasDisponiveis, reservarSala, liberarSala } = context;

  // 📊 CONTADORES
  const totalLivre = salasDisponiveis.filter(s => s.status === 'Livre').length;
  const totalOcupada = salasDisponiveis.filter(s => s.status === 'Ocupada').length;
  const totalProblema = salasDisponiveis.filter(s => s.status === 'Problema').length;

  // 🔍 FILTRO
  const salasFiltradas = useMemo(() => {
    return salasDisponiveis
      .filter((sala: Sala) => {
        const matchBusca = sala.nome.toString().includes(busca.trim());

        const matchAndar =
          andarSelecionado !== null
            ? Math.floor(sala.nome / 100) === andarSelecionado
            : true;

        return matchBusca && matchAndar;
      })
      .sort((a: Sala, b: Sala) => a.nome - b.nome);
  }, [busca, andarSelecionado, salasDisponiveis]);

  // 🎯 SELECIONAR SALA
  function handleSelecionarSala(sala: Sala) {
    if (sala.status === 'Problema') {
      Alert.alert('Indisponível', 'Sala com problema!');
      return;
    }

    if (salaSelecionada?.id === sala.id) {
      setSalaSelecionada(null);
      return;
    }

    setSalaSelecionada(sala);
    setNome('');
  }

  // 📝 RESERVAR
  function handleReservar() {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Digite seu nome!');
      return;
    }

    if (!salaSelecionada) return;

    reservarSala(salaSelecionada.id, nome);

    Alert.alert('Sucesso', `Sala ${salaSelecionada.nome} reservada`);

    setSalaSelecionada(null);
    setNome('');
  }

  // 🎨 STATUS
  const getStatusColor = (status: Sala['status']) => {
    if (status === 'Livre') return '#2e7d32';
    if (status === 'Ocupada') return '#f9a825';
    return '#c62828';
  };

  const getStatusBg = (status: Sala['status']) => {
    if (status === 'Livre') return '#e8f5e9';
    if (status === 'Ocupada') return '#fff8e1';
    return '#ffebee';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Salas</Text>

      {/* 📊 STATUS */}
      <View style={styles.stats}>
        <Text>🟢 Livre {totalLivre}</Text>
        <Text>🟡 Ocupada {totalOcupada}</Text>
        <Text>🔴 Problema {totalProblema}</Text>
      </View>

      {/* 🔍 BUSCA */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar sala..."
          value={busca}
          onChangeText={setBusca}
          style={styles.search}
        />
        {busca !== '' && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <MaterialIcons name="close" size={20} />
          </TouchableOpacity>
        )}
      </View>

      {/* 🏢 FILTRO */}
      <View style={styles.filtro}>
        {[1, 2, 3].map((andar) => (
          <TouchableOpacity
            key={andar}
            style={[
              styles.botaoAndar,
              andarSelecionado === andar && styles.ativo,
            ]}
            onPress={() =>
              setAndarSelecionado(
                andarSelecionado === andar ? null : andar
              )
            }
          >
            <Text style={{ color: andarSelecionado === andar ? '#fff' : '#000' }}>
              {andar}º
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 📋 LISTA */}
      {salasFiltradas.map((sala: Sala) => (
        <View key={sala.id}>
          <TouchableOpacity onPress={() => handleSelecionarSala(sala)}>
            <View
              style={[
                styles.card,
                { borderLeftColor: getStatusColor(sala.status) },
              ]}
            >
              <View style={styles.cardHeader}>
                <MaterialIcons
                  name={
                    sala.status === 'Livre'
                      ? 'check-circle'
                      : sala.status === 'Ocupada'
                      ? 'schedule'
                      : 'error'
                  }
                  size={24}
                  color={getStatusColor(sala.status)}
                />

                <Text style={styles.salaNome}>
                  Sala {sala.nome} (Andar {Math.floor(sala.nome / 100)})
                </Text>
              </View>

              <View
                style={[
                  styles.badge,
                  { backgroundColor: getStatusBg(sala.status) },
                ]}
              >
                <Text style={{ color: getStatusColor(sala.status) }}>
                  {sala.status}
                </Text>
              </View>

              {sala.nomeUsuario && (
                <Text style={styles.usuario}>
                  Reservado por: {sala.nomeUsuario}
                </Text>
              )}

              {/* 🔓 LIBERAR */}
              {sala.status === 'Ocupada' && (
                <TouchableOpacity
                  style={styles.botaoLiberar}
                  onPress={() => liberarSala(sala.id)}
                >
                  <Text style={{ color: '#fff' }}>Liberar Sala</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>

          {/* 📝 FORM */}
          {salaSelecionada?.id === sala.id && sala.status === 'Livre' && (
            <View style={styles.form}>
              <TextInput
                placeholder="Seu nome"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
              />

              <TouchableOpacity style={styles.botaoReservar} onPress={handleReservar}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                  Reservar
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f4f7',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1a1a1a',
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 2,
  },

  search: {
    flex: 1,
    padding: 10,
  },

  filtro: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  botaoAndar: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },

  ativo: {
    backgroundColor: '#6200ee',
  },

  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderLeftWidth: 6,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  salaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },

  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 5,
  },

  usuario: {
    marginTop: 6,
    fontSize: 13,
    color: '#555',
  },

  botaoLiberar: {
    marginTop: 10,
    backgroundColor: '#2e7d32',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  form: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },

  botaoReservar: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
  },
});