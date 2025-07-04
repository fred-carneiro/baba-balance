import { JogadorForm } from '@/components/jogador-form/jogador-form';
import { JogadorList } from '@/components/jogador-list/jogador-list';

export default function CadastroPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-8 bg-background">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Cadastro de Jogadores</h1>
        <JogadorForm />
      </div>
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Jogadores cadastrados</h2>
        <JogadorList />
      </div>
    </main>
  );
} 