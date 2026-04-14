# Challenge Frontend - Sprint 03 - React + Vite + TypeScript

## Descrição do Projeto

Este projeto representa a migração completa de uma aplicação web estática (HTML/CSS) para uma Single Page Application (SPA) moderna utilizando React, Vite e TypeScript. A aplicação gerencia o ecossistema da ONG **Turma do Bem**, conectando pacientes que precisam de atendimento odontológico com voluntários dispostos a ajudar.

A plataforma permite:
- **Match entre Pacientes e Voluntários**: Sistema de conexão inteligente baseado em localização, especialidade e disponibilidade
- **Gestão de Usuários**: Cadastro e administração de pacientes e voluntários
- **Comunicação**: Sistema de mensagens integrado para coordenação entre as partes
- **Dashboard Analítico**: Visualização de métricas e estatísticas em tempo real
- **Relatórios**: Upload e gestão de documentação médica e laudos

## Tecnologias Utilizadas

- **React 19** - Biblioteca para construção de interfaces
- **Vite** - Build tool para desenvolvimento rápido
- **TypeScript** - Tipagem estática para código mais seguro
- **TailwindCSS** - Framework CSS utilitário para estilização
- **React Router DOM** - Roteamento para SPA
- **React Hook Form** - Gerenciamento de formulários com validação

## Estrutura de Pastas

```
/src
├── /components          # Componentes reutilizáveis
│   ├── /ui             # Componentes de UI (Card, etc.)
│   └── Header.tsx      # Header com navegação responsiva
├── /pages              # Páginas da aplicação
│   ├── /solucao        # Módulos do sistema
│   │   ├── Match.tsx
│   │   ├── Comunicacao.tsx
│   │   ├── Usuarios.tsx
│   │   ├── UsuarioDetalhes.tsx
│   │   ├── DashboardView.tsx
│   │   └── Relatorios.tsx
│   └── Solucao.tsx     # Dashboard central
├── /routes             # Configuração de rotas
│   └── AppRoutes.tsx
├── App.tsx             # Componente principal
└── main.tsx            # Entry point
```

## Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd Challenge-frontend-3sprint
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em: `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

O build será gerado na pasta `dist/`.

## Integrantes do Grupo

| Nome | RM | Turma | GitHub | LinkedIn |
|------|-----|-------|--------|----------|
| Carlos Aurelio Tolosa Bianchi | [RM 567897] | 1tdsps | [https://github.com/Carlos-Bianchi] | [https://www.linkedin.com/in/carlos-bianchi-6608a3272/] |
| Vinicius Morrone Lustosa | [RM 566884] | 1tdsps | [https://github.com/viniciusmorrone] | [https://www.linkedin.com/in/vin%C3%ADcius-morrone-lustosa/] |

## Links Importantes

- **Link do Repositório GitHub**: [https://github.com/Carlos-Bianchi/Challenge-frontend-3sprint]
- **Link do Vídeo no Youtube**: [https://youtu.be/w9SUgqfdRfI]

## Funcionalidades Implementadas

✅ **Navegação SPA**: React Router DOM com rotas aninhadas
✅ **Roteamento Dinâmico**: Uso de `useParams` para detalhes de usuários
✅ **Gerenciamento de Estado**: `useState` e `useEffect` em múltiplos componentes
✅ **Formulários**: React Hook Form com validações TypeScript
✅ **Responsividade**: Layout adaptável para Mobile, Tablet e Desktop
✅ **Design System**: Cores da ONG Turma do Bem (Amarelo #FFB700, Verde #1E7E34)
✅ **Transições Suaves**: Animações em todos os elementos interativos

---

**Projeto desenvolvido para o Challenge Frontend Sprint 03 - Turma do Bem**
