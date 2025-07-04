export type Posicao = 'ataque' | 'meio' | 'defesa';
export type Nota = 'muito bom' | 'bom' | 'medio' | 'ruim' | 'perna de pau';

export interface Jogador {
  id: string;
  nome: string;
  posicao: Posicao;
  nota: Nota;
} 