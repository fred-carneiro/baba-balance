import { Jogador, Nota, Posicao } from '@/lib/types/jogador';

const notaPeso: Record<Nota, number> = {
  'muito bom': 5,
  'bom': 4,
  'medio': 3,
  'ruim': 2,
  'perna de pau': 1,
};

function mediaTime(time: Jogador[]) {
  if (time.length === 0) return 0;
  const soma = time.reduce((acc, j) => acc + notaPeso[j.nota], 0);
  return (soma / time.length).toFixed(2);
}

const ordemPosicoes: Posicao[] = ['defesa', 'meio', 'ataque'];

function ordenarTime(jogadores: Jogador[]): Jogador[] {
  return ordemPosicoes.flatMap(posicao =>
    jogadores
      .filter(j => j.posicao === posicao)
      .sort((a, b) => notaPeso[a.nota] - notaPeso[b.nota])
  );
}

interface TimesSugeridosProps {
  time1: Jogador[];
  time2: Jogador[];
}

export function TimesSugeridos({ time1, time2 }: TimesSugeridosProps) {
  const time1Ordenado = ordenarTime(time1);
  const time2Ordenado = ordenarTime(time2);
  return (
    <div className="flex flex-col md:flex-row gap-6 mt-8">
      <div className="flex-1 border rounded p-4">
        <h3 className="text-lg font-bold mb-2">Time 1</h3>
        <div className="mb-2 text-sm text-muted-foreground">Pontuação média: <span className="font-semibold">{mediaTime(time1)}</span></div>
        <ul className="space-y-1">
          {time1Ordenado.map(j => (
            <li key={j.id} className="truncate">{j.nome} <span className="text-xs text-muted-foreground">({j.posicao}, {j.nota} [{notaPeso[j.nota]}])</span></li>
          ))}
        </ul>
      </div>
      <div className="flex-1 border rounded p-4">
        <h3 className="text-lg font-bold mb-2">Time 2</h3>
        <div className="mb-2 text-sm text-muted-foreground">Pontuação média: <span className="font-semibold">{mediaTime(time2)}</span></div>
        <ul className="space-y-1">
          {time2Ordenado.map(j => (
            <li key={j.id} className="truncate">{j.nome} <span className="text-xs text-muted-foreground">({j.posicao}, {j.nota} [{notaPeso[j.nota]}])</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
} 