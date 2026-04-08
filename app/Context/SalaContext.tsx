import React, { createContext, useState } from 'react';

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

  function gerarSalas() {
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

    // exemplos
    salas[1].status = 'Ocupada';
    salas[1].nomeUsuario = 'Carlos';

    salas[4].status = 'Problema';

    return salas;
  }

  const [salasDisponiveis, setSalasDisponiveis] = useState<Sala[]>(gerarSalas());

  const reportarProblema = (idSala: number) => {
    setSalasDisponiveis(prev =>
      prev.map(sala =>
        sala.id === idSala ? { ...sala, status: 'Problema' } : sala
      )
    );
  };

  const resolverProblema = (idSala: number) => {
    setSalasDisponiveis(prev =>
      prev.map(sala =>
        sala.id === idSala
          ? { ...sala, status: 'Livre', nomeUsuario: undefined }
          : sala
      )
    );
  };

  const reservarSala = (idSala: number, nome: string) => {
    setSalasDisponiveis(prev =>
      prev.map(sala => {
        if (sala.id !== idSala) return sala;

        if (sala.status !== 'Livre') return sala;

        return {
          ...sala,
          status: 'Ocupada',
          nomeUsuario: nome,
        };
      })
    );
  };

  const liberarSala = (idSala: number) => {
    setSalasDisponiveis(prev =>
      prev.map(sala =>
        sala.id === idSala
          ? { ...sala, status: 'Livre', nomeUsuario: undefined }
          : sala
      )
    );
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