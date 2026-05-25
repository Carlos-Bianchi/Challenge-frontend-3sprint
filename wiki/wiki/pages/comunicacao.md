# Comunicacao - Sistema de Notificações

Hub de comunicação conectado ao backend real.

## Arquivo
`src/pages/solucao/Comunicacao.tsx`

## Fontes de Dados
- `GET /api/comunicacoes`
- `PATCH /api/comunicacoes/{id}/read`
- `DELETE /api/comunicacoes/{id}`
- `GET /api/usuarios` para resolver nomes de remetente

## Estrutura Atual
- Sidebar por canal (`inbox`, `whatsapp`, `email`, `sms`)
- Feed central com busca, filtro por leitura e urgência
- Agrupamento em **não lidas** e **já lidas**
- Painel de detalhes com resumo, conteúdo, canal, categoria e vínculo de match

## Adaptação Feita
O backend não retorna timestamp, nome do remetente nem tags prontas. A página agora:
- resolve o nome do remetente via `remetenteUsuarioId`
- agrupa por estado de leitura em vez de datas mockadas
- usa `categoria`, `urgente` e `canal` como metadados principais

## Backlinks
- [Dashboard](./dashboard-view.md)
- [Index](../index.md)
- [Autenticação](./auth-integration.md)
