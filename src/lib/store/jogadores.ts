import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Jogador } from '../types/jogador';

interface JogadoresState {
  jogadores: Jogador[];
  participantes: string[];
  addJogador: (jogador: Jogador) => void;
  updateJogador: (jogador: Jogador) => void;
  removeJogador: (id: string) => void;
  setParticipantes: (ids: string[]) => void;
}

export const useJogadoresStore = create<JogadoresState>()(
  persist(
    (set: (fn: (state: JogadoresState) => Partial<JogadoresState> | JogadoresState) => void, get: () => JogadoresState) => ({
      jogadores: [],
      participantes: [],
      addJogador: (jogador: Jogador) => set({ jogadores: [...get().jogadores, jogador] }),
      updateJogador: (jogador: Jogador) => set({ jogadores: get().jogadores.map((j: Jogador) => j.id === jogador.id ? jogador : j) }),
      removeJogador: (id: string) => set({ jogadores: get().jogadores.filter((j: Jogador) => j.id !== id) }),
      setParticipantes: (ids: string[]) => set({ participantes: ids }),
    }),
    {
      name: 'jogadores-storage',
      partialize: (state: JogadoresState) => ({ jogadores: state.jogadores, participantes: state.participantes }),
    }
  )
); 