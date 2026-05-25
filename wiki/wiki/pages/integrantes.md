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

#### Carlos Aurelio Tolosa Bianchi
- **Role:** Desenvolvedor
- **Foto:** `https://github.com/Carlos-Bianchi.png`
- **RM:** 567897
- **Turma:** 1tdsps
- **Cores:** Gradiente verde (#006422 → #008c30)
- **Links:**
  - GitHub: https://github.com/Carlos-Bianchi
  - LinkedIn: https://www.linkedin.com/in/carlos-bianchi-6608a3272/

#### Vinicius Morrone Lustosa
- **Role:** Desenvolvedor
- **Foto:** `https://github.com/viniciusmorrone.png`
- **RM:** 566884
- **Turma:** 1tdsps
- **Cores:** Gradiente verde (#006422 → #008c30)
- **Links:**
  - GitHub: https://github.com/viniciusmorrone
  - LinkedIn: https://www.linkedin.com/in/vin%C3%ADcius-morrone-lustosa/

### Design dos Cards
- Header com gradiente colorido
- Avatar circular com foto real via GitHub avatar URL
- Nome em destaque
- Badge de role
- Bloco textual com RM e turma
- Dois botões redondos: GitHub (cinza) e LinkedIn (verde)
- Hover effects nos botões

### 2026-05-24 - Atualização para Tarefa 2
- Substituído avatar genérico por foto real via GitHub
- Atualizados nomes completos dos integrantes
- Adicionados RM e turma em cada card
- Mantidos links existentes de GitHub e LinkedIn

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
