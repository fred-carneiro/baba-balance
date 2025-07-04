import { Jogador, Nota, Posicao } from '../types/jogador';

const notaPeso: Record<Nota, number> = {
  'muito bom': 5,
  'bom': 4,
  'medio': 3,
  'ruim': 2,
  'perna de pau': 1,
};

interface TimeSugerido {
  time1: Jogador[];
  time2: Jogador[];
}

function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function mediaTime(time: Jogador[]) {
  if (time.length === 0) return 0;
  const soma = time.reduce((acc, j) => acc + notaPeso[j.nota], 0);
  return soma / time.length;
}

function temTodasPosicoes(time: Jogador[]): boolean {
  const posicoes = new Set<Posicao>(time.map(j => j.posicao));
  return ['ataque', 'meio', 'defesa'].every(p => posicoes.has(p as Posicao));
}

export function sugerirTimes(jogadores: Jogador[]): TimeSugerido {
  if (jogadores.length < 2) return { time1: [], time2: [] };
  const total = jogadores.length;
  const tamanhoTime1 = Math.floor(total / 2);
  let melhorDivisao: TimeSugerido = { time1: [], time2: [] };
  let menorDiferenca = Infinity;

  for (let i = 0; i < 2000; i++) {
    const embaralhados = shuffle([...jogadores]);
    const time1 = embaralhados.slice(0, tamanhoTime1);
    const time2 = embaralhados.slice(tamanhoTime1);
    if (!temTodasPosicoes(time1) || !temTodasPosicoes(time2)) continue;
    const media1 = mediaTime(time1);
    const media2 = mediaTime(time2);
    const diferenca = Math.abs(media1 - media2);
    if (diferenca < menorDiferenca) {
      menorDiferenca = diferenca;
      melhorDivisao = { time1, time2 };
    }
    if (diferenca === 0) break;
  }
  return melhorDivisao;
}

export type { TimeSugerido }; 