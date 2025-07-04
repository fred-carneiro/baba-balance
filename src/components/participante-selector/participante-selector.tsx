"use client";
import Link from 'next/link';
import { useJogadoresStore } from '@/lib/store/jogadores';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Posicao, Nota } from '@/lib/types/jogador';

const posicoes: Posicao[] = ['ataque', 'meio', 'defesa'];
const notas: Nota[] = ['muito bom', 'bom', 'medio', 'ruim', 'perna de pau'];
const notaPeso: Record<Nota, number> = {
  'muito bom': 5,
  'bom': 4,
  'medio': 3,
  'ruim': 2,
  'perna de pau': 1,
};

export function ParticipanteSelector() {
  const jogadores = useJogadoresStore(s => s.jogadores);
  const participantes = useJogadoresStore(s => s.participantes);
  const setParticipantes = useJogadoresStore(s => s.setParticipantes);
  const updateJogador = useJogadoresStore(s => s.updateJogador);

  function toggleParticipante(id: string) {
    if (participantes.includes(id)) {
      setParticipantes(participantes.filter(pid => pid !== id));
    } else {
      setParticipantes([...participantes, id]);
    }
  }

  function handleSelectAll() {
    if (participantes.length === jogadores.length) {
      setParticipantes([]);
    } else {
      setParticipantes(jogadores.map(j => j.id));
    }
  }

  if (jogadores.length === 0) return <div>Nenhum jogador cadastrado.</div>;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <Checkbox
          id="select-all"
          checked={
            participantes.length === jogadores.length && jogadores.length > 0
              ? true
              : participantes.length > 0
              ? 'indeterminate'
              : false
          }
          onCheckedChange={handleSelectAll}
        />
        <label htmlFor="select-all" className="cursor-pointer select-none font-semibold text-sm">
          {participantes.length === jogadores.length ? 'Desmarcar todos' : 'Selecionar todos'}
        </label>
      </div>
      <div className="text-sm font-semibold mb-2">Selecione os participantes do jogo:</div>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left font-semibold w-8">Selecionar</th>
              <th className="p-2 text-left font-semibold w-32">Nome</th>
              <th className="p-2 text-left font-semibold w-24">Posição</th>
              <th className="p-2 text-left font-semibold w-32">Nota</th>
            </tr>
          </thead>
          <tbody>
            {jogadores.map(j => (
              <tr key={j.id} className="border-b last:border-0">
                <td className="p-2">
                  <Checkbox id={j.id} checked={participantes.includes(j.id)} onCheckedChange={() => toggleParticipante(j.id)} />
                </td>
                <td className="p-2 max-w-[120px] truncate">
                  <label htmlFor={j.id} className="cursor-pointer select-none">{j.nome}</label>
                </td>
                <td className="p-2">
                  <Select value={j.posicao} onValueChange={v => updateJogador({ ...j, posicao: v as Posicao })}>
                    <SelectTrigger className="h-6 w-20 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {posicoes.map(p => (
                        <SelectItem key={p} value={p} className="text-xs">{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="p-2">
                  <Select value={j.nota} onValueChange={v => updateJogador({ ...j, nota: v as Nota })}>
                    <SelectTrigger className="h-6 w-28 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {notas.map(n => (
                        <SelectItem key={n} value={n} className="text-xs">{n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 