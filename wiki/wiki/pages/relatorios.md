# Relatórios - Registros de Atendimento

Página de registro clínico adaptada ao modelo real de agendamento + atendimento.

## Arquivo
`src/pages/solucao/Relatorios.tsx`

## Fontes de Dados
- `GET /api/registros-atendimento`
- `POST /api/registros-atendimento`
- `GET /api/agendamentos`
- `GET /api/matches`
- `GET /api/usuarios`

## Estrutura Atual
- Formulário para criar atendimento vinculado a um `agendamentoId`
- Lista lateral de agendamentos disponíveis com paciente e dentista resolvidos
- Lista de atendimentos existentes com procedimento, condição, gravidade e status
- Resumo por status de tratamento

## Adaptação Feita
O mock antigo era um cadastro livre de paciente. O backend real exige vínculo com agendamento confirmado, então a UI passou a trabalhar em cima desse fluxo sem inventar campos fora do contrato.

## Backlinks
- [Index](../index.md)
- [Usuários](./usuarios.md)
- [Dashboard](./dashboard-view.md)
