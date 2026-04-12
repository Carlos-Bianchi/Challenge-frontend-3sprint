# DashboardView - Painel de Controle

Dashboard analítico com estatísticas e métricas do sistema.

## Arquivo
`src/pages/solucao/DashboardView.tsx`

## Componentes Principais

### Estatísticas de Matches
Grid com 3 colunas exibindo:
- **Pendentes:** 12 (badge amarelo)
- **Confirmados:** 127 (badge verde)
- **Rejeitados:** 8 (badge vermelho)

Cada badge contém:
- Número em destaque (text-2xl font-bold)
- Label embaixo (text-xs)
- Com `whitespace-nowrap` para evitar quebra de linha

### Cards de Métricas
- Total de matches
- Pacientes cadastrados
- Voluntários ativos
- Tempo médio de resposta

### Gráficos
- Evolução de matches ao longo do tempo
- Distribuição por especialidade
- Mapa de calor por região

### Atividades Recentes
- Lista das últimas ações no sistema
- Timestamps
- Usuários envolvidos

## Dados Mockados
```typescript
const data = {
  matches: {
    total: 147,
    pendentes: 12,
    confirmados: 127,
    rejeitados: 8
  }
}
```

## Últimas Alterações
**2026-04-11:** Adicionado `whitespace-nowrap` nos textos dos badges "Pendentes", "Confirmados", "Rejeitados" para evitar quebra de linha

## Backlinks
- [Index](../index.md)
- [Match](./match.md)
