# Integrantes - Equipe de Desenvolvimento

Página que exibe os desenvolvedores do projeto.

## Arquivo
`src/pages/Integrantes.tsx`

## Estrutura Atual

### Hero Section
- Título "Nossa Equipe"
- Subtítulo explicativo

### Equipe de Desenvolvimento
Grid com 2 desenvolvedores:

#### Carlos
- **Role:** Desenvolvedor
- **Ícone:** User (lucide-react)
- **Cores:** Gradiente verde (#006422 → #008c30)
- **Links:**
  - GitHub: https://github.com/Carlos-Bianchi
  - LinkedIn: https://www.linkedin.com/in/carlos-bianchi-6608a3272/

#### Vinicius
- **Role:** Desenvolvedor
- **Ícone:** User (lucide-react)
- **Cores:** Gradiente verde (#006422 → #008c30)
- **Links:**
  - GitHub: https://github.com/viniciusmorrone
  - LinkedIn: https://www.linkedin.com/in/vin%C3%ADcius-morrone-lustosa/

### Design dos Cards
- Header com gradiente colorido
- Avatar circular com ícone
- Nome em destaque
- Badge de role
- Dois botões redondos: GitHub (cinza) e LinkedIn (verde)
- Hover effects nos botões

## Histórico de Mudanças

### 2026-04-11 - Simplificação da Página
- Removidas seções: Liderança, Conselheiros, CTA
- Removido: Caio Araujo
- Substituída descrição por ícones de redes sociais
- Usados SVGs inline para LinkedIn e GitHub (lucide-react v1.8.0 não exporta esses ícones)

### 2026-04-11 - Fix de Ícones
- Substituídos ícones inexistentes `Github` e `Linkedin`
- Implementados SVGs inline funcionais

## Backlinks
- [Index](../index.md)
- [Overview](../overview.md)
