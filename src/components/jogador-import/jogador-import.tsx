"use client";
import { useState } from 'react';
import { useJogadoresStore } from '@/lib/store/jogadores';
import { Jogador } from '@/lib/types/jogador';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { v4 as uuidv4 } from 'uuid';

export function JogadorImport() {
  const addJogador = useJogadoresStore(s => s.addJogador);
  const [listaTexto, setListaTexto] = useState('');
  const [jogadoresImportados, setJogadoresImportados] = useState<Jogador[]>([]);
  const [mostrarPreview, setMostrarPreview] = useState(false);

  function processarLista() {
    const linhas = listaTexto.split('\n');
    const jogadores: Jogador[] = [];

    linhas.forEach((linha) => {
      // Remove espaços em branco e caracteres invisíveis Unicode
      const linhaLimpa = linha.replace(/[\u200B-\u200D\u2060\uFEFF]/g, '').trim();
      
      // Ignora linhas vazias ou que contêm apenas espaços/caracteres invisíveis
      if (!linhaLimpa || linhaLimpa.length === 0 || /^\s*$/.test(linhaLimpa)) return;
      
      // Extrai o nome da linha (remove número, M, ✅, goleiro, etc.)
      const nome = linhaLimpa
        .replace(/^\d+\.\s*/, '') // Remove número no início
        .replace(/\s+M\s*/, ' ') // Remove M (com ou sem espaços)
        .replace(/\s*✅\s*$/, '') // Remove ✅ no final
        .replace(/\s*\(goleiro\)\s*$/i, '') // Remove (goleiro) no final
        .replace(/[\u200B-\u200D\u2060\uFEFF]/g, '') // Remove invisíveis remanescentes
        .trim();

      // Ignora se não tem nome, se contém "goleiro", ou se o nome ficou vazio após processamento
      if (!nome || nome.length === 0 || /^\s*$/.test(nome) || linhaLimpa.toLowerCase().includes('goleiro')) return;

      // Cria o jogador com posição padrão "meio" e nota "medio"
      const jogador: Jogador = {
        id: uuidv4(),
        nome: nome,
        posicao: 'meio',
        nota: 'medio'
      };

      jogadores.push(jogador);
    });

    setJogadoresImportados(jogadores);
    setMostrarPreview(true);
  }

  function importarJogadores() {
    jogadoresImportados.forEach(jogador => {
      addJogador(jogador);
    });
    
    // Limpa o formulário
    setListaTexto('');
    setJogadoresImportados([]);
    setMostrarPreview(false);
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Importar Lista de Jogadores</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Cole a lista de jogadores. O sistema irá importar todos os jogadores da lista, removendo automaticamente os símbolos de confirmação (✅) e o &quot;M&quot; no final dos nomes. Goleiros não serão importados.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="lista" className="block text-sm font-medium">Lista de Jogadores</label>
        <Textarea
          id="lista"
          placeholder="Cole aqui a lista de jogadores..."
          value={listaTexto}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setListaTexto(e.target.value)}
          rows={8}
          className="font-mono text-sm"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={processarLista} disabled={!listaTexto.trim()}>
          Processar Lista
        </Button>
        {mostrarPreview && (
          <>
            <Button onClick={importarJogadores} variant="default">
              Importar {jogadoresImportados.length} Jogador{jogadoresImportados.length !== 1 ? 'es' : ''}
            </Button>
            <Button onClick={() => {
              setJogadoresImportados([]);
              setMostrarPreview(false);
            }} variant="outline">
              Limpar
            </Button>
          </>
        )}
      </div>

      {mostrarPreview && jogadoresImportados.length > 0 && (
        <div className="border rounded p-4 bg-muted/20">
          <h4 className="font-semibold mb-2">Jogadores que serão importados:</h4>
          <ul className="space-y-1 text-sm">
            {jogadoresImportados.map((jogador, index) => (
              <li key={jogador.id} className="flex items-center gap-2">
                <span className="text-muted-foreground">{index + 1}.</span>
                <span>{jogador.nome}</span>
                <span className="text-xs text-muted-foreground">({jogador.posicao}, {jogador.nota})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {mostrarPreview && jogadoresImportados.length === 0 && (
        <div className="border rounded p-4 bg-yellow-50 text-yellow-800">
          <p className="text-sm">Nenhum jogador válido encontrado na lista. Verifique se há jogadores na lista (goleiros não serão importados).</p>
        </div>
      )}
    </div>
  );
} 