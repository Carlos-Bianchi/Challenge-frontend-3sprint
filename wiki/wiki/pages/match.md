# Match - Sistema de Matching

Página de matching real conectada ao backend Java.

## Arquivo
`src/pages/solucao/Match.tsx`

## Fontes de Dados
- `GET /api/usuarios`
- `GET /api/matches`
- `GET /api/matches/recommendations?patientId=...`
- `POST /api/matches`
- `GET /api/especialidades`

## Estrutura Atual
- **Fila de pacientes** montada a partir de usuários com papel `paciente`
- **Recomendações reais** por paciente usando `DentistRecommendationResponse`
- **Filtro por especialidade** aplicado no cliente sobre as recomendações recebidas
- **Criação de match** usando os scores retornados pela recomendação
- **Histórico recente** com nomes resolvidos a partir da lista de usuários

## Adaptação Feita
O mock antigo usava localização, clínica e timestamps que o backend não entrega nesse fluxo. A interface foi simplificada para trabalhar com:
- nome/email/status do paciente
- especialidade e scores da recomendação
- status e IDs no histórico de match

## Backlinks
- [Dashboard](./dashboard-view.md)
- [Index](../index.md)
- [Usuários](./usuarios.md)
