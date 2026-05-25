# Usuários - Gestão Real de Usuários

Listagem e detalhe de usuários usando os endpoints reais do backend.

## Arquivos
- `src/pages/solucao/Usuarios.tsx`
- `src/pages/solucao/UsuarioDetalhes.tsx`

## Fontes de Dados
- `GET /api/usuarios`
- `GET /api/usuarios/{id}`
- `PATCH /api/usuarios/{id}/status`
- `DELETE /api/usuarios/{id}`

## Estrutura Atual
- Tabela com nome, email, papel, status, telefone, CPF e data de nascimento
- Filtros por busca, papel e status
- Ações reais para alterar status e excluir
- Página de detalhe focada nos campos realmente retornados pelo `UsuarioResponse`

## Adaptação Feita
O detalhe anterior assumia endereço, bio, permissões e edição completa. Como o backend atual expõe um `UsuarioResponse` enxuto, a tela foi reduzida a:
- exibição fiel dos campos disponíveis
- atualização de status, que é o fluxo suportado diretamente

## Backlinks
- [Index](../index.md)
- [Dashboard](./dashboard-view.md)
- [Match](./match.md)
