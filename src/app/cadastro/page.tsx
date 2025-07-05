import { JogadorForm } from '@/components/jogador-form/jogador-form';
import { JogadorList } from '@/components/jogador-list/jogador-list';
import { JogadorImport } from '@/components/jogador-import/jogador-import';

export default function CadastroPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-8 bg-background">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Jogadores</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Cadastro Individual</h2>
              <JogadorForm />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Importar Lista</h2>
              <JogadorImport />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Jogadores Cadastrados</h2>
            <JogadorList />
          </div>
        </div>
      </div>
    </main>
  );
} 