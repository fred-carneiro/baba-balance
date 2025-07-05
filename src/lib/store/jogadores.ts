import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Jogador } from '../types/jogador';

interface JogadoresState {
  jogadores: Jogador[];
  participantes: string[];
  addJogador: (jogador: Jogador) => void;
  updateJogador: (jogador: Jogador) => void;
  removeJogador: (id: string) => void;
  removeAllJogadores: () => void;
  setParticipantes: (ids: string[]) => void;
}

export const useJogadoresStore = create<JogadoresState>()(
  persist(
    (set) => ({
      jogadores: [],
      participantes: [],
      addJogador: (jogador: Jogador) => set((state) => ({ jogadores: [...state.jogadores, jogador] })),
      updateJogador: (jogador: Jogador) => set((state) => ({ jogadores: state.jogadores.map((j: Jogador) => j.id === jogador.id ? jogador : j) })),
      removeJogador: (id: string) => set((state) => ({ jogadores: state.jogadores.filter((j: Jogador) => j.id !== id) })),
      removeAllJogadores: () => set(() => ({ jogadores: [] })),
      setParticipantes: (ids: string[]) => set(() => ({ participantes: ids })),
    }),
    {
      name: 'jogadores-storage',
      partialize: (state: JogadoresState) => ({ jogadores: state.jogadores, participantes: state.participantes }),
    }
  )
); 