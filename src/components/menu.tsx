"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export function Menu() {
  const pathname = usePathname();
  const links = [
    { href: '/cadastro', label: 'Cadastro' },
    { href: '/jogo', label: 'Jogo' },
  ];
  return (
    <nav className="w-full flex items-center justify-between border-b bg-background/80 sticky top-0 z-10 px-4">
      <div className="flex items-center gap-3 py-2">
        <Image src="/logo.png" alt="Logo Baba Balance" width={48} height={48} priority className="rounded-full" />
        <span className="text-xl font-bold tracking-tight text-primary">Baba Balance</span>
      </div>
      <ul className="flex gap-6 py-2">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`font-semibold px-2 py-1 rounded transition-colors ${pathname.startsWith(link.href) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
} 