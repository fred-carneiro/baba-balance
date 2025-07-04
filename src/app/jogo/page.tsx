"use client";

import { ParticipanteSelector } from '@/components/participante-selector/participante-selector';
import { TimesSugeridos } from '@/components/times-sugeridos/times-sugeridos';
import { useJogadoresStore } from '@/lib/store/jogadores';
import { sugerirTimes } from '@/lib/utils/balanceamento';
import { useState } from 'react';

export default function JogoPage() {
  const jogadores = useJogadoresStore(s => s.jogadores);
  const participantesIds = useJogadoresStore(s => s.participantes);
  const [times, setTimes] = useState<{ time1: typeof jogadores; time2: typeof jogadores } | null>(null);

  function handleGerarTimes() {
    const participantes = jogadores.filter(j => participantesIds.includes(j.id));
    if (participantes.length < 2) {
      setTimes(null);
      return;
    }
    setTimes(sugerirTimes(participantes));
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-8 bg-background">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Jogo</h1>
        <ParticipanteSelector />
        <div className="mt-4 text-sm text-muted-foreground font-medium text-right">
          {participantesIds.length} jogador{participantesIds.length === 1 ? '' : 'es'} selecionado{participantesIds.length === 1 ? '' : 's'}
        </div>
        <button
          className="mt-2 w-full bg-primary text-primary-foreground rounded px-4 py-2 font-semibold hover:bg-primary/90 transition"
          onClick={handleGerarTimes}
          disabled={participantesIds.length < 2}
        >
          Gerar times
        </button>
        {times && <TimesSugeridos time1={times.time1} time2={times.time2} />}
      </div>
    </main>
  );
} 