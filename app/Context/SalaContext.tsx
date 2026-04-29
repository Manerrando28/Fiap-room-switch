import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔥 TIPOS
export type StatusSala = 'Livre' | 'Ocupada' | 'Problema';

export interface Sala {
  id: number;
  nome: number;
  status: StatusSala;
  nomeUsuario?: string;
}

interface SalaContextType {
  salasDisponiveis: Sala[];
  reportarProblema: (idSala: number) => void;
  resolverProblema: (idSala: number) => void;
  reservarSala: (idSala: number, nome: string) => void;
  liberarSala: (idSala: number) => void;
}

export const SalaContext = createContext<SalaContextType | null>(null);

export const SalaProvider = ({ children }: { children: React.ReactNode }) => {
  const [salasDisponiveis, setSalasDisponiveis] = useState<Sala[]>([]);

  // 🔄 GERAR SALAS
  function gerarSalas(): Sala[] {
    let id = 1;
    const salas: Sala[] = [];

    const andares = [1, 2, 3];
    const salasPorAndar = [1, 2, 3];

    for (let andar of andares) {
      for (let numero of salasPorAndar) {
        salas.push({
          id: id++,
          nome: Number(`${andar}0${numero}`),
          status: 'Livre',
        });
      }
    }

    // exemplos iniciais
    salas[1] = {
      ...salas[1],
      status: 'Ocupada',
      nomeUsuario: 'Carlos',
    };

    salas[4] = {
      ...salas[4],
      status: 'Problema',
      nomeUsuario: undefined,
    };

    return salas;
  }

  // 🔥 LOAD
  useEffect(() => {
    carregarSalas();
  }, []);

  const carregarSalas = async () => {
    try {
      const data = await AsyncStorage.getItem('salas');

      if (data) {
        const parsed: Sala[] = JSON.parse(data);
        setSalasDisponiveis(parsed);
      } else {
        const iniciais = gerarSalas();
        setSalasDisponiveis(iniciais);
        await AsyncStorage.setItem('salas', JSON.stringify(iniciais));
      }
    } catch (error) {
      console.log('Erro ao carregar salas', error);
    }
  };

  // 💾 SAVE
  const salvarSalas = async (novasSalas: Sala[]) => {
    try {
      setSalasDisponiveis(novasSalas);
      await AsyncStorage.setItem('salas', JSON.stringify(novasSalas));
    } catch (error) {
      console.log('Erro ao salvar salas', error);
    }
  };

  // 🚨 REPORTAR
  const reportarProblema = (idSala: number) => {
    const novasSalas: Sala[] = salasDisponiveis.map((sala) => {
      if (sala.id !== idSala) return sala;

      return {
        ...sala,
        status: 'Problema',
        nomeUsuario: undefined,
      };
    });

    salvarSalas(novasSalas);
  };

  // ✅ RESOLVER
  const resolverProblema = (idSala: number) => {
    const novasSalas: Sala[] = salasDisponiveis.map((sala) => {
      if (sala.id !== idSala) return sala;

      return {
        ...sala,
        status: 'Livre',
        nomeUsuario: undefined,
      };
    });

    salvarSalas(novasSalas);
  };

  // 📝 RESERVAR
  const reservarSala = (idSala: number, nome: string) => {
    const novasSalas: Sala[] = salasDisponiveis.map((sala) => {
      if (sala.id !== idSala) return sala;

      if (sala.status !== 'Livre') return sala;

      return {
        ...sala,
        status: 'Ocupada',
        nomeUsuario: nome.trim(),
      };
    });

    salvarSalas(novasSalas);
  };

  // 🔓 LIBERAR
  const liberarSala = (idSala: number) => {
    const novasSalas: Sala[] = salasDisponiveis.map((sala) => {
      if (sala.id !== idSala) return sala;

      return {
        ...sala,
        status: 'Livre',
        nomeUsuario: undefined,
      };
    });

    salvarSalas(novasSalas);
  };

  return (
    <SalaContext.Provider
      value={{
        salasDisponiveis,
        reportarProblema,
        resolverProblema,
        reservarSala,
        liberarSala,
      }}
    >
      {children}
    </SalaContext.Provider>
  );
};