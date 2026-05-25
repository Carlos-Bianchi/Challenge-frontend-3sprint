# DashboardView - Painel de Controle

Dashboard operacional alimentado por dados reais do backend.

## Arquivo
`src/pages/solucao/DashboardView.tsx`

## Fonte de Dados
- `GET /api/dashboard/summary`

## Estrutura Atual
- Card de **Usuários** com total e distribuição por papel (`paciente`, `dentista_voluntario`, `administrador`)
- Card de **Matches** com o total de `matchesConfirmados`
- Card de **Comunicação** com `comunicacoesNaoLidas`
- Card de **Agendamentos** com breakdown por status
- Card de **Resumo operacional** com leitura textual dos agregados

## Adaptação Feita
O mock antigo assumia métricas e gráficos que o backend não retorna. A página foi mantida no mesmo tom visual, mas passou a exibir apenas os campos reais do DTO `DashboardSummaryResponse`.

## DTO Relevante
```typescript
interface DashboardSummaryResponse {
  totalUsuarios: number
  usuariosPorPapel: Record<string, number>
  matchesConfirmados: number
  comunicacoesNaoLidas: number
  agendamentosPorStatus: Record<string, number>
}
```

## Backlinks
- [Index](../index.md)
- [Match](./match.md)
- [Usuários](./usuarios.md)
