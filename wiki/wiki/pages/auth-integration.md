# Autenticação - Login, Sessão e Registro

Integração real de autenticação e sessão do frontend.

## Arquivos
- `src/lib/api.ts`
- `src/contexts/AuthContext.tsx`
- `src/routes/ProtectedRoute.tsx`
- `src/pages/Login.tsx`
- `src/pages/Registro.tsx`
- `src/components/Header.tsx`
- `vite.config.ts`

## Fluxos
- `POST /api/auth/login` com `{ email, senha }`
- `POST /api/auth/register` com `UsuarioRequest` focado em `papel: paciente`
- Persistência local do `AuthResponse` em `localStorage`
- Proteção client-side de todo o namespace `/solucao/*`
- Header alterna entre `Login/Registre-se` e estado autenticado com botão de logout

## Registro
O formulário de registro foi simplificado para o contrato mínimo obrigatório do backend:
- `nomeCompleto`
- `email`
- `senha`
- `telefone`
- `cpf`
- `dataNascimento`
- `especialidadeId`
- `descricaoNecessidade`
- `endereco` aninhado com `cep`, `logradouro`, `numero`, `bairro`, `cidade`, `estado`

## Erros
Os erros do envelope `ApiError` são tratados no cliente com:
- mensagem geral acionável
- extração de `details` por campo quando presentes

## Backlinks
- [Index](../index.md)
- [Comunicação](./comunicacao.md)
- [Usuários](./usuarios.md)
