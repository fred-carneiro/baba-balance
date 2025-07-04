# Baba Balance

App para equilibrar times de futebol recreativo. Feito com Next.js, React, Shadcn UI e Zustand.

## Funcionalidades

- **Cadastro de Jogadores**: Adicione jogadores com nome, posição (ataque, meio, defesa) e nota (muito bom, bom, médio, ruim, perna de pau)
- **Seleção de Participantes**: Escolha quais jogadores vão participar do jogo
- **Geração de Times Equilibrados**: Algoritmo inteligente que divide os participantes em times balanceados por posição e nota
- **Edição Inline**: Edite posições e notas diretamente nas listas
- **Persistência Local**: Dados salvos automaticamente no navegador

## Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn UI** - Componentes de interface
- **Zustand** - Gerenciamento de estado
- **Zod** - Validação de dados

## Como usar

1. **Cadastro**: Acesse `/cadastro` para adicionar jogadores
2. **Jogo**: Vá para `/jogo` para selecionar participantes e gerar times
3. **Edição**: Clique nos selects para alterar posições e notas

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o app.

## Estrutura do Projeto

```
src/
├── app/                    # Páginas (App Router)
│   ├── cadastro/          # Cadastro de jogadores
│   ├── jogo/              # Seleção e geração de times
│   └── page.tsx           # Home
├── components/            # Componentes React
│   ├── jogador-form/      # Formulário de cadastro
│   ├── jogador-list/      # Listagem de jogadores
│   ├── participante-selector/ # Seleção de participantes
│   ├── times-sugeridos/   # Exibição dos times
│   └── ui/                # Componentes Shadcn UI
└── lib/                   # Utilitários e store
    ├── store/             # Zustand store
    ├── types/             # Tipos TypeScript
    └── utils/             # Funções utilitárias
```
