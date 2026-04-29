import { MaterialIcons } from '@expo/vector-icons';
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

// 🔥 Tipagem
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
    return <Text>Carregando contexto...</Text>;
  }

  const { salasDisponiveis, reportarProblema, resolverProblema } = context;

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

  const handleReportar = (id: number, nome: number) => {
    reportarProblema(id);
    Toast.show({
      type: 'error',
      text1: 'Problema Reportado',
      text2: `Sala ${nome} marcada como problema`,
    });
  };

  const handleResolver = (id: number, nome: number) => {
    resolverProblema(id);
    Toast.show({
      type: 'success',
      text1: 'Resolvido',
      text2: `Sala ${nome} liberada`,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reportar Problemas</Text>

      {/* 🔍 BUSCA */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar sala..."
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

      {/* 🧭 FILTRO */}
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
        <View
          key={sala.id}
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

          {/* 🏷️ STATUS */}
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

          {/* 🎯 BOTÕES */}
          <View style={styles.buttons}>
            {sala.status !== 'Problema' && (
              <TouchableOpacity
                style={[styles.button, styles.reportButton]}
                onPress={() => handleReportar(sala.id, sala.nome)}
              >
                <MaterialIcons name="error" size={18} color="#fff" />
                <Text style={styles.buttonText}>Reportar</Text>
              </TouchableOpacity>
            )}

            {sala.status === 'Problema' && (
              <TouchableOpacity
                style={[styles.button, styles.resolveButton]}
                onPress={() => handleResolver(sala.id, sala.nome)}
              >
                <MaterialIcons name="check-circle" size={18} color="#fff" />
                <Text style={styles.buttonText}>Resolver</Text>
              </TouchableOpacity>
            )}
          </View>
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
  },

  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 5,
  },

  buttons: {
    flexDirection: 'row',
    marginTop: 10,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },

  reportButton: {
    backgroundColor: '#c62828',
  },

  resolveButton: {
    backgroundColor: '#2e7d32',
  },

  buttonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
  },
});