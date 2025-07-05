"use client";
import { useJogadoresStore } from '@/lib/store/jogadores';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Posicao, Nota } from '@/lib/types/jogador';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

const posicoes: Posicao[] = ['defesa', 'meio', 'ataque'];
const notas: Nota[] = ['muito bom', 'bom', 'medio', 'ruim', 'perna de pau'];
const notaPeso: Record<Nota, number> = {
  'muito bom': 5,
  'bom': 4,
  'medio': 3,
  'ruim': 2,
  'perna de pau': 1,
};

export function JogadorList() {
  const jogadores = useJogadoresStore(s => s.jogadores);
  const updateJogador = useJogadoresStore(s => s.updateJogador);
  const removeJogador = useJogadoresStore(s => s.removeJogador);
  const removeAllJogadores = useJogadoresStore(s => s.removeAllJogadores);
  const [open, setOpen] = useState(false);

  if (jogadores.length === 0) return <div>Nenhum jogador cadastrado.</div>;

  function jogadoresPorPosicao(posicao: Posicao) {
    return jogadores
      .filter(j => j.posicao === posicao)
      .sort((a, b) => notaPeso[a.nota] - notaPeso[b.nota]);
  }

  return (
    <div className="overflow-x-auto">
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Jogadores cadastrados</span>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm" onClick={() => setOpen(true)} disabled={jogadores.length === 0}>
              Remover todos
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover todos os jogadores?</DialogTitle>
          </DialogHeader>
          <div className="py-2">Essa ação não pode ser desfeita. Tem certeza que deseja remover todos os jogadores cadastrados?</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => { removeAllJogadores(); setOpen(false); }}>
              Remover todos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <table className="min-w-full border rounded text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 text-left font-semibold w-32">Nome</th>
            <th className="p-2 text-left font-semibold w-24">Posição</th>
            <th className="p-2 text-left font-semibold w-32">Nota</th>
            <th className="p-2 text-left font-semibold w-20">Ações</th>
          </tr>
        </thead>
        <tbody>
          {posicoes.map(posicao => (
            <>
              {jogadoresPorPosicao(posicao).length > 0 && (
                <tr key={posicao} className="bg-muted/60">
                  <td colSpan={4} className="p-2 font-bold uppercase text-primary">{posicao}</td>
                </tr>
              )}
              {jogadoresPorPosicao(posicao).map(j => (
                <tr key={j.id} className="border-b last:border-0">
                  <td className="p-2 max-w-[120px] truncate">{j.nome}</td>
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
                  <td className="p-2">
                    <Button variant="destructive" size="sm" onClick={() => removeJogador(j.id)}>
                      Remover
                    </Button>
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
} 