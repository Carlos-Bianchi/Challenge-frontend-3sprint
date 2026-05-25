# Log de Mudanças

## 2026-05-24 - Integração real com backend Java

### Auth + Sessão (`src/lib/api.ts`, `src/contexts/AuthContext.tsx`, `src/routes/ProtectedRoute.tsx`, `src/pages/Login.tsx`, `src/pages/Registro.tsx`, `src/components/Header.tsx`, `vite.config.ts`)
- **Status:** Atualizado
- **Mudanças:**
  - Criada camada compartilhada de API com `fetch` nativo e tratamento de `ApiError`
  - Adicionada persistência local da sessão com `AuthContext`
  - Protegidas as rotas `/solucao/*`
  - Login passou a usar `POST /api/auth/login`
  - Registro passou a usar `POST /api/auth/register` com payload real de paciente
  - Header agora mostra estado autenticado e logout
  - Vite dev server usa proxy `/api` para `localhost:8080`

### DashboardView.tsx (`src/pages/solucao/DashboardView.tsx`)
- **Status:** Atualizado
- **Mudanças:**
  - Removidos dados mockados
  - Página agora consome `GET /api/dashboard/summary`
  - Cards adaptados ao DTO real agregado do backend

### Usuarios.tsx e UsuarioDetalhes.tsx (`src/pages/solucao/Usuarios.tsx`, `src/pages/solucao/UsuarioDetalhes.tsx`)
- **Status:** Atualizado
- **Mudanças:**
  - Listagem usa `GET /api/usuarios`
  - Alteração de status usa `PATCH /api/usuarios/{id}/status`
  - Exclusão usa `DELETE /api/usuarios/{id}`
  - Detalhe reduzido aos campos realmente expostos por `UsuarioResponse`

### Match.tsx (`src/pages/solucao/Match.tsx`)
- **Status:** Atualizado
- **Mudanças:**
  - Recomendações reais via `GET /api/matches/recommendations`
  - Criação de match persistida via `POST /api/matches`
  - Histórico carregado via `GET /api/matches`

### Comunicacao.tsx (`src/pages/solucao/Comunicacao.tsx`)
- **Status:** Atualizado
- **Mudanças:**
  - Feed carregado via `GET /api/comunicacoes`
  - Marcação de leitura via `PATCH /api/comunicacoes/{id}/read`
  - Exclusão via `DELETE /api/comunicacoes/{id}`
  - Remetentes resolvidos por `GET /api/usuarios`

### Relatorios.tsx (`src/pages/solucao/Relatorios.tsx`)
- **Status:** Atualizado
- **Mudanças:**
  - Formulário refeito para o contrato real de `registros-atendimento`
  - Agendamentos, matches e usuários são cruzados para exibir contexto clínico
  - Criação usa `POST /api/registros-atendimento`

## 2026-04-11 - Sessão de UI/UX Improvements

### Match.tsx (`src/pages/solucao/Match.tsx`)
- **Status:** Corrigido
- **Mudanças:**
  - Adicionado `whitespace-nowrap` no texto "12 Pendentes" (linha 135)
  - Texto agora fica em uma única linha, evitando quebra entre número e label

### Comunicacao.tsx (`src/pages/solucao/Comunicacao.tsx`)
- **Status:** Corrigido
- **Mudanças:**
  - Removido kanji "援助" da notificação (linha 66)
  - Substituído por "ajuda" em português

### Integrantes.tsx (`src/pages/Integrantes.tsx`)
- **Status:** Atualizado
- **Mudanças:**
  - Removidas seções: Liderança, Conselheiros, CTA "Junte-se ao time"
  - Mantida apenas Equipe de Desenvolvimento
  - Removido Caio Araujo da lista
  - Carlos e Vinicius permanecem
  - Substituída descrição por ícones de LinkedIn e GitHub
  - Usados ícones do lucide-react: `User` para ambos
  - Ícones de redes sociais usando SVG inline (GitHub e LinkedIn)

### Sobre.tsx (`src/pages/Sobre.tsx`)
- **Status:** Atualizado
- **Mudanças:**
  - Removido botão "Seja um Voluntário" (linha 50-56)
  - Removido import não utilizado `ArrowRight` do lucide-react

### DashboardView.tsx (`src/pages/solucao/DashboardView.tsx`)
- **Status:** Corrigido
- **Mudanças:**
  - Adicionado `whitespace-nowrap` nos textos "Pendentes", "Confirmados", "Rejeitados"
  - Evita quebra de linha nos badges de estatísticas

## 2026-04-11

### Páginas Atualizadas com Informações da Turma do Bem

#### FAQ (`src/pages/Faq.tsx`)
- **Status:** Atualizado
- **Mudanças:** 
  - Adicionadas 10 perguntas frequentes com dados reais do site turmadobem.org.br
  - Incluído história da organização (fundada em 1995, oficializada 2002)
  - Detalhados programas: Dentista do Bem (jovens 11-17 anos) e Apolônias do Bem (mulheres vítimas de violência)
  - Adicionados números de impacto: +90 mil jovens, +1,2 mil mulheres, +18 mil dentistas
  - Incluídos reconhecimentos: Schwab Foundation, Ashoka, Epic Foundation, Fundación Mapfre
  - Adicionados valores oficiais da organização
  - Nova categoria: "Sobre", "Programas", "Impacto"

#### Sobre (`src/pages/Sobre.tsx`)
- **Status:** Atualizado
- **Mudanças:**
  - Corrigida data de fundação: 1995 (não 2009)
  - Atualizados números de impacto no hero e stats
  - Reescrita história com dados reais do site oficial
  - Adicionada seção "Nossos Programas" com cards de Dentista do Bem e Apolônias do Bem
  - Adicionada seção "Reconhecimentos" com prêmios e conquistas
  - Atualizados valores oficiais da ONG
  - Corrigido badge "20+ anos" (era 15+)

#### Integrantes (`src/pages/Integrantes.tsx`)
- **Status:** Corrigido
- **Mudanças:**
  - Substituídos ícones inexistentes `Github` e `Linkedin` do lucide-react v1.8.0
  - Novos ícones: `Code` (para GitHub) e `Globe` (para LinkedIn)
  - **Motivo:** Build quebrado devido a ícones não exportados na versão 1.8.0

### Próximos Passos
- [ ] Criar páginas de documentação para os módulos do sistema
- [ ] Documentar componentes reutilizáveis
- [ ] Adicionar página sobre convenções de código

---

## 2026-04-11 - Wiki Inicializada
- Criada estrutura completa da wiki
- Adicionado SCHEMA.md com regras de organização
- Criado index.md com índice de páginas
- Criado overview.md com visão geral do projeto
- Inicializado log.md
