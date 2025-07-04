"use client";
import { useState } from 'react';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { useJogadoresStore } from '@/lib/store/jogadores';
import { Jogador, Posicao, Nota } from '@/lib/types/jogador';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const posicoes: Posicao[] = ['ataque', 'meio', 'defesa'];
const notas: Nota[] = ['muito bom', 'bom', 'medio', 'ruim', 'perna de pau'];

const jogadorSchema = z.object({
  nome: z.string().min(2),
  posicao: z.enum(['ataque', 'meio', 'defesa']),
  nota: z.enum(['muito bom', 'bom', 'medio', 'ruim', 'perna de pau']),
});

type FormState = z.infer<typeof jogadorSchema>;

export function JogadorForm() {
  const addJogador = useJogadoresStore(s => s.addJogador);
  const [form, setForm] = useState<FormState>({ nome: '', posicao: 'ataque', nota: 'medio' });
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSelect(name: keyof FormState, value: string) {
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = jogadorSchema.safeParse(form);
    if (!result.success) {
      setError('Preencha todos os campos corretamente.');
      return;
    }
    const novoJogador: Jogador = { id: uuidv4(), ...form };
    addJogador(novoJogador);
    setForm({ nome: '', posicao: 'ataque', nota: 'medio' });
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <div className="space-y-1">
        <label htmlFor="nome" className="block text-sm font-medium">Nome</label>
        <Input
          id="nome"
          name="nome"
          placeholder="Nome do jogador"
          value={form.nome}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="posicao" className="block text-sm font-medium">Posição</label>
        <Select value={form.posicao} onValueChange={(v: Posicao) => handleSelect('posicao', v)}>
          <SelectTrigger id="posicao">
            <SelectValue placeholder="Posição" />
          </SelectTrigger>
          <SelectContent>
            {posicoes.map(p => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <label htmlFor="nota" className="block text-sm font-medium">Nota</label>
        <Select value={form.nota} onValueChange={(v: Nota) => handleSelect('nota', v)}>
          <SelectTrigger id="nota">
            <SelectValue placeholder="Nota" />
          </SelectTrigger>
          <SelectContent>
            {notas.map(n => (
              <SelectItem key={n} value={n}>{n}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" className="w-full">Cadastrar</Button>
    </form>
  );
} 