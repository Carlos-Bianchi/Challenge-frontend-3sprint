# Match - Sistema de Matching

Página de matching entre pacientes e dentistas voluntários.

## Arquivo
`src/pages/solucao/Match.tsx`

## Componentes Principais

### Fila de Espera
- Lista de pacientes aguardando atendimento
- Badge "12 Pendentes" com ícone de sino
- Cards com informações do paciente (nome, localização, especialidade)

### TOP 3 Recomendados
- Cards de dentistas recomendados com match percentage
- Barras de progresso para Localização e Especialidade
- Botão "Criar Match"

### Filtros
- Selects para: Localização, Especialidade, Disponibilidade
- Botão de busca

### Matches Recentes
- Lista com filtros: Todos, Pendentes, Confirmados
- Status badges com cores (verde, amarelo, vermelho)

## Últimas Alterações
**2026-04-11:** Adicionado `whitespace-nowrap` no texto "12 Pendentes" para evitar quebra de linha

## Backlinks
- [Dashboard](./dashboard.md)
- [Index](../index.md)
