import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-100 to-green-300 p-4">
      <div className="flex flex-col items-center gap-6 max-w-xl w-full">
        <Image src="/logo.png" alt="Logo Baba Balance" width={120} height={120} className="rounded-full shadow-lg" priority />
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary text-center drop-shadow-lg">Baba Balance</h1>
        <p className="text-lg md:text-xl text-center text-muted-foreground max-w-lg">
          Equilibre seus times de futebol recreativo de forma rápida, divertida e justa! Cadastre os jogadores, defina posições e notas, e gere times equilibrados com apenas um clique.
        </p>
        <div className="flex gap-4 mt-4">
          <Link href="/cadastro" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-lg shadow hover:bg-primary/90 transition">Cadastrar jogadores</Link>
          <Link href="/jogo" className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-bold text-lg shadow hover:bg-secondary/80 transition">Ir para o jogo</Link>
        </div>
      </div>
    </main>
  );
}
