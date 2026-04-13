# Log de Mudanças

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
