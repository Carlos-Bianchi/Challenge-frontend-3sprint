# Project Overview - Turma do Bem

SPA moderna para a ONG Turma do Bem, conectando pacientes com voluntários odontológicos.

## Stack
- React 19 + TypeScript
- Vite (build tool)
- TailwindCSS
- React Router DOM
- React Hook Form

## Architecture

### Core Modules

**Landing Pages**
- Home: Landing page principal
- Sobre: Informações sobre a ONG
- Faq: Perguntas frequentes
- Contato: Formulário de contato
- Integrantes: Time de desenvolvedores

**Auth**
- Login: Autenticação de usuários
- Registro: Cadastro de novos usuários
- Sessão local persistida com `AuthContext` e `localStorage`
- Rotas `/solucao/*` protegidas no cliente via `ProtectedRoute`

**Solução Dashboard**
- Match: Sistema de matching paciente-dentista
- Comunicacao: Notificações e mensagens
- Usuarios: Gestão de pacientes e voluntários
- DashboardView: Visualização de métricas
- Relatorios: Upload e gestão de documentos

## Backend Integration
- Todas as chamadas usam `fetch` nativo com URLs relativas `/api`
- `vite.config.ts` possui proxy de desenvolvimento para `http://localhost:8080`
- Backend real expõe contratos enxutos, então as páginas de solução foram simplificadas para refletir apenas os campos realmente retornados

## Design System
Cores principais da ONG Turma do Bem:
- Amarelo: #FFB700
- Verde: #006422 / #008c30
- Dark: #1a1c19

## Backlinks
- [Index](./index.md)
- [Pages](./pages/)

---
*Last updated: 2026-05-24*
